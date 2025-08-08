// FavoritesContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface Favorite {
  id: string;
  type: 'home' | 'gym' | 'office' |'other';
  label: string;
  address: string;
}

interface FavoritesContextType {
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  updateFavorite: (id: string, label: string, address: string) => void;
  deleteFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const initialPlaces: Favorite[] = [
];

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Favorite[]>(initialPlaces);

  const addFavorite = (favorite: Favorite) => {
    setFavorites(prev => [...prev, favorite]);
  };

  const updateFavorite = (id: string, label: string, address: string) => {
    setFavorites(prev =>
      prev.map(item =>
        item.id === id ? { ...item, label, address } : item
      )
    );
  };

  const deleteFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, updateFavorite, deleteFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};