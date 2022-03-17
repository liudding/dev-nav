import PropTypes from "prop-types"
import React from "react"
import { Search as SearchIcon } from "react-feather"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import Search from "./search"

const Header = () => {

  return (
    <React.Fragment>
      <header position="sticky" className="sticky top-0 z-30 backdrop-blur border-b" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(8px)" }}>
        <div style={{ height: 64 }} className="container mx-auto flex flex-row justify-between items-center px-2 xl:px-0">

          <div></div>

          <div></div>

          <div>
           <Search></Search>
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
  companyName: `Sedo`,
}

export default Header
