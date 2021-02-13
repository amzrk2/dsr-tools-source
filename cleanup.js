/**
 * remove mock file used
 */

const fs = require('fs');
const path = require('path');

fs.rmSync(path.resolve(__dirname, 'dist/mock'), { recursive: true, force: true });
