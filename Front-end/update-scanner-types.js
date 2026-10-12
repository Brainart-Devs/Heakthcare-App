const fs = require('fs');
const filePath = 'app/add/medicine.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /barcodeScannerSettings=\{\{\s*barcodeTypes:\s*\["qr"\],\s*\}\}/;

const newSettings = `barcodeScannerSettings={{
                  barcodeTypes: [
                    "qr",
                    "pdf417",
                    "ean13",
                    "ean8",
                    "upc_e",
                    "upc_a",
                    "datamatrix",
                    "code39",
                    "code93",
                    "code128",
                    "itf14",
                    "aztec"
                  ],
                }}`;

if (content.match(regex)) {
  content = content.replace(regex, newSettings);
  fs.writeFileSync(filePath, content);
  console.log("Updated scanner settings!");
} else {
  console.log("Could not find regex match.");
}
