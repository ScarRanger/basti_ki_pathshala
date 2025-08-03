# # Basti Ki Pathshala - Internship & Volunteer Application Platform

A modern web application built with the MERN stack that allows people to apply for internship and volunteer positions. Features include a public-facing application form and an admin dashboard for managing applications.

## 🚀 Features

- **Home Page**: Information about internship and volunteer opportunities
- **Application Forms**: Separate forms for intern and volunteer applications
- **Admin Dashboard**: 
  - View all applications
  - Filter by type (intern/volunteer) and status
  - Approve, reject, or mark applications as pending
  - Delete applications
  - Application statistics
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Instant feedback using toast notifications

## 🛠️ Tech Stack

- **Frontend**: React.js with Vite
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Styling**: CSS3 with modern design patterns
- **Routing**: React Router
- **State Management**: React Hooks
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Vercel account (for deployment)

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd basti_ki_pathshala
npm install
```

### 2. Database Setup

1. Create a new project at [Supabase](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Copy and run the SQL from `DATABASE_SETUP.md` to create the required tables
4. Note your project URL and anon key from the API settings

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_ADMIN_PASSWORD=admin123
```

### 4. Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Admin Access

- Navigate to `/admin`
- Default password: `admin123` (change this in production)

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to [Vercel](https://vercel.com)
3. Set the following environment variables in Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_PASSWORD`
4. Deploy!

## 📁 Project Structure

```
basti_ki_pathshala/
├── api/                    # Vercel serverless functions
│   └── applications.js     # API endpoints for applications
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── AdminLogin.jsx
│   │   └── ApplicationCard.jsx
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx
│   │   ├── RegistrationForm.jsx
│   │   └── AdminView.jsx
│   ├── utils/             # Utility functions
│   │   └── supabase.js    # Database operations
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── public/                # Static assets
├── .env                   # Environment variables
├── vercel.json           # Vercel configuration
├── DATABASE_SETUP.md     # Database schema
└── README.md             # This file
```

## 🔒 Security Considerations

- Change the default admin password in production
- Consider implementing JWT-based authentication for admin access
- Set up proper Row Level Security (RLS) policies in Supabase
- Validate and sanitize all user inputs
- Use environment variables for all sensitive data

## 🎯 Usage

### For Applicants
1. Visit the home page
2. Choose "Apply as Intern" or "Apply as Volunteer"
3. Fill out the application form
4. Submit and receive confirmation

### For Administrators
1. Navigate to `/admin`
2. Enter admin password
3. View and manage applications:
   - Filter by type or status
   - Approve/reject applications
   - View detailed application information
   - Delete applications if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎉 Acknowledgments

- Built with love for educational and social impact
- Thanks to the open-source community for the amazing tools and libraries+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
