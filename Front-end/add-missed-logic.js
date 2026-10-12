const fs = require('fs');

let content = fs.readFileSync('app/medicines/index.tsx', 'utf8');

// 1. Add isMedicineMissed function
const importInsert = `export default function MedicinesList() {`;
const functionToInsert = `export default function MedicinesList() {
  const isMedicineMissed = (medTimeStr: string, currentSelectedDate: Date) => {
    const now = new Date();
    const selectedStart = new Date(currentSelectedDate.getFullYear(), currentSelectedDate.getMonth(), currentSelectedDate.getDate());
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (selectedStart.getTime() < todayStart.getTime()) return true;
    if (selectedStart.getTime() > todayStart.getTime()) return false;

    const match = medTimeStr.match(/(\\d+):(\\d+)\\s*(AM|PM)/i);
    if (!match) return false;
    
    let hours = parseInt(match[1], 10);
    const mins = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();
    
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    
    const medDate = new Date(todayStart);
    medDate.setHours(hours, mins, 0, 0);
    
    return now.getTime() > medDate.getTime();
  };`;

content = content.replace(importInsert, functionToInsert);

// 2. Add isMissed logic to map
const renderInsertRegex = /const isTaken = !!med\.takenStatus\[recordDateStr\];/;
const renderToInsert = `const isTaken = !!med.takenStatus[recordDateStr];
          const isMissed = !isTaken && isMedicineMissed(med.time, currentDate);
          
          const btnStyle = isTaken ? styles.actionBtnTaken : (isMissed ? styles.actionBtnMissed : styles.actionBtnMark);
          const txtStyle = isTaken ? styles.actionTextTaken : (isMissed ? styles.actionTextMissed : styles.actionTextMark);
          const btnText = isTaken ? 'Taken' : (isMissed ? 'Missed' : 'Mark');`;

content = content.replace(renderInsertRegex, renderToInsert);

// 3. Update the button rendering
const buttonRegex = /style=\{\[styles\.actionBtn, isTaken \? styles\.actionBtnTaken : styles\.actionBtnMark\]\}[\s\S]*?\{isTaken \? 'Taken' : 'Mark'\}/m;
const newButton = `style={[styles.actionBtn, btnStyle]}
                onPress={() => toggleMedicineTaken(med.id, recordDateStr)}
              >
                {isTaken && <Feather name="check" size={14} color="#fff" style={{marginRight: 4}} />}
                {!isTaken && isMissed && <Feather name="alert-circle" size={14} color="#EF4444" style={{marginRight: 4}} />}
                <Text style={[styles.actionText, txtStyle]}>
                  {btnText}`;

content = content.replace(buttonRegex, newButton);

// 4. Update styles
const styleRegex = /actionBtnMark: \{[\s\S]*?\},/;
const newStyle = `actionBtnMark: {
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  actionBtnMissed: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  actionTextMissed: {
    color: '#EF4444',
  },`;

content = content.replace(styleRegex, newStyle);

fs.writeFileSync('app/medicines/index.tsx', content);
