"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useCompany } from '../api/hooks';

interface BrandThemeContextType {
  brandColor: string;
  setPreviewBrandColor: (color: string | null) => void;
}

const BrandThemeContext = createContext<BrandThemeContextType>({
  brandColor: '#e11d48',
  setPreviewBrandColor: () => {},
});

/**
 * Aplica las variables CSS del color de marca y sus derivados en :root
 */
export const applyBrandCssVariables = (hexColor?: string) => {
  if (typeof window === 'undefined') return;

  const hex = hexColor && /^#([0-9A-F]{3}){1,2}$/i.test(hexColor.trim())
    ? hexColor.trim()
    : '#e11d48';

  // Convierte Hex a RGB
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((c) => c + c).join('');
  }

  const num = parseInt(cleanHex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  // Calcula una variante hover ligeramente más oscura
  const rHover = Math.max(0, Math.round(r * 0.85));
  const gHover = Math.max(0, Math.round(g * 0.85));
  const bHover = Math.max(0, Math.round(b * 0.85));

  // Calcula contraste del texto (blanco o negro según brillo del fondo)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const textColor = brightness > 160 ? '#09090b' : '#ffffff';

  const root = document.documentElement;
  root.style.setProperty('--brand-primary', hex);
  root.style.setProperty('--brand-primary-hover', `rgb(${rHover}, ${gHover}, ${bHover})`);
  root.style.setProperty('--brand-primary-alpha', `rgba(${r}, ${g}, ${b}, 0.15)`);
  root.style.setProperty('--brand-primary-border', `rgba(${r}, ${g}, ${b}, 0.35)`);
  root.style.setProperty('--brand-primary-glow', `rgba(${r}, ${g}, ${b}, 0.3)`);
  root.style.setProperty('--brand-primary-text', textColor);
};

export const BrandThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: company } = useCompany();
  const [previewColor, setPreviewColor] = useState<string | null>(null);

  const activeColor = previewColor || company?.brandColor || '#e11d48';

  useEffect(() => {
    applyBrandCssVariables(activeColor);
  }, [activeColor]);

  const value = useMemo(
    () => ({
      brandColor: activeColor,
      setPreviewBrandColor: setPreviewColor,
    }),
    [activeColor]
  );

  return (
    <BrandThemeContext.Provider value={value}>
      {children}
    </BrandThemeContext.Provider>
  );
};

export const useBrandTheme = () => useContext(BrandThemeContext);
