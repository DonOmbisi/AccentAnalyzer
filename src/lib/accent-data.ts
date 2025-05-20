import type { AccentData } from '@/types';

export const ACCENTS_DATA: AccentData[] = [
  { 
    name: "American - General", 
    region: "USA", 
    audioFeaturesExample: "Characterized by a neutral pitch, consistent use of the rhotic 'R' sound, and the cot-caught merger where vowels in words like 'cot' and 'caught' are pronounced identically.", 
    imageUrl: "https://placehold.co/60x40.png",
    dataAiHint: "USA flag"
  },
  { 
    name: "American - Southern", 
    region: "USA", 
    audioFeaturesExample: "Features a distinctive 'Southern drawl' with elongated vowel sounds, monophthongization of the /aɪ/ diphthong (e.g., 'my' sounds like 'mah'), and often includes the pin-pen merger.", 
    imageUrl: "https://placehold.co/60x40.png",
    dataAiHint: "USA flag"
  },
  { 
    name: "British - Received Pronunciation (RP)", 
    region: "UK", 
    audioFeaturesExample: "Typically non-rhotic (the 'R' sound is dropped unless followed by a vowel), includes the TRAP-BATH split (different 'a' sounds in 'trap' and 'bath'), and has clearly distinct long vowel sounds.", 
    imageUrl: "https://placehold.co/60x40.png",
    dataAiHint: "UK flag"
  },
  { 
    name: "British - Northern England", 
    region: "UK", 
    audioFeaturesExample: "Marked by a short 'a' sound in words like 'bath' and 'grass', and the absence of the foot-strut split (words like 'foot' and 'strut' have the same vowel sound).", 
    imageUrl: "https://placehold.co/60x40.png",
    dataAiHint: "UK flag"
  },
  { 
    name: "Australian", 
    region: "Australia", 
    audioFeaturesExample: "Recognizable by its high rising intonation pattern, particularly in questions and statements, broad vowel pronunciations, and is generally non-rhotic.", 
    imageUrl: "https://placehold.co/60x40.png",
    dataAiHint: "Australia flag"
  },
  { 
    name: "Indian English", 
    region: "India", 
    audioFeaturesExample: "Often includes retroflex consonants (like 't' and 'd' pronounced with the tongue curled back), a syllable-timed rhythm rather than stress-timed, and a wide variation in vowel sounds influenced by native languages.", 
    imageUrl: "https://placehold.co/60x40.png",
    dataAiHint: "India flag"
  },
];
