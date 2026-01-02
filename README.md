# Online Voting System

A secure, real-time online voting platform built with React.js, Spring Boot, and MySQL. Features role-based access control, fraud prevention, and modern UI design.

## 🚀 Features

### Security & Fraud Prevention
- **JWT Authentication** - Secure token-based authentication
- **One Vote Per User** - Database constraints prevent multiple votes
- **Role-Based Access** - Admin and User roles with different permissions
- **Password Encryption** - BCrypt password hashing
- **CORS Protection** - Configured for secure cross-origin requests

### User Features
- **User Registration/Login** - Secure account creation and authentication
- **View Active Polls** - Browse all available elections
- **Real-time Voting** - Cast votes with immediate feedback
- **Vote Results** - View live results with percentage breakdowns
- **Vote Status Tracking** - See if you've already voted

### Admin Features
- **Poll Creation** - Create elections with multiple options
- **Time-based Polls** - Set start and end times for voting periods
- **Poll Management** - Control poll activation and deactivation

## 🛠️ Tech Stack

- **Frontend**: React.js with TypeScript, Material-UI
- **Backend**: Spring Boot, Spring Security, JPA/Hibernate
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Build Tools**: Maven (Backend), npm (Frontend)

## 📋 Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## 🔧 Installation & Setup

### 1. Database Setup
```sql
-- Create database
CREATE DATABASE voting_system;

-- Run the setup script
mysql -u root -p voting_system < database/setup.sql
```

### 2. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend will run on `http://localhost:8080`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend will run on `http://localhost:3000`

## 🔐 Default Credentials

### Admin Account
- **Username**: admin
- **Password**: admin123
- **Email**: admin@voting.com

### User Account
- **Username**: user1
- **Password**: user123
- **Email**: user1@voting.com

## 📱 Usage Guide

### For Users:
1. **Register/Login** - Create account or login with existing credentials
2. **Browse Polls** - View all active elections on the home page
3. **Vote** - Click on a poll to view details and cast your vote
4. **View Results** - See real-time results after voting or when polls end

### For Admins:
1. **Login** - Use admin credentials to access admin features
2. **Create Poll** - Click "Create Poll" to set up new elections
3. **Set Options** - Add multiple voting options (minimum 2 required)
4. **Schedule** - Set start and end times for voting periods
5. **Monitor** - View all polls and their current status

## 🏗️ Project Structure

```
vote/
├── backend/                 # Spring Boot Application
│   ├── src/main/java/com/voting/
│   │   ├── entity/         # JPA Entities
│   │   ├── repository/     # Data Access Layer
│   │   ├── service/        # Business Logic
│   │   ├── controller/     # REST Controllers
│   │   ├── security/       # JWT & Security Config
│   │   ├── dto/           # Data Transfer Objects
│   │   └── config/        # Configuration Classes
│   └── pom.xml            # Maven Dependencies
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/    # Reusable Components
│   │   ├── pages/         # Page Components
│   │   ├── services/      # API Services
│   │   ├── context/       # React Context
│   │   └── types/         # TypeScript Types
│   └── package.json       # npm Dependencies
└── database/              # Database Scripts
    └── setup.sql          # Initial Database Setup
```

## 🔒 Security Features

### Authentication & Authorization
- JWT token-based authentication
- Role-based access control (ADMIN/USER)
- Protected routes and API endpoints
- Secure password storage with BCrypt

### Fraud Prevention
- **Unique Constraint**: Database prevents multiple votes per user per poll
- **Time Validation**: Votes only accepted during active poll periods
- **User Verification**: JWT tokens ensure authenticated users only
- **Input Validation**: Server-side validation for all inputs

### Data Protection
- CORS configuration for secure cross-origin requests
- SQL injection prevention through JPA/Hibernate
- XSS protection through input sanitization
- Secure HTTP headers configuration

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Polls
- `GET /api/polls` - Get all active polls
- `GET /api/polls/{id}` - Get poll details
- `POST /api/polls` - Create new poll (Admin only)
- `POST /api/polls/vote` - Cast vote

## 🎨 UI Features

- **Responsive Design** - Works on desktop and mobile devices
- **Material-UI Components** - Modern, accessible interface
- **Real-time Updates** - Live vote counts and percentages
- **Status Indicators** - Visual cues for poll status and voting state
- **Progress Bars** - Visual representation of vote distribution

## 🚦 Running the Application

1. **Start MySQL** service
2. **Run Backend**: `mvn spring-boot:run` in `/backend`
3. **Run Frontend**: `npm start` in `/frontend`
4. **Access Application**: Open `http://localhost:3000`

## 🔍 Testing

### Test Scenarios
1. **User Registration** - Create new accounts with different roles
2. **Poll Creation** - Admin creates polls with multiple options
3. **Voting Process** - Users vote and verify one-vote restriction
4. **Results Viewing** - Check real-time result updates
5. **Security Testing** - Verify unauthorized access prevention

## 🛡️ Production Considerations

- Change default JWT secret key
- Use environment variables for sensitive configuration
- Implement rate limiting for API endpoints
- Add comprehensive logging and monitoring
- Use HTTPS in production
- Implement database connection pooling
- Add backup and recovery procedures

## 📞 Support

For issues or questions, please check the code comments and configuration files for detailed implementation notes.