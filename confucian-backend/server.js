const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');
const { GasPrice } = require('@cosmjs/stargate');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 内存存储用户领取记录（生产环境应使用数据库）
const claimHistory = new Map();

// 管理员钱包实例
let adminWallet = null;
let adminAddress = null;

// 初始化管理员钱包
async function initializeAdminWallet() {
  try {
    console.log('🏛️ 初始化儒家复兴计划管理员钱包...');
    
    adminWallet = await DirectSecp256k1HdWallet.fromMnemonic(
      process.env.ADMIN_MNEMONIC,
      { prefix: "juno" }
    );
    
    const accounts = await adminWallet.getAccounts();
    adminAddress = accounts[0].address;
    
    console.log('✅ 管理员钱包初始化成功:', adminAddress);
    console.log('📍 合约地址:', process.env.CON_CONTRACT);
    
    return true;
  } catch (error) {
    console.error('❌ 管理员钱包初始化失败:', error.message);
    return false;
  }
}

// 检查用户冷却时间
function checkCooldown(userAddress) {
  const lastClaimTime = claimHistory.get(userAddress);
  if (!lastClaimTime) {
    return { canClaim: true, remainingTime: 0 };
  }
  
  const now = Date.now();
  const cooldownMs = parseInt(process.env.COOLDOWN_HOURS) * 60 * 60 * 1000;
  const remainingMs = cooldownMs - (now - lastClaimTime);
  
  if (remainingMs <= 0) {
    return { canClaim: true, remainingTime: 0 };
  }
  
  return { 
    canClaim: false, 
    remainingTime: Math.ceil(remainingMs / 1000 / 60 / 60) // 剩余小时
  };
}

// 验证Juno地址格式
function isValidJunoAddress(address) {
  return /^juno1[a-z0-9]{38}$/.test(address);
}

// 🚰 水龙头API端点
app.post('/api/faucet/claim', async (req, res) => {
  try {
    const { userAddress } = req.body;
    
    console.log(`💧 水龙头领取请求: ${userAddress}`);
    
    // 1. 验证地址格式
    if (!userAddress || !isValidJunoAddress(userAddress)) {
      return res.status(400).json({
        success: false,
        error: '无效的Juno地址格式'
      });
    }
    
    // 2. 检查冷却时间
    const cooldownCheck = checkCooldown(userAddress);
    if (!cooldownCheck.canClaim) {
      return res.status(429).json({
        success: false,
        error: `请等待${cooldownCheck.remainingTime}小时后再次领取`,
        remainingTime: cooldownCheck.remainingTime
      });
    }
    
    // 3. 检查管理员钱包
    if (!adminWallet) {
      return res.status(500).json({
        success: false,
        error: '管理员钱包未初始化'
      });
    }
    
    // 4. 执行转账
    console.log('📤 开始执行转账...');
    
    const client = await SigningCosmWasmClient.connectWithSigner(
      process.env.RPC_ENDPOINT,
      adminWallet,
      {
        gasPrice: GasPrice.fromString("0.075ujuno")
      }
    );
    
    const result = await client.execute(
      adminAddress,
      process.env.CON_CONTRACT,
      {
        transfer: {
          recipient: userAddress,
          amount: process.env.FAUCET_AMOUNT
        }
      },
      "auto",
      "儒家复兴计划水龙头发放" // 交易备注
    );
    
    // 5. 记录成功领取
    claimHistory.set(userAddress, Date.now());
    
    console.log('✅ 转账成功:', result.transactionHash);
    
    res.json({
      success: true,
      txHash: result.transactionHash,
      amount: "100",
      message: "成功领取100个NIUBI代币！欢迎加入儒家复兴计划！",
      nextClaimTime: Date.now() + (parseInt(process.env.COOLDOWN_HOURS) * 60 * 60 * 1000)
    });
    
  } catch (error) {
    console.error('❌ 水龙头发放失败:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || '水龙头发放失败，请稍后重试'
    });
  }
});

// 📊 获取水龙头统计信息
app.get('/api/faucet/stats', (req, res) => {
  res.json({
    totalClaims: claimHistory.size,
    isActive: !!adminWallet,
    faucetAmount: parseInt(process.env.FAUCET_AMOUNT) / 1000000,
    cooldownHours: parseInt(process.env.COOLDOWN_HOURS),
    adminAddress: adminAddress || 'Not initialized'
  });
});

// 🏥 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    walletReady: !!adminWallet
  });
});

// 🏛️ 项目信息端点
app.get('/api/info', (req, res) => {
  res.json({
    project: "儒家复兴计划",
    description: "科学法律和儒学的融合，个人社会和宇宙的交响",
    motto: "披上区块链铠甲重生的不死凤凰",
    version: "1.0.0",
    network: "Juno",
    tokenSymbol: "CON"
  });
});

// 启动服务器
async function startServer() {
  console.log('🚀 启动儒家复兴计划后端服务...');
  
  // 初始化管理员钱包
  const walletReady = await initializeAdminWallet();
  
  if (!walletReady) {
    console.error('❌ 无法启动服务器：管理员钱包初始化失败');
    process.exit(1);
  }
  
  app.listen(PORT, () => {
    console.log('🏛️ ================================');
    console.log('   儒家复兴计划 后端服务');
    console.log('🏛️ ================================');
    console.log(`🌐 服务器运行在: http://localhost:${PORT}`);
    console.log(`💧 水龙头API: http://localhost:${PORT}/api/faucet/claim`);
    console.log(`📊 统计信息: http://localhost:${PORT}/api/faucet/stats`);
    console.log(`🏥 健康检查: http://localhost:${PORT}/api/health`);
    console.log(`📱 项目信息: http://localhost:${PORT}/api/info`);
    console.log('🏛️ ================================');
  });
}

startServer();
