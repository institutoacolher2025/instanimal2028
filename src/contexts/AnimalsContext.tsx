import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { mockAnimals, type Animal } from '../data/animals';

interface AnimalsContextType {
    animals: Animal[];
    addAnimal: (animal: Omit<Animal, 'id'>) => void;
    updateAnimal: (id: number, animal: Omit<Animal, 'id'>) => void;
    deleteAnimal: (id: number) => void;
}

const AnimalsContext = createContext<AnimalsContextType | undefined>(undefined);

export function AnimalsProvider({ children }: { children: ReactNode }) {
    const [animals, setAnimals] = useState<Animal[]>(() => {
        const stored = localStorage.getItem('animals_data');
        return stored ? JSON.parse(stored) : mockAnimals;
    });

    const saveToStorage = (newAnimals: Animal[]) => {
        localStorage.setItem('animals_data', JSON.stringify(newAnimals));
        setAnimals(newAnimals);
    };

    const addAnimal = (animal: Omit<Animal, 'id'>) => {
        const newId = Math.max(...animals.map(a => a.id), 0) + 1;
        const newAnimal = { ...animal, id: newId };
        saveToStorage([...animals, newAnimal]);
    };

    const updateAnimal = (id: number, animal: Omit<Animal, 'id'>) => {
        const updated = animals.map(a => a.id === id ? { ...animal, id } : a);
        saveToStorage(updated);
    };

    const deleteAnimal = (id: number) => {
        const filtered = animals.filter(a => a.id !== id);
        saveToStorage(filtered);
    };

    return (
        <AnimalsContext.Provider value={{ animals, addAnimal, updateAnimal, deleteAnimal }}>
            {children}
        </AnimalsContext.Provider>
    );
}

export function useAnimals() {
    const context = useContext(AnimalsContext);
    if (!context) {
        throw new Error('useAnimals must be used within AnimalsProvider');
    }
    return context;
}
