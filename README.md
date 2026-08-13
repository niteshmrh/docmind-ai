# DocMind AI

DocMind AI is an AI-powered document assistant that allows users to upload documents, process them, and interact with their content through an intelligent chat interface.

Users can manage their documents, ask questions about uploaded files, maintain persistent conversations, and manage their account through a dashboard.

---

## Features

### Authentication

- User registration and login
- JWT access and refresh tokens
- Automatic logout when authentication expires
- Protected dashboard routes
- Secure password hashing with bcrypt
- Refresh token management
- Logout functionality

### Document Management

- Upload documents
- Document processing status
- Search documents
- Filter documents by status
- Delete documents
- Document metadata management
- Support for PDF, DOCX, TXT, CSV, XLSX, and image files

### AI Document Chat

- Ask questions about uploaded documents
- Persistent chat history
- Markdown-formatted AI responses
- Copy AI responses
- Chat loading and error states
- Continue previous conversations
- One chat session per user/document
- User and assistant message persistence

### Dashboard

- Document overview
- Document statistics
- Chat sessions
- Responsive sidebar
- Responsive navigation bar
- User menu
- Quick actions

### Profile

- View account information
- Update name
- Update email
- View account role
- View email verification status
- View account creation date

### Settings

- Change password
- Password confirmation
- Password visibility controls
- Automatic logout after password change

---

## Tech Stack

### Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Zod
- Axios
- React Markdown
- Remark GFM
- Lucide React
- Sonner

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt
- Zod

### Database

- PostgreSQL
- Prisma ORM

---

## Project Structure

```text
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

```

## Copyright

Copyright © 2026 Nitesh Kumar.

This project is licensed under the MIT License. See the `LICENSE` file for details.
