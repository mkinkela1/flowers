const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputFolder = path.join(__dirname, './../../public/assets');
const outputFolder = path.join(__dirname, './../../public/assets-output');

const targetWidth = 400;
const targetHeight = 400;

function resizeImage(imagePath, outputFolderPath) {
  const image = sharp(imagePath);

  image
    .resize(targetWidth, targetHeight)
    .toFile(path.join(outputFolderPath, path.basename(imagePath)))
    .then(info => {
      console.log(`Resized ${path.basename(imagePath)} to ${info.width}x${info.height}`);
    })
    .catch(error => {
      console.error(`Error resizing ${path.basename(imagePath)}:`, error);
    });
}

function processImages(root) {
  const directories = fs.readdirSync(root, {withFileTypes: true});

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  directories.forEach(directory => {
    if (directory.isDirectory()) {
      const familyName = directory.name;
      const familyDirectory = path.join(root, familyName);
      const familyDirectoryName = familyDirectory.split("/").at(-1);
      const files = fs.readdirSync(familyDirectory);

      const outputPath = `${outputFolder}/${familyDirectoryName}`

      fs.mkdirSync(outputPath)

      files.forEach(file => {
        const filePath = path.join(familyDirectory, file);
        const fileStats = fs.statSync(filePath);

        if (fileStats.isFile()) {
          resizeImage(filePath, outputPath);
        }
      });
    }
  });
}

processImages(inputFolder);
