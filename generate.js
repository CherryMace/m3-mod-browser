const fs = require('fs-extra');

const allData = [];

const mods = fs.readdirSync('./mods', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

for (const mod of mods) {
  const data = fs.readJSONSync(`./mods/${mod}/data.json`);
  if (data.hidden) continue;
  allData.push(data);
}

fs.writeJSONSync(`./mods/all.json`, allData);
