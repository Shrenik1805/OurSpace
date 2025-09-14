export interface Letter {
 title: string;
 content: string;
 date?: string;
 preview: string;
}

export interface LetterCategory {
 title: string;
 tag: string;
 letters: Letter[];
}

// Import and re-export the letters data from letters-new.ts
import { letterCategories as importedLetterCategories } from "./letters-new";

// Re-export the imported data
export const letterCategories: Record<string, LetterCategory> = importedLetterCategories;
