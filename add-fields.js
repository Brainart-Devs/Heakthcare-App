const fs = require('fs');

let ctx = fs.readFileSync('context/UserContext.tsx', 'utf8');
ctx = ctx.replace('relation: string;', 'relation: string;\n  conditions: string;\n  doctor: string;');
ctx = ctx.replace("relation: 'Son'", "relation: 'Son',\n  conditions: 'Diabetes, Hypertension',\n  doctor: 'Dr. Ahmad'");
fs.writeFileSync('context/UserContext.tsx', ctx);

let setup = fs.readFileSync('app/(auth)/profile-setup.tsx', 'utf8');
setup = setup.replace("const [relation, setRelation] = useState(isEdit ? user.relation : 'Son');", "const [relation, setRelation] = useState(isEdit ? user.relation : 'Son');\n  const [conditions, setConditions] = useState(isEdit ? user.conditions : '');\n  const [doctor, setDoctor] = useState(isEdit ? user.doctor : '');");
setup = setup.replace("emergencyPhone, relation });", "emergencyPhone, relation, conditions, doctor });");

const extraInputs = `          {/* 2b. Medical Info */}
          <Text variant="h2" style={styles.sectionTitle}>Medical Information</Text>
          <Input label="Conditions" placeholder="Diabetes, Thyroid..." value={conditions} onChangeText={setConditions} />
          <Input label="Treating Doctor" placeholder="Dr. Name" value={doctor} onChangeText={setDoctor} />

          {/* 3. Emergency Contact */}`;
setup = setup.replace("{/* 3. Emergency Contact */}", extraInputs);

fs.writeFileSync('app/(auth)/profile-setup.tsx', setup);
