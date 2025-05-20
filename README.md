# **App Name**: Accent Analyzer

## Core Features:

- Video and Audio Processing: Accept a public video URL (e.g., YouTube, Vimeo). Automatically download and process the video to extract the audio track. Support major video formats and implement basic error handling for invalid URLs.
- Accent Classification: Use a pre-trained deep learning model tool (e.g., fine-tuned Wav2Vec 2.0 or Whisper) to analyze the speaker’s audio and classify the English accent. Categorize into regional variants (e.g., American - General, Southern; British - RP, Northern; Australian, Indian, etc.).
- Result Display: Clearly show the predicted accent along with a confidence score (0-100%). If multiple speakers are detected, provide speaker segmentation with individual results.
- Explanation Generation: Use model interpretability tool (e.g., SHAP, LIME, or integrated model logs) to provide a short explanation about why the accent was classified a certain way, using keywords like pitch, vowel usage, phoneme patterns.
- User Interface: A minimalist interface that includes: - A URL input field - A clear “Analyze” button - A results display section with accent label, confidence score, and explanation (if available) - A loading animation or progress bar during processing - Option to re-analyze or input a new URL

## Style Guidelines:

- Soft blue (#64B5F6) — conveys trustworthiness and clarity.
- Light gray (#F5F5F5) — provides a clean and neutral backdrop.
- Orange (#FFB74D) — used for call-to-action buttons and highlighted results (e.g., top confidence score).
- Use a clean, readable sans-serif font such as Inter or Open Sans for all UI elements.
- Simple, geometric icons to represent features like “analyze,” “audio processing,” and various accent types (e.g., flags or abstract waveforms).
- Clear separation between input (top section) and results (lower section). Use card components to display results with icons, text, and confidence score. Mobile-responsive with optimized display for desktop and mobile.
- Subtle animations (e.g., spinner during loading, fade-in effect for results) to enhance feedback during processing without distracting the user.
