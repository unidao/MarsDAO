const ens = require('ez-ens');

async function main() {
    // Resolve 'ethereum.eth' on the mainnet.
    console.log(await ens.resolve('mars-dao.eth'))
    console.log(await ens.resolve('binance.aragonid.eth'))
    console.log(await ens.resolve('ethereum.eth'))
    // Resolve 'ethereum.eth' on ropsten.
    console.log(await ens.resolve('ethereum.eth', {network: 'ropsten'}));
}

main();
