'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Document } from '@/features/document/types/document.types';

interface NewChatDialogProps {
  documents: Document[];
  onCreate: (documentId: string, title: string) => Promise<void>;
  isCreating?: boolean;
}

export default function NewChatDialog({ documents, onCreate, isCreating }: NewChatDialogProps) {
  const [open, setOpen] = useState(false);
  const [documentId, setDocumentId] = useState('');
  const [title, setTitle] = useState('');

  const readyDocuments = documents.filter((document) => document.status === 'READY');

  async function handleCreate() {
    if (!documentId || !title.trim()) {
      return;
    }

    await onCreate(documentId, title.trim());

    setTitle('');
    setDocumentId('');
    setOpen(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="
        shrink-0
        rounded-lg
        px-3
        shadow-sm
      "
        >
          <Plus className="mr-1.5 h-4 w-4" />
          <span>New Chat</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Create New Chat</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Document</label>

            {readyDocuments.length === 0 ? (
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">No ready documents available.</p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Upload and process a document first.
                </p>
              </div>
            ) : (
              <select
                value={documentId}
                onChange={(event) => setDocumentId(event.target.value)}
                className="
              h-10
              w-full
              rounded-lg
              border
              border-input
              bg-background
              px-3
              text-sm
              outline-none
              transition-colors
              focus:border-primary
              focus:ring-2
              focus:ring-primary/10
            "
              >
                <option value="">Select a document</option>

                {readyDocuments.map((document) => (
                  <option key={document.id} value={document.id}>
                    {document.originalName}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Conversation title</label>

            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Resume Discussion"
              className="rounded-lg"
            />
          </div>

          <Button
            className="w-full rounded-lg"
            onClick={handleCreate}
            disabled={!documentId || !title.trim() || isCreating || readyDocuments.length === 0}
          >
            {isCreating ? 'Creating...' : 'Create Chat'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// <Dialog open={open} onOpenChange={setOpen}>
//   <DialogTrigger asChild>
//     <Button className="w-full">
//       <Plus className="mr-2 h-4 w-4" />
//       New Chat
//     </Button>
//   </DialogTrigger>

//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>Create New Chat</DialogTitle>
//     </DialogHeader>

//     <div className="space-y-5">
//       <div>
//         <label className="mb-2 block text-sm font-medium">Document</label>

//         {readyDocuments.length === 0 ? (
//           <p className="rounded-lg border p-3 text-sm text-muted-foreground">
//             No ready documents available. Upload and process a document first.
//           </p>
//         ) : (
//           <select
//             value={documentId}
//             onChange={(event) => setDocumentId(event.target.value)}
//             className="w-full rounded-md border bg-background px-3 py-2 text-sm"
//           >
//             <option value="">Select a document</option>

//             {readyDocuments.map((document) => (
//               <option key={document.id} value={document.id}>
//                 {document.originalName}
//               </option>
//             ))}
//           </select>
//         )}
//       </div>

//       <div>
//         <label className="mb-2 block text-sm font-medium">Conversation title</label>

//         <Input
//           value={title}
//           onChange={(event) => setTitle(event.target.value)}
//           placeholder="e.g. Resume Discussion"
//         />
//       </div>

//       <Button
//         className="w-full"
//         onClick={handleCreate}
//         disabled={!documentId || !title.trim() || isCreating || readyDocuments.length === 0}
//       >
//         {isCreating ? 'Creating...' : 'Create Chat'}
//       </Button>
//     </div>
//   </DialogContent>
// </Dialog>
