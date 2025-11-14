# Capstone Collab - Setup Instructions

## Quick Start Guide

### Backend Setup

1. **Install dependencies** (if not already done):
   ```bash
   cd backend
   npm install
   ```

2. **Configure Database**:
   - Update `backend/.env` with your MySQL DATABASE_URL
   - Format: `DATABASE_URL="mysql://user:password@host:port/database_name"`
   - Example for local MySQL: `DATABASE_URL="mysql://root:password@localhost:3306/capstone_db"`

3. **Run Prisma migrations**:
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push  # or npx prisma migrate deploy if using migrations
   ```

4. **Start the backend server**:
   ```bash
   cd backend
   npm start
   ```
   Server will run on `http://localhost:3000`

### Frontend Setup

1. **Install dependencies** (if not already done):
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**:
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

### Features

- ✅ Login page with email and password
- ✅ Signup page with email, password, and confirmation
- ✅ Dashboard page with protected route
- ✅ JWT token authentication
- ✅ CORS enabled for frontend-backend communication
- ✅ Beautiful, modern UI with gradient design

### API Endpoints

- `POST /signup` - Create a new user account
- `POST /login` - Login and get JWT token
- `GET /protected` - Access protected data (requires JWT token)

### Testing

1. Start both backend and frontend servers
2. Open `http://localhost:5173` in your browser
3. Click "Sign up" to create a new account
4. After signup, you'll be redirected to login
5. Login with your credentials
6. You'll see the dashboard with your user info and protected data

### Troubleshooting

- **Database connection error**: Check your DATABASE_URL in `backend/.env`
- **CORS errors**: Make sure backend is running on port 3000 and frontend on 5173
- **Prisma errors**: Run `npx prisma generate` in the backend folder
- **Port already in use**: Kill existing processes or change ports in the code

