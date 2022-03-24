import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Dialog, Transition } from '@headlessui/react'

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

  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const toggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen">

      <Header siteTitle={data.site.siteMetadata?.title || `Title`} toggleSidebar={toggle} sidebarOpen={sidebarOpen} />

      <div className="max-w-8xl mx-auto" style={{}}>
        <div style={{ height: '100vh' }} className="hidden lg:block fixed w-[12rem] px-2 bg-white border-r border-gray-200 overflow-y-auto dark:border-gray-700 bg-gray-800">
          <Sidebar />
        </div>

        <Transition
          show={sidebarOpen}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Dialog onClose={() => setSidebarOpen(false)} className="fixed z-40 inset-0 overflow-y-auto">
            <div className="h-screen w-screen">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

              <div className="relative bg-slate-800 rounded max-w-sm h-screen w-[12rem] px-2">
                <Sidebar />
              </div>
            </div>
          </Dialog>
        </Transition>



        <div className="lg:pl-[12rem]">
          <main className="p-2 lg:p-8" >
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
