import type { AnalysisResult } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Target, Percent, MessageSquareText, MapPin, RefreshCw } from "lucide-react";

interface ResultsDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  return (
    <Card className="w-full max-w-2xl shadow-lg mt-8 animate-fadeIn">
      <CardHeader>
        <div className="flex items-center mb-2">
          <Target className="w-6 h-6 mr-2 text-accent" />
          <CardTitle className="text-2xl">Analysis Complete</CardTitle>
        </div>
        <CardDescription>
          Here are the details of the detected accent:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 border rounded-lg bg-secondary/30">
          <div className="flex items-center mb-3">
            {result.imageUrl && (
              <Image 
                src={result.imageUrl} 
                alt={result.dataAiHint || "Accent flag"} 
                width={60} 
                height={40} 
                className="rounded-md mr-4 border"
                data-ai-hint={result.dataAiHint}
              />
            )}
            <div>
              <h3 className="text-2xl font-semibold text-primary">{result.accent}</h3>
              {result.region && (
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{result.region}</span>
                </div>
              )}
            </div>
          </div>
        
          <div className="flex items-center text-lg mb-3">
            <Percent className="w-5 h-5 mr-2 text-muted-foreground" />
            <span className="font-medium">Confidence:</span>
            <Badge variant="default" className="ml-2 text-lg bg-primary text-primary-foreground">
              {result.confidence}%
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <MessageSquareText className="w-5 h-5 mr-2 text-muted-foreground" />
            <h4 className="text-lg font-semibold">Linguistic Explanation:</h4>
          </div>
          <p className="text-muted-foreground leading-relaxed text-justify bg-background p-3 rounded-md border">
            {result.explanation}
          </p>
        </div>
        
        <Button onClick={onReset} variant="outline" className="w-full sm:w-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Analyze Another URL
        </Button>
      </CardContent>
    </Card>
  );
}

// CSS for fade-in animation (add to globals.css or a relevant style sheet if not already covered by tailwind animate)
// @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
// .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
// Note: Tailwind CSS already has animation utilities that can be used directly, e.g. data-[state=open]:animate-in data-[state=open]:fade-in-0
// For this component, a simple class will be used and can be defined in globals.css or handled by existing setup.
// Let's assume `animate-fadeIn` is defined in a utility way if this specific keyframe is needed.
// Using Tailwind's built-in animation capabilities is preferred.
// The `animate-fadeIn` class here is a placeholder for such an animation.
// We can use `data-[state=open]:animate-in data-[state=open]:fade-in-0` pattern if this component is part of something like Dialog/Popover
// or define custom animation in tailwind.config.js. For now, will use a simple class name.
// A simple approach for tailwind.config.js:
// theme: { extend: { animation: { fadeIn: 'fadeIn 0.5s ease-out forwards' }, keyframes: { fadeIn: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0px)' } } } } }
// And then use `animate-fadeIn` class.
// For now, I'll assume it's available or a general fade-in is acceptable.
