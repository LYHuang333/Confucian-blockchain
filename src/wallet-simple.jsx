import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Wallet } from 'lucide-react';
import { CosmWasmClient, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';

// 配置
const CONFIG = {
  RPC_ENDPOINT: "https://juno-rpc.polkachu.com",
  CON_CONTRACT: "juno1yw8e26tyn9sclldw783y94qcwd3rd0stkzjfv2nddgreuk8232jspp0mjz",
  CHAIN_ID: "juno-1",
  GAS_PRICE: GasPrice.fromString("0.025ujuno"),
};

// 简单样式
const styles = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, sans-serif; background: #f5f5f5; }
  .container { max-width: 600px; margin: 50px auto; padding: 30px; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
  button { background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 16px; margin: 10px; font-weight: 600; }
  button:hover { transform: translateY(-2px); }
  button:disabled { background: #ccc; cursor: not-allowed; transform: none; }
  .status { padding: 15px; margin: 15px 0; border-radius: 5px; }
  .success { background: #d4edda; color: #155724; }
  .error { background: #f8d7da; color: #721c24; }
  .info { background: #d1ecf1; color: #0c5460; }
`;

function SimpleWalletTest() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [status, setStatus] = useState({ message: '准备连接钱包...', type: 'info' });

  // 简单的钱包连接函数
  const connectWallet = async () => {
    try {
      console.log('开始连接Leap钱包...');
      setStatus({ message: '正在连接Leap钱包...', type: 'info' });

      if (!window.leap) {
        throw new Error('请安装Leap钱包');
      }

      await window.leap.enable(CONFIG.CHAIN_ID);
      const signer = window.leap.getOfflineSigner(CONFIG.CHAIN_ID);
      const accounts = await signer.getAccounts();

      if (accounts.length > 0) {
        const address = accounts[0].address;
        setIsConnected(true);
        setWalletAddress(address);
        setStatus({ message: `连接成功: ${address.slice(0, 20)}...`, type: 'success' });

        // 查询余额
        try {
          const client = await CosmWasmClient.connect(CONFIG.RPC_ENDPOINT);
          const balanceResponse = await client.queryContractSmart(CONFIG.CON_CONTRACT, {
            balance: { address }
          });
          const bal = (parseInt(balanceResponse.balance) / 1000000).toFixed(3);
          setBalance(bal);
          setStatus({ message: `连接成功！余额: ${bal} NIUBI`, type: 'success' });
        } catch (e) {
          setStatus({ message: `连接成功，但余额查询失败: ${e.message}`, type: 'success' });
        }
      } else {
        throw new Error('未找到账户');
      }
    } catch (error) {
      console.error('连接失败:', error);
      setStatus({ message: `连接失败: ${error.message}`, type: 'error' });
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setBalance('0');
    setStatus({ message: '钱包已断开连接', type: 'info' });
  };

  return (
    <div className="container">
      <h1>🏛️ Leap钱包连接测试</h1>
      
      <div className={`status ${status.type}`}>
        {status.message}
      </div>

      {!isConnected ? (
        <button onClick={connectWallet}>
          <Wallet size={16} style={{display: 'inline', marginRight: '8px'}} />
          连接Leap钱包
        </button>
      ) : (
        <div>
          <p><strong>地址:</strong> {walletAddress}</p>
          <p><strong>余额:</strong> {balance} NIUBI</p>
          <button onClick={disconnectWallet}>断开连接</button>
        </div>
      )}
      
      <div style={{marginTop: '20px', fontSize: '14px', color: '#666'}}>
        <p>请确保：</p>
        <ul>
          <li>已安装Leap钱包插件</li>
          <li>钱包已解锁</li>
          <li>已添加Juno网络到钱包</li>
        </ul>
      </div>
    </div>
  );
}

// 添加样式
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

ReactDOM.createRoot(document.getElementById('root')).render(<SimpleWalletTest />);