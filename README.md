# E-Commerce Web Application

A full-featured, production-ready e-commerce web application built with React, TypeScript, and Vite, similar to Amazon.

## Features

### User Features
- ✅ Product listing with search and filters
- ✅ Product details page
- ✅ Shopping cart (add, remove, update quantity)
- ✅ Checkout process with payment UI
- ✅ User authentication (Login/Register)
- ✅ User profile management
- ✅ Order history

### Admin Features
- ✅ Admin dashboard with statistics and charts
- ✅ Products CRUD (Create, Read, Update, Delete)
- ✅ Categories management
- ✅ Orders management
- ✅ Users management
- ✅ Sales statistics and revenue charts

### Technical Features
- ✅ React 18 with TypeScript
- ✅ Vite for fast development
- ✅ TailwindCSS for styling
- ✅ React Router for navigation
- ✅ Zustand for state management
- ✅ JWT-based authentication
- ✅ Protected routes (user & admin)
- ✅ Mock API with JSON Server
- ✅ Responsive design
- ✅ Dark Mode support
- ✅ Loading states and error handling
- ✅ 50+ products in database

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the JSON Server (mock API) in one terminal:
```bash
npm run server
```

3. Start the development server in another terminal:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Demo Credentials

### Admin Account
- Email: `admin@example.com`
- Password: `admin123`

### User Account
- Email: `user@example.com`
- Password: `user123`

## How to Access Admin Dashboard

1. **Login as Admin:**
   - Go to `/login` page
   - Use admin credentials: `admin@example.com` / `admin123`
   - After login, you'll see an "Admin" link in the header
   - Click on "Admin" or navigate to `/admin`

2. **Admin Dashboard Features:**
   - View statistics and charts
   - Manage products (add, edit, delete)
   - Manage categories
   - Manage orders and update status
   - Manage users

3. **Direct URL:**
   - After logging in as admin, you can access: `http://localhost:3000/admin`
   - Note: Non-admin users will be redirected if they try to access admin routes

## Dark Mode

The application includes a beautiful Dark Mode feature:
- Click the moon/sun icon in the header to toggle between light and dark themes
- Your preference is saved automatically
- All pages support dark mode with smooth transitions

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Header, Footer, Layout
│   └── ...
├── pages/              # Page components
│   ├── Admin/          # Admin dashboard pages
│   └── ...
├── services/           # API service layer
├── store/              # Zustand state management
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── App.tsx             # Main app component with routing
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start JSON Server (mock API)

## Backend Integration

The application is structured to easily integrate with a real backend API. Simply:

1. Update the `API_URL` in `src/services/api.ts`
2. Ensure your backend follows the same API structure
3. The service layer will automatically use the real API instead of mocks

## Security Features

- JWT token-based authentication
- Protected routes for authenticated users
- Admin-only routes with role-based access control
- Secure token storage using Zustand persist middleware
- Automatic token validation and logout on expiration

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Routing
- **Zustand** - State management
- **Axios** - HTTP client
- **JSON Server** - Mock API
- **Recharts** - Charts for admin dashboard
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## License

MIT
