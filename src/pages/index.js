import * as React from "react"
import { graphql } from 'gatsby'
import _ from "lodash"
import Layout from "../layout/layout"
import Card from "../components/card"

// markup
const IndexPage = ({ data }) => {
  let allApps = data.allAppsJson.nodes;


  return (
    <Layout>
      <div>
        <div className="grid grid-cols-4 gap-4 grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 md:grid-cols-4 justify-items-start py-2">
          {/* {allApps.map(item => (
            <Card card={item} className="ml-2 p-2 font-medium text-lg whitespace-nowrap antialiased border-b-2 border-transparent hover:text-primary hover:border-primary" key={item.slug}>

            </Card>
          ))} */}
        </div>

      </div>



    </Layout>
  )
}


export const query = graphql`
query LatestAppsQuery {
  allAppsJson(sort: {order: DESC, fields: created_at}, limit: 40) {
    nodes {
      name
      mac
      logo
      url
      win
      free
      domestic
      desc
    }
  }
}
`

export default IndexPage
