"use client";

import { useEffect, useState, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { AppHeader } from "@/components/accent-analyzer/AppHeader";
import { UrlInputForm } from "@/components/accent-analyzer/UrlInputForm";
import { ResultsDisplay } from "@/components/accent-analyzer/ResultsDisplay";
import { LoadingIndicator } from "@/components/accent-analyzer/LoadingIndicator";
import { analyzeAccentAction } from "@/lib/actions";
import type { AnalysisResult } from "@/types";
import { useToast } from "@/hooks/use-toast";

const initialState: { result?: AnalysisResult; error?: string; fieldErrors?: { videoUrl?: string[] } } = {};

export default function AccentAnalyzerPage() {
  const [state, formAction] = useFormState(analyzeAccentAction, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();
  
  // Ref to track if form submission is occurring, to distinguish from initial load
  const formSubmittedRef = useRef(false);

  // Effect to handle form submission status (loading state)
  // This requires a way to know when useFormStatus().pending changes.
  // A common pattern is to manage isLoading based on the form submission starting and `state` updating.
  // Since useFormStatus can only be used in components rendered by the form, 
  // we can infer loading if formSubmittedRef is true and state hasn't updated yet, or use a state variable in UrlInputForm.
  // For simplicity, we'll manage a general isLoading triggered by form submission intention.

  useEffect(() => {
    if (formSubmittedRef.current) { // Only process if form was actually submitted
      setIsLoading(false); // Stop loading once state updates
      if (state.result) {
        setAnalysisResult(state.result);
        toast({
          title: "Analysis Successful!",
          description: `Detected accent: ${state.result.accent}`,
        });
      } else if (state.error && !state.fieldErrors) {
        setAnalysisResult(null); // Clear previous results on error
        toast({
          title: "Analysis Failed",
          description: state.error,
          variant: "destructive",
        });
      } else if (state.fieldErrors?.videoUrl) {
         setAnalysisResult(null); // Clear previous results on field error
         toast({
          title: "Invalid Input",
          description: state.fieldErrors.videoUrl.join(", "),
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    formSubmittedRef.current = true; // Mark that a submission attempt is happening
    // The formAction will be called by the form's native submission
  };
  
  const handleReset = () => {
    setAnalysisResult(null);
    setIsLoading(false);
    formSubmittedRef.current = false;
    // Reset form state if possible - typically by resetting the key of the form or programmatically
    // For useFormState, typically we'd want to clear the `state` too, but that's managed by `formAction`.
    // We can reset the visual input by manipulating the form element if needed, or rely on new submission.
    // For now, just clearing the result is the main goal.
    // A better reset would involve re-initializing the form state itself if UrlInputForm holds its own input state.
    // If UrlInputForm is purely controlled by `react-dom` form state, this is harder.
    // Let's assume a new analysis will overwrite.
  };

  // This wrapper for formAction is to set loading state
  // when the form is submitted via its 'action' prop directly.
  const wrappedFormAction = (currentState: any, formData: FormData) => {
    setIsLoading(true);
    formSubmittedRef.current = true;
    return formAction(currentState, formData);
  };


  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-background font-sans">
      <AppHeader />
      <main className="w-full flex flex-col items-center">
        {!analysisResult && !isLoading && (
           // Pass wrappedFormAction to UrlInputForm
          <UrlInputForm formAction={wrappedFormAction} initialState={initialState} />
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
