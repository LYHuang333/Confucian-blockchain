import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

async function queryTokenInfo() {
  // 备用RPC节点列表
  const rpcEndpoints = [
    "https://juno-rpc.polkachu.com",
    "https://rpc-juno.whispernode.com", 
    "https://juno-rpc.kleomedes.network",
    "https://rpc-juno.itastakers.com"
  ];
  
  for (const rpc of rpcEndpoints) {
    try {
      console.log(`尝试连接: ${rpc}`);
      const client = await CosmWasmClient.connect(rpc);
      
      console.log("连接成功！正在查询代币信息...");
      
      // 查询代币基本信息
      const tokenInfo = await client.queryContractSmart(
        "juno10nd8xs9xys5g44g0fvzyzj6vm2knsa3r86knp7f5gkx04f2rmvrs02kxzq",
        { token_info: {} }
      );
      
      console.log("=== 代币基本信息 ===");
      console.log("名称:", tokenInfo.name);
      console.log("符号:", tokenInfo.symbol);
      console.log("小数位:", tokenInfo.decimals);
      console.log("总供应量:", tokenInfo.total_supply);
      console.log("真实总供应量:", (parseInt(tokenInfo.total_supply) / Math.pow(10, tokenInfo.decimals)).toLocaleString());
      
      // 查询您的余额
      const balance = await client.queryContractSmart(
        "juno10nd8xs9xys5g44g0fvzyzj6vm2knsa3r86knp7f5gkx04f2rmvrs02kxzq",
        { balance: { address: "juno168znl58qawfl40k4t9qpmj30upsuht5x3auhzw" } }
      );
      
      console.log("\n=== 您的余额信息 ===");
      console.log("原始余额:", balance.balance);
      console.log("格式化余额:", (parseInt(balance.balance) / Math.pow(10, tokenInfo.decimals)).toLocaleString());
      
      return; // 成功后退出
      
    } catch (error) {
      console.log(`${rpc} 连接失败:`, error.message);
      continue; // 尝试下一个节点
    }
  }
  
  console.error("所有RPC节点都无法连接");
}

queryTokenInfo();
