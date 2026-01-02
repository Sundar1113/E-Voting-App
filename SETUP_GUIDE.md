# 🗳️ Online Voting System - Complete Setup Guide

## 📋 Prerequisites

Before starting, ensure you have:
- **Java 17+** installed
- **Node.js 16+** installed  
- **MySQL 8.0+** installed and running
- **Maven 3.6+** installed

## 🚀 Quick Setup Instructions

### 1. Database Setup

**Option A: Using MySQL Command Line**
```bash
# Login to MySQL (use your MySQL root password or leave empty if no password)
mysql -u root -p

# Create database and user
CREATE DATABASE voting_system;
USE voting_system;

# Exit MySQL
exit
```

**Option B: Using MySQL Workbench**
- Open MySQL Workbench
- Connect to your local MySQL instance
- Create a new schema named `voting_system`

### 2. Backend Setup (Spring Boot)

```bash
# Navigate to backend directory
cd backend

# Install dependencies and run
mvn clean install
mvn spring-boot:run
```

**Backend will start on:** `http://localhost:8080`

### 3. Frontend Setup (React)

```bash
# Navigate to frontend directory  
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

**Frontend will start on:** `http://localhost:3000`

## 🔐 Default Login Credentials

The system will automatically create these accounts on first run:

### Admin Account
- **Username:** `admin`
- **Password:** `admin123`
- **Email:** `admin@voting.com`

### User Account  
- **Username:** `user1`
- **Password:** `user123`
- **Email:** `user1@voting.com`

## 🎯 How to Use the System

### For Regular Users:
1. **Register/Login** - Create account or use existing credentials
2. **Browse Polls** - View all active elections on home page
3. **Vote** - Click on a poll to view details and cast your vote
4. **View Results** - See real-time results after voting

### For Admins:
1. **Login** - Use admin credentials
2. **Create Poll** - Click "Create Poll" button in header
3. **Add Options** - Add multiple voting options (minimum 2)
4. **Set Schedule** - Define start and end times for voting
5. **Monitor** - View all polls and their status

## 🛠️ Troubleshooting

### Common Issues:

**1. MySQL Connection Error**
```
Error: Access denied for user 'root'@'localhost'
```
**Solution:** Update `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```

**2. Port Already in Use**
```
Error: Port 8080 is already in use
```
**Solution:** Kill the process using port 8080 or change port in `application.properties`:
```properties
server.port=8081
```

**3. Frontend Build Errors**
```
Error: npm install fails
```
**Solution:** Clear npm cache and reinstall:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Encryption** - BCrypt hashing
- **One Vote Per User** - Database constraints prevent fraud
- **Role-Based Access** - Admin/User permissions
- **CORS Protection** - Secure cross-origin requests
- **Input Validation** - Server-side validation

## 📱 System Features

### User Features:
- ✅ Secure registration and login
- ✅ View active polls with real-time data
- ✅ Cast votes with immediate feedback
- ✅ View live results with percentages
- ✅ Vote status tracking
- ✅ Responsive mobile-friendly design

### Admin Features:
- ✅ Create and manage polls
- ✅ Set voting time periods
- ✅ Add multiple voting options
- ✅ Monitor poll status and results
- ✅ User management capabilities

### Technical Features:
- ✅ Real-time vote counting
- ✅ Fraud prevention mechanisms
- ✅ Modern responsive UI
- ✅ RESTful API architecture
- ✅ Database relationship integrity
- ✅ Comprehensive error handling

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Polls
- `GET /api/polls` - Get all active polls
- `GET /api/polls/{id}` - Get specific poll details
- `POST /api/polls` - Create new poll (Admin only)
- `POST /api/polls/vote` - Cast vote

## 📊 Database Schema

The system uses 4 main tables:
- **users** - User accounts and roles
- **polls** - Election/poll information
- **options** - Voting choices for each poll
- **votes** - Vote records with fraud prevention

## 🎨 UI Screenshots

The system features:
- Modern Material-UI design
- Real-time vote progress bars
- Status indicators for polls
- Responsive layout for all devices
- Intuitive navigation and user flow

## 🚦 System Status

Once everything is running:
- ✅ Backend API: `http://localhost:8080`
- ✅ Frontend UI: `http://localhost:3000`
- ✅ Database: MySQL on port 3306

## 📞 Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all prerequisites are installed
3. Ensure MySQL is running and accessible
4. Check that all ports are available
5. Review the troubleshooting section above

---

**🎉 Your secure online voting system is now ready to use!**