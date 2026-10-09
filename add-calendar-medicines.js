const fs = require('fs');

let content = fs.readFileSync('app/medicines/index.tsx', 'utf8');

const importInsert = `import { useUser, Medicine } from '@/context/UserContext';`;
const newImport = `import { useUser, Medicine } from '@/context/UserContext';
import { Calendar } from 'react-native-calendars';
import { Modal } from 'react-native';`;
content = content.replace(importInsert, newImport);

const stateInsert = `const [currentDate, setCurrentDate] = useState(new Date('2024-10-01'));`;
const newState = `const [currentDate, setCurrentDate] = useState(new Date('2024-10-01'));
  const [showDatePicker, setShowDatePicker] = useState(false);`;
content = content.replace(stateInsert, newState);

const dateRenderInsert = `<Text style={styles.dateText}>{dateStr}</Text>`;
const newDateRender = `<TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>{dateStr}</Text>
        </TouchableOpacity>`;
content = content.replace(dateRenderInsert, newDateRender);

const modalInsert = `<ScrollView contentContainerStyle={styles.listContent}>`;
const newModal = `{showDatePicker && (
        <Modal transparent animationType="fade" visible={showDatePicker}>
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 12, backgroundColor: '#f8f9fa' }}>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={{ color: '#0EADF1', fontWeight: 'bold' }}>Close</Text>
                </TouchableOpacity>
              </View>
              <Calendar
                current={recordDateStr}
                markedDates={{ [recordDateStr]: { selected: true, selectedColor: '#0EADF1' } }}
                onDayPress={(day: any) => {
                  const selectedDate = new Date(day.timestamp);
                  setCurrentDate(selectedDate);
                  setShowDatePicker(false);
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
      )}
      <ScrollView contentContainerStyle={styles.listContent}>`;
content = content.replace(modalInsert, newModal);

fs.writeFileSync('app/medicines/index.tsx', content);
