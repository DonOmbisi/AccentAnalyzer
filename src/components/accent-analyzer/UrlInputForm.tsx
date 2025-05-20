"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Search } from "lucide-react";
import type { analyzeAccentAction } from "@/lib/actions"; // type import

interface UrlInputFormProps {
  formAction: typeof analyzeAccentAction;
  initialState: { error?: string; fieldErrors?: { videoUrl?: string[] } };
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

// Loader2 icon for button, not defined here, should be imported if used
import { Loader2 } from "lucide-react";


export function UrlInputForm({ formAction, initialState }: UrlInputFormProps) {
  const [state, dispatch] = useFormState(formAction, initialState);

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
        <form action={dispatch} className="space-y-6">
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
            />
            {state?.fieldErrors?.videoUrl && (
              <p id="videoUrlError" className="text-sm text-destructive">
                {state.fieldErrors.videoUrl.join(", ")}
              </p>
            )}
          </div>
          <SubmitButton />
           {state?.error && !state?.fieldErrors && (
            <p className="text-sm text-destructive mt-2">{state.error}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
