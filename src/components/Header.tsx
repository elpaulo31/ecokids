import { useState } from 'react';

import { EcokidsDarkLogo } from './../assets/images/logos/EcokidsDarkLogo';
import { DarkModeIcon } from '../assets/images/icons/DarkModeIcon';
import { LightModeIcon } from '../assets/images/icons/LightModeIcon';

export const Header = () => {
  const [darkMode, setDarkMode] = useState(
    document.getElementsByTagName('html')[0].classList.contains('dark'),
  );

  return (
    <header className="w-screen flex items-center justify-between p-10 transition-colors duration-500">
      <a href="/">
        <EcokidsDarkLogo
          primaryColor={darkMode ? '#0FDB27' : '#0FDB27'}
          secondaryColor={darkMode ? '#E2FFEB' : '#005B31'}
        />
      </a>

      <button
        onClick={() => {
          const htmlElement = document.getElementsByTagName('html')[0];
          if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            setDarkMode(false);
          } else {
            htmlElement.classList.add('dark');
            setDarkMode(true);
          }
        }}
        aria-label="Mudar tema"
      >
        {darkMode ? (
          <DarkModeIcon svgClass="cursor-pointer h-8 w-8" color="#E2FFEB" />
        ) : (
          <LightModeIcon svgClass="cursor-pointer w-8 h-8" color="#005B31" />
        )}
      </button>
    </header>
  );
};
