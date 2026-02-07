'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { HiOutlineXMark, HiBars3 } from 'react-icons/hi2';

import Container from './Container';
import { siteDetails } from '@/data/siteDetails';
import { menuItems } from '@/data/menuItems';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Cargar tema guardado (si existe)
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setDark(true);
  }, []);

  // Aplicar tema y guardarlo
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggleTheme = () => setDark((v) => !v);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <Container className="!px-0">
        <nav className="shadow-md bg-white/90 backdrop-blur mx-auto flex justify-between items-center py-2 px-5 md:py-7">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/Logotipo_OFICIAL.webp"
              alt="IoTCar logo"
              width={28}
              height={28}
              className="min-w-fit"
              priority
            />

            <span className="manrope text-xl font-semibold text-foreground cursor-pointer">
              {siteDetails.siteName}
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 items-center">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-foreground hover:text-foreground-accent transition-colors"
                >
                  {item.text}
                </Link>
              </li>
            ))}

            {/* Toggle Dark Mode */}
            <li>
              <button
                type="button"
                onClick={toggleTheme}
                className="text-foreground border border-foreground rounded-full px-6 py-2 hover:bg-foreground hover:text-white transition-colors"
              >
                {dark ? 'Modo claro' : 'Modo oscuro'}
              </button>
            </li>

            <li>
              <Link
                href="/login"
                className="text-foreground border border-foreground rounded-full px-6 py-2 hover:bg-foreground hover:text-white transition-colors"
              >
                Iniciar sesión
              </Link>
            </li>

            <li>
              <Link
                href="#cta"
                className="text-black bg-primary hover:bg-primary-accent px-8 py-3 rounded-full transition-colors"
              >
                Registrarme ahora
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-primary text-black focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiBars3 className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu with Transition */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-foreground hover:text-primary block"
                  onClick={toggleMenu}
                >
                  {item.text}
                </Link>
              </li>
            ))}

            {/* Toggle Dark Mode (Mobile) */}
            <li>
              <button
                type="button"
                onClick={() => {
                  toggleTheme();
                }}
                className="text-foreground border border-foreground rounded-full px-5 py-2 block w-fit"
              >
                {dark ? 'Modo claro' : 'Modo oscuro'}
              </button>
            </li>

            <li>
              <Link
                href="/login"
                className="text-foreground border border-foreground rounded-full px-5 py-2 block w-fit"
                onClick={toggleMenu}
              >
                Iniciar sesión
              </Link>
            </li>

            <li>
              <Link
                href="#cta"
                className="text-black bg-primary hover:bg-primary-accent px-5 py-2 rounded-full block w-fit"
                onClick={toggleMenu}
              >
                Registrarme ahora
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
