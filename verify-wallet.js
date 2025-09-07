const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');

async function verifyWallet() {
  try {
    const mnemonic = "您的juno13ref...账户的助记词";
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "juno" });
    const [account] = await wallet.getAccounts();
    
    console.log('助记词对应的地址:', account.address);
    console.log('期望的地址: juno13refwzd7avdgydwzggvavuuupu4wujupmzhz0r');
    console.log('匹配:', account.address === 'juno13refwzd7avdgydwzggvavuuupu4wujupmzhz0r' ? '✅' : '❌');
  } catch (error) {
    console.error('验证失败:', error.message);
  }
}

verifyWallet();
