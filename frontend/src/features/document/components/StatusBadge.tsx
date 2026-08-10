import { Badge } from '@/components/ui/badge';
import { DocumentStatus } from '../types/document.types';

interface Props {
  status: DocumentStatus;
}

export default function StatusBadge({ status }: Props) {
  switch (status) {
    case 'READY':
      return <Badge className="bg-green-600 hover:bg-green-600">Ready</Badge>;

    case 'PROCESSING':
      return <Badge variant="secondary">Processing</Badge>;

    case 'FAILED':
      return <Badge variant="destructive">Failed</Badge>;

    case 'UPLOADING':
      return <Badge>Uploading</Badge>;

    default:
      return <Badge>Unknown</Badge>;
  }
}
