const fs = require('fs');
const path = require('path');

const assetsPath = path.join(__dirname, './../../public/assets');
const jsonOutputPath = path.join(__dirname, './../../public/data/flowers.json');

function convertUnderscoreToSpace(inputString) {
  return inputString.replace(/_/g, ' ');
}

function readDirectories(root) {
  const directories = fs.readdirSync(root, { withFileTypes: true });

  const imageDataArray = [];

  directories.forEach(directory => {
    if (directory.isDirectory()) {
      const familyName = directory.name;
      const familyDirectory = path.join(root, familyName);
      const images = fs.readdirSync(familyDirectory);

      images.forEach(imageName => {
        const [latinName] = imageName.split('.');
          const image = {
            familyName,
            latinName: convertUnderscoreToSpace(latinName),
            image: imageName
          };
          imageDataArray.push(image);
      });
    }
  });

  return imageDataArray;
}

function generateJSON(imageDataArray) {
  const jsonArray = JSON.stringify(imageDataArray, null, 2);
  fs.writeFileSync(jsonOutputPath, jsonArray, 'utf-8');
  console.log('JSON file generated successfully.');
}

const imageDataArray = readDirectories(assetsPath);
generateJSON(imageDataArray);