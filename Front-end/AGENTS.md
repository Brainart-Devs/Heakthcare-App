# AGENTS.md - MASTER PROJECT INSTRUCTION

You are developing **HealthTrack AI**, a simple health-tracking mobile app designed especially for older adults.

## PROJECT STATUS
**Current Phase**: FRONTEND COMPLETE (Mock Data Only)
**Next Phase**: Backend Implementation (Awaiting Explicit Instructions)

**DO NOT implement backend services (Supabase, Firebase, APIs, AI) until explicitly instructed.**

---

## 1. TECHNOLOGY
**Frontend:**
- React Native, Expo, TypeScript, Expo Router

**Future Backend:**
- Supabase, PostgreSQL, Supabase Auth, Supabase Storage, Supabase Edge Functions, Row Level Security (RLS)

---

## 2. UI / UX — VERY IMPORTANT
The interface is tailored for **OLDER ADULTS**.
- Extremely simple, clean, and calm.
- Large and readable typography.
- Large touch targets (min 48px).
- High contrast.
- Minimal scrolling and minimal information per screen.
- **PRIMARY BRAND COLOR**: Dark Purple `#4B2E83`

**DO NOT create:**
Complicated dashboards, messy layouts, excessive cards/graphs, complex charts, tiny text, icon-only actions, or excessive animations. Maintain consistent typography, spacing, and rounded corners.

---

## 3. PRODUCT PURPOSE
Tracks: Blood sugar, blood pressure, pulse, weight, medicines, symptoms, notes, health history.
**IMPORTANT**: This is NOT a doctor or diagnostic system. It does not replace professional medical care.

---

## 4. FRONTEND SCREENS
- Splash, Login, Signup, Forgot Password
- Patient Profile, Settings, Caregiver Access
- Home Dashboard, Notifications, Safety Alert
- Add Sugar, Add Blood Pressure, History
- Medicines, Medicine Details
- AI Health Assistant, AI Insights
- Reports, Report Export

All frontend screens are currently fully navigable using mock data.

---

## 5. FORMS & INTERACTIONS
Forms must have:
- Clear labels, large inputs, large buttons.
- Required-field and numeric validation.
- Error messages and success feedback.
- Keyboard avoiding behavior.
- Loading and empty states.

---

## 6. FUTURE AI BOUNDARIES
Feature: **"AI Health Explanation Assistant"**
It must NOT:
- Diagnose diseases, prescribe medicines, or change medicine doses.
- Override safety alerts or invent patient information.

---

## 7. FUTURE MEDICINE SAFETY
Never instruct a user to double a missed dose or change prescribed medication.

---

## 8. FUTURE SECURITY (SUPABASE)
- Supabase RLS must protect health data server-side.
- Users can access only authorized patient data.
- Caregiver permissions must be enforced server-side.
- Privileged keys must never be exposed in the mobile app.

---

## 9. FUTURE SAFETY ENGINE
- Safety alerts must use a deterministic rule-based safety engine.
- AI must NEVER be responsible for deciding whether a critical health alert exists.

---

## 10. CODE QUALITY
- Strict TypeScript, reusable components, feature-based organization.
- No unnecessary duplication or dependencies.
- Keep frontend logic strictly separated from future backend services.
