import * as React from "react"
import { graphql } from 'gatsby'
import Layout from "../layout/layout"
import Card from "../components/card"

// markup
const IndexPage = ({ data }) => {
  let allApps = data.allAppsJson.nodes;


  return (
    <Layout>
      <div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4  justify-items-start py-2">
          {allApps.map((item, index) => (
            <Card card={item} className="w-full" key={item.id}>

            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}


export const query = graphql`
query LatestAppsQuery {
  allAppsJson(sort: {order: DESC, fields: created_at}, limit: 40) {
    nodes {
      id
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
