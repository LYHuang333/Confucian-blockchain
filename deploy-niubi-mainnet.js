const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');
const { GasPrice } = require('@cosmjs/stargate');
const fs = require('fs');

async function deployNIUBI() {
  try {
    console.log('🏛️ ===============================================');
    console.log('     儒家复兴计划 - NIUBI代币正式发行');
    console.log('🏛️ ===============================================');
    console.log('📅 时间:', new Date().toISOString());
    console.log('🌐 网络: Juno主网 (juno-1)');
    console.log('💰 总量: 1,000,000,000,000 NIUBI');
    console.log('');
    
    // 连接钱包 - 请在这里输入您的助记词
    console.log('🔐 连接部署钱包...');
    const mnemonic = process.env.DEPLOY_MNEMONIC || "您的助记词在这里";
    
    if (mnemonic === "您的助记词在这里") {
      console.error('❌ 请设置DEPLOY_MNEMONIC环境变量或修改代码中的助记词');
      process.exit(1);
    }
    
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "juno" });
    const [account] = await wallet.getAccounts();
    
    console.log('📍 部署者地址:', account.address);
    
    // 连接Juno主网
    console.log('🌐 连接Juno主网...');
    const client = await SigningCosmWasmClient.connectWithSigner(
      "https://juno-rpc.polkachu.com",
      wallet,
      { 
        gasPrice: GasPrice.fromString("0.075ujuno")
      }
    );
    
    // 检查余额
    const balance = await client.getBalance(account.address, "ujuno");
    const junoBalance = parseFloat(balance.amount) / 1000000;
    console.log('💰 JUNO余额:', junoBalance.toFixed(6), 'JUNO');
    
    if (junoBalance < 15) {
      console.warn('⚠️  建议JUNO余额至少15个，当前余额可能不足');
    }
    
    // 检查合约文件
    const wasmFile = 'cw20_base.wasm';
    if (!fs.existsSync(wasmFile)) {
      console.error('❌ 找不到合约文件:', wasmFile);
      console.log('请下载CW20合约文件:');
      console.log('wget https://github.com/CosmWasm/cw-plus/releases/download/v1.1.0/cw20_base.wasm');
      process.exit(1);
    }
    
    const wasmCode = fs.readFileSync(wasmFile);
    console.log('📁 合约文件大小:', (wasmCode.length / 1024).toFixed(2), 'KB');
    
    // 上传合约代码
    console.log('');
    console.log('📤 上传NIUBI合约到Juno主网...');
    console.log('⏳ 这可能需要几分钟时间...');
    
    const uploadResult = await client.upload(
      account.address, 
      wasmCode, 
      "auto",
      "NIUBI - Confucian V2 Token Contract"
    );
    
    console.log('✅ 合约上传成功！');
    console.log('🆔 Code ID:', uploadResult.codeId);
    console.log('💸 上传费用:', uploadResult.gasUsed, 'gas');
    console.log('🔗 上传交易:', uploadResult.transactionHash);
    
    // 实例化合约
    console.log('');
    console.log('🚀 实例化NIUBI代币合约...');
    
    const instantiateMsg = {
      name: "Confucian V2",
      symbol: "NIUBI",
      decimals: 6,
      initial_balances: [
        {
          address: account.address,
          amount: "1000000000000000000" // 1万亿NIUBI (6位小数)
        }
      ],
      mint: null, // 不允许增发
      marketing: {
        project: "儒家复兴计划 - Confucian Revival Plan",
        description: "科学法律和儒学的融合，个人社会和宇宙的交响 - 披上区块链铠甲重生的不死凤凰。NIUBI代币是儒家复兴计划的治理和支付代币。",
        marketing: account.address,
        logo: null
      }
    };
    
    const instantiateResult = await client.instantiate(
      account.address,
      uploadResult.codeId,
      instantiateMsg,
      "NIUBI-Confucian-V2",
      "auto",
      { memo: "儒家复兴计划NIUBI代币正式发行 - 2025年7月21日" }
    );
    
    console.log('');
    console.log('🎉 ===============================================');
    console.log('        NIUBI代币发行成功！');
    console.log('🎉 ===============================================');
    console.log('📍 合约地址:', instantiateResult.contractAddress);
    console.log('🔗 部署交易:', instantiateResult.transactionHash);
    console.log('💰 初始余额: 1,000,000,000,000 NIUBI');
    console.log('👑 所有者:', account.address);
    
    // 验证部署
    console.log('');
    console.log('🔍 验证合约部署...');
    
    const tokenInfo = await client.queryContractSmart(
      instantiateResult.contractAddress,
      { token_info: {} }
    );
    
    console.log('✅ 代币验证成功:');
    console.log('   名称:', tokenInfo.name);
    console.log('   符号:', tokenInfo.symbol);
    console.log('   小数位:', tokenInfo.decimals);
    console.log('   总供应:', tokenInfo.total_supply);
    
    // 查询余额验证
    const niubibalance = await client.queryContractSmart(
      instantiateResult.contractAddress,
      { balance: { address: account.address } }
    );
    
    console.log('💰 部署者余额:', balance.balance, '(原始单位)');
    console.log('💰 部署者余额:', (parseFloat(balance.balance) / 1000000).toLocaleString(), 'NIUBI');
    
    // 输出配置信息
    console.log('');
    console.log('📝 ===============================================');
    console.log('           配置更新信息');
    console.log('📝 ===============================================');
    console.log('');
    console.log('🔧 后端配置 (confucian-backend/.env):');
    console.log(`CON_CONTRACT="${instantiateResult.contractAddress}"`);
    console.log('FAUCET_AMOUNT="10000000000"  # 10,000 NIUBI');
    console.log('TOKEN_NAME="NIUBI"');
    console.log('TOKEN_FULL_NAME="Confucian V2 (NIUBI)"');
    
    console.log('');
    console.log('🎨 前端更新清单:');
    console.log('- 更新合约地址');
    console.log('- 将"CON代币"改为"NIUBI代币"');
    console.log('- 将"50 CON"改为"10,000 NIUBI"');
    console.log('- 更新水龙头按钮文字');
    
    console.log('');
    console.log('🔗 区块链浏览器:');
    console.log(`https://www.mintscan.io/juno/account/${account.address}`);
    console.log(`https://www.mintscan.io/juno/tx/${instantiateResult.transactionHash}`);
    
    console.log('');
    console.log('🎯 下一步行动:');
    console.log('1. 更新后端和前端配置');
    console.log('2. 重启服务并测试功能');
    console.log('3. 发布NIUBI正式上线公告');
    console.log('4. 邀请用户体验水龙头');
    console.log('5. 开始规划二手商品交易系统');
    
    return {
      contractAddress: instantiateResult.contractAddress,
      txHash: instantiateResult.transactionHash,
      codeId: uploadResult.codeId
    };
    
  } catch (error) {
    console.error('❌ 部署失败:', error);
    if (error.message.includes('insufficient funds')) {
      console.log('💡 建议: 向部署地址转入更多JUNO代币');
    }
    throw error;
  }
}

// 执行部署
console.log('🚀 开始NIUBI代币发行流程...');
deployNIUBI().then((result) => {
  console.log('');
  console.log('🏛️ ===============================================');
  console.log('   儒家复兴计划 NIUBI代币 正式上线！');
  console.log('🏛️ ===============================================');
  console.log(`📍 合约: ${result.contractAddress}`);
  console.log(`🆔 Code ID: ${result.codeId}`);
  console.log(`🔗 交易: ${result.txHash}`);
  console.log('🎉 欢迎来到NIUBI时代！');
}).catch((error) => {
  console.error('');
  console.error('💥 发行失败:', error.message);
  console.error('请检查网络连接、助记词和JUNO余额');
});
