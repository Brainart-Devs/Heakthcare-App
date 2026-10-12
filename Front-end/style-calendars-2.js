const fs = require('fs');

function updateCalendar(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match the <Calendar ... /> tag completely
  const calendarRegex = /<Calendar[\s\S]*?theme=\{\{[\s\S]*?\}\}\s*\/>/;

  const dateStrLogic = `current={dateObj ? \`\${dateObj.getFullYear()}-\${('0' + (dateObj.getMonth() + 1)).slice(-2)}-\${('0' + dateObj.getDate()).slice(-2)}\` : undefined}
                  markedDates={dateObj ? {
                    [\`\${dateObj.getFullYear()}-\${('0' + (dateObj.getMonth() + 1)).slice(-2)}-\${('0' + dateObj.getDate()).slice(-2)}\`]: { selected: true, selectedColor: '#0EADF1', textColor: '#ffffff' }
                  } : {}}`;

  const newCalendar = `<Calendar
                  ${dateStrLogic}
                  onDayPress={(day: any) => {
                    const selectedDate = new Date(day.year, day.month - 1, day.day);
                    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
                    setDate(selectedDate.toLocaleDateString('en-GB', options)); 
                    setDateObj(selectedDate);
                    setShowDatePicker(false);
                  }}
                  theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#0EADF1',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#0EADF1',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    arrowColor: '#0EADF1',
                    monthTextColor: '#16449C',
                    indicatorColor: '#0EADF1',
                    textDayFontWeight: '500',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '500'
                  }}
                />`;

  content = content.replace(calendarRegex, newCalendar);
  fs.writeFileSync(filePath, content);
}

updateCalendar('app/add/bp.tsx');
updateCalendar('app/add/sugar.tsx');
