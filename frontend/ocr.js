import Tesseract from 'tesseract.js';
import fs from 'fs';
import path from 'path';

async function readImage() {
  try {
    const imgPath = path.join(process.cwd(), 'public', 'software engineer templates', 's1.jpg');
    console.log('Reading:', imgPath);
    const result = await Tesseract.recognize(imgPath, 'eng');
    console.log('Text from s1.jpg:');
    console.log(result.data.text.substring(0, 500));
  } catch (err) {
    console.error(err);
  }
}

readImage();
