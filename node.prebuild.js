const fse = require('fs-extra');

console.log('>>>>>> PRE-BUILD CHORES');

const distDir = 'dist';
const assetsDestDir = 'dist/assets';
const dirsToCleanUp = [ distDir, assetsDestDir ];

const assetsSrcDir = 'src/assets';
const assetsToCopy = ['city.list.json'];


try {
  console.log('=== Ensuring path ' + assetsDestDir);
  fse.ensureDirSync(assetsDestDir);
  console.log('OK');
} catch (err) {
  console.log('ERROR: ' + err);
}

console.log('=== Cleaning dirs up');
dirsToCleanUp.forEach(dir => {
  try {
    console.log('--- Cleaning up ' + dir);
    fse.emptyDirSync(dir);
    console.log('OK');
  } catch (err) {
    console.log('ERROR: ' + err);
  }
});

console.log('=== Copying files');
assetsToCopy.forEach(file => {
  try {
    console.log('--- Copying file ' + file);
    fse.copySync(assetsSrcDir + '/' + file, assetsDestDir + '/' + file);
    console.log('OK');
  } catch (err) {
    console.log('ERROR: ' + err);
  }
});

console.log('<<<<<< PRE-BUILD CHORES');
