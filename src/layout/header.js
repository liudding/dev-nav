import PropTypes from "prop-types"
import React from "react"
import { Box as BoxIcon, Menu as MenuIcon, X as CloseIcon, Sun as SunIcon, Moon as MoonIcon } from "react-feather"
import { StaticImage } from "gatsby-plugin-image"
import Helmet from 'react-helmet'
import Search from "./search"
import Link from "../components/link"


const hasDocument = typeof localStorage !== "undefined"

const Header = ({ className }) => {

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

      <Helmet bodyAttributes={{ class: themeState === 'dark' ? 'dark' : '' }} />

      <header className={"flex sticky top-0 z-40 flex-none py-3 mx-auto w-full bg-white border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800 " + className} style={{ backdropFilter: "blur(8px)" }}>
        <div className="flex justify-between items-center px-3 mx-auto w-full max-w-8xl lg:px-4">
          <div className="flex items-center">
            <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="p-2 mr-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <MenuIcon></MenuIcon>
              <CloseIcon className="hidden"></CloseIcon>
            </button>
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center">
                <BoxIcon size="32"></BoxIcon>
                <span className="ml-3 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">DevNav</span>
              </Link>
            </div>
            <Search></Search>
          </div>
          <div className="flex items-center">
            <Link to="https://github.com/liudding/dev-nav" target="_blank" className="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 mr-1">
              <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
            </Link>

            <button onClick={toggleTheme} id="theme-toggle" data-tooltip-target="tooltip-toggle" type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5">
              {themeState == 'dark' && <MoonIcon></MoonIcon>}
              {themeState !== 'dark' && <SunIcon></SunIcon>}
            </button>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

Header.propTypes = {
  companyName: PropTypes.string,
}

Header.defaultProps = {
  companyName: ``,
}

export default Header
