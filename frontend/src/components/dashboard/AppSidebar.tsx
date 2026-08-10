import Link from 'next/link';

export default function AppSidebar() {
  return (
    <nav className="p-4 space-y-2">
      <Link href="/dashboard" className="block rounded px-3 py-2 hover:bg-muted">
        Dashboard
      </Link>

      <Link href="/documents" className="block rounded px-3 py-2 hover:bg-muted">
        Documents
      </Link>

      <Link href="/documents/upload" className="block rounded px-3 py-2 hover:bg-muted">
        Upload
      </Link>

      <Link href="/chat" className="block rounded px-3 py-2 hover:bg-muted">
        Chat
      </Link>

      <Link href="/settings" className="block rounded px-3 py-2 hover:bg-muted">
        Settings
      </Link>
    </nav>
  );
}
