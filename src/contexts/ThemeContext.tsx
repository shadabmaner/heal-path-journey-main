import { createContext, useContext, useEffect, useState } from 'react';

type Specialty = 'obesity' | 'diabetes' | 'thyroid';

interface ThemeContextType {
  activeSpecialty: Specialty;
  setActiveSpecialty: (specialty: Specialty) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSpecialty, setActiveSpecialty] = useState<Specialty>(() => {
    return (localStorage.getItem('activeSpecialty') as Specialty) || 'obesity';
  });

  useEffect(() => {
    localStorage.setItem('activeSpecialty', activeSpecialty);
    
    // Update CSS variables based on specialty
    const root = document.documentElement;
    
    if (activeSpecialty === 'obesity') {
      // Light green theme
      root.style.setProperty('--primary', '142 76% 36%');
      root.style.setProperty('--primary-foreground', '0 0% 100%');
      root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, hsl(142 76% 36%), hsl(132 70% 42%))');
      root.style.setProperty('--gradient-hero', 'linear-gradient(160deg, hsl(142 25% 96%), hsl(132 30% 92%))');
      root.style.setProperty('--shadow-card', '0 2px 16px -4px hsl(142 76% 36% / 0.08), 0 1px 4px hsl(0 0% 0% / 0.05)');
      root.style.setProperty('--shadow-button', '0 4px 16px -4px hsl(142 76% 36% / 0.35)');
      root.style.setProperty('--shadow-glow', '0 0 24px hsl(142 76% 36% / 0.15)');
      root.style.setProperty('--shadow-neon', '0 0 12px hsl(142 76% 36% / 0.2), 0 0 40px hsl(142 76% 36% / 0.05)');
    } else if (activeSpecialty === 'diabetes') {
      // Blue theme (current)
      root.style.setProperty('--primary', '210 80% 50%');
      root.style.setProperty('--primary-foreground', '0 0% 100%');
      root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, hsl(210 80% 50%), hsl(200 70% 45%))');
      root.style.setProperty('--gradient-hero', 'linear-gradient(160deg, hsl(210 25% 96%), hsl(200 30% 92%))');
      root.style.setProperty('--shadow-card', '0 2px 16px -4px hsl(210 80% 50% / 0.08), 0 1px 4px hsl(0 0% 0% / 0.05)');
      root.style.setProperty('--shadow-button', '0 4px 16px -4px hsl(210 80% 50% / 0.35)');
      root.style.setProperty('--shadow-glow', '0 0 24px hsl(210 80% 50% / 0.15)');
      root.style.setProperty('--shadow-neon', '0 0 12px hsl(210 80% 50% / 0.2), 0 0 40px hsl(210 80% 50% / 0.05)');
    } else if (activeSpecialty === 'thyroid') {
      // Purple/pink theme
      root.style.setProperty('--primary', '280 76% 53%');
      root.style.setProperty('--primary-foreground', '0 0% 100%');
      root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, hsl(280 76% 53%), hsl(320 70% 65%))');
      root.style.setProperty('--gradient-hero', 'linear-gradient(160deg, hsl(280 25% 96%), hsl(320 30% 92%))');
      root.style.setProperty('--shadow-card', '0 2px 16px -4px hsl(280 76% 53% / 0.08), 0 1px 4px hsl(0 0% 0% / 0.05)');
      root.style.setProperty('--shadow-button', '0 4px 16px -4px hsl(280 76% 53% / 0.35)');
      root.style.setProperty('--shadow-glow', '0 0 24px hsl(280 76% 53% / 0.15)');
      root.style.setProperty('--shadow-neon', '0 0 12px hsl(280 76% 53% / 0.2), 0 0 40px hsl(280 76% 53% / 0.05)');
    }
  }, [activeSpecialty]);

  return (
    <ThemeContext.Provider value={{ activeSpecialty, setActiveSpecialty }}>
      {children}
    </ThemeContext.Provider>
  );
};
