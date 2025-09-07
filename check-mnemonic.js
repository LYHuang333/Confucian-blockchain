const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function checkMnemonic() {
  console.log('🔍 助记词格式检查器');
  console.log('');
  
  rl.question('请输入您的助记词: ', async (input) => {
    try {
      // 清理输入
      const cleanMnemonic = input.trim().toLowerCase();
      console.log('');
      console.log('📝 处理后的助记词:', `"${cleanMnemonic}"`);
      
      // 检查基本格式
      const words = cleanMnemonic.split(' ').filter(word => word.length > 0);
      console.log('🔢 单词数量:', words.length);
      
      if (words.length !== 12 && words.length !== 24) {
        console.error('❌ 错误: 助记词应该是12个或24个单词');
        rl.close();
        return;
      }
      
      console.log('📋 单词列表:');
      words.forEach((word, index) => {
        console.log(`  ${index + 1}: "${word}"`);
      });
      
      // 尝试创建钱包
      console.log('');
      console.log('🔐 尝试创建钱包...');
      
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(cleanMnemonic, { prefix: "juno" });
      const [account] = await wallet.getAccounts();
      
      console.log('✅ 助记词格式正确！');
      console.log('📍 对应地址:', account.address);
      console.log('');
      console.log('🎯 期望地址: juno13refwzd7avdgydwzggvavuuupu4wujupmzhz0r');
      console.log('🔍 地址匹配:', account.address === 'juno13refwzd7avdgydwzggvavuuupu4wujupmzhz0r' ? '✅ 匹配' : '❌ 不匹配');
      
      if (account.address !== 'juno13refwzd7avdgydwzggvavuuupu4wujupmzhz0r') {
        console.log('');
        console.log('⚠️  助记词正确，但对应不同的地址！');
        console.log('💡 可能原因:');
        console.log('   - 这是不同钱包的助记词');
        console.log('   - 派生路径不同');
        console.log('   - 助记词记录有误');
      }
      
    } catch (error) {
      console.error('❌ 助记词验证失败:', error.message);
      console.log('');
      console.log('💡 常见问题:');
      console.log('   - 单词拼写错误');
      console.log('   - 单词顺序错误');  
      console.log('   - 包含无效字符');
      console.log('   - 不是有效的BIP39助记词');
    }
    
    rl.close();
  });
}

checkMnemonic();
