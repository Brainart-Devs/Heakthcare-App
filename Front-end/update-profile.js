const fs = require('fs');

let content = fs.readFileSync('app/(auth)/profile-setup.tsx', 'utf8');

// Add import
content = content.replace(
  "import { mockUser } from '@/constants/mockData';",
  "import { mockUser } from '@/constants/mockData';\nimport { useUser } from '@/context/UserContext';"
);

// Add useUser inside the component
content = content.replace(
  "const isEdit = params.edit === 'true';",
  "const isEdit = params.edit === 'true';\n  const { user, setUser } = useUser();"
);

// Change initial state logic
content = content.replace("const [name, setName] = useState(isEdit ? mockUser.name : '');", "const [name, setName] = useState(isEdit ? user.name : '');");
content = content.replace("const [dob, setDob] = useState(isEdit ? '15/08/1958' : '');", "const [dob, setDob] = useState(isEdit ? user.dob : '');");
content = content.replace("const [gender, setGender] = useState(isEdit ? 'Female' : '');", "const [gender, setGender] = useState(isEdit ? user.gender : '');");
content = content.replace("const [email, setEmail] = useState('');", "const [email, setEmail] = useState(isEdit ? user.email : '');");
content = content.replace("const [phone, setPhone] = useState(isEdit ? '0300 1234567' : '');", "const [phone, setPhone] = useState(isEdit ? user.phone : '');");
content = content.replace("const [bloodGroup, setBloodGroup] = useState('');", "const [bloodGroup, setBloodGroup] = useState(isEdit ? user.bloodGroup : '');");
content = content.replace("const [heightFeet, setHeightFeet] = useState('');", "const [heightFeet, setHeightFeet] = useState(isEdit ? user.heightFeet : '');");
content = content.replace("const [heightInches, setHeightInches] = useState('');", "const [heightInches, setHeightInches] = useState(isEdit ? user.heightInches : '');");
content = content.replace("const [weight, setWeight] = useState('');", "const [weight, setWeight] = useState(isEdit ? user.weight : '');");
content = content.replace("const [emergencyName, setEmergencyName] = useState(isEdit ? 'Ali Arif' : '');", "const [emergencyName, setEmergencyName] = useState(isEdit ? user.emergencyName : '');");
content = content.replace("const [emergencyPhone, setEmergencyPhone] = useState(isEdit ? '0300 7654321' : '');", "const [emergencyPhone, setEmergencyPhone] = useState(isEdit ? user.emergencyPhone : '');");
content = content.replace("const [relation, setRelation] = useState('Son');", "const [relation, setRelation] = useState(isEdit ? user.relation : 'Son');");

// Update handleSave to call setUser
const saveRegex = /if \(!name \|\| \!dob(.*?)return;\n    \}/s;
content = content.replace(saveRegex, (match) => {
  return match + "\n\n    setUser({ name, dob, gender, email, phone, bloodGroup, heightFeet, heightInches, weight, emergencyName, emergencyPhone, relation });";
});

fs.writeFileSync('app/(auth)/profile-setup.tsx', content);
