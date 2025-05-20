
"use client";

import { useFormStatus } from "react-dom"; // useFormStatus is for the submit button pending state
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Search, Loader2 } from "lucide-react";

// The formAction prop is now (formData: FormData) => void
// The serverState is the state from the parent's useActionState, containing results or errors
interface UrlInputFormProps {
  formAction: (formData: FormData) => void;
  serverState: { result?: any; error?: string; fieldErrors?: { videoUrl?: string[] } };
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" disabled={pending} aria-label="Analyze Accent">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Search className="mr-2 h-4 w-4" />
          Analyze Accent
        </>
      )}
    </Button>
  );
}

export function UrlInputForm({ formAction, serverState }: UrlInputFormProps) {
  // No local useActionState. Errors and results are handled by the parent via serverState.
  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader>
        <div className="flex items-center mb-2">
          <Film className="w-6 h-6 mr-2 text-accent" />
          <CardTitle className="text-2xl">Analyze Video Accent</CardTitle>
        </div>
        <CardDescription>
          Enter a public video URL (e.g., YouTube, Vimeo) to analyze the speaker's accent.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* The form's action prop directly takes the passed `formAction` */}
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="videoUrl" className="text-base">Video URL</Label>
            <Input
              id="videoUrl"
              name="videoUrl"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              required
              className="text-base"
              aria-describedby="videoUrlError"
              // To clear input on successful submission or reset, this could be a controlled component
              // or the form could be reset by changing its key in the parent.
            />
            {/* Display field-specific errors from serverState passed from parent */}
            {serverState?.fieldErrors?.videoUrl && (
              <p id="videoUrlError" className="text-sm text-destructive">
                {serverState.fieldErrors.videoUrl.join(", ")}
              </p>
            )}
          </div>
          <SubmitButton />
          {/* Display general error from serverState */}
          {serverState?.error && !serverState?.fieldErrors && (
            <p className="text-sm text-destructive mt-2">{serverState.error}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
