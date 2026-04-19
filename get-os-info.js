const os = require('os');

// Get OS Information
const osInfo = {
  platform: os.platform(),
  arch: os.arch(),
  release: os.release(),
  version: os.version(),
  hostname: os.hostname(),
  username: os.userInfo().username,
  homeDir: os.userInfo().homedir,
  shell: os.userInfo().shell,
  totalMemory: `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`,
  freeMemory: `${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`,
  usedMemory: `${((os.totalmem() - os.freemem()) / (1024 ** 3)).toFixed(2)} GB`,
  cpus: os.cpus().length,
  cpuModel: os.cpus()[0].model,
  uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,
  eol: os.EOL === '\n' ? 'Unix/Linux' : 'Windows'
};

console.log('=== OS Information ===\n');
Object.entries(osInfo).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

console.log('\n=== Network Interfaces ===\n');
const interfaces = os.networkInterfaces();
Object.entries(interfaces).forEach(([name, addrs]) => {
  console.log(`${name}:`);
  addrs.forEach(addr => {
    console.log(`  ${addr.family}: ${addr.address}`);
  });
});
