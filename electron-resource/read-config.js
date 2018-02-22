import path from 'path';
import fs from 'fs';
import util from 'util'
const readFile = util.promisify(fs.readFile);
const CONFIG_PATH = path.resolve(__dirname, 'config.json');

export function readConfig () {
  return readFile(CONFIG_PATH)
}
