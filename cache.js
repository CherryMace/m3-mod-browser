const fs = require('fs-extra');
const path = require('path');

const baseUrl = 'https://cherrymace.github.io/m3-mod-browser/';

const mods = fs.readdirSync('mods', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

for (const mod of mods) {
  const modDir = path.join('mods', mod);
  const cacheDir = path.join(modDir, 'cache');
  const dataPath = path.join(modDir, 'data.json');
  const data = fs.readJSONSync(dataPath);
  const cache = fs.readdirSync(cacheDir, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name)[0];
  data.download = new URL(path.join(cacheDir, cache), baseUrl).toString();
  fs.writeJSONSync(dataPath, data, { spaces: 2 });
}
