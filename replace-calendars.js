const fs = require('fs');

function useCalendarComponent(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Import Calendar
  if (!content.includes("import { Calendar } from 'react-native-calendars';")) {
    content = content.replace(
      "import DateTimePicker from '@react-native-community/datetimepicker';",
      "import DateTimePicker from '@react-native-community/datetimepicker';\nimport { Calendar } from 'react-native-calendars';"
    );
  }

  // Replace DatePicker logic with Calendar logic
  const oldDateModal = /\{showDatePicker && Platform\.OS === 'ios' \? \([\s\S]*?\) : showDatePicker && \([\s\S]*?\}\)\}\s*\/>\s*\)\}/m;
  const newDateModal = `{showDatePicker && (
          <Modal transparent animationType="fade" visible={showDatePicker}>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 12, backgroundColor: '#f8f9fa' }}>
                  <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                    <Text variant="bodyLarge" style={{ color: '#0EADF1', fontWeight: 'bold' }}>Close</Text>
                  </TouchableOpacity>
                </View>
                <Calendar
                  onDayPress={(day: any) => {
                    const dateObj = new Date(day.timestamp);
                    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
                    
                    if (typeof setFilterDate !== 'undefined') {
                      setFilterDate(dateObj.toLocaleDateString('en-GB', options));
                    }
                    if (typeof setDate !== 'undefined') {
                      setDate(dateObj.toLocaleDateString('en-GB', options));
                      setDateObj(dateObj);
                    }
                    
                    setShowDatePicker(false);
                  }}
                  theme={{
                    todayTextColor: '#0EADF1',
                    selectedDayBackgroundColor: '#0EADF1',
                    arrowColor: '#0EADF1',
                    textDayFontWeight: '500',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '500'
                  }}
                />
              </View>
            </View>
          </Modal>
        )}`;

  // Also fix time picker textColor
  content = content.replace(
    /display="spinner"/g,
    'display="spinner"\n                    textColor="#000000"'
  );

  content = content.replace(oldDateModal, newDateModal);

  fs.writeFileSync(filePath, content);
}

useCalendarComponent('app/(tabs)/history.tsx');
useCalendarComponent('app/add/bp.tsx');
useCalendarComponent('app/add/sugar.tsx');
