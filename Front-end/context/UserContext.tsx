import React, { createContext, useState, useContext } from 'react';
import { mockUser } from '@/constants/mockData';

export type Medicine = {
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

export type HistoryRecord = {
  id: string;
  type: 'Sugar' | 'BP';
  date: string;
  time: string;
  value: string;
  label: string;
  period?: string;
  notes?: string;
  pulse?: string;
  symptoms?: string[];
};

type UserData = {
  name: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  bloodGroup: string;
  heightFeet: string;
  heightInches: string;
  weight: string;
  emergencyName: string;
  emergencyPhone: string;
  relation: string;
  conditions: string;
  doctor: string;
};

interface UserContextType {
  user: UserData;
  setUser: (user: UserData) => void;
  history: HistoryRecord[];
  addHistoryRecord: (record: Omit<HistoryRecord, 'id'>) => void;
  deleteHistoryRecord: (id: string) => void;
  medicines: Medicine[];
  addMedicine: (med: Omit<Medicine, 'id' | 'takenStatus'>) => void;
  updateMedicine: (id: string, med: Partial<Medicine>) => void;
  toggleMedicineTaken: (id: string, date: string) => void;
  deleteMedicine: (id: string) => void;
}

const getTodayKey = () => new Date().toISOString().split('T')[0];
const getTodayFormatted = () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const initialMedicines: Medicine[] = [
  { id: 'm1', name: 'Thyroxine', dose: '50 mcg', timing: 'Before Breakfast', time: '7:00 AM', days: 'Everyday', iconType: 'pill', color: '#10B981', takenStatus: { [getTodayKey()]: true, '2024-10-01': true } },
  { id: 'm2', name: 'Diamicron MR', dose: '30 mg', timing: 'With Breakfast', time: '8:00 AM', days: 'Everyday', iconType: 'bottle-tonic-plus', color: '#F59E0B', takenStatus: { [getTodayKey()]: true, '2024-10-01': true } },
  { id: 'm3', name: 'Dapa', dose: '10 mg', timing: 'After Breakfast', time: '8:00 AM', days: 'Everyday', iconType: 'pill-multiple', color: '#EC4899', takenStatus: {} },
  { id: 'm4', name: 'Sitaglu Met 50/850', dose: 'With Meal', timing: 'With Meal', time: '1:00 PM', days: 'Everyday', iconType: 'medical-bag', color: '#3B82F6', takenStatus: {} },
  { id: 'm5', name: 'Telsarta', dose: '40 mg', timing: 'After Dinner', time: '8:30 PM', days: 'Everyday', iconType: 'pill', color: '#EF4444', takenStatus: {} },
];

const defaultUser: UserData = {
  name: mockUser.name,
  dob: '15/08/1958',
  gender: 'Male',
  email: 'ahmed@example.com',
  phone: '0300 1234567',
  bloodGroup: 'O+',
  heightFeet: '5',
  heightInches: '8',
  weight: mockUser.weight.toString(),
  emergencyName: 'Ali Khan',
  emergencyPhone: '0300 7654321',
  relation: 'Son',
  conditions: 'Diabetes, Hypertension',
  doctor: 'Dr. Ahmad'
};

const initialHistory: HistoryRecord[] = [
  {
    id: '1',
    type: 'BP',
    date: getTodayFormatted(),
    time: '08:00 AM',
    value: '136/82',
    label: 'Good',
    period: 'Morning'
  },
  {
    id: '2',
    type: 'Sugar',
    date: getTodayFormatted(),
    time: '07:30 AM',
    value: '128',
    label: 'Normal',
    period: 'Morning'
  }
];

export const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
  history: initialHistory,
  addHistoryRecord: () => {},
  deleteHistoryRecord: () => {},
  medicines: initialMedicines,
  addMedicine: () => {},
  updateMedicine: () => {},
  toggleMedicineTaken: () => {},
  deleteMedicine: () => {}
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData>(defaultUser);
  const [history, setHistory] = useState<HistoryRecord[]>(initialHistory);
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);

  const addHistoryRecord = (record: Omit<HistoryRecord, 'id'>) => {
    const newRecord = { ...record, id: Date.now().toString() };
    setHistory([newRecord, ...history]);
  };

  const deleteHistoryRecord = (id: string) => {
    setHistory(history.filter(record => record.id !== id));
  };

  const addMedicine = (med: Omit<Medicine, 'id' | 'takenStatus'>) => {
    const newMed: Medicine = { ...med, id: Date.now().toString(), takenStatus: {} };
    setMedicines([...medicines, newMed]);
  };

  const updateMedicine = (id: string, updatedFields: Partial<Medicine>) => {
    setMedicines(prev => prev.map(m => (m.id === id ? { ...m, ...updatedFields } : m)));
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

  const deleteMedicine = (id: string) => {
    setMedicines(medicines.filter(m => m.id !== id));
  };

  return (
    <UserContext.Provider value={{ user, setUser, history, addHistoryRecord, deleteHistoryRecord, medicines, addMedicine, updateMedicine, toggleMedicineTaken, deleteMedicine }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
