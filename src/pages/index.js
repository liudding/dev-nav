import * as React from "react"
import { graphql } from 'gatsby'
import _ from "lodash"
import Layout from "../layout/layout"
import Card from "../components/card"

// markup
const IndexPage = ({ data }) => {
  let allApps = data.allMarkdownRemark.nodes.map(item => {
    const app = Object.assign({ excerpt: item.excerpt }, item.frontmatter);
    app.category = app.category || '其他'
    return app;
  })

  const groups = _.map(_.groupBy(allApps, 'category'), (v, k) => {
    return {
      category: k,
      apps: v
    }
  });


  return (
    <Layout>
      <div onKeyDown={() => {
        alert(1)
      }}>
        {groups.map(group => (<div className="mb-8" key={group.category}>
          <div className="bg-gray-100 flex items-center rounded-2xl px-7" style={{ height: 45, width: 150 }} >
            <strong>{group.category}</strong>
          </div>
          <div className="grid grid-cols-4 gap-4 xs:grid-cols-2 justify-items-start py-2">
            {group.apps.map(item => (
              <Card card={item} className="ml-2 p-2 font-medium text-lg whitespace-nowrap antialiased border-b-2 border-transparent hover:text-primary hover:border-primary" key={item.slug}>

              </Card>
            ))}
          </div>

        </div>)
        )}
      </div>



    </Layout>
  )
}


export const query = graphql`
  query HomePageQuery {
    allMarkdownRemark {
      nodes {
        frontmatter {
          tags
          name
          slug
          category
          logo_image {
            childImageSharp {
              gatsbyImageData
              fluid(maxWidth: 80) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        },
        excerpt(format: PLAIN, truncate: true)
      }
    }
  }
`

export default IndexPage
