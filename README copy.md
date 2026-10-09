# HealthTrack AI

HealthTrack AI is a simple health-tracking mobile app designed especially for older adults to easily track their blood sugar, blood pressure, weight, and medicines. 

## Project Status
The project is currently in the **Frontend Phase**. 
It is a fully clickable, navigable prototype using local state and mock data. No backend services have been integrated yet.

## Features (Frontend Prototype)
- **Dashboard**: Simple overview of daily metrics and upcoming medicines.
- **Vitals Tracking**: Easy-to-use forms for adding Blood Sugar and Blood Pressure with numeric validation.
- **Medicines**: Track daily schedules, view medicine details, and mark doses as taken.
- **AI Assistant & Insights**: Mock interfaces demonstrating future AI explanation capabilities.
- **Reports**: Shareable health summaries.
- **Caregiver Access**: Management screens for allowing family members to view health reports.
- **Safety Alerts**: High-contrast, full-screen emergency mock alerts for critical vital readings.

## Tech Stack
- React Native
- Expo (SDK 52)
- Expo Router
- TypeScript (Strict)

## Running the App
1. Install dependencies: \`npm install\`
2. Start the Expo server: \`npm start\`
3. Scan the QR code with the Expo Go app or press \`i\` for iOS simulator / \`a\` for Android emulator.

## Design Philosophy
- **Elderly-Friendly**: Large typography, minimum 48px touch targets, high contrast, and minimal scrolling.
- **Primary Color**: Dark Purple (\`#4B2E83\`)
- **Simplicity**: No complex charts, unnecessary graphs, or crowded UI elements.

## Future Roadmap
- Supabase Integration (Auth, PostgreSQL, Storage, Edge Functions)
- Row Level Security (RLS) for patient data protection
- Caregiver Authentication and Access Management
- AI Explanation Assistant Backend
- Deterministic Safety Alert Engine
- Automated PDF/Excel Report Generation
