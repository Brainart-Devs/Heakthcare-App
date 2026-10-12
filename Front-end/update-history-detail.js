const fs = require('fs');

let content = fs.readFileSync('app/history/[id].tsx', 'utf8');

// 1. Fix line height on hugeMetric
content = content.replace(
  "hugeMetric: {\n    fontSize: 48,\n    fontWeight: '800',\n    color: '#111827'\n  },",
  "hugeMetric: {\n    fontSize: 48,\n    fontWeight: '800',\n    color: '#111827',\n    lineHeight: 56\n  },"
);

// 2. Add Systolic / Diastolic / Pulse / Symptoms inside the details card
const oldDetails = `          <View style={styles.row}>
            <Text variant="body" color="#8E8E93" style={{ flex: 1 }}>Period</Text>
            <Text variant="bodyLarge" style={{ fontWeight: '600' }}>{record.period || 'N/A'}</Text>
          </View>

          {record.notes ? (
            <>
              <View style={styles.divider} />
              <View style={styles.rowTop}>
                <Text variant="body" color="#8E8E93" style={{ flex: 1 }}>Notes</Text>
                <Text variant="bodyLarge" style={{ flex: 2, textAlign: 'right' }}>{record.notes}</Text>
              </View>
            </>
          ) : null}
        </Card>`;

const newDetails = `          <View style={styles.row}>
            <Text variant="body" color="#8E8E93" style={{ flex: 1 }}>Period</Text>
            <Text variant="bodyLarge" style={{ fontWeight: '600' }}>{record.period || 'N/A'}</Text>
          </View>

          {!isSugar && (
            <>
              <View style={styles.divider} />
              <View style={styles.row}>
                <Text variant="body" color="#8E8E93" style={{ flex: 1 }}>Systolic</Text>
                <Text variant="bodyLarge" style={{ fontWeight: '600' }}>{record.value.split('/')[0]} mmHg</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.row}>
                <Text variant="body" color="#8E8E93" style={{ flex: 1 }}>Diastolic</Text>
                <Text variant="bodyLarge" style={{ fontWeight: '600' }}>{record.value.split('/')[1]} mmHg</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.row}>
                <Text variant="body" color="#8E8E93" style={{ flex: 1 }}>Pulse</Text>
                <Text variant="bodyLarge" style={{ fontWeight: '600' }}>{record.pulse || '--'} bpm</Text>
              </View>
            </>
          )}

          {record.symptoms && record.symptoms.length > 0 && (
            <>
              <View style={styles.divider} />
              <View style={styles.rowTop}>
                <Text variant="body" color="#8E8E93" style={{ flex: 1 }}>Symptoms</Text>
                <Text variant="bodyLarge" style={{ flex: 2, textAlign: 'right', fontWeight: '500' }}>
                  {record.symptoms.join(', ')}
                </Text>
              </View>
            </>
          )}

          {record.notes ? (
            <>
              <View style={styles.divider} />
              <View style={styles.rowTop}>
                <Text variant="body" color="#8E8E93" style={{ flex: 1 }}>Notes</Text>
                <Text variant="bodyLarge" style={{ flex: 2, textAlign: 'right' }}>{record.notes}</Text>
              </View>
            </>
          ) : null}
        </Card>`;

content = content.replace(oldDetails, newDetails);

fs.writeFileSync('app/history/[id].tsx', content);
