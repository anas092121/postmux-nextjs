# Full Stack AI Content Platform with Next JS, Tailwind, React Quill, ImageKit, Shadcn UI Tutorial 🔥🔥

##

### Make sure to create a `.env` file with following variables -

```
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

CLERK_JWT_ISSUER_DOMAIN=

# Imagekit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
IMAGEKIT_PRIVATE_KEY=

# Unsplash
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=

#Gemini
GEMINI_API_KEY=
```

# Steps to run

- npm run dev
- npx convex dev

# Dependencies

## 🧠 AI & Backend

- **@google/genai**, **@google/generative-ai** – Access Google Gemini APIs for text and image generation
- **convex** – Real-time backend & database service for Next.js apps
- **imagekit** – Handles image uploads, optimization, and CDN delivery

## 🔐 Authentication & User Management

- **@clerk/nextjs** – Authentication, user sessions, and role management in Next.js
- **@clerk/themes** – Prebuilt styling/themes for Clerk components

## 🎨 UI & Styling

- **@radix-ui/react-\*** – Accessible, unstyled UI primitives (Dialog, Dropdown, Tabs, etc.)
- **lucide-react** – React icon library
- **class-variance-authority** – Manage Tailwind class variants efficiently
- **clsx** – Conditional className utility
- **tailwind-merge** – Merges Tailwind classes to avoid conflicts
- **next-themes** – Manages dark/light mode themes
- **sonner** – Animated toast notifications
- **react-spinners** – Loading spinners and animations

## 🧾 Forms & Validation

- **react-hook-form** – Lightweight form state management
- **@hookform/resolvers** – Connects `react-hook-form` with schema validators like Zod
- **zod** – Schema-based validation and type safety

## 📊 Data Visualization & Interaction

- **react-chartjs-2** – React wrapper around Chart.js for charts and graphs
- **react-intersection-observer** – Detects when elements appear/disappear in viewport
- **react-dropzone** – Enables drag-and-drop file uploads
- **react-quill-new** – Rich text editor
- **react-share** – Social media share buttons

## ⚙️ Core Framework

- **next**, **react**, **react-dom** – Core Next.js and React libraries for building and rendering the app
- **date-fns** – Lightweight library for date/time formatting and manipulation
