import React from "react"
import { graphql } from "gatsby"
import _ from "lodash"
import Layout from "../../layout/layout"
import Card from "../../components/card"


export default function Category({ data }) {
  const { allAppsCsv: { nodes } } = data

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
      <div className="">
        <div className="">
          {/* <h1>{frontmatter.category}</h1> */}

          <div className="">
            {groups.map(group => (<div className="" key={group.category}>
              <div className="bg-gray-10 flex items-center rounded-2xl px-7" style={{ height: 45, width: 150 }} >
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


        </div>
      </div>
    </Layout>

  )
}

export const pageQuery = graphql`
  query CsvQuery($category: String) {
    allAppsCsv(filter: {category: {eq: $category}, name: {ne: ""}}) {
      nodes {
        cate3
        desc
        id
        name
        mac
        url
        win
        free
        domestic
      }
    }
  }
`