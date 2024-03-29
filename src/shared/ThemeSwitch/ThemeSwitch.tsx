import React, { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const lightTheme = {
  primaryColor: 'rgb(170, 0, 170)',
  bgColor: '#ffffff',
  textColor: 'rgba(0, 0, 0, 0.87)',
};

const darkTheme = {
  primaryColor: 'rgb(190, 0, 190)',
  bgColor: '#111111',
  textColor: 'rgba(255, 255, 255, 0.87)',
};

function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem('appTheme') as Theme) || 'light'
  );

  useEffect(() => {
    localStorage.setItem('appTheme', theme);

    let themeConfig = theme === 'dark' ? darkTheme : lightTheme;

    document.documentElement.style.setProperty(
      '--primary-color',
      themeConfig.primaryColor
    );
    document.documentElement.style.setProperty(
      '--background-color',
      themeConfig.bgColor
    );
    document.documentElement.style.setProperty(
      '--text-color',
      themeConfig.textColor
    );
  }, [theme]);

  return (
    <button
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
    >
      Theme: {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeSwitch;
