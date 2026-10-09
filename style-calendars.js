const fs = require('fs');

function updateCalendar(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match the <Calendar ... /> tag completely
  const calendarRegex = /<Calendar[\s\S]*?theme=\{\{[\s\S]*?\}\}\s*\/>/;

  let dateStrLogic = "";
  if (filePath.includes('history.tsx')) {
    dateStrLogic = `current={filterDate !== 'All Dates' ? new Date(filterDate).toISOString().split('T')[0] : undefined}
                  markedDates={filterDate !== 'All Dates' ? {
                    [new Date(filterDate).toISOString().split('T')[0]]: { selected: true, selectedColor: '#3b82f6', textColor: '#ffffff' }
                  } : {}}`;
  } else {
    dateStrLogic = `current={dateObj.toISOString().split('T')[0]}
                  markedDates={{
                    [dateObj.toISOString().split('T')[0]]: { selected: true, selectedColor: '#3b82f6', textColor: '#ffffff' }
                  }}`;
  }

  const newCalendar = `<Calendar
                  ${dateStrLogic}
                  onDayPress={(day: any) => {
                    const selectedDate = new Date(day.timestamp);
                    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
                    ${filePath.includes('history') ? "setFilterDate(selectedDate.toLocaleDateString('en-GB', options));" : "setDate(selectedDate.toLocaleDateString('en-GB', options)); setDateObj(selectedDate);"}
                    setShowDatePicker(false);
                  }}
                  theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#3b82f6',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#3b82f6',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    arrowColor: '#3b82f6',
                    monthTextColor: '#16449C',
                    indicatorColor: '#3b82f6',
                    textDayFontWeight: '500',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '500'
                  }}
                />`;

  content = content.replace(calendarRegex, newCalendar);
  fs.writeFileSync(filePath, content);
}

updateCalendar('app/(tabs)/history.tsx');
updateCalendar('app/add/bp.tsx');
updateCalendar('app/add/sugar.tsx');
