import React from "react"
import { Menu as MenuIcon, X as CloseIcon, Sun as SunIcon, Moon as MoonIcon } from "react-feather"
import Helmet from 'react-helmet'
import Search from "./search"
import Link from "../components/link"
import Logo from "../components/logo"


const hasDocument = typeof localStorage !== "undefined"

const Header = ({ toggleSidebar, sidebarOpen, siteTitle, className }) => {

  const [theme] = React.useState(() => {
    if (!hasDocument) {
      return false
    }
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return 'dark';
    } else {
      return false
    }
  });
  const [themeState, setTheme] = React.useState(theme);

  const toggleTheme = () => {

    if (themeState === 'dark') {
      setTheme('light');
      localStorage.theme = 'light'
      // localStorage.removeItem('theme')
    } else {
      setTheme('dark');
      localStorage.theme = 'dark'
    }

  };


  return (
    <React.Fragment>

      <Helmet htmlAttributes={{ class: themeState === 'dark' ? 'dark' : '' }}
        bodyAttributes={{ class: 'dark:bg-gray-800 transition-colors duration-500' }} />

      <header className={"sticky top-0 z-20 backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-slate-900/75 mx-auto w-full bg-white " + className} >
        <div className=" max-w-8xl mx-auto">
          <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-0">
            <div className="flex justify-between items-center">
              <div className="w-full lg:w-auto px-2 flex items-center justify-between">
                <button onClick={toggleSidebar} className="p-2 mr-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  {sidebarOpen ? <CloseIcon></CloseIcon> : <MenuIcon></MenuIcon>}
                </button>

                <div className="flex justify-between items-center">
                  <Link to="/" className="flex items-center dark:text-white">
                    <Logo size="32"></Logo>
                    <span className="ml-3 self-center text-2xl font-semibold whitespace-nowrap ">{siteTitle}</span>
                  </Link>
                </div>

                <Search className=""></Search>
              </div>
              <div className="hidden lg:flex items-center">
                <Link to="https://github.com/liudding/dev-nav" target="_blank" className="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 mr-1">
                  <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                </Link>

                <button onClick={toggleTheme} id="theme-toggle" data-tooltip-target="tooltip-toggle" type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5">
                  {themeState === 'dark' && <MoonIcon></MoonIcon>}
                  {themeState !== 'dark' && <SunIcon></SunIcon>}
                </button>
              </div>
            </div>
          </div>


        </div>


      </header>
    </React.Fragment>
  )
}

export default Header
