# 🏥 Maloof Health Systems — Patient Portal

Welcome to the official repository for **Maloof Health Systems Patient Portal**, a modern, secure, and fully responsive healthcare platform built with **Next.js 15**, **MongoDB**, and **NextAuth**.  
This platform allows patients to browse medical services, schedule appointments, manage their health records, and authenticate through Google or email credentials.

> **Note:**  
Some email features and certain design elements may look slightly off because no custom domain has been purchased yet.

---

## 🚀 Features

### ✅ **1. Modern Healthcare Website**
- Fully responsive frontend built with **Next.js 15 App Router**
- Smooth user experience with custom components and animations
- Clean, professional design matching modern healthcare standards

### 🏥 **2. Dynamic Services Page**
- Medical services fetched directly from database
- 8 medical specialties including:
  - Primary Care
  - Cardiology
  - Neurology
  - Orthopedics
  - Pediatrics
  - Ophthalmology
  - Pulmonology
  - Dermatology
- Each service shows duration, price, and available specialists

### 📅 **3. Appointment Scheduling System**
Patients can:
- Select date, time, and medical specialty
- Choose preferred doctor
- Schedule appointments
- View their appointment history
- Automatically attach their account’s email
- Receive confirmation email when approved (admin side)

### 👨‍⚕️ **4. Patient Authentication**
Powered by **NextAuth.js**:
- Google OAuth login
- Email + Password login
- Custom MongoDBAdapter integration
- Auth-protected patient dashboard
- Email verification for new accounts

### 📧 **5. Email Integration**
- Sends appointment confirmation emails to patients
- Password reset emails with secure tokens
- Email verification for new registrations
- Production emails handled via Nodemailer
- Secure environment variable setup

### 🗄️ **6. MongoDB Integration**
- Patient data stored using Mongoose
- Appointment model with:
  - patient name
  - email
  - phone
  - date
  - time
  - number of patients
  - doctor preference
  - appointment status ("pending", "confirmed", "cancelled", "completed")

### 🛠️ **7. Full API Architecture (REST)**
Includes:
- `/api/register`
- `/api/appointments`
- `/api/user/appointments`
- `/api/auth` (NextAuth)
- `/api/user/upload` (Profile images)
- `/api/verify` (Email verification)

### 🔐 **8. Protected Pages**
- Patient dashboard hidden for unauthenticated users
- Appointment scheduling requires authentication
- Server session validated with `getServerSession`

### 📊 **9. Patient Dashboard**
- View upcoming appointments
- Track appointment history
- Update profile information
- Access medical records (coming soon)

---

## 🏗️ How It Was Built

### 🧱 **Tech Stack**
- **Next.js 15 (App Router + Pages Router)**
- **TypeScript**
- **MongoDB + Mongoose**
- **NextAuth.js**
- **Tailwind CSS**
- **Shadcn UI**
- **Nodemailer**
- **Framer Motion** (animations)
- **GSAP** (scroll animations)

### 🧩 **Architecture**
- Modular component design
- Database connections optimized to avoid duplicates
- Server Actions used where appropriate
- API routes separated cleanly under `/app/api/*`
- Email templates using React Email

### 📦 **Deployment**
- Hosted on **Vercel**
- MongoDB hosted via **MongoDB Atlas**
- Environment variables stored securely in Vercel project settings

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB database
- Gmail account (for emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DevMaloof/maloof-health-patient.git
   cd maloof-health-patient