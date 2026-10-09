const fs = require('fs');

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add DatePicker import
  if (!content.includes('import DateTimePicker')) {
    content = content.replace(
      "import { Feather } from '@expo/vector-icons';",
      "import { Feather } from '@expo/vector-icons';\nimport DateTimePicker from '@react-native-community/datetimepicker';"
    );
  }

  // 2. Add State for DatePicker
  if (!content.includes('showDatePicker')) {
    content = content.replace(
      "const [time, setTime] = useState",
      "const [time, setTime] = useState"
    ); // Just finding the spot
    content = content.replace(
      "const [notes, setNotes] = useState('');",
      "const [notes, setNotes] = useState('');\n  const [showDatePicker, setShowDatePicker] = useState(false);\n  const [showTimePicker, setShowTimePicker] = useState(false);\n  const [dateObj, setDateObj] = useState(new Date());"
    );
  }

  // 3. Add Handlers for DatePicker
  if (!content.includes('onChangeDate')) {
    content = content.replace(
      "const handleSave = () => {",
      `const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateObj(selectedDate);
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
      setDate(selectedDate.toLocaleDateString('en-GB', options));
    }
  };

  const onChangeTime = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setDateObj(selectedDate);
      const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
      setTime(selectedDate.toLocaleTimeString('en-US', options));
    }
  };

  const handleSave = () => {`
    );
  }

  // 4. Update the buttons to trigger pickers
  content = content.replace(
    "<TouchableOpacity style={styles.dateTimeBtn}>",
    "<TouchableOpacity style={styles.dateTimeBtn} onPress={() => setShowDatePicker(true)}>"
  );
  content = content.replace(
    "<TouchableOpacity style={styles.dateTimeBtn}>", // it will replace the first one again if we are not careful
    "DONT_MATCH_ME" 
  );

  // We can just regex replace both buttons
  content = content.replace(
    /<TouchableOpacity style=\{styles\.dateTimeBtn\}>\s*<Feather name="calendar"[\s\S]*?<\/TouchableOpacity>/,
    `<TouchableOpacity style={styles.dateTimeBtn} onPress={() => setShowDatePicker(true)}>
              <Feather name="calendar" size={18} color="#4A6583" style={{ marginRight: 8 }} />
              <Text variant="body" color="#111827" style={{ fontWeight: '500' }}>{date}</Text>
            </TouchableOpacity>`
  );

  content = content.replace(
    /<TouchableOpacity style=\{styles\.dateTimeBtn\}>\s*<Feather name="clock"[\s\S]*?<\/TouchableOpacity>/,
    `<TouchableOpacity style={styles.dateTimeBtn} onPress={() => setShowTimePicker(true)}>
              <Feather name="clock" size={18} color="#4A6583" style={{ marginRight: 8 }} />
              <Text variant="body" color="#111827" style={{ fontWeight: '500' }}>{time}</Text>
            </TouchableOpacity>`
  );

  // 5. Add the Picker Components to the JSX
  if (!content.includes('<DateTimePicker')) {
    content = content.replace(
      "{/* Save Button */}",
      `{showDatePicker && (
            <DateTimePicker
              value={dateObj}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={dateObj}
              mode="time"
              display="default"
              onChange={onChangeTime}
            />
          )}

          {/* Save Button */}`
    );
  }

  // 6. Update Periods
  if (filePath.includes('bp.tsx')) {
    content = content.replace(
      "const periods = ['Morning', 'Evening', 'Other'];",
      "const periods = ['Morning', 'Evening', 'Night'];"
    );
  } else if (filePath.includes('sugar.tsx')) {
    content = content.replace(
      "const periods = ['Fasting', 'After Meal', 'Random'];",
      "const periods = ['Morning', 'Evening', 'Night'];"
    );
    // Also fix the label logic in sugar.tsx
    content = content.replace(
      "if (period === 'Fasting') {",
      "if (period === 'Morning') {"
    );
  }

  fs.writeFileSync(filePath, content);
}

updateFile('app/add/bp.tsx');
updateFile('app/add/sugar.tsx');
