import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import Sidebar from "./sidebar"
// import "./layout.css"


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
     query SiteTitleQuery {
       site {
         siteMetadata {
           title
         }
       }
     }
   `)

  return (
    <React.Fragment>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />

      <div className="flex">
        <div style={{ width: 200, height: '100vh' }} className="fixed px-2 border-r border-gray-200 dark:border-gray-700">
          <Sidebar />
        </div>

        <div className="container mx-auto pt-8" style={{marginLeft: 200}}>
          <main className="p-4" >{children}</main>

          <Footer></Footer>
        </div>

       
      </div>

    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
