Full-Stack Next.js 16 App

A small full-stack demo application built with Next.js 16, Mongoose, and Server Actions. This project showcases modern full-stack patterns using the App Router, including:
	•	🔗 MongoDB integration using Mongoose
	•	⚙️ Server Actions for secure backend logic
	•	🚀 Caching for components and API routes
	•	📩 Email submission with database storage
	•	🧩 API route examples
	•	🎨 Clean and modern UI

⸻

📸 Screenshots
<img width="1728" height="926" alt="Screenshot 2025-11-19 at 1 16 03 AM" src="https://github.com/user-attachments/assets/c04ce303-e8ad-4fcd-9b10-a8bd76c70f2c" />

Below are some screenshots from the project UI:
<img width="1728" height="926" alt="Screenshot 2025-11-19 at 1 16 24 AM" src="https://github.com/user-attachments/assets/c8310d1f-8fb1-4d94-a818-83f23a1095aa" />
<img width="1728" height="926" alt="Screenshot 2025-11-19 at 1 16 30 AM" src="https://github.com/user-attachments/assets/861edecb-d08d-4114-9706-06037a713795" />


⸻

🏗️ Tech Stack

Layer	Technology
Frontend	Next.js 16 (App Router)
Backend	Next.js Server Actions & API Routes
Database	MongoDB + Mongoose
Styling	Tailwind CSS / any UI styling (customizable)


⸻

📦 Features

🔐 1. Mongoose Database Integration
	•	Simple and reusable database connection helper
	•	Schemas for storing email submissions
	•	Auto-created collections on demand

⚙️ 2. Server Actions
	•	Server-side form handling
	•	Secure database writes
	•	No client-side API call required

🚀 3. Cached Components & API Responses
	•	Uses fetchCache, revalidateTag, and unstable_cache
	•	Fine-grained caching for UI and API routes
	•	Automatic revalidation for new DB entries

📩 4. Email Submission Form
	•	A simple form that sends data using a server action
	•	Stores email in MongoDB
	•	UI updates instantly using revalidation

🧩 5. API Routes

Includes examples such as:
	•	GET /api/emails – fetch all emails
	•	POST /api/submit – submit email data

⸻

📁 Project Structure

src/
├── app/
│   ├── actions/        # Server Actions
│   ├── api/            # API Routes
│   ├── components/     # UI Components
│   ├── page.tsx        # Home Page
│   └── layout.tsx
├── lib/
│   ├── db.ts           # Mongoose connection
│   └── models/         # Mongoose Models
└── styles/


⸻

⚙️ Setup & Installation

1️⃣ Clone the project

git clone https://github.com/AhmedMedhat77/dev-events.git
cd nextjs-fullstack-demo

2️⃣ Install dependencies

pnpm install

or

yarn

3️⃣ Create your .env file

MONGODB_URI=mongodb+srv://...

4️⃣ Run the development server

pnpm run dev

Open http://localhost:3000 🎉

⸻

🧪 API Examples

Fetch all Events

GET /api/events

POST /api/events

fetch events by slug 

GET /api/events/slug

Join events
createBooking Server action 

⸻

🧹 TODO / Improvements
	•	Add loading states
	•	Add authentication example
	•	Add tests (Playwright / Jest)
  •	Add ENV:
  MONGODB_URI=
  CLOUDINARY_URL=
  NEXT_PUBLIC_BASE_URL=
⸻

💬 Feedback

If you’d like improvements to this README or want to expand the project into a full tutorial, feel free to ask!
