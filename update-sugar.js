const fs = require('fs');
let content = fs.readFileSync('app/add/sugar.tsx', 'utf8');

content = content.replace(
  "import { router } from 'expo-router';",
  "import { router } from 'expo-router';\nimport { useUser } from '@/context/UserContext';"
);

content = content.replace(
  "export default function AddSugarScreen() {",
  "export default function AddSugarScreen() {\n  const { addHistoryRecord } = useUser();"
);

const oldSave = `  const handleSave = () => {
    setError('');
    if (!value) {
      setError('Please enter your sugar reading.');
      return;
    }
    if (isNaN(Number(value)) || Number(value) <= 0 || Number(value) > 1000) {
      setError('Please enter a valid numeric value.');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1000);
  };`;

const newSave = `  const handleSave = () => {
    setError('');
    if (!value) {
      setError('Please enter your sugar reading.');
      return;
    }
    if (isNaN(Number(value)) || Number(value) <= 0 || Number(value) > 1000) {
      setError('Please enter a valid numeric value.');
      return;
    }
    
    setLoading(true);
    
    const v = parseInt(value);
    let label = 'Normal';
    if (type === 'Fasting') {
      if (v > 125) label = 'High';
      else if (v < 70) label = 'Low';
    } else {
      if (v > 200) label = 'High';
      else if (v < 70) label = 'Low';
    }

    setTimeout(() => {
      addHistoryRecord({
        type: 'Sugar',
        date,
        time,
        value: value,
        label,
        period: type,
        notes
      });
      setLoading(false);
      router.back();
    }, 500);
  };`;

content = content.replace(oldSave, newSave);

fs.writeFileSync('app/add/sugar.tsx', content);
