import { useState } from 'react';

import { EcokidsDarkLogo } from './../assets/images/logos/EcokidsDarkLogo';
import { DarkModeIcon } from '../assets/images/icons/DarkModeIcon';
import { LightModeIcon } from '../assets/images/icons/LightModeIcon';

import { Link } from 'react-router';

export const Header = () => {
  const [darkMode, setDarkMode] = useState(
    document.getElementsByTagName('html')[0].classList.contains('dark'),
  );

  return (
    <header className="w-screen flex items-center bg-[var(--color-accent-light)] dark:bg-[var(--color-brand-dark)] justify-between p-6 sm:p-10 transition-colors duration-500">
      <Link to="/">
        <EcokidsDarkLogo
          primaryColor={darkMode ? '#0FDB27' : '#0FDB27'}
          secondaryColor={darkMode ? '#E2FFEB' : '#005B31'}
        />
      </Link>

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
          <DarkModeIcon svgClass="cursor-pointer h-7 w-7" color="#E2FFEB" />
        ) : (
          <LightModeIcon svgClass="cursor-pointer w-7 h-7" color="#005B31" />
        )}
      </button>
    </header>
  );
};
