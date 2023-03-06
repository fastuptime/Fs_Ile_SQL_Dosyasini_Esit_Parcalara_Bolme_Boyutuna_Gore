const fs = require('fs');

const readStream = fs.createReadStream('data.sql'); // 3.5 GB MAIN FILE

const dosyaBoyutu = 1024 * 1024 * 39; // 39 MB
let dosyaSayisi = 0;
let dosyaAdi = 'datas/data' + dosyaSayisi + '.sql';
let dosya = fs.createWriteStream(dosyaAdi);

readStream.on('data', (chunk) => {
    if (dosya.bytesWritten + chunk.length > dosyaBoyutu) {
        dosyaSayisi++;
        dosyaAdi = 'datas/data' + dosyaSayisi + '.sql';
        dosya = fs.createWriteStream(dosyaAdi);
    }
    
    dosya.write(chunk);
});
