export type SupportedLanguage = 'en' | 'ur';

export interface TranslationsDictionary {
  [key: string]: {
    en: string;
    ur: string;
    pa: string;
  };
}

export const translations: TranslationsDictionary = {
  // Navigation & Tabs
  home: { en: 'Home', ur: 'ہوم', pa: 'ਘਰ' },
  history: { en: 'History', ur: 'ہسٹری', pa: 'ਇਤਿਹਾਸ' },
  ai: { en: 'AI Assistant', ur: 'اے آئی', pa: 'ਏ ਆਈ' },
  reports: { en: 'Reports', ur: 'رپورٹس', pa: 'ਰਿਪੋਰਟਾਂ' },
  menu: { en: 'Menu', ur: 'مینو', pa: 'ਮੀਨੂ' },

  // General Actions
  save: { en: 'Save', ur: 'محفوظ کریں', pa: 'ਸੰਭਾਲੋ' },
  cancel: { en: 'Cancel', ur: 'منسوخ', pa: 'ਰੱਦ ਕਰੋ' },
  delete: { en: 'Delete', ur: 'حذف کریں', pa: 'ਮਿਟਾਓ' },
  edit: { en: 'Edit', ur: 'ترمیم کریں', pa: 'ਸੋਧੋ' },
  done: { en: 'Done', ur: 'مکمل', pa: 'ਹੋ ਗਿਆ' },
  back: { en: 'Back', ur: 'پیچھے', pa: 'ਵਾਪਸ' },
  apply: { en: 'Apply', ur: 'لاگو کریں', pa: 'ਲਾਗੂ ਕਰੋ' },
  saveChanges: { en: 'Save Changes', ur: 'تبدیلیاں محفوظ کریں', pa: 'ਤਬਦੀਲੀਆਂ ਸੰਭਾਲੋ' },
  more: { en: 'More', ur: 'مزید', pa: 'ਹੋਰ' },
  take: { en: 'Take', ur: 'لیں', pa: 'ਲਵੋ' },

  // Greetings
  goodMorning: { en: 'Good Morning', ur: 'صبح بخیر', pa: 'ਸ਼ੁਭ ਸਵੇਰ' },
  goodAfternoon: { en: 'Good Afternoon', ur: 'سہ پہر بخیر', pa: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ' },
  goodEvening: { en: 'Good Evening', ur: 'شام بخیر', pa: 'ਸ਼ੁਭ ਸ਼ਾਮ' },
  goodNight: { en: 'Good Night', ur: 'شب بخیر', pa: 'ਸ਼ੁਭ ਰਾਤ' },

  // Health Metrics
  fastingSugar: { en: 'Fasting Sugar', ur: 'خالی پیٹ شوگر', pa: 'ਖਾਲੀ ਪੇਟ ਸ਼ੂਗਰ' },
  bloodSugar: { en: 'Blood Sugar', ur: 'بلڈ شوگر', pa: 'ਬਲੱਡ ਸ਼ੂਗਰ' },
  bloodPressure: { en: 'Blood Pressure', ur: 'بلڈ پریشر', pa: 'ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ' },
  systolic: { en: 'Systolic', ur: 'اوپر والا (سسٹولک)', pa: 'ਸਿਸਟੋਲਿਕ' },
  diastolic: { en: 'Diastolic', ur: 'نیچے والا (ڈائیسٹولک)', pa: 'ਡਾਇਸਟੋਲਿਕ' },
  pulse: { en: 'Pulse', ur: 'نبض کی رفتار', pa: 'ਨਬਜ਼' },
  weight: { en: 'Weight', ur: 'جسمانی وزن', pa: 'ਭਾਰ' },
  todaysMedicines: { en: "Today's Medicines", ur: 'آج کی دوائیں', pa: 'ਅੱਜ ਦੀਆਂ ਦਵਾਈਆਂ' },
  upcomingMedicineHeader: { en: 'UPCOMING MEDICINE', ur: 'اگلی دوائی کا وقت', pa: 'ਅਗਲੀ ਦਵਾਈ' },

  // Status & Labels
  normal: { en: 'Normal', ur: 'نارمل', pa: 'ਆਮ' },
  high: { en: 'High', ur: 'زیادہ', pa: 'ਵੱਧ' },
  low: { en: 'Low', ur: 'کم', pa: 'ਘੱਟ' },
  good: { en: 'Good', ur: 'بہترین', pa: 'ਚੰਗਾ' },
  inTarget: { en: 'In Target', ur: 'ہدف کے اندر', pa: 'ਨਿਸ਼ਾਨੇ ਤੇ' },

  // Time of Day
  morning: { en: 'Morning', ur: 'صبح', pa: 'ਸਵੇਰ' },
  afternoon: { en: 'Afternoon', ur: 'دوپہر', pa: 'ਦੁਪਹਿਰ' },
  evening: { en: 'Evening', ur: 'شام', pa: 'ਸ਼ਾਮ' },
  night: { en: 'Night', ur: 'رات', pa: 'ਰਾਤ' },

  // Medicines
  myMedicines: { en: 'My Medicines', ur: 'میری ادویات', pa: 'ਮੇਰੀਆਂ ਦਵਾਈਆਂ' },
  viewAll: { en: 'View All', ur: 'تمام دیکھیں', pa: 'ਸਾਰੇ ਦੇਖੋ' },
  nextMedicine: { en: 'Next Medicine', ur: 'اگلی دوائی', pa: 'ਅਗਲੀ ਦਵਾਈ' },
  allTakenToday: { en: 'All medicines taken today', ur: 'آج کی تمام دوائیں لی جا چکی ہیں', pa: 'ਅੱਜ ਦੀਆਂ ਸਾਰੀਆਂ ਦਵਾਈਆਂ ਲਈਆਂ ਗਈਆਂ' },
  markTaken: { en: 'Mark Taken', ur: 'دوائی لے لی', pa: 'ਲੈ ਲਈ' },
  taken: { en: 'Taken', ur: 'لی جا چکی', pa: 'ਲਈ ਗਈ' },
  missed: { en: 'Missed', ur: 'رہ گئی', pa: 'ਰਹਿ ਗਈ' },
  addMedicine: { en: 'Add Medicine', ur: 'دوائی شامل کریں', pa: 'ਦਵਾਈ ਸ਼ਾਮਲ ਕਰੋ' },
  editMedicine: { en: 'Edit Medicine', ur: 'دوائی تبدیل کریں', pa: 'ਦਵਾਈ ਸੋਧੋ' },
  medicineDetails: { en: 'Medicine Details', ur: 'دوائی کی تفصیلات', pa: 'ਦਵਾਈ ਦੇ ਵੇਰਵੇ' },
  dose: { en: 'Dose', ur: 'خوراک', pa: 'ਖੁਰਾਕ' },
  timing: { en: 'Timing', ur: 'اوقات', pa: 'ਸਮਾਂ' },
  frequency: { en: 'Frequency', ur: 'تعداد / دن', pa: 'ਵਾਰਵਾਰਤਾ' },

  // Quick Actions
  quickActions: { en: 'Quick Actions', ur: 'فوری اندراج', pa: 'ਤੁਰੰਤ ਕਾਰਵਾਈ' },
  addSugar: { en: 'Add Sugar', ur: 'شوگر شامل کریں', pa: 'ਸ਼ੂਗਰ ਸ਼ਾਮਲ ਕਰੋ' },
  addBP: { en: 'Add BP', ur: 'بی پی شامل کریں', pa: 'ਬੀ ਪੀ ਸ਼ਾਮਲ ਕਰੋ' },
  addWeight: { en: 'Add Weight', ur: 'وزن شامل کریں', pa: 'ਭਾਰ ਸ਼ਾਮਲ ਕਰੋ' },
  saveReading: { en: 'Save Reading', ur: 'ریڈنگ محفوظ کریں', pa: 'ਰੀਡਿੰਗ ਸੰਭਾਲੋ' },
  symptomsOptional: { en: 'Symptoms (optional)', ur: 'علامات (اختیاری)', pa: 'ਲੱਛਣ' },
  notesOptional: { en: 'Notes (optional)', ur: 'نوٹس (اختیاری)', pa: 'ਨੋਟਸ' },

  // Menu & Settings Sections
  settingsTitle: { en: 'Settings', ur: 'سیٹنگز', pa: 'ਸੈਟਿੰਗਾਂ' },
  account: { en: 'Account', ur: 'اکاؤنٹ', pa: 'ਖਾਤਾ' },
  preferences: { en: 'Preferences', ur: 'ترجیحات', pa: 'ਤਰਜੀਹਾਂ' },
  supportSecurity: { en: 'Support & Security', ur: 'مدد اور سیکیورٹی', pa: 'ਮਦਦ ਅਤੇ ਸੁਰੱਖਿਆ' },

  // Menu & Settings Items
  patientProfile: { en: 'Patient Profile', ur: 'مریض کا پروفائل', pa: 'ਮਰੀਜ਼ ਦਾ ਪ੍ਰੋਫਾਈਲ' },
  myProfile: { en: 'My Profile', ur: 'میرا پروفائل', pa: 'ਮੇਰਾ ਪ੍ਰੋਫਾਈਲ' },
  myProfileSubtitle: { en: 'Personal and health details', ur: 'ذاتی اور صحت کی تفصیلات', pa: 'ਨਿੱਜੀ ਅਤੇ ਸਿਹਤ ਵੇਰਵੇ' },
  viewYourDetails: { en: 'View your details', ur: 'اپنی تفصیلات دیکھیں', pa: 'ਆਪਣੇ ਵੇਰਵੇ ਦੇਖੋ' },
  doctorInformation: { en: 'Doctor Information', ur: 'ڈاکٹر کی معلومات', pa: 'ਡਾਕਟਰ ਦੀ ਜਾਣਕਾਰੀ' },
  doctorSubtitle: { en: 'Primary care physician details', ur: 'ڈاکٹر اور کلینک کی تفصیلات', pa: 'ਡਾਕਟਰ ਦੇ ਵੇਰਵੇ' },
  caregiverAccess: { en: 'Caregiver Access', ur: 'نگہداشت کنندہ کی رسائی', pa: 'ਦੇਖਭਾਲ ਕਰਨ ਵਾਲੇ ਦੀ ਪਹੁੰਚ' },
  caregiverSubtitle: { en: 'Manage who can see your data', ur: 'خاندان یا نگہداشت کنندہ کی رسائی', pa: 'ਦੇਖਭਾਲ ਕਰਨ ਵਾਲੇ ਦਾ ਪ੍ਰਬੰਧ' },
  medicineReminders: { en: 'Medicine Reminders', ur: 'ادویات کی یاد دہانی', pa: 'ਦਵਾਈਆਂ ਦੇ ਰੀਮਾਈਂਡਰ' },
  remindersSubtitle: { en: 'Configure alert sounds and times', ur: 'الارم کی آواز اور اوقات سیٹ کریں', pa: 'ਅਲਰਟ ਆਵਾਜ਼ਾਂ ਅਤੇ ਸਮਾਂ' },
  appPreferences: { en: 'App Preferences', ur: 'ایپ کی ترجیحات', pa: 'ਐਪ ਤਰਜੀਹਾਂ' },
  preferencesSubtitle: { en: 'Theme, units, and layout', ur: 'تھیم، یونٹس اور ڈسپلے ترجیحات', pa: 'ਥੀਮ, ਇਕਾਈਆਂ ਅਤੇ ਲੇਆਉਟ' },
  language: { en: 'Language', ur: 'زبان', pa: 'ਭਾਸ਼ਾ' },
  languageSubtitle: { en: 'English / اردو', ur: 'اردو / English', pa: 'اردو / English' },
  chooseLanguage: { en: 'Choose Your Language', ur: 'اپنی زبان منتخب کریں', pa: 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ' },
  chooseLanguageSubtitle: { 
    en: 'Select the language you feel most comfortable reading your health reports and alerts in.', 
    ur: 'وہ زبان منتخب کریں جس میں آپ اپنی صحت کی رپورٹس اور الرٹس آسانی سے پڑھ سکیں۔', 
    pa: 'ਉਹ ਭਾਸ਼ਾ ਚੁਣੋ ਜਿਸ ਵਿੱਚ ਤੁਸੀਂ ਆਪਣੀ ਸਿਹਤ ਰਿਪੋਰਟਾਂ ਆਸਾਨੀ ਨਾਲ ਪੜ੍ਹ ਸਕੋ।' 
  },
  availableLanguages: { en: 'Available Languages', ur: 'دستیاب زبانیں', pa: 'ਉਪਲਬਧ ਭਾਸ਼ਾਵਾਂ' },
  livePreview: { en: 'Live Language Preview', ur: 'زبان کا پیش منظر', pa: 'ਲਾਈਵ ਝਲਕ' },
  medicalSafetyNote: { 
    en: 'Medical Safety Note: Drug brand names (e.g. Panadol, Sitaglu Met) are always clearly displayed in English alongside regional text for clinical accuracy.', 
    ur: 'طبی حفاظت کا اصول: ادویات کے برانڈ نام (مثلاً Panadol، Sitaglu Met) ہمیشہ انگریزی میں واضح رہیں گے تاکہ کوئی غلطی نہ ہو۔', 
    pa: 'ਮੈਡੀਕਲ ਸੁਰੱਖਿਆ ਨੋਟ: ਦਵਾਈਆਂ ਦੇ ਬ੍ਰਾਂਡ ਨਾਮ ਹਮੇਸ਼ਾ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਦਿਖਾਏ ਜਾਣਗੇ ਤਾਂ ਜੋ ਕੋਈ ਗਲਤੀ ਨਾ ਹੋਵੇ।' 
  },
  privacySecurity: { en: 'Privacy & Security', ur: 'پرائیویسی اور سیکیورٹی', pa: 'ਗੋਪਨੀਯਤਾ ਅਤੇ ਸੁਰੱਖਿਆ' },
  securitySubtitle: { en: 'Biometrics and data control', ur: 'بائیو میٹرک اور ڈیٹا تحفظ', pa: 'ਬਾਇਓਮੈਟ੍ਰਿਕਸ ਅਤੇ ਡਾਟਾ ਕੰਟਰੋਲ' },
  helpSupport: { en: 'Help & Support', ur: 'مدد اور رہنمائی', pa: 'ਮਦਦ ਅਤੇ ਸਹਾਇਤਾ' },
  supportSubtitle: { en: 'FAQs and contact us', ur: 'عمومی سوالات اور رابطہ', pa: 'ਸਵਾਲ ਅਤੇ ਸੰਪਰਕ' },
  signOut: { en: 'Sign Out', ur: 'لاگ آؤٹ', pa: 'ਸਾਈਨ ਆਉਟ' },
  signOutConfirm: { en: 'Are you sure you want to sign out?', ur: 'کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟', pa: 'ਕੀ ਤੁਸੀਂ ਸੱਚਮੁੱਚ ਸਾਈਨ ਆਉਟ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?' },

  // Emergency & Safety Alert
  criticalAlert: { en: 'Critical Health Alert', ur: 'اہم ہنگامی الرٹ', pa: 'ਗੰਭੀਰ ਸਿਹਤ ਅਲਰਟ' },
  criticalMessage: { 
    en: 'Your recorded reading was critically outside safe medical limits. Please contact your doctor or emergency services immediately.', 
    ur: 'آپ کا ریکارڈ شدہ بلڈ پریشر یا شوگر ریڈنگ محفوظ حد سے زیادہ ہے! برائے مہربانی فوری اپنے ڈاکٹر یا ہنگامی سروس سے رابطہ کریں۔', 
    pa: 'ਤੁਹਾਡੀ ਦਰਜ ਕੀਤੀ ਰੀਡਿੰਗ ਸੁਰੱਖਿਅਤ ਸੀਮਾ ਤੋਂ ਬਾਹਰ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਤੁਰੰਤ ਡਾਕਟਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।' 
  },
  callDoctor: { en: 'Call Doctor', ur: 'ڈاکٹر کو کال کریں', pa: 'ਡਾਕਟਰ ਨੂੰ ਕਾਲ ਕਰੋ' },
  callCaregiver: { en: 'Call Caregiver', ur: 'نگہداشت کنندہ کو کال کریں', pa: 'ਦੇਖਭਾਲ ਕਰਨ ਵਾਲੇ ਨੂੰ ਕਾਲ ਕਰੋ' },
  callAmbulance: { en: 'Call Emergency Ambulance (1122)', ur: 'ایمبولینس کو کال کریں (1122)', pa: 'ਐਂਬੂਲੈਂਸ ਨੂੰ ਕਾਲ ਕਰੋ (1122)' },
  dismissAlert: { en: 'I Am Safe / Dismiss Alert', ur: 'میں ٹھیک ہوں / الرٹ بند کریں', pa: 'ਮੈਂ ਸੁਰੱਖਿਅਤ ਹਾਂ / ਅਲਰਟ ਬੰਦ ਕਰੋ' },

  // Notifications
  notifications: { en: 'Notifications', ur: 'اطلاعات', pa: 'ਨੋਟੀਫਿਕੇਸ਼ਨ' },
  clearAll: { en: 'Clear All', ur: 'تمام مٹائیں', pa: 'ਸਾਰੇ ਸਾਫ਼ ਕਰੋ' },
  noNotifications: { en: 'No Notifications', ur: 'کوئی اطلاع نہیں ہے', pa: 'ਕੋਈ ਨੋਟੀਫਿਕੇਸ਼ਨ ਨਹੀਂ' },
  allCaughtUp: { en: 'You are all caught up for today!', ur: 'آج کے لیے تمام معلومات مکمل ہیں!', pa: 'ਅੱਜ ਲਈ ਸਭ ਠੀਕ ਹੈ!' },
  timeForMedicine: { en: 'Time for Medicine', ur: 'دوائی لینے کا وقت ہو گیا ہے', pa: 'ਦਵਾਈ ਲੈਣ ਦਾ ਸਮਾਂ ਹੋ ਗਿਆ ਹੈ' },

  // AI & Reports
  aiInsights: { en: 'AI Insights', ur: 'صحت کے تجزئیے (AI)', pa: 'ਏ ਆਈ ਸੂਝ' },
  aiAssistant: { en: 'AI Health Assistant', ur: 'اے آئی طبی معاون', pa: 'ਏ ਆਈ ਸਿਹਤ ਸਹਾਇਕ' },
  shareReport: { en: 'Share / Export Report', ur: 'رپورٹ شیئر یا ایکسپورٹ کریں', pa: 'ਰਿਪੋਰਟ ਸਾਂਝੀ ਕਰੋ' },
  generateReport: { en: 'Generate Report', ur: 'رپورٹ تیار کریں', pa: 'ਰਿਪੋਰਟ ਬਣਾਓ' },
  dateRange: { en: 'Select Date Range', ur: 'تاریخ کی حد منتخب کریں', pa: 'ਤਾਰੀਖ ਚੁਣੋ' },
  allHistory: { en: 'Health History', ur: 'صحت کی ہسٹری', pa: 'ਸਿਹਤ ਇਤਿਹਾਸ' },
  allReadings: { en: 'All Records', ur: 'تمام ریکارڈز', pa: 'ਸਾਰੇ ਰਿਕਾਰਡ' },
};
