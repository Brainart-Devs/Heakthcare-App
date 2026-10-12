const fs = require('fs');
let c = fs.readFileSync('context/UserContext.tsx', 'utf8');

c = c.replace(
  "id: 'm1', name: 'Thyroxine', dose: '50 mcg', timing: 'Before Breakfast', time: '7:00 AM', days: 'Everyday', iconType: 'pill', color: '#10B981', takenStatus: {}",
  "id: 'm1', name: 'Thyroxine', dose: '50 mcg', timing: 'Before Breakfast', time: '7:00 AM', days: 'Everyday', iconType: 'pill', color: '#10B981', takenStatus: { '2024-10-01': true }"
);

c = c.replace(
  "id: 'm2', name: 'Diamicron MR', dose: '30 mg', timing: 'With Breakfast', time: '8:00 AM', days: 'Everyday', iconType: 'bottle-tonic-plus', color: '#F59E0B', takenStatus: {}",
  "id: 'm2', name: 'Diamicron MR', dose: '30 mg', timing: 'With Breakfast', time: '8:00 AM', days: 'Everyday', iconType: 'bottle-tonic-plus', color: '#F59E0B', takenStatus: { '2024-10-01': true }"
);

fs.writeFileSync('context/UserContext.tsx', c);
