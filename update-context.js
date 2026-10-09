const fs = require('fs');
const filePath = 'context/UserContext.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add Medicine type
const typeInsertion = `export type HistoryRecord = {`;
const medicineType = `export type Medicine = {
  id: string;
  name: string;
  dose: string;
  timing: string;
  time: string;
  days: string;
  iconType: string;
  color: string;
  takenStatus: Record<string, boolean>; // 'YYYY-MM-DD' => true
};

`;

content = content.replace(typeInsertion, medicineType + typeInsertion);

// 2. Add to UserContextType
const contextTypeInsertion = `  deleteHistoryRecord: (id: string) => void;
}`;
const newContextMethods = `  deleteHistoryRecord: (id: string) => void;
  medicines: Medicine[];
  addMedicine: (med: Omit<Medicine, 'id' | 'takenStatus'>) => void;
  toggleMedicineTaken: (id: string, date: string) => void;
}`;
content = content.replace(contextTypeInsertion, newContextMethods);

// 3. Add initialMedicines
const defaultUserInsertion = `const defaultUser: UserData = {`;
const initialMedicines = `const initialMedicines: Medicine[] = [
  { id: 'm1', name: 'Thyroxine', dose: '50 mcg', timing: 'Before Breakfast', time: '7:00 AM', days: 'Everyday', iconType: 'pill', color: '#10B981', takenStatus: {} },
  { id: 'm2', name: 'Diamicron MR', dose: '30 mg', timing: 'With Breakfast', time: '8:00 AM', days: 'Everyday', iconType: 'bottle-tonic-plus', color: '#F59E0B', takenStatus: {} },
  { id: 'm3', name: 'Dapa', dose: '10 mg', timing: 'After Breakfast', time: '8:00 AM', days: 'Everyday', iconType: 'pill-multiple', color: '#EC4899', takenStatus: {} },
  { id: 'm4', name: 'Sitaglu Met 50/850', dose: 'With Meal', timing: 'With Meal', time: '1:00 PM', days: 'Everyday', iconType: 'medical-bag', color: '#3B82F6', takenStatus: {} },
  { id: 'm5', name: 'Telsarta', dose: '40 mg', timing: 'After Dinner', time: '8:30 PM', days: 'Everyday', iconType: 'pill', color: '#EF4444', takenStatus: {} },
];

`;
content = content.replace(defaultUserInsertion, initialMedicines + defaultUserInsertion);

// 4. Update Context Provider default
content = content.replace(
  `deleteHistoryRecord: () => {}`,
  `deleteHistoryRecord: () => {},\n  medicines: initialMedicines,\n  addMedicine: () => {},\n  toggleMedicineTaken: () => {}`
);

// 5. Update hook state and returns
content = content.replace(
  `const [history, setHistory] = useState<HistoryRecord[]>(initialHistory);`,
  `const [history, setHistory] = useState<HistoryRecord[]>(initialHistory);\n  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);`
);

const newMethods = `  const deleteHistoryRecord = (id: string) => {
    setHistory(history.filter(record => record.id !== id));
  };

  const addMedicine = (med: Omit<Medicine, 'id' | 'takenStatus'>) => {
    const newMed: Medicine = { ...med, id: Date.now().toString(), takenStatus: {} };
    setMedicines([...medicines, newMed]);
  };

  const toggleMedicineTaken = (id: string, dateStr: string) => {
    setMedicines(medicines.map(m => {
      if (m.id === id) {
        const current = !!m.takenStatus[dateStr];
        return { ...m, takenStatus: { ...m.takenStatus, [dateStr]: !current } };
      }
      return m;
    }));
  };
`;
content = content.replace(/const deleteHistoryRecord[\s\S]*?};/, newMethods);

content = content.replace(
  `value={{ user, setUser, history, addHistoryRecord, deleteHistoryRecord }}`,
  `value={{ user, setUser, history, addHistoryRecord, deleteHistoryRecord, medicines, addMedicine, toggleMedicineTaken }}`
);

fs.writeFileSync(filePath, content);
