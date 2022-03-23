import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import Sidebar from "./sidebar"
import Breadcrumb from "./breadcrumb"
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
    <div style={{minHeight: '100vh'}} className="dark:bg-gray-900">

      <Header siteTitle={data.site.siteMetadata?.title || `Title`} className="" />

      <div className="flex" style={{}}>
        <div style={{ width: 200, minHeight: '100vh' }} className="fixed px-2 border-r border-gray-200 dark:border-gray-700">
          <Sidebar />
        </div>

        <div className="container mx-auto" style={{ marginLeft: 200 }}>
          <main className="p-8" >
            {/* <Breadcrumb></Breadcrumb> */}
            <div>
              {children}
            </div>
          </main>

          <Footer></Footer>
        </div>


      </div>

    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
