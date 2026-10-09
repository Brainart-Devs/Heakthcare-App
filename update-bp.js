const fs = require('fs');
let content = fs.readFileSync('app/add/bp.tsx', 'utf8');

content = content.replace(
  "import { router } from 'expo-router';",
  "import { router } from 'expo-router';\nimport { useUser } from '@/context/UserContext';"
);

content = content.replace(
  "export default function AddBPScreen() {",
  "export default function AddBPScreen() {\n  const { addHistoryRecord } = useUser();"
);

const oldSave = `  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1000);
  };`;

const newSave = `  const handleSave = () => {
    setLoading(true);
    
    // Evaluate BP logic (simple heuristic for prototype)
    const sys = parseInt(systolic);
    const dia = parseInt(diastolic);
    let label = 'Normal';
    if (sys > 140 || dia > 90) label = 'High';
    else if (sys < 90 || dia < 60) label = 'Low';
    else if (sys > 120 && sys <= 140) label = 'Good';

    setTimeout(() => {
      addHistoryRecord({
        type: 'BP',
        date,
        time,
        value: \`\${systolic}/\${diastolic}\`,
        label,
        period,
        notes
      });
      setLoading(false);
      router.back();
    }, 500);
  };`;

content = content.replace(oldSave, newSave);

fs.writeFileSync('app/add/bp.tsx', content);
