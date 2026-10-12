export const mockUser = {
  name: 'Rukhsana Arif',
  age: 66,
  weight: 68,
  doctor: 'Dr. Ahmad',
};

export const mockMedicines = [
  { id: '1', name: 'Thyroxine', dose: '50 mcg', timing: 'Before Breakfast', time: '7:00 AM', status: 'Taken' },
  { id: '2', name: 'Diamicron MR', dose: '30 mg', timing: 'With Breakfast', time: '8:00 AM', status: 'Taken' },
  { id: '3', name: 'Sitaglu Met 50/850', dose: '1 tablet', timing: 'With Meal', time: '1:00 PM', status: 'Pending' },
  { id: '4', name: 'Telsarta', dose: '40 mg', timing: 'After Dinner', time: '8:30 PM', status: 'Pending' }
];

export const mockReadings = {
  sugar: { value: 128, label: 'Normal', date: '01 Oct 2024' },
  bp: { systolic: 136, diastolic: 82, pulse: 76, label: 'Good', date: '01 Oct 2024' },
};
