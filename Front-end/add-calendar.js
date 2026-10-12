const fs = require('fs');

let content = fs.readFileSync('app/reports/export.tsx', 'utf8');

// Add imports
content = content.replace(
  "import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';",
  "import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';\nimport { Modal } from 'react-native';\nimport { Calendar } from 'react-native-calendars';"
);

// Add state and helper
const stateInjectionRegex = /const \[format, setFormat\] = useState\('PDF'\);/;
const newState = `const [format, setFormat] = useState('PDF');
  const [showCalendar, setShowCalendar] = useState<'from' | 'to' | null>(null);
  const [fromDate, setFromDate] = useState('2024-09-01');
  const [toDate, setToDate] = useState('2024-09-30');

  const formatDisplayDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch(e) {
      return dateString;
    }
  };`;

content = content.replace(stateInjectionRegex, newState);

// Update render
const cardRegex = /<Card style=\{styles\.dateCard\}>[\s\S]*?<\/Card>/;
const newCard = `<Card style={styles.dateCard}>
          <TouchableOpacity style={styles.dateSide} onPress={() => setShowCalendar('from')}>
            <Feather name="calendar" size={24} color="#6B7280" style={{marginRight: 12}} />
            <View>
              <Text style={styles.dateLabel}>From</Text>
              <Text style={styles.dateValue}>{formatDisplayDate(fromDate)}</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.dateDivider} />
          
          <TouchableOpacity style={styles.dateSide} onPress={() => setShowCalendar('to')}>
            <Feather name="calendar" size={24} color="#6B7280" style={{marginRight: 12}} />
            <View>
              <Text style={styles.dateLabel}>To</Text>
              <Text style={styles.dateValue}>{formatDisplayDate(toDate)}</Text>
            </View>
          </TouchableOpacity>
        </Card>

        {!!showCalendar && (
          <Modal transparent animationType="fade" visible={!!showCalendar}>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 12, backgroundColor: '#f8f9fa' }}>
                  <TouchableOpacity onPress={() => setShowCalendar(null)}>
                    <Text style={{ color: '#0EADF1', fontWeight: 'bold' }}>Close</Text>
                  </TouchableOpacity>
                </View>
                <Calendar
                  current={showCalendar === 'from' ? fromDate : toDate}
                  markedDates={{
                    [showCalendar === 'from' ? fromDate : toDate]: { selected: true, selectedColor: '#0EADF1' }
                  }}
                  onDayPress={(day: any) => {
                    if (showCalendar === 'from') {
                      setFromDate(day.dateString);
                    } else {
                      setToDate(day.dateString);
                    }
                    setShowCalendar(null);
                  }}
                  theme={{
                    todayTextColor: '#0EADF1',
                    arrowColor: '#0EADF1',
                    textMonthFontWeight: 'bold',
                  }}
                />
              </View>
            </View>
          </Modal>
        )}`;

content = content.replace(cardRegex, newCard);
fs.writeFileSync('app/reports/export.tsx', content);
console.log('Added Calendar logic!');
