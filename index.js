const { ApiPromise, WsProvider } = require("@polkadot/api");

async function main() {
  const provider = new WsProvider("wss://kusama-rpc.polkadot.io");
  const api = await ApiPromise.create({ provider });

  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);
  console.log(
    `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`
  );
    const blockHash = await api.rpc.chain.getBlockHash();
    const blockHeader = await api.derive.chain.getHeader(blockHash);
    console.log(`Details about last block`);
    console.log(`Block hash ${blockHash}`);
    console.log(`Block number ${blockHeader.number.toString()}`);
    console.log(`Author ${blockHeader.author.toString()}`);
    console.log(`Parent hash ${blockHeader.parentHash.toHex()}`);
    console.log(`State root ${blockHeader.stateRoot.toHex()}`);
    console.log(`Eternistic root ${blockHeader.extrinsicsRoot.toHex()}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
