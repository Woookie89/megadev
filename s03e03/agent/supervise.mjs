// Keeps the runner alive: restarts it 5 s after any exit. Its own process, independent of any chat.
// Start detached (from s03e03/): powershell Start-Process node -ArgumentList agent/supervise.mjs -WindowStyle Minimized
// Stop: delete agent/RUN (the flag file) — the supervisor and runner then exit at the next restart check.
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const FLAG = 'agent/RUN';
fs.writeFileSync(FLAG, String(process.pid));
const log = (m) => fs.appendFileSync('agent/supervise.log', `${new Date().toISOString()} ${m}\n`);
log(`supervisor up pid ${process.pid}`);
const start = () => {
  if (!fs.existsSync(FLAG)) { log('flag removed, supervisor exits'); process.exit(0); }
  const p = spawn(process.execPath, ['agent/runner.mjs'], { stdio: ['ignore', fs.openSync('agent/runner.out', 'a'), fs.openSync('agent/runner.out', 'a')] });
  log(`runner started pid ${p.pid}`);
  const watch = setInterval(() => { if (!fs.existsSync(FLAG)) { log('flag removed, stopping runner'); p.kill(); } }, 5000);
  p.on('exit', (code) => { clearInterval(watch); log(`runner exited code ${code}`); setTimeout(start, 5000); });
};
start();
