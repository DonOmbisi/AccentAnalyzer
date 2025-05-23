import { MicVocal } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="w-full py-6 mb-8 text-center">
      <div className="flex items-center justify-center">
        <MicVocal className="w-10 h-10 mr-3 text-primary" />
        <h1 className="text-4xl font-bold text-foreground">
          Accent Analyzer
        </h1>
      </div>
      <p className="mt-2 text-lg text-muted-foreground">
        Discover regional accents from public video URLs.
      </p>
    </header>
  );
}
