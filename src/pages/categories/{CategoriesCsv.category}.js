import React from "react"
import { graphql } from "gatsby"
import _ from "lodash"
import Layout from "../../layout/layout"
import Card from "../../components/card"


export default function Category({ data }) {
  const { allAppsJson: { nodes } } = data

  let allApps = nodes.map(app => {
    // const app = Object.assign({ excerpt: item.excerpt }, item.frontmatter);
    // app.category = app.category || '其他'
    return app;
  })

  const groups = _.map(_.groupBy(allApps, 'cate3'), (v, k) => {
    return {
      cate3: k,
      apps: v
    }
  });


  return (
    <Layout>
      <div>

        {groups.map(group => (
          <div className="mb-8" key={group.cate3}>
            <div className="bg-gray-10 flex items-center rounded-2xl dark:text-gray-300" style={{ height: 45, width: 150 }} >
              <strong>{group.cate3}</strong>
            </div>
            <div className="grid grid-cols-4 gap-4 xs:grid-cols-2 justify-items-start py-2">
              {group.apps.map(item => (
                <Card card={item} className="ml-2 p-2 font-medium text-lg whitespace-nowrap antialiased border-b-2 border-transparent hover:text-primary hover:border-primary" key={item.id}>

                </Card>
              ))}
            </div>

          </div>)
        )}
      </div>

    </Layout>

  )
}

export const pageQuery = graphql`
  query AppsQuery($category: [String]) {
    allAppsJson(filter: {tags: {in: $category}}) {
      nodes {
        cate3
        desc
        id
        name
        logo
        mac
        url
        win
        free
        domestic
      }
    }
  }
`