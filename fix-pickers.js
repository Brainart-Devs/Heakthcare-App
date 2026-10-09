const fs = require('fs');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('import { Modal')) {
    content = content.replace(
      "import { Platform } from 'react-native';",
      "import { Platform, Modal } from 'react-native';"
    );
  }

  // Remove the old onChange handlers
  content = content.replace(
    /const onChangeDate = \([\s\S]*?const handleSave/m,
    "const handleSave"
  );

  const newPickers = `        {showDatePicker && Platform.OS === 'ios' ? (
          <Modal transparent animationType="fade" visible={showDatePicker}>
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ backgroundColor: '#fff', paddingBottom: 40, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                  <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                    <Text variant="bodyLarge" style={{ color: '#0EADF1', fontWeight: 'bold' }}>Done</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={dateObj}
                  mode="date"
                  display="inline"
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setDateObj(selectedDate);
                      const options = { day: '2-digit', month: 'short', year: 'numeric' };
                      setDate(selectedDate.toLocaleDateString('en-GB', options));
                    }
                  }}
                />
              </View>
            </View>
          </Modal>
        ) : showDatePicker && (
          <DateTimePicker
            value={dateObj}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDateObj(selectedDate);
                const options = { day: '2-digit', month: 'short', year: 'numeric' };
                setDate(selectedDate.toLocaleDateString('en-GB', options));
              }
            }}
          />
        )}

        {showTimePicker && Platform.OS === 'ios' ? (
          <Modal transparent animationType="fade" visible={showTimePicker}>
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ backgroundColor: '#fff', paddingBottom: 40, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                  <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                    <Text variant="bodyLarge" style={{ color: '#0EADF1', fontWeight: 'bold' }}>Done</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={dateObj}
                  mode="time"
                  display="spinner"
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setDateObj(selectedDate);
                      const options = { hour: '2-digit', minute: '2-digit', hour12: true };
                      setTime(selectedDate.toLocaleTimeString('en-US', options));
                    }
                  }}
                />
              </View>
            </View>
          </Modal>
        ) : showTimePicker && (
          <DateTimePicker
            value={dateObj}
            mode="time"
            display="default"
            onChange={(event, selectedDate) => {
              setShowTimePicker(false);
              if (selectedDate) {
                setDateObj(selectedDate);
                const options = { hour: '2-digit', minute: '2-digit', hour12: true };
                setTime(selectedDate.toLocaleTimeString('en-US', options));
              }
            }}
          />
        )}`;

  content = content.replace(
    /\{showDatePicker && \([\s\S]*?<\/DateTimePicker>\s*\)\}\s*\{showTimePicker && \([\s\S]*?<\/DateTimePicker>\s*\)\}/m,
    newPickers
  );

  fs.writeFileSync(filePath, content);
}

fixFile('app/add/bp.tsx');
fixFile('app/add/sugar.tsx');
