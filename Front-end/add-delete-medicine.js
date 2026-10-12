const fs = require('fs');

let content = fs.readFileSync('context/UserContext.tsx', 'utf8');

// Add to interface
content = content.replace(
  `  toggleMedicineTaken: (id: string, date: string) => void;\n}`,
  `  toggleMedicineTaken: (id: string, date: string) => void;\n  deleteMedicine: (id: string) => void;\n}`
);

// Add to default context
content = content.replace(
  `  toggleMedicineTaken: () => {}\n});`,
  `  toggleMedicineTaken: () => {},\n  deleteMedicine: () => {}\n});`
);

// Add implementation
const toggleImplRegex = /const toggleMedicineTaken =[\s\S]*?\n  };\n/;
const toggleImplMatch = content.match(toggleImplRegex);

if (toggleImplMatch) {
  const newMethod = `\n  const deleteMedicine = (id: string) => {
    setMedicines(medicines.filter(m => m.id !== id));
  };\n`;
  content = content.replace(toggleImplMatch[0], toggleImplMatch[0] + newMethod);
}

// Add to return values
content = content.replace(
  `medicines, addMedicine, toggleMedicineTaken }}`,
  `medicines, addMedicine, toggleMedicineTaken, deleteMedicine }}`
);

fs.writeFileSync('context/UserContext.tsx', content);
