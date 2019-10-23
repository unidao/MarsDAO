const { spawnSync } = require('child_process');
const rls = require('readline-sync');

let runtry = 0;
let calls = 0;
const runlimit = 100;
const fails = {};

function run(command, args, search) {
  if (global.env !== undefined && args[0] !== '--environment') {
    args = ['--environment', global.env, '--use-frame'].concat(args); // eslint-disable-line no-param-reassign
  }
  console.log(command, args);
  const cmdline = [command].concat(args).join(' ');
  const p = spawnSync(command, args);
  calls += 1;
  const so = p.stdout;
  const lines = String.fromCharCode(...so).split('\n');
  console.log(`${so}`);
  if (p.status) {
    console.log(p.status);
    if (runtry < runlimit) {
      const q = rls.question('Press ENTER to repeat, enter return value to continue: ');
      if (q) {
        return q;
      }
      if (cmdline in fails) {
        fails[cmdline] += 1;
      } else {
        fails[cmdline] = 0;
      }
      runtry += 1;
      console.log('Try:', runtry);
      return run(command, args, search);
    }
    throw p.status;
  } else {
    runtry = 0;
  }
  const re = new RegExp(search);
  let res = '';
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (re.exec(line)) {
      const re2 = /0x[A-Za-z0-9]+/;
      const re2exec = re2.exec(line);
      if (re2exec) {
        [res] = re2exec;
        return res;
      }
    }
  }
  return res;
}
module.exports.run = run;
module.exports.calls = () => calls;
module.exports.fails = fails;

// vim:ts=2:sts=2:sw=2:et:
