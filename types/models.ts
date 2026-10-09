export interface User {
  id: string; // auth.uid
  email: string;
  displayName: string;
  role: 'patient' | 'caregiver' | 'admin';
  createdAt: number;
}

export interface Patient {
  id: string; // usually matches User ID if role is patient
  fullName: string;
  dateOfBirth: string;
  gender: string;
  height: string;
  weight: string;
  conditions: string[];
  treatingDoctor: string;
  emergencyContact: string;
  createdAt: number;
}

export interface CaregiverLink {
  id: string;
  patientId: string;
  caregiverId: string;
  status: 'pending' | 'active' | 'rejected';
  permissions: string[];
  createdAt: number;
}

export interface SugarReading {
  id: string;
  patientId: string;
  value: number; // mg/dL
  timing: 'Fasting' | 'Before Meal' | '2-Hr After' | 'Random';
  timestamp: number;
  notes?: string;
  symptoms?: string[];
}

export interface BPReading {
  id: string;
  patientId: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  timestamp: number;
  notes?: string;
  symptoms?: string[];
}

export interface WeightLog {
  id: string;
  patientId: string;
  weight: number;
  timestamp: number;
}

export interface Medicine {
  id: string;
  patientId: string;
  name: string;
  dose: string;
  type: string;
  timing: string;
  frequency: string;
  startDate: number;
  prescribedBy?: string;
  instructions?: string;
}

export interface MedicineSchedule {
  id: string;
  patientId: string;
  medicineId: string;
  timeString: string; // e.g. "08:00 AM"
}

export interface MedicineLog {
  id: string;
  patientId: string;
  scheduleId: string;
  medicineId: string;
  status: 'taken' | 'missed' | 'skipped';
  timestamp: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'reminder' | 'alert' | 'system';
  isRead: boolean;
  timestamp: number;
}

export interface AISession {
  id: string;
  patientId: string;
  startedAt: number;
  lastActive: number;
}

export interface AIMessage {
  id: string;
  sessionId: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export interface Report {
  id: string;
  patientId: string;
  dateRange: {
    start: number;
    end: number;
  };
  metricsIncluded: string[];
  format: 'pdf' | 'excel';
  downloadUrl?: string;
  status: 'generating' | 'ready' | 'failed';
  createdAt: number;
}

export interface AlertEvent {
  id: string;
  patientId: string;
  type: 'high_sugar' | 'low_sugar' | 'high_bp' | 'missed_meds';
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
  timestamp: number;
  resolved: boolean;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  targetId: string;
  details: any;
  timestamp: number;
}
