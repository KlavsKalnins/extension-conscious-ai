const fs = require('fs');
const path = require('path');
const mv = require('mv');
const cpx = require('cpx');

const outDir = path.resolve(__dirname, '../out');
const nextDir = path.join(outDir, '_next');
const newNextDir = path.join(outDir, 'next');
const extensionDir = path.resolve(__dirname, '../extension');

if (fs.existsSync(nextDir)) {
  mv(nextDir, newNextDir, { mkdirp: true }, function(err) {
    if (err) {
      console.error('Failed to rename _next to next:', err);
      process.exit(1);
    } else {
      console.log('Successfully renamed _next to next.');

      cpx.copy(path.join(extensionDir, '**/*'), outDir, {}, (err) => {
        if (err) {
          console.error('Failed to copy extension files:', err);
          process.exit(1);
        } else {
          console.log('Successfully copied extension files into out.');
        }
      });
    }
  });
} else {
  console.error('No _next directory found.');
  process.exit(1);
}
