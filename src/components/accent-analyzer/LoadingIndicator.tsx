import { Loader2 } from 'lucide-react';

interface LoadingIndicatorProps {
  text?: string;
}

export function LoadingIndicator({ text = "Analyzing audio..." }: LoadingIndicatorProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Loader2 className="w-12 h-12 animate-spin text-primary" />
      <p className="text-lg text-muted-foreground">{text}</p>
    </div>
  );
}
