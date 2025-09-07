import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Wallet, ArrowRightLeft, Coins, Users, Globe, ExternalLink, Send, History, X, Gift, FileImage, Upload, ShoppingCart, BookOpen, Palette, Vote, Scale, Crown, UserCheck, TrendingUp, PieChart, BarChart3, DollarSign, Layers, Building, ScrollText, ArrowUpRight } from 'lucide-react';
import { CosmWasmClient, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';
import './index.css';

// 临时样式修复
const tempStyles = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  .bg-white { background-color: white; }
  .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
  .sticky { position: sticky; }
  .top-0 { top: 0; }
  .z-50 { z-index: 50; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .h-16 { height: 4rem; }
  .max-w-7xl { max-width: 80rem; margin: 0 auto; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .w-8 { width: 2rem; }
  .h-8 { height: 2rem; }
  .rounded-full { border-radius: 50%; }
  .mr-3 { margin-right: 0.75rem; }
  .text-xl { font-size: 1.25rem; }
  .font-bold { font-weight: 700; }
  .text-gray-900 { color: #111827; }
  .hidden { display: none; }
  .space-x-8 > * + * { margin-left: 2rem; }
  .text-gray-700 { color: #374151; }
  .transition-colors { transition: color 0.2s; }
  .bg-orange-500 { background-color: #ea580c; }
  .text-white { color: white; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .rounded-lg { border-radius: 0.5rem; }
  
  /* 改善按钮可见性 */
  button {
    font-weight: 600 !important;
    border: 2px solid transparent !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  }
  
  .bg-orange-500 {
    background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%) !important;
    border-color: #dc2626 !important;
  }
  
  .bg-green-500 {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
    border-color: #059669 !important;
  }
  
  .bg-blue-500 {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
    border-color: #1d4ed8 !important;
  }
  
  .bg-purple-500 {
    background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%) !important;
    border-color: #7c3aed !important;
  }
  
  button:hover {
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
  }
  
  button:disabled {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
    transform: none !important;
  }
  .cursor-pointer { cursor: pointer; }
  .pointer-events-none { pointer-events: none; }
  .pointer-events-auto { pointer-events: auto; }
  .bg-green-500 { background-color: #10b981; }
  .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
  .text-center { text-align: center; }
  .max-w-2xl { max-width: 42rem; margin: 0 auto; }
  .text-2xl { font-size: 1.5rem; }
  .mb-4 { margin-bottom: 1rem; }
  .text-orange-400 { color: #fb923c; }
  .text-lg { font-size: 1.125rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .opacity-90 { opacity: 0.9; }
  .flex-col { flex-direction: column; }
  .gap-3 { gap: 0.75rem; }
  .justify-center { justify-content: center; }
  .bg-blue-600 { background-color: #2563eb; }
  .text-blue-600 { color: #2563eb; }
  .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .font-semibold { font-weight: 600; }
  .border-2 { border-width: 2px; }
  .border-white { border-color: white; }
  .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
  .mb-8 { margin-bottom: 2rem; }
  .bg-gray-50 { background-color: #f9fafb; }
  .p-6 { padding: 1.5rem; }
  .rounded-xl { border-radius: 0.75rem; }
  .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
  .mb-16 { margin-bottom: 4rem; }
  .max-w-4xl { max-width: 56rem; margin: 0 auto; }
  .max-w-6xl { max-width: 72rem; margin: 0 auto; }
  .bg-gradient-to-r { background: linear-gradient(135deg, #60a5fa 0%, #2563eb 100%); }
  .from-blue-400 { background: linear-gradient(135deg, #60a5fa 0%, #2563eb 100%); }
  .to-blue-600 { background: linear-gradient(135deg, #60a5fa 0%, #2563eb 100%); }
  .space-x-2 > * + * { margin-left: 0.5rem; }
  .space-y-8 > * + * { margin-top: 2rem; }
  .fixed { position: fixed; }
  .top-4 { top: 1rem; }
  .right-4 { right: 1rem; }
  .p-4 { padding: 1rem; }
  .max-w-sm { max-width: 24rem; }
  .inset-0 { inset: 0; }
  .bg-black { background-color: black; }
  .bg-opacity-50 { background-color: rgba(0, 0, 0, 0.5); }
  .z-50 { z-index: 50; }
  .justify-center { justify-content: center; }
  .max-w-md { max-width: 28rem; }
  .w-full { width: 100%; }
  .rounded-2xl { border-radius: 1rem; }
  .p-8 { padding: 2rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .space-y-4 > * + * { margin-top: 1rem; }
  .block { display: block; }
  .text-sm { font-size: 0.875rem; }
  .font-medium { font-weight: 500; }
  .mb-2 { margin-bottom: 0.5rem; }
  .border { border: 1px solid #e5e7eb; }
  .border-gray-200 { border-color: #e5e7eb; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
  .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
  .px-8 { padding-left: 2rem; padding-right: 2rem; }
  .focus\\:outline-none:focus { outline: none; }
  .focus\\:ring-2:focus { box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); }
  .focus\\:border-blue-500:focus { border-color: #3b82f6; }
  .text-red-600 { color: #dc2626; }
  .flex-1 { flex: 1; }
  .bg-gray-500 { background-color: #6b7280; }
  .bg-gray-400 { background-color: #9ca3af; }
  .mt-6 { margin-top: 1.5rem; }
  .gap-4 { gap: 1rem; }
  .gap-6 { gap: 1.5rem; }
  .disabled\\:opacity-50:disabled { opacity: 0.5; }
  .disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
  .w-16 { width: 4rem; }
  .h-16 { height: 4rem; }
  .w-12 { width: 3rem; }
  .h-12 { height: 3rem; }
  .w-6 { width: 1.5rem; }
  .h-6 { height: 1.5rem; }
  .space-x-4 > * + * { margin-left: 1rem; }
  .text-gray-500 { color: #6b7280; }
  .text-gray-600 { color: #4b5563; }
  .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
  .text-3xl { font-size: 1.875rem; }
  .text-green-500 { color: #10b981; }
  .opacity-80 { opacity: 0.8; }
  .bg-gray-900 { background-color: #111827; }
  .space-x-6 > * + * { margin-left: 1.5rem; }
  .text-gray-400 { color: #9ca3af; }
  .space-x-1 > * + * { margin-left: 0.25rem; }
  .min-h-screen { min-height: 100vh; }
  .grid { display: grid; }
  .gap-8 { gap: 2rem; }
  .overflow-hidden { overflow: hidden; }
  .p-0 { padding: 0; }
  .space-y-2 > * + * { margin-top: 0.5rem; }
  .text-xs { font-size: 0.75rem; }
  .bg-blue-50 { background-color: #eff6ff; }
  .text-blue-800 { color: #1e40af; }
  .bg-green-50 { background-color: #f0fdf4; }
  .text-green-800 { color: #166534; }
  .bg-red-50 { background-color: #fef2f2; }
  .text-red-800 { color: #991b1b; }
  .bg-orange-100 { background-color: #fed7aa; }
  .text-orange-800 { color: #9a3412; }
  .bg-purple-100 { background-color: #f3e8ff; }
  .text-purple-800 { color: #581c87; }
  .bg-gray-100 { background-color: #f3f4f6; }
  .text-gray-800 { color: #1f2937; }
  .w-4 { width: 1rem; }
  .h-4 { height: 1rem; }
  .ml-2 { margin-left: 0.5rem; }
  .mt-2 { margin-top: 0.5rem; }
  .font-mono { font-family: monospace; }
  .break-all { word-break: break-all; }
  .max-h-96 { max-height: 24rem; }
  .overflow-y-auto { overflow-y: auto; }
  .space-y-3 > * + * { margin-top: 0.75rem; }
  .border-l-4 { border-left-width: 4px; }
  .border-blue-400 { border-color: #60a5fa; }
  .border-green-400 { border-color: #4ade80; }
  .pl-4 { padding-left: 1rem; }
  .cursor-not-allowed { cursor: not-allowed; }
  
  /* NFT相关样式 */
  .aspect-square { aspect-ratio: 1 / 1; }
  .object-cover { object-fit: cover; }
  .hover\\:shadow-xl:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
  .transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
  .hover\\:scale-105:hover { --tw-scale-x: 1.05; --tw-scale-y: 1.05; }
  .transition-transform { transition: transform 0.3s; }
  .transition-all { transition: all 0.2s; }
  .transition-colors { transition: color 0.2s; }
  .duration-200 { transition-duration: 200ms; }
  .bg-purple-500 { background-color: #a855f7; }
  .bg-purple-600 { background-color: #9333ea; }
  .hover\\:bg-purple-600:hover { background-color: #9333ea; }
  .text-purple-600 { color: #9333ea; }
  .border-purple-500 { border-color: #a855f7; }
  .bg-indigo-500 { background-color: #6366f1; }
  .hover\\:bg-indigo-600:hover { background-color: #4f46e5; }
  .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
  .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }

  @media (min-width: 768px) {
    .md\\:flex { display: flex !important; }
    .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .md\\:text-3xl { font-size: 1.875rem; }
    .md\\:text-4xl { font-size: 2.25rem; }
    .sm\\:flex-row { flex-direction: row; }
    .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  .hover\\:text-orange-500:hover { color: #ea580c; }
  .hover\\:bg-orange-600:hover { background-color: #dc2626; }
  .hover\\:bg-gray-100:hover { background-color: #f3f4f6; }
  .hover\\:bg-white:hover { background-color: white; }
  .hover\\:text-blue-600:hover { color: #2563eb; }
  .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
  .hover\\:bg-blue-600:hover { background-color: #2563eb; }
  .hover\\:bg-gray-600:hover { background-color: #4b5563; }
  .hover\\:bg-green-600:hover { background-color: #059669; }
  .hover\\:shadow-xl { transition: box-shadow 0.3s; }
  .hover\\:text-gray-700:hover { color: #374151; }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = tempStyles;
  document.head.appendChild(styleElement);
}

// 配置
const CONFIG = {
  RPC_ENDPOINT: "https://juno-rpc.polkachu.com",
  CON_CONTRACT: "juno1yw8e26tyn9sclldw783y94qcwd3rd0stkzjfv2nddgreuk8232jspp0mjz",
  CHAIN_ID: "juno-1",
  GAS_PRICE: GasPrice.fromString("0.025ujuno"),
};

// 钱包工具对象 - 保持简单可靠的连接逻辑
const WalletUtils = {
  connectWallet: async () => {
    try {
      if (!window.leap) {
        throw new Error('请安装Leap钱包');
      }
      await window.leap.enable(CONFIG.CHAIN_ID);
      const signer = window.leap.getOfflineSigner(CONFIG.CHAIN_ID);
      const accounts = await signer.getAccounts();

      if (accounts.length > 0) {
        return {
          success: true,
          address: accounts[0].address,
          signer: signer
        };
      }
      throw new Error('未找到账户');
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  queryBalance: async (address) => {
    try {
      const client = await CosmWasmClient.connect(CONFIG.RPC_ENDPOINT);
      const balance = await client.queryContractSmart(CONFIG.CON_CONTRACT, {
        balance: { address }
      });
      return (parseInt(balance.balance) / 1000000).toFixed(3);
    } catch (error) {
      return "0";
    }
  },

  transferTokens: async (signer, fromAddress, toAddress, amount) => {
    try {
      const client = await SigningCosmWasmClient.connectWithSigner(
        CONFIG.RPC_ENDPOINT,
        signer,
        { gasPrice: CONFIG.GAS_PRICE }
      );

      const amountInMicroTokens = (parseFloat(amount) * 1000000).toString();

      const result = await client.execute(
        fromAddress,
        CONFIG.CON_CONTRACT,
        {
          transfer: {
            recipient: toAddress,
            amount: amountInMicroTokens
          }
        },
        "auto"
      );

      return {
        success: true,
        txHash: result.transactionHash,
        blockHeight: result.height
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  faucetClaim: async (userAddress) => {
    try {
      const response = await fetch('http://localhost:3001/api/faucet/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userAddress })
      });

      const result = await response.json();
      
      if (result.success) {
        return {
          success: true,
          txHash: result.txHash,
          amount: result.amount,
          message: result.message
        };
      } else {
        return {
          success: false,
          error: result.error
        };
      }
    } catch (error) {
      return {
        success: false,
        error: '无法连接到水龙头服务，请确保后端服务正在运行'
      };
    }
  }
};

// 通知组件
function Notification({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' :
                  type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg text-white max-w-sm ${bgColor}`}>
      {message}
    </div>
  );
}

// 转账模态框组件
function TransferModal({ isOpen, onClose, onTransfer, isLoading }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!recipient.startsWith('juno1') || recipient.length !== 43) {
      setError('请输入有效的Juno地址（juno1开头，43个字符）');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('请输入有效的转账金额');
      return;
    }

    if (parseFloat(amount) > 1000000) {
      setError('转账金额不能超过1,000,000 NIUBI');
      return;
    }

    onTransfer(recipient, amount);
  };

  const handleClose = () => {
    setRecipient('');
    setAmount('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">转账NIUBI代币</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              接收地址
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="juno1..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              转账数量
            </label>
            <input
              type="number"
              step="0.001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.000"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? '发送中...' : '确认转账'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// NFT铸造模态框组件
function CreateNFTModal({ isOpen, onClose, onMint, isLoading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('general');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('请输入NFT标题');
      return;
    }

    if (!description.trim()) {
      setError('请输入NFT描述');
      return;
    }

    if (!imageUrl.trim() || !imageUrl.startsWith('http')) {
      setError('请输入有效的图片URL');
      return;
    }

    onMint({
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      category
    });
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setCategory('general');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">铸造NFT</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NFT标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如：论语·学而"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              描述
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="描述这个NFT的内容和价值..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              图片URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              分类
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500"
              disabled={isLoading}
            >
              <option value="general">通用作品</option>
              <option value="confucian">儒家经典</option>
              <option value="philosophy">哲学思想</option>
              <option value="literature">文学作品</option>
              <option value="art">艺术创作</option>
            </select>
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? '铸造中...' : '铸造NFT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 数字货币基础配置
const CRYPTO_CONFIG = [
  { name: 'Confucian V2', symbol: 'NIUBI', coinGeckoId: 'custom', price: 0.0015, color: 'orange', strategy: '儒家复兴计划核心代币' },
  { name: 'Bitcoin', symbol: 'BTC', coinGeckoId: 'bitcoin', color: 'orange', strategy: '压舱石资产，长期持有' },
  { name: 'Ethereum', symbol: 'ETH', coinGeckoId: 'ethereum', color: 'blue', strategy: 'DeFi质押，Lido协议' },
  { name: 'Jupiter', symbol: 'JUP', coinGeckoId: 'jupiter-exchange-solana', color: 'purple', strategy: 'Solana生态DEX龙头' },
  { name: 'Axelar', symbol: 'AXL', coinGeckoId: 'axelar', color: 'green', strategy: '跨链基础设施' },
  { name: 'Cosmos', symbol: 'ATOM', coinGeckoId: 'cosmos', color: 'gray', strategy: '质押APR 18.5%' },
  { name: 'AtomOne', symbol: 'ATONE', coinGeckoId: 'atomone', color: 'indigo', strategy: '超流质押实验' }
];

// 价格API工具
const PriceAPI = {
  // 获取CoinGecko价格数据
  fetchCryptoPrice: async (coinGeckoId) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoId}&vs_currencies=usd&include_24hr_change=true`,
        { 
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        }
      );
      
      if (!response.ok) throw new Error('API请求失败');
      
      const data = await response.json();
      const coinData = data[coinGeckoId];
      
      if (!coinData) throw new Error('未找到价格数据');
      
      return {
        price: coinData.usd,
        change24h: coinData.usd_24h_change,
        trend: coinData.usd_24h_change >= 0 ? 'up' : 'down'
      };
    } catch (error) {
      console.warn(`获取${coinGeckoId}价格失败:`, error);
      return null;
    }
  },

  // 获取多个货币价格
  fetchMultiplePrices: async (cryptoList) => {
    const results = [];
    
    for (const crypto of cryptoList) {
      if (crypto.coinGeckoId === 'custom') {
        // NIUBI使用固定价格
        results.push({
          ...crypto,
          price: 0.0015,
          change: '+25.8%',
          trend: 'up'
        });
      } else {
        const priceData = await PriceAPI.fetchCryptoPrice(crypto.coinGeckoId);
        if (priceData) {
          results.push({
            ...crypto,
            price: priceData.price,
            change: `${priceData.change24h >= 0 ? '+' : ''}${priceData.change24h.toFixed(2)}%`,
            trend: priceData.trend
          });
        } else {
          // 备用数据
          results.push({
            ...crypto,
            price: 0,
            change: 'N/A',
            trend: 'neutral'
          });
        }
      }
    }
    
    return results;
  }
};

// 新闻API工具
const NewsAPI = {
  // 获取加密货币新闻 - 使用免费RSS源和CryptoCompare API
  fetchCryptoNews: async (symbol) => {
    try {
      // 尝试多个免费新闻源
      let newsData = [];

      // 方法1: CryptoCompare新闻API (免费)
      try {
        const ccResponse = await fetch(
          `https://min-api.cryptocompare.com/data/v2/news/?categories=BTC,ETH,Trading&excludeCategories=Sponsored`
        );
        
        if (ccResponse.ok) {
          const ccData = await ccResponse.json();
          if (ccData.Data) {
            newsData = ccData.Data.slice(0, 5).map(article => ({
              title: article.title,
              time: new Date(article.published_on * 1000).toLocaleString('zh-CN'),
              source: article.source_info?.name || article.source || '加密新闻',
              url: article.url || article.guid || '#'
            }));
          }
        }
      } catch (e) {
        console.warn('CryptoCompare API失败:', e);
      }

      // 方法2: 如果上述失败，使用CoinTelegraph RSS (通过代理)
      if (newsData.length === 0) {
        try {
          // 使用allorigins代理服务获取RSS
          const rssResponse = await fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent('https://cointelegraph.com/rss')}`
          );
          
          if (rssResponse.ok) {
            const rssData = await rssResponse.json();
            // 简单解析RSS内容
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(rssData.contents, 'text/xml');
            const items = xmlDoc.getElementsByTagName('item');
            
            newsData = Array.from(items).slice(0, 5).map(item => ({
              title: item.getElementsByTagName('title')[0]?.textContent || '无标题',
              time: new Date(item.getElementsByTagName('pubDate')[0]?.textContent).toLocaleString('zh-CN'),
              source: 'Cointelegraph',
              url: item.getElementsByTagName('link')[0]?.textContent || '#'
            }));
          }
        } catch (e) {
          console.warn('RSS获取失败:', e);
        }
      }

      // 如果都失败，返回模拟数据
      return newsData.length > 0 ? newsData : NewsAPI.getMockNews(symbol);

    } catch (error) {
      console.warn(`获取${symbol}新闻失败:`, error);
      return NewsAPI.getMockNews(symbol);
    }
  },

  // 备用模拟新闻数据
  getMockNews: (symbol) => [
    { title: `${symbol}价格分析：技术指标显示强势信号`, time: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString('zh-CN'), source: 'CoinDesk', url: 'https://www.coindesk.com' },
    { title: `${symbol}生态系统发展报告：用户活跃度创新高`, time: new Date(Date.now() - 4 * 60 * 60 * 1000).toLocaleString('zh-CN'), source: 'Cointelegraph', url: 'https://cointelegraph.com' },
    { title: `机构投资者关注${symbol}，市场流动性增强`, time: new Date(Date.now() - 6 * 60 * 60 * 1000).toLocaleString('zh-CN'), source: 'CryptoSlate', url: 'https://cryptoslate.com' },
    { title: `${symbol}网络升级完成，性能大幅提升`, time: new Date(Date.now() - 8 * 60 * 60 * 1000).toLocaleString('zh-CN'), source: 'The Block', url: 'https://www.theblock.co' },
    { title: `${symbol}社区治理提案获得广泛支持`, time: new Date(Date.now() - 12 * 60 * 60 * 1000).toLocaleString('zh-CN'), source: 'Decrypt', url: 'https://decrypt.co' }
  ]
};

// 编辑部管理工具
const EditorialUtils = {
  // 获取已批准的编辑部成员
  getApprovedMembers: () => {
    try {
      const approved = localStorage.getItem('editorial_approved_members');
      return approved ? JSON.parse(approved) : [];
    } catch {
      return [];
    }
  },

  // 获取待审批申请
  getPendingApplications: () => {
    try {
      const pending = localStorage.getItem('editorial_pending_applications');
      return pending ? JSON.parse(pending) : [];
    } catch {
      return [];
    }
  },

  // 提交申请
  submitApplication: (applicationData) => {
    try {
      const applications = EditorialUtils.getPendingApplications();
      const newApplication = {
        id: Date.now().toString(),
        ...applicationData,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };
      applications.push(newApplication);
      localStorage.setItem('editorial_pending_applications', JSON.stringify(applications));
      return { success: true, message: '申请已提交，等待管理员审核' };
    } catch {
      return { success: false, message: '申请提交失败' };
    }
  },

  // 批准申请（管理员功能）
  approveApplication: (applicationId) => {
    try {
      const applications = EditorialUtils.getPendingApplications();
      const approvedMembers = EditorialUtils.getApprovedMembers();
      
      const applicationIndex = applications.findIndex(app => app.id === applicationId);
      if (applicationIndex === -1) return { success: false, message: '申请不存在' };
      
      const application = applications[applicationIndex];
      approvedMembers.push(application.walletAddress);
      applications.splice(applicationIndex, 1);
      
      localStorage.setItem('editorial_approved_members', JSON.stringify(approvedMembers));
      localStorage.setItem('editorial_pending_applications', JSON.stringify(applications));
      
      return { success: true, message: '申请已批准' };
    } catch {
      return { success: false, message: '批准失败' };
    }
  }
};

// 全局函数，供外部调用
function getApprovedEditorialMembers() {
  return EditorialUtils.getApprovedMembers();
}

// 编辑部申请模态框组件
function EditorialApplicationModal({ isOpen, onClose, walletAddress, isConnected }) {
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    experience: '',
    expertise: '',
    motivation: '',
    walletAddress: walletAddress || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (walletAddress) {
      setFormData(prev => ({ ...prev, walletAddress }));
    }
  }, [walletAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isConnected || !walletAddress) {
      setError('请先连接钱包');
      return;
    }

    if (!formData.name.trim()) {
      setError('请填写姓名');
      return;
    }

    if (!formData.education.trim()) {
      setError('请填写学历背景');
      return;
    }

    if (!formData.experience.trim()) {
      setError('请填写相关经验');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = EditorialUtils.submitApplication(formData);
      
      if (result.success) {
        alert('申请已成功提交！管理员会在24-48小时内审核您的申请。');
        onClose();
        setFormData({
          name: '',
          education: '',
          experience: '',
          expertise: '',
          motivation: '',
          walletAddress: walletAddress || ''
        });
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('提交申请时发生错误');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      education: '',
      experience: '',
      expertise: '',
      motivation: '',
      walletAddress: walletAddress || ''
    });
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <ScrollText className="mr-3 text-orange-500" size={24} />
            申请加入儒家经典编辑部
          </h3>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              姓名 *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="请输入您的姓名"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-orange-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              学历背景 *
            </label>
            <input
              type="text"
              value={formData.education}
              onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
              placeholder="如：清华大学哲学系博士、北京大学中文系硕士等"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-orange-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              相关经验 *
            </label>
            <textarea
              value={formData.experience}
              onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              placeholder="请描述您在儒家经典研究、教学或出版方面的经验..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-orange-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              专业领域
            </label>
            <input
              type="text"
              value={formData.expertise}
              onChange={(e) => setFormData(prev => ({ ...prev, expertise: e.target.value }))}
              placeholder="如：《论语》研究、宋明理学、现代儒学等"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-orange-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              申请动机
            </label>
            <textarea
              value={formData.motivation}
              onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
              placeholder="请简述您希望加入编辑部的原因和目标..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-orange-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              钱包地址（自动获取）
            </label>
            <input
              type="text"
              value={formData.walletAddress}
              readOnly
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
            />
            <p className="text-xs text-gray-500 mt-1">
              此地址将用于编辑部权限验证，请确保连接的是您的主钱包
            </p>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || !isConnected}
            >
              {isSubmitting ? '提交中...' : '提交申请'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// K线图模态框组件

// 儒家经典内容数据
const CONFUCIAN_CLASSICS = {
  '论语': {
    chapters: ['学而', '为政', '八佾', '里仁', '公冶长'],
    content: {
      '学而': {
        original: '子曰："学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？"',
        vernacular: '孔子说："学了又时常温习和练习，不是很愉快吗？有志同道合的人从远方来，不是很令人高兴的吗？人家不了解我，我也不怨恨、恼怒，不也是一个有德的君子吗？"',
        annotation: '这是《论语》的开篇第一章，体现了孔子对学习、友谊和品格的基本观点。"学而时习之"强调了持续学习的重要性；"有朋自远方来"体现了儒家重视友谊和文化交流；"人不知而不愠"则展现了君子应有的修养和胸怀。'
      },
      '为政': {
        original: '子曰："为政以德，譬如北辰，居其所而众星共之。"',
        vernacular: '孔子说："用道德来治理国政，就像北极星一样，安居在自己的位置上，而群星都会围绕着它转动。"',
        annotation: '这里孔子提出了"德治"的政治理念，认为统治者应该以道德感化民众，而不是靠严刑峻法。北辰（北极星）的比喻形象地说明了道德领导力的重要性。'
      }
    }
  },
  '大学': {
    chapters: ['经一章', '传一章', '传二章', '传三章'],
    content: {
      '经一章': {
        original: '大学之道，在明明德，在亲民，在止于至善。',
        vernacular: '大学的宗旨在于弘扬光明正大的品德，在于使人弃旧图新，在于使人达到最完善的境界。',
        annotation: '这是《大学》的核心思想，提出了"三纲"：明明德（彰显美德）、亲民（革新民众）、止于至善（达到完美境界）。这为个人修养和社会治理提供了根本指导原则。'
      }
    }
  }
};

// K线图模态框组件
function KLineModal({ isOpen, onClose, crypto }) {
  const [timeframe, setTimeframe] = useState('1D');
  const [cryptoNews, setCryptoNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);

  // 模拟K线图数据
  const generateKLineData = (tf) => {
    const data = [];
    const basePrice = crypto?.price || 100;
    for (let i = 30; i >= 0; i--) {
      const variation = (Math.random() - 0.5) * 0.1;
      const price = basePrice * (1 + variation);
      data.push({
        time: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
        open: price * 0.98,
        high: price * 1.02,
        low: price * 0.96,
        close: price
      });
    }
    return data;
  };

  // 获取真实新闻数据
  const fetchCryptoNews = async (symbol) => {
    setIsLoadingNews(true);
    
    try {
      const news = await NewsAPI.fetchCryptoNews(symbol);
      setCryptoNews(news);
    } catch (error) {
      console.error('获取新闻失败:', error);
      setCryptoNews(NewsAPI.getMockNews(symbol));
    } finally {
      setIsLoadingNews(false);
    }
  };

  useEffect(() => {
    if (isOpen && crypto) {
      fetchCryptoNews(crypto.symbol);
    }
  }, [isOpen, crypto]);

  if (!isOpen || !crypto) return null;

  const klineData = generateKLineData(timeframe);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-6xl w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="mr-3" size={24} />
            {crypto.name} ({crypto.symbol})
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* K线图区域 */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold">价格走势图</h4>
                <div className="flex space-x-2">
                  {['1D', '1W', '1M', '3M'].map(tf => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        timeframe === tf 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {tf === '1D' ? '日线' : tf === '1W' ? '周线' : tf === '1M' ? '月线' : '季度线'}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 价格信息 */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl font-bold text-gray-900">
                  ${crypto.price.toLocaleString()}
                </div>
                <div className={`text-lg font-medium ${
                  crypto.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {crypto.change}
                </div>
              </div>

              {/* 简化的K线图表示 */}
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-center text-gray-500 py-8">
                  📈 K线图占位符
                  <br />
                  <span className="text-sm">
                    显示 {timeframe === '1D' ? '日线' : timeframe === '1W' ? '周线' : timeframe === '1M' ? '月线' : '季度线'} 数据
                  </span>
                  <div className="mt-4 space-y-2">
                    {klineData.slice(-5).map((candle, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <span>{candle.time}</span>
                        <span className="text-green-500">${candle.close.toFixed(4)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 新闻区域 */}
          <div>
            <h4 className="text-lg font-bold mb-4">{crypto.symbol} 相关新闻</h4>
            <div className="space-y-3">
              {isLoadingNews ? (
                <div className="text-center py-8 text-gray-500">
                  正在获取新闻...
                </div>
              ) : (
                cryptoNews.map((news, idx) => (
                  <div 
                    key={idx} 
                    className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => news.url !== '#' && window.open(news.url, '_blank')}
                  >
                    <h5 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                      {news.title}
                    </h5>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{news.source}</span>
                      <div className="flex items-center space-x-2">
                        <span>{news.time}</span>
                        {news.url !== '#' && <ExternalLink size={12} />}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <button 
              onClick={() => fetchCryptoNews(crypto.symbol)}
              className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              刷新新闻
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 数字货币组合组件
function CryptoPortfolio({ walletAddress, onAddFunds }) {
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [showKLineModal, setShowKLineModal] = useState(false);
  const [cryptoData, setCryptoData] = useState(CRYPTO_CONFIG);
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);

  // 获取实时价格数据
  const fetchPrices = async () => {
    setIsLoadingPrices(true);
    try {
      const updatedData = await PriceAPI.fetchMultiplePrices(CRYPTO_CONFIG);
      setCryptoData(updatedData);
    } catch (error) {
      console.error('获取价格失败:', error);
      setCryptoData(CRYPTO_CONFIG);
    } finally {
      setIsLoadingPrices(false);
    }
  };

  // 组件挂载时获取价格
  useEffect(() => {
    fetchPrices();
    // 每30秒更新一次价格
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <TrendingUp className="mr-3 text-green-500" size={24} />
          数字货币新趋势
        </h3>
        <div className="text-right">
          <div className="text-sm text-gray-500">实时价格</div>
          <button 
            onClick={fetchPrices}
            className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
            disabled={isLoadingPrices}
          >
            {isLoadingPrices ? '更新中...' : '🔄 刷新价格'}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {isLoadingPrices ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            正在获取最新价格数据...
          </div>
        ) : (
          cryptoData.map((coin, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
                 onClick={() => {
                   setSelectedCrypto(coin);
                   setShowKLineModal(true);
                 }}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-gray-900">{coin.symbol}</div>
                  <div className="text-sm text-gray-500">{coin.name}</div>
                </div>
                <div className={`text-sm font-medium ${
                  coin.trend === 'up' ? 'text-green-500' : 
                  coin.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {coin.change || 'N/A'}
                </div>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {coin.price === 0 ? '获取中...' : `$${coin.price.toLocaleString()}`}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                点击查看K线图和相关新闻
              </div>
            </div>
          ))
        )}
      </div>

      {/* K线图模态框 */}
      <KLineModal
        isOpen={showKLineModal}
        onClose={() => setShowKLineModal(false)}
        crypto={selectedCrypto}
      />

    </div>
  );
}

// 儒家经典模态框组件
function ConfucianClassicsModal({ isOpen, onClose, onCreateNFT, isConnected, walletAddress }) {
  const [selectedBook, setSelectedBook] = useState('论语');
  const [selectedChapter, setSelectedChapter] = useState('学而');
  const [currentView, setCurrentView] = useState('original');
  const [highlightedText, setHighlightedText] = useState('');
  
  // 儒家经典编辑部成员地址列表
  const EDITORIAL_MEMBERS = [
    'juno1yw8e26tyn9sclldw783y94qcwd3rd0stkzjfv2nddgreuk8232jspp0mjz', // 示例地址
    'juno1demo123456789abcdef123456789abcdef123456789', // 示例地址
    // 可以从localStorage读取已批准的编辑部成员
    ...getApprovedEditorialMembers()
  ];
  
  // 检查是否为编辑部成员
  const isEditorialMember = walletAddress && EDITORIAL_MEMBERS.some(addr => 
    walletAddress.toLowerCase() === addr.toLowerCase()
  );

  if (!isOpen) return null;

  const currentContent = CONFUCIAN_CLASSICS[selectedBook]?.content[selectedChapter];

  const handleTextClick = (text, view) => {
    setHighlightedText(text);
    if (view !== currentView) {
      setCurrentView(view);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-6xl w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <BookOpen className="mr-3" size={24} />
            儒家经典
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 左侧导航 */}
          <div className="space-y-4">
            <div>
              <h4 className="font-bold mb-2">经典选择</h4>
              <div className="space-y-2">
                {Object.keys(CONFUCIAN_CLASSICS).map(book => (
                  <button
                    key={book}
                    onClick={() => {
                      setSelectedBook(book);
                      setSelectedChapter(CONFUCIAN_CLASSICS[book].chapters[0]);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedBook === book 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {book}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">章节</h4>
              <div className="space-y-1">
                {CONFUCIAN_CLASSICS[selectedBook]?.chapters.map(chapter => (
                  <button
                    key={chapter}
                    onClick={() => setSelectedChapter(chapter)}
                    className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                      selectedChapter === chapter 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {chapter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧内容 */}
          <div className="md:col-span-3">
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setCurrentView('original')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'original' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                经典原文
              </button>
              <button
                onClick={() => setCurrentView('vernacular')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'vernacular' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                白话文
              </button>
              <button
                onClick={() => setCurrentView('annotation')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'annotation' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                注释
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 min-h-64">
              <h4 className="font-bold text-lg mb-4">
                {selectedBook} · {selectedChapter}
              </h4>
              
              {currentView === 'original' && (
                <div 
                  className="text-lg leading-relaxed text-gray-800 cursor-pointer"
                  onClick={() => handleTextClick(currentContent?.original, 'vernacular')}
                >
                  {currentContent?.original}
                  <div className="text-xs text-gray-500 mt-2">
                    点击文本查看白话文
                  </div>
                </div>
              )}
              
              {currentView === 'vernacular' && (
                <div 
                  className="text-lg leading-relaxed text-blue-800 cursor-pointer"
                  onClick={() => handleTextClick(currentContent?.vernacular, 'annotation')}
                >
                  {currentContent?.vernacular}
                  <div className="text-xs text-gray-500 mt-2">
                    点击文本查看注释
                  </div>
                </div>
              )}
              
              {currentView === 'annotation' && (
                <div 
                  className="text-base leading-relaxed text-green-800 cursor-pointer"
                  onClick={() => handleTextClick(currentContent?.annotation, 'original')}
                >
                  {currentContent?.annotation}
                  <div className="text-xs text-gray-500 mt-2">
                    点击文本返回原文
                  </div>
                </div>
              )}
              
              {/* NFT创作入口 - 仅限特殊会员 */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-orange-50 rounded-lg border-2 border-dashed border-purple-300">
                <div className="flex items-center mb-2">
                  <ScrollText className="mr-2 text-orange-500" size={20} />
                  <h5 className="font-bold text-purple-800">💎 将经典铸造为NFT</h5>
                  {isEditorialMember && (
                    <span className="ml-auto bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                      编辑部成员
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  基于当前选中的经典内容创作NFT，让儒家智慧在区块链上永恒传承
                  {!isEditorialMember && (
                    <span className="block text-orange-600 font-medium mt-1">
                      ⚠️ 此功能仅限儒家经典编辑部成员使用
                    </span>
                  )}
                </p>
                
                {!isConnected ? (
                  <div className="text-center py-3 text-gray-500">
                    请先连接钱包
                  </div>
                ) : !isEditorialMember ? (
                  <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 text-center">
                    <ScrollText className="mx-auto mb-2 text-orange-500" size={24} />
                    <p className="text-sm text-orange-800 font-medium">
                      此功能仅限儒家经典编辑部成员使用
                    </p>
                    <p className="text-xs text-orange-600 mt-1">
                      申请要求：持有500万+NIUBI且通过资历审核
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        // 触发申请窗口打开事件
                        window.dispatchEvent(new CustomEvent('openEditorialApplication'));
                      }}
                      className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
                    >
                      申请加入编辑部
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      const nftData = {
                        title: `${selectedBook}·${selectedChapter}`,
                        description: currentContent?.[currentView] || `${selectedBook}的${selectedChapter}章节`,
                        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
                        category: 'confucian'
                      };
                      
                      onCreateNFT(nftData);
                      onClose();
                    }}
                    className="w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 bg-purple-500 text-white hover:bg-purple-600"
                  >
                    <Palette size={18} />
                    <span>创作经典NFT</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// DAO架构组件 - 根据白皮书v2.0设计
function DAOModal({ isOpen, onClose }) {
  const [currentView, setCurrentView] = useState('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-7xl w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <Building className="mr-3" size={24} />
            儒家复兴DAO治理架构
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="flex space-x-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setCurrentView('overview')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              currentView === 'overview' 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            治理架构
          </button>
          <button
            onClick={() => setCurrentView('senate')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              currentView === 'senate' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            元老院
          </button>
          <button
            onClick={() => setCurrentView('groups')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              currentView === 'groups' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            八个小组
          </button>
          <button
            onClick={() => setCurrentView('governance')}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              currentView === 'governance' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            治理规则
          </button>
        </div>

        {currentView === 'overview' && (
          <div className="space-y-6">
            <h4 className="text-xl font-bold mb-4">儒家复兴DAO治理结构总览</h4>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-amber-800 text-sm">
                <strong>参与资格：</strong>持有500万+NIUBI的成员可参与管理，分为一个元老院和八个专业小组。
                首十年由管理账户指定，第十一年开始按选票制运转。
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-6">
                {/* 顶层：元老院 */}
                <div className="bg-purple-500 text-white p-4 rounded-lg text-center">
                  <div className="font-bold text-lg">🏛️ 元老院 (Senate)</div>
                  <div className="text-sm opacity-90 mt-1">维护DAO白皮书宪法原则，60%多数否决违宪决定</div>
                </div>

                {/* 八个小组 - 2行4列布局 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-red-500 text-white p-3 rounded-lg text-center">
                    <div className="font-bold text-sm">📝 考试小组</div>
                    <div className="text-xs opacity-90">科举评分</div>
                  </div>
                  <div className="bg-blue-500 text-white p-3 rounded-lg text-center">
                    <div className="font-bold text-sm">📊 统计小组</div>
                    <div className="text-xs opacity-90">数据分析</div>
                  </div>
                  <div className="bg-green-500 text-white p-3 rounded-lg text-center">
                    <div className="font-bold text-sm">💰 收入分析小组</div>
                    <div className="text-xs opacity-90">收入来源</div>
                  </div>
                  <div className="bg-orange-500 text-white p-3 rounded-lg text-center">
                    <div className="font-bold text-sm">🛠️ 管理小组</div>
                    <div className="text-xs opacity-90">项目管理</div>
                  </div>
                  <div className="bg-cyan-500 text-white p-3 rounded-lg text-center">
                    <div className="font-bold text-sm">📋 规则整理小组</div>
                    <div className="text-xs opacity-90">规则发现</div>
                  </div>
                  <div className="bg-indigo-500 text-white p-3 rounded-lg text-center">
                    <div className="font-bold text-sm">⚖️ 仲裁小组</div>
                    <div className="text-xs opacity-90">争议处理</div>
                  </div>
                  <div className="bg-pink-500 text-white p-3 rounded-lg text-center">
                    <div className="font-bold text-sm">📚 儒家经典编辑部</div>
                    <div className="text-xs opacity-90">经典NFT创作</div>
                  </div>
                  <div className="bg-gray-500 text-white p-3 rounded-lg text-center">
                    <div className="font-bold text-sm">🔧 技术开发小组</div>
                    <div className="text-xs opacity-90">技术维护</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'senate' && (
          <div className="space-y-6">
            <h4 className="text-xl font-bold mb-4">🏛️ 元老院 (Senate)</h4>
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                  <h5 className="font-bold text-purple-800 mb-2">组成与任期</h5>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• 初期：由管理账户持有者决定成员</li>
                    <li>• 后期：管理账户持有者 + 各小组届满负责人中同意加入的人</li>
                    <li>• 任期：十年</li>
                    <li>• 管理账户持有者参与权：二十年</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                  <h5 className="font-bold text-purple-800 mb-2">核心职责</h5>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• 维护DAO白皮书的宪法原则</li>
                    <li>• 以60%多数否决违反宪法的其他小组决定和立法</li>
                    <li>• 负责人按NIUBI持有权投票推选</li>
                    <li>• 严格控制各小组的收入和支出</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'groups' && (
          <div className="space-y-6">
            <h4 className="text-xl font-bold mb-4">八个专业小组详解</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h5 className="font-bold text-red-800 mb-2">📝 考试小组</h5>
                <p className="text-red-700 text-sm mb-2">
                  每年对学者的八门科目文章评分，选出万分之一给予奖励
                </p>
                <div className="text-xs text-red-600">
                  前三名可进入七个委员会中的一个
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h5 className="font-bold text-blue-800 mb-2">📊 统计小组</h5>
                <p className="text-blue-700 text-sm mb-2">
                  统计生态和世界数据，评价各小组开支预算
                </p>
                <div className="text-xs text-blue-600">
                  开支超收入的小组负责人自动解职
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h5 className="font-bold text-green-800 mb-2">💰 收入分析小组</h5>
                <p className="text-green-700 text-sm mb-2">
                  制订DAO管理机构收入来源分析方案
                </p>
                <div className="text-xs text-green-600">
                  90%同意增加收入，50%同意减少收入
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h5 className="font-bold text-orange-800 mb-2">🛠️ 管理小组</h5>
                <p className="text-orange-700 text-sm mb-2">
                  管理生态项目登记，清除犯罪行为
                </p>
                <div className="text-xs text-orange-600">
                  除内部程序外不能制定任何法规
                </div>
              </div>

              <div className="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
                <h5 className="font-bold text-cyan-800 mb-2">📋 规则整理小组</h5>
                <p className="text-cyan-700 text-sm mb-2">
                  整理生态纠纷处理案例为规则
                </p>
                <div className="text-xs text-cyan-600">
                  90%成员批准通过，规则不超过10万字
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                <h5 className="font-bold text-indigo-800 mb-2">⚖️ 仲裁小组</h5>
                <p className="text-indigo-700 text-sm mb-2">
                  处理NIUBI系统内交易纠纷
                </p>
                <div className="text-xs text-indigo-600">
                  一位仲裁员处理，一裁终局
                </div>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                <h5 className="font-bold text-pink-800 mb-2">📚 儒家经典编辑部</h5>
                <p className="text-pink-700 text-sm mb-2">
                  负责经典内容审核和NFT创作权限
                </p>
                <div className="text-xs text-pink-600">
                  持有500万+NIUBI且通过申请审核
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-500">
                <h5 className="font-bold text-gray-800 mb-2">🔧 技术开发小组</h5>
                <p className="text-gray-700 text-sm mb-2">
                  负责平台技术开发和维护
                </p>
                <div className="text-xs text-gray-600">
                  确保系统稳定和功能迭代
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'governance' && (
          <div className="space-y-6">
            <h4 className="text-xl font-bold mb-4">治理规则与流程</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-bold text-blue-800 mb-3">参与资格</h5>
                <ul className="text-blue-700 text-sm space-y-2">
                  <li>• <strong>基础参与：</strong>持有500万+NIUBI</li>
                  <li>• <strong>治理投票：</strong>30万+NIUBI账户可投票</li>
                  <li>• <strong>小组管理：</strong>任期十年</li>
                  <li>• <strong>元老院：</strong>小组负责人届满后可申请</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-bold text-green-800 mb-3">投票机制</h5>
                <ul className="text-green-700 text-sm space-y-2">
                  <li>• <strong>简单多数：</strong>51%通过日常决策</li>
                  <li>• <strong>绝对多数：</strong>60%通过重要决策</li>
                  <li>• <strong>特别多数：</strong>90%通过宪法级决策</li>
                  <li>• <strong>元老院否决：</strong>60%可否决违宪决定</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h5 className="font-bold text-yellow-800 mb-3">权限分配</h5>
                <ul className="text-yellow-700 text-sm space-y-2">
                  <li>• <strong>元老院：</strong>宪法监督，否决权</li>
                  <li>• <strong>各小组：</strong>专业领域自治权</li>
                  <li>• <strong>负责人：</strong>收支控制权</li>
                  <li>• <strong>统计小组：</strong>绩效评估权</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-bold text-purple-800 mb-3">制衡机制</h5>
                <ul className="text-purple-700 text-sm space-y-2">
                  <li>• <strong>收支监督：</strong>统计小组评估预算</li>
                  <li>• <strong>任期限制：</strong>十年任期制</li>
                  <li>• <strong>民主选举：</strong>按NIUBI权重投票</li>
                  <li>• <strong>透明治理：</strong>决策过程公开</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// NFT卡片组件
function NFTCard({ nft, onView }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-transform hover:scale-105 transform overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img 
          src={nft.imageUrl} 
          alt={nft.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f3f4f6'/%3E%3Ctext x='150' y='150' font-family='Arial' font-size='16' fill='%23666' text-anchor='middle' dominant-baseline='middle'%3E图片加载失败%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-900">{nft.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{nft.description}</p>
        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 text-xs rounded-full ${
            nft.category === 'confucian' ? 'bg-orange-100 text-orange-800' :
            nft.category === 'philosophy' ? 'bg-blue-100 text-blue-800' :
            nft.category === 'literature' ? 'bg-green-100 text-green-800' :
            nft.category === 'art' ? 'bg-purple-100 text-purple-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {nft.category === 'confucian' ? '儒家经典' :
             nft.category === 'philosophy' ? '哲学思想' :
             nft.category === 'literature' ? '文学作品' :
             nft.category === 'art' ? '艺术创作' : '通用作品'}
          </span>
          <button
            onClick={() => onView(nft)}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors"
          >
            查看
          </button>
        </div>
      </div>
    </div>
  );
}

// 主应用组件
function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletSigner, setWalletSigner] = useState(null);
  const [balance, setBalance] = useState('0');
  const [notification, setNotification] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transactions, setTransactions] = useState([]);
  
  // 水龙头相关状态
  const [faucetCooldown, setFaucetCooldown] = useState(0);
  const [isClaimingFaucet, setIsClaimingFaucet] = useState(false);
  
  // NFT相关状态
  const [showCreateNFTModal, setShowCreateNFTModal] = useState(false);
  const [isMintingNFT, setIsMintingNFT] = useState(false);
  
  // 新增状态
  const [showClassicsModal, setShowClassicsModal] = useState(false);
  const [showDAOModal, setShowDAOModal] = useState(false);
  const [showEditorialApplicationModal, setShowEditorialApplicationModal] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [nfts, setNfts] = useState([
    {
      id: '1',
      title: '论语·学而',
      description: '子曰："学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？"',
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
      category: 'confucian',
      creator: 'juno1demo...',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: '大学·修身',
      description: '古之欲明明德于天下者，先治其国；欲治其国者，先齐其家；欲齐其家者，先修其身。',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      category: 'confucian',
      creator: 'juno1demo...',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      title: '哲思·自由意志',
      description: '探讨人类自由意志与道德责任的关系，以及个人选择在塑造命运中的作用。',
      imageUrl: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=400&fit=crop',
      category: 'philosophy',
      creator: 'juno1demo...',
      createdAt: new Date().toISOString()
    }
  ]);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  // 监听编辑部申请事件
  useEffect(() => {
    const handleOpenApplication = () => {
      setShowEditorialApplicationModal(true);
    };

    window.addEventListener('openEditorialApplication', handleOpenApplication);
    return () => {
      window.removeEventListener('openEditorialApplication', handleOpenApplication);
    };
  }, []);

  // 检查水龙头冷却时间
  const checkFaucetCooldown = (address) => {
    const lastClaim = localStorage.getItem(`faucet_${address}`);
    if (lastClaim) {
      const now = Date.now();
      const cooldownTime = 24 * 60 * 60 * 1000; // 24小时
      const remaining = cooldownTime - (now - parseInt(lastClaim));
      if (remaining > 0) {
        setFaucetCooldown(Math.ceil(remaining / 1000 / 60 / 60)); // 剩余小时
        return false;
      }
    }
    setFaucetCooldown(0);
    return true;
  };

  // 钱包连接处理
  const handleConnect = async () => {
    if (isConnected) {
      setIsConnected(false);
      setWalletAddress('');
      setWalletSigner(null);
      setBalance('0');
      setTransactions([]);
      showNotification('钱包已断开', 'info');
    } else {
      const result = await WalletUtils.connectWallet();
      if (result.success) {
        setIsConnected(true);
        setWalletAddress(result.address);
        setWalletSigner(result.signer);
        showNotification('钱包连接成功！', 'success');

        // 查询余额
        const bal = await WalletUtils.queryBalance(result.address);
        setBalance(bal);

        // 检查水龙头冷却时间
        checkFaucetCooldown(result.address);

      } else {
        showNotification('连接失败: ' + result.error, 'error');
      }
    }
  };

  // 水龙头领取处理
  const handleFaucetClaim = async () => {
    if (!walletAddress) {
      showNotification('请先连接钱包', 'error');
      return;
    }

    setIsClaimingFaucet(true);

    try {
      const result = await WalletUtils.faucetClaim(walletAddress);

      if (result.success) {
        showNotification(result.message || `成功领取${result.amount}个NIUBI代币！`, 'success');

        // 记录领取时间到本地存储
        localStorage.setItem(`faucet_${walletAddress}`, Date.now().toString());

        // 添加到交易历史
        const newTransaction = {
          type: 'receive',
          address: '儒家复兴计划水龙头',
          amount: result.amount,
          txHash: result.txHash,
          timestamp: new Date().toISOString()
        };
        setTransactions(prev => [newTransaction, ...prev]);

        // 更新余额
        const newBalance = await WalletUtils.queryBalance(walletAddress);
        setBalance(newBalance);

        // 更新冷却时间
        checkFaucetCooldown(walletAddress);
      } else {
        showNotification('领取失败: ' + result.error, 'error');
      }
    } catch (error) {
      showNotification('领取失败: ' + error.message, 'error');
    } finally {
      setIsClaimingFaucet(false);
    }
  };

  // 转账处理
  const handleTransfer = async (toAddress, amount) => {
    if (!walletSigner || !walletAddress) {
      showNotification('请先连接钱包', 'error');
      return;
    }

    setIsTransferring(true);

    try {
      const result = await WalletUtils.transferTokens(
        walletSigner,
        walletAddress,
        toAddress,
        amount
      );

      if (result.success) {
        showNotification(`转账成功！交易哈希: ${result.txHash.slice(0, 10)}...`, 'success');

        // 添加到交易历史
        const newTransaction = {
          type: 'send',
          address: toAddress,
          amount: amount,
          txHash: result.txHash,
          timestamp: new Date().toISOString()
        };
        setTransactions(prev => [newTransaction, ...prev]);

        // 更新余额
        const newBalance = await WalletUtils.queryBalance(walletAddress);
        setBalance(newBalance);

        // 关闭模态框
        setShowTransferModal(false);
      } else {
        showNotification('转账失败: ' + result.error, 'error');
      }
    } catch (error) {
      showNotification('转账失败: ' + error.message, 'error');
    } finally {
      setIsTransferring(false);
    }
  };

  // NFT铸造处理
  const handleMintNFT = async (nftData) => {
    if (!walletAddress) {
      showNotification('请先连接钱包', 'error');
      return;
    }

    setIsMintingNFT(true);

    try {
      // 模拟NFT铸造过程
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newNFT = {
        id: Date.now().toString(),
        ...nftData,
        creator: walletAddress,
        createdAt: new Date().toISOString()
      };

      setNfts(prev => [newNFT, ...prev]);
      
      showNotification(`NFT "${nftData.title}" 铸造成功！`, 'success');
      setShowCreateNFTModal(false);

    } catch (error) {
      showNotification('NFT铸造失败: ' + error.message, 'error');
    } finally {
      setIsMintingNFT(false);
    }
  };

  // NFT查看处理
  const handleViewNFT = (nft) => {
    showNotification(`正在查看NFT: ${nft.title}`, 'info');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full mr-3"></div>
              <span className="text-xl font-bold text-gray-900">儒家区块链</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#home" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                  setCurrentSection('home');
                }}
                className="text-gray-700 hover:text-orange-500 transition-colors cursor-pointer"
              >
                首页
              </a>
              <a 
                href="#investment" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('investment')?.scrollIntoView({ behavior: 'smooth' });
                  setCurrentSection('investment');
                }}
                className="text-gray-700 hover:text-orange-500 transition-colors cursor-pointer"
              >
                数字投资
              </a>
              <a 
                href="#token" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('token')?.scrollIntoView({ behavior: 'smooth' });
                  setCurrentSection('token');
                }}
                className="text-gray-700 hover:text-orange-500 transition-colors cursor-pointer"
              >
                代币
              </a>
              <a 
                href="#nft" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('nft')?.scrollIntoView({ behavior: 'smooth' });
                  setCurrentSection('nft');
                }}
                className="text-gray-700 hover:text-orange-500 transition-colors cursor-pointer"
              >
                NFT市场
              </a>
              <a 
                href="#wallet" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('wallet')?.scrollIntoView({ behavior: 'smooth' });
                  setCurrentSection('wallet');
                }}
                className="text-gray-700 hover:text-orange-500 transition-colors cursor-pointer"
              >
                钱包
              </a>
              <button
                onClick={handleConnect}
                className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 font-semibold text-white shadow-lg hover:shadow-xl ${
                  isConnected ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'
                }`}
                style={{
                  minWidth: '140px',
                  fontSize: '14px',
                  background: isConnected 
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    : 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                  border: `2px solid ${isConnected ? '#059669' : '#dc2626'}`,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                }}
              >
                <Wallet size={18} />
                <span>{isConnected ? '已连接钱包' : '连接Leap钱包'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section id="home" className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            科学法律和儒学的融合
            <br />
            <span className="text-orange-400">个人社会和宇宙的交响</span>
          </h1>
          <p className="text-lg mb-6 opacity-90">
            披上区块链铠甲重生的不死凤凰
          </p>
        </div>
      </section>

      {/* 数字货币投资组合 */}
      <section id="investment" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              数字货币新趋势
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              基于儒家智慧的数字资产配置策略
            </p>
          </div>
          
          <CryptoPortfolio walletAddress={walletAddress} />
        </div>
      </section>

      {/* 代币信息 */}
      <section id="token" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-16">NIUBI代币信息</h2>
          <div className="bg-white rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Confucian V2 (NIUBI)</h3>
            <p className="text-gray-600 mb-4">网络: Juno Network</p>
            <p className="text-gray-600">标准: CW20</p>
          </div>
        </div>
      </section>

      {/* NFT市场区域 */}
      <section id="nft" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">儒家NFT市场</h2>
            <p className="text-lg text-gray-600 mb-8">
              数字化儒家经典，让智慧在区块链上永恒传承
            </p>
            
            {/* 市场操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  if (!isConnected) {
                    showNotification('请先连接钱包才能铸造NFT', 'error');
                    return;
                  }
                  setShowCreateNFTModal(true);
                }}
                className={`px-8 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 justify-center font-semibold shadow-lg hover:shadow-xl ${
                  !isConnected 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-purple-500 text-white hover:bg-purple-600'
                }`}
                style={{
                  background: !isConnected 
                    ? '#9ca3af' 
                    : 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                  border: `2px solid ${!isConnected ? '#6b7280' : '#7c3aed'}`,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                }}
              >
                <Upload size={20} />
                <span>{!isConnected ? '需要连接钱包' : '铸造NFT'}</span>
              </button>
              
              <button
                className="bg-indigo-500 text-white px-8 py-3 rounded-lg hover:bg-indigo-600 transition-colors flex items-center space-x-2 justify-center"
              >
                <ShoppingCart size={20} />
                <span>浏览市场</span>
              </button>
              
              <button
                onClick={() => setShowClassicsModal(true)}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2 justify-center"
              >
                <BookOpen size={20} />
                <span>儒家经典</span>
              </button>
            </div>
          </div>

          {/* NFT网格展示 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map(nft => (
              <NFTCard 
                key={nft.id} 
                nft={nft} 
                onView={handleViewNFT}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 钱包区域 */}
      <section id="wallet" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-16">钱包中心</h2>

          {isConnected ? (
            <div className="space-y-8">
              {/* 余额显示 */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">钱包已连接</h3>
                <p className="text-gray-600 mb-4">
                  地址: {walletAddress.slice(0, 10)}...{walletAddress.slice(-6)}
                </p>
                <p className="text-3xl font-bold text-orange-500 mb-4">
                  {balance} NIUBI
                </p>
                <p className="text-sm text-gray-500 mb-6">真实余额显示</p>

                {/* 操作按钮 */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setShowTransferModal(true)}
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                  >
                    <Send size={20} />
                    <span>转账</span>
                  </button>
                  <button
                    onClick={async () => {
                      const newBalance = await WalletUtils.queryBalance(walletAddress);
                      setBalance(newBalance);
                      showNotification('余额已更新', 'success');
                    }}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <Coins size={20} />
                    <span>刷新余额</span>
                  </button>

                  {/* 水龙头按钮 */}
                  <button
                    onClick={handleFaucetClaim}
                    disabled={faucetCooldown > 0 || isClaimingFaucet}
                    className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                      faucetCooldown > 0 || isClaimingFaucet
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                   >
                     <Gift size={20} />
                     <span>
                       {isClaimingFaucet
                         ? '领取中...'
                         : faucetCooldown > 0
                         ? `${faucetCooldown}小时后可领取`
                         : '免费领取100 NIUBI'
                       }
                     </span>
                   </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">连接钱包</h3>
              <p className="text-gray-600 mb-6">连接Leap钱包后可以查看余额和转账NIUBI代币</p>
              <button
                onClick={handleConnect}
                className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Wallet size={20} />
                <span>连接 Leap 钱包</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* DAO架构区域 */}
      <section id="dao" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-16">儒家DAO治理</h2>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">去中心化自治组织</h3>
            <p className="text-gray-600 mb-6">
              基于儒家道德原则的区块链治理架构，实现"德治"与"法治"的完美结合
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowDAOModal(true)}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 justify-center"
              >
                <Building size={20} />
                <span>查看DAO架构</span>
              </button>
              
              <button
                className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 justify-center"
              >
                <Vote size={20} />
                <span>参与治理投票</span>
              </button>
              
              <button
                onClick={() => setShowEditorialApplicationModal(true)}
                className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2 justify-center"
              >
                <ScrollText size={20} />
                <span>申请加入编辑部</span>
              </button>
            </div>

            {/* DAO统计 */}
            <div className="mt-8 grid md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">1</div>
                <div className="text-sm text-gray-600">元老院</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">8</div>
                <div className="text-sm text-gray-600">专业小组</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">500万+</div>
                <div className="text-sm text-gray-600">参与门槛(NIUBI)</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">10年</div>
                <div className="text-sm text-gray-600">任期制度</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 转账模态框 */}
      <TransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        onTransfer={handleTransfer}
        isLoading={isTransferring}
      />

      {/* NFT铸造模态框 */}
      <CreateNFTModal
        isOpen={showCreateNFTModal}
        onClose={() => setShowCreateNFTModal(false)}
        onMint={handleMintNFT}
        isLoading={isMintingNFT}
      />

      {/* 儒家经典模态框 */}
      <ConfucianClassicsModal
        isOpen={showClassicsModal}
        onClose={() => setShowClassicsModal(false)}
        onCreateNFT={handleMintNFT}
        isConnected={isConnected}
        walletAddress={walletAddress}
      />

      {/* 编辑部申请模态框 */}
      <EditorialApplicationModal
        isOpen={showEditorialApplicationModal}
        onClose={() => setShowEditorialApplicationModal(false)}
        walletAddress={walletAddress}
        isConnected={isConnected}
      />

      {/* DAO架构模态框 */}
      <DAOModal
        isOpen={showDAOModal}
        onClose={() => setShowDAOModal(false)}
      />

      {/* 通知 */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);