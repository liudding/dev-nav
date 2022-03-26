import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../layout/layout"


const NotFoundPage = ({ data }) => {
  return (
    <Layout>
      <div className="flex items-center justify-around p-10">
        {/* <h1>NOT FOUND</h1> */}
        <StaticImage src="../images/404.png" width="300" ></StaticImage>
      </div>
    </Layout>
  )
}

export default NotFoundPage
