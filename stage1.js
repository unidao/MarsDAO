const BigNumber = require('bignumber.js');
const { run, calls, fails } = require('./util');

env = 'aragon:mainnet';

const owner = env === undefined ? '0xb4124cEB3451635DAcedd11767f004d8a28c6eE7'
  : '0x2193fd6b2ab1c8d3a57afbc142d9c6a4c138c30c';
const digits = 18;
const percent = 10 ** 16;
const tu = BigNumber(10 ** digits);
const tokens = [
  {
    name: 'MarsEquity',
    symbol: 'MRQ',
    success: 50 * percent,
    quorum: 25 * percent,
    period: 48 * 3600,
    holders: [
      ['0xe5818d70a9b5aed2bfDe4E41FBcB07dD80f8fC84', tu.times(1000).toFixed()],
      // [owner, tu],
      // ['0x1892895ec78d5a61456c3B5978654326ca0ff463', tu],
    ],
  },
  {
    name: 'MarsReputation',
    symbol: 'MRR',
    success: 25 * percent,
    quorum: 25 * percent,
    period: 120 * 3600,
    holders: [
      ['0xe5818d70a9b5aed2bfDe4E41FBcB07dD80f8fC84', tu.times(100).toFixed()],
      // [owner, tu],
      // ['0x1892895ec78d5a61456c3B5978654326ca0ff463', tu],
    ],
  },
];

function main() {
  console.log(run('echo', ['test', '0x1ff'], 'test'));
  const dao = run('dao', ['new'], 'Created DAO');
  console.log('DAO:', dao);

  for (let i = 0, len = tokens.length; i < len; i += 1) {
    const conf = tokens[i];
    const token = run('dao', ['token', 'new', conf.name, conf.symbol, digits, 'true'], 'token at');
    const tm = run('dao', ['install', dao, 'token-manager', '--app-init', 'none'], 'token-manager at');
    run('dao', ['token', 'change-controller', token, tm]);
    run('dao', ['acl', 'create', dao, tm, 'MINT_ROLE', owner, owner]);
    run('dao', ['exec', dao, tm, 'initialize', token, 'true', 0]);
    for (let j = 0; j < conf.holders.length; j += 1) {
      run('dao', ['exec', dao, tm, 'mint', conf.holders[j][0], conf.holders[j][1]]);
    }
    const vot = run('dao', ['install', dao, 'voting', '--app-init-args', token, conf.success, conf.quorum, conf.period], 'voting at');
    run('dao', ['acl', 'create', dao, vot, 'CREATE_VOTES_ROLE', tm, owner]);
    if (i === 0) {
      const vault = run('dao', ['install', dao, 'vault'], 'vault at');
      const finance = run('dao', ['install', dao, 'finance', '--app-init-args', vault, 7 * 24 * 3600], 'finance at');
      run('dao', ['acl', 'create', dao, vault, 'TRANSFER_ROLE', finance, vot]);
      run('dao', ['acl', 'create', dao, finance, 'CREATE_PAYMENTS_ROLE', vot, vot]);
      run('dao', ['acl', 'create', dao, finance, 'EXECUTE_PAYMENTS_ROLE', vot, vot]);
      run('dao', ['acl', 'create', dao, finance, 'MANAGE_PAYMENTS_ROLE', vot, vot]);
    }
    run('dao', ['acl', 'grant', dao, tm, 'MINT_ROLE', vot]);
    run('dao', ['acl', 'revoke', dao, tm, 'MINT_ROLE', owner]);
    run('dao', ['acl', 'set-manager', dao, tm, 'MINT_ROLE', vot]);
    tokens[i].token = token;
    tokens[i].tm = tm;
    tokens[i].vot = vot;
  }
  run('dao', ['acl', dao]);
  run('dao', ['apps', dao, '--all']);
  console.log(tokens);
  console.log(fails);
  console.log('calls', calls());
  console.log('DAO:', dao);
}

main();

// vim:ts=2:sts=2:sw=2:et:
