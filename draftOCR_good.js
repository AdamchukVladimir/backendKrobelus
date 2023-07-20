import screenshot from 'screenshot-desktop';
import fs from'fs';
import path from 'path';
import { imageHash } from 'image-hash';
import sharp from 'sharp';

// const imagesFolderPath = 'G:/IT/Git/dotaDraftOCR/heroes_img';
// const screenshotPath = 'G:/IT/Git/dotaDraftOCR/sharpImage.png';

const cropCoordinates = {width: 115, height: 65, left: 211, top: 7};
const cropCoordinates2 = {width: 115, height: 65, left: 335, top: 7};
const cropCoordinates3 = {width: 115, height: 65, left: 459, top: 7};
const cropCoordinates4 = {width: 115, height: 65, left: 583, top: 7};
const cropCoordinates5 = {width: 115, height: 65, left: 707, top: 7};
const cropCoordinates6 = {width: 115, height: 65, left: 1098, top:7};
const cropCoordinates7 = {width: 115, height: 65, left: 1222, top:7};
const cropCoordinates8 = {width: 115, height: 65, left: 1345, top: 7};
const cropCoordinates9 = {width: 115, height: 65, left: 1469, top: 7};
const cropCoordinates10 ={width: 115, height: 65, left: 1594, top: 7};

function findMatchingImages() {
  return new Promise((resolve, reject) => {
    const imagesFolderPath = 'G:/IT/Git/dotaDraftOCR/heroes_img';
    const screenshotPath = 'G:/IT/Git/backendKrobelus/OCR/sharpImage.png';
    
    screenshot().then((img) => {
      fs.writeFileSync("./OCR/screenshot.png", img);
      console.log("screenshot good");

      sharp(img)
        .extract(cropCoordinates)
        .toFile("./OCR/sharpImage.png")
        .then(() => {
          console.log("sharpImage good");
          const screenshotData = fs.readFileSync(screenshotPath);
          const imageFiles = fs.readdirSync(imagesFolderPath);
          const matchingImages = [];
          let hash = null;
          let hashImage = null;
          let count = 0;
          const heroesHashes = {};
          let promise = getImageHash(screenshotPath, 16, true)
            .then(data => {
              hash = data;
              console.log("hash1 " + hash);
              return Promise.all(imageFiles.map((imageFile) => {
                const imagePath = path.join(imagesFolderPath, imageFile);
                const imageData = fs.readFileSync(imagePath);
                let imageID = imageFile.split(".");
                return getImageHash(imagePath, 16, true)
                  .then(data => {
                    let distance = hammingDistance(hash, data);
                    if (distance < 35) {
                      console.log("distance " + distance);
                      console.log('"' + imageID[0] + '": "' + data + '",');
                      hashImage = data;
                      return imageID[0];
                    }
                    heroesHashes[imageID[0]] = data;
                  });
              }));
            })
            .catch(error => {
              console.error(error);
              reject(error);
            });
          
          promise.then(imageIds => resolve(imageIds.find((imageId) => imageId)));
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  });
}

function hammingDistance(phash1, phash2) {
  let distance = 0;
  for (let i = 0; i < 64; i++) {
    if (phash1[i] !== phash2[i]) {
      distance++;
    }
  }
  return distance;
}

function getImageHash(imagePath, size, flag) {
  return new Promise((resolve, reject) => {
    imageHash(imagePath, size, flag, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

//  module.exports = findMatchingImages;
export default findMatchingImages;