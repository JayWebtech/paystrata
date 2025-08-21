# StarkPay Admin Setup Guide

This guide will help you set up the admin functionality for StarkPay using the server backend instead of Supabase.

## Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

## Backend Setup

### 1. Navigate to Server Directory
```bash
cd server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the example environment file and configure it:
```bash
cp env.example .env
```

Update `.env` with your configuration:
```env
PORT=3001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=starkpay
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h

# External APIs
NEXT_PUBLIC_BASE_URL=https://api.example.com
NEXT_USER_ID=your_user_id
NEXT_PRIVATE_KEY=your_private_key

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 4. Database Setup
```bash
# Create PostgreSQL database
createdb starkpay

# The server will automatically create tables on first run
```

### 5. Create Admin User
```bash
npm run setup-admin
```

This will create a default admin user:
- **Email**: admin@starkpay.com
- **Password**: admin123

⚠️ **Important**: Change the password after first login!

### 6. Start the Server
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## Frontend Setup

### 1. Environment Configuration
Create or update your `.env.local` file in the frontend root:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

### 2. Start the Frontend
```bash
npm run dev
```

## Admin Features

### Authentication
- JWT-based authentication
- Secure password hashing with bcrypt
- Token expiration handling

### Dashboard
- Real-time analytics
- Transaction overview
- Revenue and profit tracking
- Success rate monitoring

### Transaction Management
- View all transactions with pagination
- Search transactions by reference or wallet address
- Filter by status
- Export functionality

### Pending Transactions
- Monitor pending transactions
- Process or cancel transactions
- Status tracking

### Refunds
- Create refund requests
- Process refunds
- Track refund status
- Refund history

### Search Functionality
- Search by reference code
- Search by wallet address
- Real-time results

## API Endpoints

### Admin Routes
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/transactions` - Get transactions with pagination
- `GET /api/admin/pending-transactions` - Get pending transactions
- `GET /api/admin/search-txn` - Search transactions

### Refund Routes
- `POST /api/refunds` - Create refund
- `GET /api/refunds` - Get all refunds with pagination
- `PUT /api/refunds/:id/process` - Process refund

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **CORS Protection**: Configured for frontend security
- **Rate Limiting**: Prevents abuse
- **Input Validation**: All endpoints validated
- **SQL Injection Protection**: Parameterized queries

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **JWT Token Issues**
   - Check `JWT_SECRET` in environment
   - Verify token expiration settings

3. **CORS Errors**
   - Update `CORS_ORIGIN` in backend `.env`
   - Ensure frontend URL matches

4. **Admin Login Fails**
   - Run `npm run setup-admin` to create admin user
   - Check database connection
   - Verify admin user exists in database

### Logs
Check server logs for detailed error information:
```bash
npm run dev
```

## Production Deployment

1. **Environment Variables**: Set production environment variables
2. **Database**: Use production PostgreSQL instance
3. **Security**: Update JWT secret and CORS settings
4. **SSL**: Enable HTTPS for production
5. **Monitoring**: Set up logging and monitoring

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review server logs
3. Verify environment configuration
4. Test database connectivity
