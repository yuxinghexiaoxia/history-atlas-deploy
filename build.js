const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const srcDir = '/Volumes/THUNDEROBOT/AI项目/历史星图/website';
const outDir = path.join(srcDir, 'dist');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(srcDir);

for (const file of files) {
  if (file.startsWith('._') || file.startsWith('__')) continue; // 跳过 macOS 系统文件
  const srcPath = path.join(srcDir, file);
  const stat = fs.statSync(srcPath);
  if (stat.isDirectory()) {
    if (file !== 'node_modules' && file !== 'dist') {
      fs.cpSync(srcPath, path.join(outDir, file), { recursive: true });
    }
    continue;
  }
  const ext = path.extname(file);
  if (ext === '.jsx') {
    const code = fs.readFileSync(srcPath, 'utf-8');
    const result = babel.transformSync(code, {
      presets: ['@babel/preset-react'],
      filename: file,
    });
    const outFile = file.replace('.jsx', '.js');
    fs.writeFileSync(path.join(outDir, outFile), result.code);
    console.log(`Compiled ${file} → ${outFile}`);
  } else {
    fs.copyFileSync(srcPath, path.join(outDir, file));
  }
}

console.log('Build complete in dist/');
