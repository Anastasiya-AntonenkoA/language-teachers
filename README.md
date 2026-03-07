Language Tutors Marketplace - a modern web application for finding and booking language tutors. Users can browse a list of professional teachers, filter them by various criteria, and manage their favorite tutors in a personalized dashboard.

Features:

1. Interactive Teacher Catalog: browse a comprehensive list of language tutors with detailed profiles.
2. Advanced Filtering: filter teachers by language, student level, and hourly rate to find the perfect match.
3. Dynamic Loading: optimized performance with "Load More" pagination fetching data from Firebase.
4. Authentication: secure Sign-Up and Sign-In functionality using Firebase Auth.
5. Favorites System: authenticated users can save tutors to a "Favorites" list (persisted via Firebase).
6. Trial Lesson Booking: integrated modal forms for booking trial lessons with built-in validation.
7. Protected Routes: exclusive access to the Favorites page for logged-in users.
8. Dynamic Theming: personalize the interface with 5 distinct color themes. The application uses Zustand for state management and CSS Variables for instant UI updates, persisting the user's choice across sessions via localStorage.

Tech Stack:

Frontend & Logic

- Framework: Next.js (React) — for SSR/Static generation and routing.
- Language: TypeScript — for type safety.
- State Management: Zustand — lightweight and fast state management for themes and user data.
- Styling: CSS Modules — for scoped and maintainable styles.
- Form Handling: React Hook Form with Yup — for robust form validation (Login, Registration, Booking).

Backend & Infrastructure

- Runtime Environment: Node.js — the foundation for the development environment and Next.js server.
- Backend-as-a-Service: Firebase
- Authentication: Secure email/password login and registration.
- Realtime Database: Efficient NoSQL storage for tutor profiles and user interactions.

Technical Implemented:

1.  Firebase Integration: full auth cycle (Register, Login, Logout, Session persistence).
2.  Realtime Database: structured storage for teacher profiles and user data.
3.  Form Validation: strict validation for Auth and Booking forms using Yup.
4.  Modal Logic: accessible modals closing via Backdrop, 'Esc' key, or close button.
5.  Pagination: server-side data fetching with a "Load More" mechanism.
6.  Favorite Logic: toggle heart buttons with visual feedback and data synchronization.

Preview:
Home page:
![Home page](image-1.png)

Different themes:

|                    Green Theme                    |                   Red Theme                   |
| :-----------------------------------------------: | :-------------------------------------------: |
| ![Green theme](public\images\assets\green_th.png) | ![Red Theme](public\images\assets\red_th.png) |

Autorithation:

|                  Log In                   |                      Registration                      |
| :---------------------------------------: | :----------------------------------------------------: |
| ![Log In](public\images\assets\login.png) | ![Registration](public\images\assets\registration.png) |

Teacher list:
![Teacher page](public\images\assets\teachers.png)

Favorites list (only for registrations users):
![Favorites page](public\images\assets\favorites.png)

Installation & Setup:

Clone the repository:

        Bash
        git clone git@github.com:Anastasiya-AntonenkoA/language-teachers.git

        Bash
            npm install
        Set up Environment Variables:
        Create a .env.local file in the root directory and add your Firebase configuration:
            NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
            NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
            NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
            NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
            ...

        Run the development server:
        Bash
            npm run dev
