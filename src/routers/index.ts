import fs from 'fs';
import path from 'path';

const routesPath = path.join(__dirname);

fs.readdirSync(routesPath).forEach(async file => {
    if (file === 'index.ts') return;
    await import(path.join(routesPath, file));
});
