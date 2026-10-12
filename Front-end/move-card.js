const fs = require('fs');

let content = fs.readFileSync('app/(tabs)/index.tsx', 'utf8');

// 1. Find my dynamic block at the top and remove it
const dynamicBlockRegex = /\{\/\* Upcoming Medicine Card \*\/\}\s*\{upcomingMedicine && \([\s\S]*?\)\}\s*\{\/\* Middle Row Cards \*\/\}/;
content = content.replace(dynamicBlockRegex, '{/* Middle Row Cards */}');

// 2. Find the static block at the bottom and replace it with my dynamic block
const staticBlockRegex = /\{\/\* Next Medicine Card \*\/\}\s*<Card style=\{styles\.nextMedicineCard\}>[\s\S]*?<\/Card>/;

const newDynamicBlock = `{/* Upcoming Medicine Card */}
            {upcomingMedicine && (
              <Card style={{backgroundColor: '#F0F9FF', borderColor: '#BAE6FD', borderWidth: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                    <View style={[styles.pillIconCircle, {backgroundColor: upcomingMedicine.color + '20', marginRight: 12}]}>
                      <MaterialCommunityIcons name={upcomingMedicine.iconType as any} size={24} color={upcomingMedicine.color} />
                    </View>
                    <View style={{flex: 1, paddingRight: 8}}>
                      <Text style={{fontSize: 12, color: '#0284C7', fontWeight: '700', marginBottom: 2}}>UPCOMING MEDICINE</Text>
                      <Text style={{fontSize: 18, color: '#0F172A', fontWeight: 'bold'}} numberOfLines={1} adjustsFontSizeToFit>{upcomingMedicine.name}</Text>
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
            )}`;

content = content.replace(staticBlockRegex, newDynamicBlock);

fs.writeFileSync('app/(tabs)/index.tsx', content);
