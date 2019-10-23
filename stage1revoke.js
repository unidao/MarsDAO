const { run, calls, fails } = require('./util');
const { spawnSync } = require('child_process');

const dao = process.argv[2];
env = 'aragon:mainnet';

const owner = global.env === undefined ? '0xb4124cEB3451635DAcedd11767f004d8a28c6eE7'
  : '0x2193fd6b2ab1c8d3a57afbc142d9c6a4c138c30c';
// FIXME: make settings.js

function runP(cmd, args) {
  if (global.env !== undefined && args[0] !== '--environment') {
    args = ['--environment', global.env, '--use-frame'].concat(args); // eslint-disable-line no-param-reassign
  }
  console.log(cmd, args);
  const so = spawnSync(cmd, args).stdout;
  console.log(`${so}`);
  return String.fromCharCode(...so).split('\n');
}

const apps = [];
let vot1 = '0x';

runP('dao', ['apps', dao]).forEach((line) => {
  const m = line.match(/ ([a-z-]+)[ @].* (0x[A-Fa-f0-9]+) /);
  if (Array.isArray(m)) {
    const m2 = m.slice(1);
    apps.push(m2);
    if (m2[0] === 'voting' && vot1 === '0x') {
      [, vot1] = m2;
    }
  }
});
console.log(apps);
apps.reverse().forEach(([app, addr]) => {
  console.log(app, addr);
  if (app === 'kernel') {
    runP('dao', ['acl', 'grant', dao, addr, 'APP_MANAGER_ROLE', vot1]);
    runP('dao', ['acl', 'revoke', dao, addr, 'APP_MANAGER_ROLE', owner]);
    runP('dao', ['acl', 'set-manager', dao, addr, 'APP_MANAGER_ROLE', vot1]);
  }
  if (app === 'acl') {
    runP('dao', ['acl', 'grant', dao, addr, 'CREATE_PERMISSIONS_ROLE', vot1]);
    runP('dao', ['acl', 'revoke', dao, addr, 'CREATE_PERMISSIONS_ROLE', owner]);
    runP('dao', ['acl', 'set-manager', dao, addr, 'CREATE_PERMISSIONS_ROLE', vot1]);
  }
  if (app === 'voting') {
    runP('dao', ['acl', 'set-manager', dao, addr, 'CREATE_VOTES_ROLE', addr]);
  }
});

// vim:ts=2:sts=2:sw=2:et:
