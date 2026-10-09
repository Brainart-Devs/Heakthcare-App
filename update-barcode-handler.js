const fs = require('fs');
const filePath = 'app/add/medicine.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /const handleBarcodeScanned = \(\{ type, data \}: any\) => \{[\s\S]*?setName\(data\); \/\/ Fallback to raw string\n    \}\n  \};/;

const newHandler = `const handleBarcodeScanned = ({ type, data }: any) => {
    setShowScanner(false);
    
    // If it's a standard commercial barcode (mostly numbers)
    if (/^\\d+$/.test(data) || type.includes('ean') || type.includes('upc')) {
      setName('Looking up barcode...');
      
      // Simulate calling a medical barcode API (like OpenFDA or UPC database)
      setTimeout(() => {
        // In Phase 2, this will be a real API call using the 'data' (barcode number)
        setName('Panadol Extra'); // Mock API response
        setDose('500 mg');
        Alert.alert(
          "Barcode Recognized", 
          \`Successfully looked up barcode: \${data}\\n\\n(Note: This is simulated for the prototype. In production, this will query a real pharmacy database!)\`
        );
      }, 1200);
      return;
    }

    // Smart QR Code Parsing
    try {
      const parsed = JSON.parse(data);
      if (parsed.name) setName(parsed.name);
      if (parsed.dose) setDose(parsed.dose);
      if (parsed.timing) setTiming(parsed.timing);
    } catch (e) {
      setName(data); // Fallback to raw string
    }
  };`;

content = content.replace(regex, newHandler);
fs.writeFileSync(filePath, content);
console.log('Updated handler');
