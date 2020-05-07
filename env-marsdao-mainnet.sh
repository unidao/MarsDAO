#!/bin/sh

## MARS DAO

# Colors
export blue=$(tput setaf 4)
export red=$(tput setaf 3)
export normal=$(tput sgr0)


# export env="--environment aragon:rinkeby --ipfs-rpc https://ipfs.eth.aragon.network/ipfs/ --use-frame --debug"
export env="--env aragon:mainnet --ipfs-rpc https://ipfs.eth.aragon.network/ipfs/ --use-frame --debug"

eth=0x0000000000000000000000000000000000000000
fff=ffffffffffffffffffffffffffffffffffffffffff

# DAO ENV
export dao=0x1c532BC3B37d05E30aaE367e4FACdCFC98F8a426
export tokensr=0xf97ef9607d311d01151d8203024a136b6fa4ae57
export tokensq=0x63e6a69876c104294a08e894421e9f86f98f3cc8
export votingr=0x27bf7c4287a06d3bbbc314801dc28964743bc8e3
export votingq=0x4b5bea49bea6dac4262e32d6365f81b10c95c762
export financer=0x79d25fba1424897850e496cc336a17beab201682
export financeq=0xa80c552470ed23a604323eda44875e32faa91800
export agent=0x57875ef0e6bdd9bb32ff033e80ed8479313a36c3
export allocations=0x7d1b15acef79bde85fa731bc5a3a31a04703425b
export dotvoting=0x649c5d6bce21381b946f23a6f75a681f265cf3e2
export projects=0xf39a8b1c659166ed722ebc6cd0cd2bb56802ed39
export rewards=0x271ff45fed73c386956eba63032fc5f36be3dd86
export vault=0x00952466aa572bb2b1d5330c758944049974a4eb
export simpleminter=0xf0cb5e5a46e4504840662edb19fe51848d11edba

# Third-party contracts
export c_eth=0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5
export zrx=0xe41d2489571d322189246dafa5ebde1f4699f498
export dai=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359
export c_zrx=0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407
export c_dai=0xf5dce57282a584d2746faf1593d3121fcac444dc

clear

printf "\n${blue}  MARS DAO${normal}\n  ===========
        \n${blue}  DAO                    ${red}\$dao${blue}:${normal} $dao \
        \n${blue}  Tokens (MRQ)       ${red}\$tokensq${blue}:${normal} $tokensq \
        \n${blue}  Tokens (MRR)       ${red}\$tokensr${blue}:${normal} $tokensr \
        \n${blue}  Finance (MRQ)     ${red}\$financeq${blue}:${normal} $financeq \
        \n${blue}  Finance (MRR)     ${red}\$financer${blue}:${normal} $financer \
        \n${blue}  Voting (MRQ)       ${red}\$votingq${blue}:${normal} $votingq \
        \n${blue}  Voting (MRR)       ${red}\$votingr${blue}:${normal} $votingr \
        \n${blue}  Agent                ${red}\$agent${blue}:${normal} $agent \
        \n${blue}  Allocations    ${red}\$allocations${blue}:${normal} $allocations \
        \n${blue}  Dot Voting       ${red}\$dotvoting${blue}:${normal} $dotvoting \
        \n${blue}  Projects          ${red}\$projects${blue}:${normal} $projects \
        \n${blue}  Rewards            ${red}\$rewards${blue}:${normal} $rewards \
        \n${blue}  Vault                ${red}\$vault${blue}:${normal} $vault \
        \n${blue}  Simple Minter ${red}\$simpleminter${blue}:${normal} $simpleminter \
        \n\n${blue}  Third-party contracts:${normal}
        \n${blue}  ETH                    ${red}\$eth${blue}:${normal} $eth \
        \n${blue}  C_ETH                ${red}\$c_eth${blue}:${normal} $c_eth \
        \n${blue}  ZRX                    ${red}\$zrx${blue}:${normal} $zrx \
        \n${blue}  C_ZRX                ${red}\$c_zrx${blue}:${normal} $c_zrx \
        \n${blue}  DAI                    ${red}\$dai${blue}:${normal} $dai \
        \n${blue}  C_DAI                ${red}\$c_dai${blue}:${normal} $c_dai \
        \n"
