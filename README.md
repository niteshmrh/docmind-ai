DocMind AI

DocMind AI is an AI-powered document assistant that allows users to upload documents, process them, and interact with their content through an intelligent chat interface.

Users can manage their documents, ask questions about uploaded files, maintain persistent conversations, and manage their account through a dashboard.

Features
🔐 Authentication
User registration and login
JWT access and refresh tokens
Automatic logout when authentication expires
Protected dashboard routes
Secure password hashing with bcrypt
📄 Document Management
Upload documents
Document processing status
Search documents
Filter by status
Delete documents
Supported document types include PDF, DOCX, TXT, CSV, XLSX, and images
💬 AI Document Chat
Ask questions about uploaded documents
Persistent chat history
Markdown-formatted AI responses
Copy AI responses
Chat loading/error states
Continue previous conversations
One chat session per user/document
📊 Dashboard
Document overview
Document statistics
Chat sessions
Responsive sidebar and navbar
👤 Profile
View account information
Update name and email
View account role
View verification status
⚙️ Settings
Change password
Password confirmation
Password visibility controls
Automatic logout after password change
Tech Stack
Frontend
Next.js 16
React
TypeScript
Tailwind CSS
shadcn/ui
TanStack Query
React Hook Form
Zod
Axios
React Markdown
Remark GFM
Lucide React
Sonner
Backend
Node.js
Express
TypeScript
Prisma ORM
PostgreSQL
JWT
bcrypt
Zod
Database

The application uses PostgreSQL with Prisma ORM.

Main entities include:

User
Document
DocumentChunk
ChatSession
ChatMessage
Project Structure
docmind-ai/
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   ├── Middlewares/
│   │   │   ├── Requests/
│   │   │   └── Routes/
│   │   ├── Repositories/
│   │   ├── Services/
│   │   └── Utils/
│   ├── config/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── storage/
│   │   └── uploads/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   └── (dashboard)/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── context/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   └── document/
│   │   └── lib/
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
Application Routes
Frontend Routes
Route	Description
/	Application landing/root page
/login	User login
/register	User registration
/dashboard	Main dashboard
/documents	Document management
/documents/upload	Upload a document
/chat	Document chat
/profile	User profile
/settings	Account settings
Authentication Flow

DocMind AI uses JWT-based authentication.

Register
   ↓
Login
   ↓
Access Token + Refresh Token
   ↓
Authenticated Requests
   ↓
Access Token Expired
   ↓
Refresh / Logout

The frontend stores authentication information locally and the Axios client automatically attaches the access token to API requests.

Protected backend routes use authentication middleware to identify the authenticated user.

Chat Architecture

Chat conversations are associated with both a user and a document.

User
 │
 ├── Document
 │      │
 │      └── ChatSession
 │              │
 │              ├── User Message
 │              ├── AI Message
 │              ├── User Message
 │              └── AI Message

Each user can have only one chat session for a particular document.

The database enforces this relationship with:

@@unique([userId, documentId])

This prevents duplicate chat sessions for the same user and document.

Database Schema

The primary database models are:

User

Stores account information and authentication data.

Document

Stores uploaded document metadata and processing state.

Document statuses include:

UPLOADING
PROCESSING
READY
FAILED
DocumentChunk

Stores processed document chunks and their embeddings.

ChatSession

Represents a conversation associated with a user and document.

ChatMessage

Stores individual user and assistant messages.

Roles:

USER
ASSISTANT
Environment Variables

Create environment files for both applications.

Backend

Create:

backend/.env

Example:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/docmind_ai"

JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"

PORT=5000

# Add your AI/provider configuration here
Frontend

Create:

frontend/.env.local

Example:

NEXT_PUBLIC_API_URL="http://localhost:5000"

Do not commit real environment variables or secrets to Git.

Installation

Clone the repository:

git clone https://github.com/niteshmrh/docmind-ai.git
cd docmind-ai
Backend Setup
cd backend
npm install

Configure the backend environment variables.

Then generate Prisma Client:

npx prisma generate

Run database migrations:

npx prisma migrate dev

Start the development server:

npm run dev
Frontend Setup

Open another terminal:

cd frontend
npm install

Configure:

frontend/.env.local

Then start Next.js:

npm run dev

The frontend will be available at:

http://localhost:3000
Database Migrations

After changing the Prisma schema:

cd backend
npx prisma migrate dev --name your_migration_name

To check migration status:

npx prisma migrate status

To generate the Prisma client:

npx prisma generate
Development Commands
Frontend

Install dependencies:

cd frontend
npm install

Run development server:

npm run dev

Create production build:

npm run build

Run production server:

npm run start
Backend

Install dependencies:

cd backend
npm install

Run development server:

npm run dev

Build TypeScript:

npm run build

Run production server:

npm start
Production Build

Both applications currently compile successfully with their production build commands.

Frontend:

cd frontend
npm run build

Backend:

cd backend
npm run build
API Overview

The backend exposes authentication, document, and chat functionality.

Authentication
POST   /auth/register
POST   /auth/login
GET    /auth/me
PATCH  /auth/profile
PATCH  /auth/change-password
POST   /auth/refresh-token
POST   /auth/logout
Chat

Chat functionality includes:

Create chat session
List chat sessions
Get chat history
Send message
Delete chat session
Documents

Document functionality includes:

Upload document
List documents
Get document
Delete document

The exact API prefixes and endpoint definitions are maintained in the backend route files.

Security

The application includes several security measures:

Passwords are hashed using bcrypt.
Authentication uses JWT tokens.
Protected API routes use authentication middleware.
User ownership is checked for chat sessions.
User ownership is checked before accessing chat history.
User ownership is checked before deleting chat sessions.
Refresh tokens can be invalidated during logout.
Refresh tokens are invalidated after password changes.
Environment secrets are kept outside source control.
Git Workflow

The project uses feature branches for development.

Example:

git checkout dev
git pull origin dev

git checkout -b feature/my-feature

# Make changes

git add .
git commit -m "feat: implement my feature"

git push origin feature/my-feature

Feature branches should be reviewed before being merged into dev.

Current Status

DocMind AI currently provides a functional MVP including:

Authentication
Dashboard
Document management
Document upload
AI document chat
Persistent chat sessions
Chat history
Profile management
Password management
Responsive dashboard UI

The frontend and backend production builds are passing.

Future Improvements

Potential future improvements include:

Real-time AI response streaming
Improved document processing pipeline
More advanced document search
Vector similarity search improvements
Rate limiting
Enhanced API logging
Email verification
Password reset
Account deletion
Production monitoring
Automated testing
CI/CD
Production deployment
Improved error reporting
Contributing

Contributions are welcome.

Before submitting changes:

Create a feature branch.
Make your changes.
Run the frontend build.
Run the backend build.
Test the affected functionality.
Commit your changes.
Push the feature branch.
Open a pull request against dev.
License

This project is licensed under the MIT License.

See the LICENSE file for details.

Author

Nitesh Kumar

GitHub: @niteshmrh

Acknowledgements

DocMind AI is built using open-source technologies and libraries including Next.js, React, Express, Prisma, PostgreSQL, Tailwind CSS, and other open-source packages.
