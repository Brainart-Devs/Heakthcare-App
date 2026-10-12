const fs = require('fs');

let content = fs.readFileSync('app/(tabs)/index.tsx', 'utf8');

// 1. Update useUser
content = content.replace(
  `const { user } = useUser();`,
  `const { user, medicines, toggleMedicineTaken } = useUser();
  
  const todayStr = new Date().toISOString().split('T')[0];

  const parseTime = (timeStr: string) => {
    const match = timeStr.match(/(\\d+):(\\d+)\\s*(AM|PM)/i);
    if (!match) return 0;
    let hours = parseInt(match[1], 10);
    const mins = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    return hours * 60 + mins;
  };

  const upcomingMedicine = medicines
    .filter(m => !m.takenStatus[todayStr])
    .sort((a, b) => parseTime(a.time) - parseTime(b.time))[0];`
);

// 2. Add Upcoming Medicine UI
const target = `{/* Middle Row Cards */}`;
const newUI = `{/* Upcoming Medicine Card */}
            {upcomingMedicine && (
              <Card style={{marginBottom: 16, backgroundColor: '#F0F9FF', borderColor: '#BAE6FD', borderWidth: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                    <View style={[styles.pillIconCircle, {backgroundColor: upcomingMedicine.color + '20', marginRight: 12}]}>
                      <MaterialCommunityIcons name={upcomingMedicine.iconType as any} size={24} color={upcomingMedicine.color} />
                    </View>
                    <View>
                      <Text style={{fontSize: 12, color: '#0284C7', fontWeight: '700', marginBottom: 2}}>UPCOMING MEDICINE</Text>
                      <Text style={{fontSize: 18, color: '#0F172A', fontWeight: 'bold'}}>{upcomingMedicine.name}</Text>
                      <Text style={{fontSize: 13, color: '#475569'}}>{upcomingMedicine.dose} • {upcomingMedicine.time}</Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={{backgroundColor: '#10B981', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => toggleMedicineTaken(upcomingMedicine.id, todayStr)}
                  >
                    <Feather name="check" size={16} color="#FFF" style={{marginRight: 4}} />
                    <Text style={{color: '#FFF', fontWeight: '700', fontSize: 14}}>Take</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            )}

            {/* Middle Row Cards */}`;

content = content.replace(target, newUI);

fs.writeFileSync('app/(tabs)/index.tsx', content);
