import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Dialog, Transition } from '@headlessui/react'
import { X as CloseIcon } from "react-feather"

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
        <div className="hidden lg:block fixed w-[12rem] h-screen px-2 pb-8 border-r border-gray-200 overflow-y-auto dark:border-gray-700">
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

              <div className="relative bg-white dark:bg-slate-800 max-w-sm h-screen w-[12rem] px-2 flex flex-col">
                <view className="py-2 w-full flex items-center justify-between">
                  <div></div>
                  <button onClick={() => setSidebarOpen(false)} className="p-2 mr-2 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <CloseIcon size="20" className=""></CloseIcon>
                  </button>
                </view>
                <div className="px-2 overflow-y-auto flex-1">
                  <Sidebar />
                </div>
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

          <Footer siteTitle={data.site.siteMetadata?.title}></Footer>
        </div>


      </div>

    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
