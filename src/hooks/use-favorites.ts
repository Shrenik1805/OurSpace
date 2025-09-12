import { useState, useEffect } from 'react';
import { Letter } from '@/data/letters';

export interface FavoritesState {
  favorites: string[];
  toggleFavorite: (letterId: string) => void;
  isFavorite: (letterId: string) => boolean;
  getFavoriteLetters: (allLetters: Letter[]) => Letter[];
}

export function useFavorites(): FavoritesState {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('hello-love-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hello-love-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (letterId: string) => {
    setFavorites(prev => 
      prev.includes(letterId)
        ? prev.filter(id => id !== letterId)
        : [...prev, letterId]
    );
  };

  const isFavorite = (letterId: string) => favorites.includes(letterId);

  const getFavoriteLetters = (allLetters: Letter[]) => 
    allLetters.filter(letter => favorites.includes(letter.id));

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteLetters
  };
}
