
"use client";

import { useEffect, useState, useRef } from "react";
import { useActionState } from "react"; // Correct import for useActionState
// useFormStatus is correctly imported in UrlInputForm where it's used
import { AppHeader } from "@/components/accent-analyzer/AppHeader";
import { UrlInputForm } from "@/components/accent-analyzer/UrlInputForm";
import { ResultsDisplay } from "@/components/accent-analyzer/ResultsDisplay";
import { LoadingIndicator } from "@/components/accent-analyzer/LoadingIndicator";
import { analyzeAccentAction } from "@/lib/actions";
import type { AnalysisResult } from "@/types";
import { useToast } from "@/hooks/use-toast";

const initialState: { result?: AnalysisResult; error?: string; fieldErrors?: { videoUrl?: string[] } } = {};

export default function AccentAnalyzerPage() {
  // serverActionFormDispatch is the function to be called by the form.
  // state is the result of the action.
  const [state, serverActionFormDispatch] = useActionState(analyzeAccentAction, initialState);
  const [isLoading, setIsLoading] = useState(false); // For UI feedback during submission
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();
  
  // Ref to track if form submission has been initiated.
  const formSubmittedRef = useRef(false);

  // This effect reacts to the state changes from useActionState
  useEffect(() => {
    if (formSubmittedRef.current) { // Only act if a submission was made
      setIsLoading(false); // Action finished, stop loading

      if (state.result) {
        setAnalysisResult(state.result);
        toast({
          title: "Analysis Successful!",
          description: `Detected accent: ${state.result.accent}`,
        });
      } else if (state.error || state.fieldErrors) { // Check for any error
        setAnalysisResult(null);
        toast({
          title: state.fieldErrors ? "Invalid Input" : "Analysis Failed",
          description: state.fieldErrors?.videoUrl?.join(", ") || state.error || "An unknown error occurred.",
          variant: "destructive",
        });
      }
      formSubmittedRef.current = false; // Reset ref for the next submission
    }
  }, [state, toast]);
  
  // Wrapper to set loading state and track submission before calling the server action dispatcher.
  // This is what the form will call.
  const formActionWithLoading = (formData: FormData) => {
    setIsLoading(true);
    formSubmittedRef.current = true; // Mark that a submission is in progress
    serverActionFormDispatch(formData); // Call the dispatcher from useActionState
  };
  
  const handleReset = () => {
    setAnalysisResult(null);
    setIsLoading(false);
    formSubmittedRef.current = false;
    // Consider re-keying UrlInputForm or adding a programmatic reset to clear its input
    // and resetting `state` by calling `serverActionFormDispatch` with a special payload
    // if `useActionState` supported resetting to initial state easily.
    // For now, this mainly clears the results view.
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-background font-sans">
      <AppHeader />
      <main className="w-full flex flex-col items-center">
        {!analysisResult && !isLoading && (
          <UrlInputForm 
            formAction={formActionWithLoading} // Pass the wrapper
            serverState={state} // Pass the server state for displaying errors
          />
        )}
        {isLoading && <LoadingIndicator />}
        {!isLoading && analysisResult && (
          <ResultsDisplay result={analysisResult} onReset={handleReset} />
        )}
      </main>
      <footer className="py-8 mt-auto text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Accent Analyzer. All rights reserved.</p>
      </footer>
    </div>
  );
}
