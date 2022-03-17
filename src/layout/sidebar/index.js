import * as React from 'react';
import Tree from './tree';
import { StaticQuery, graphql } from 'gatsby';


const SidebarLayout = ({ data, location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  slug
                  name
                  cate1
                  category
                }
              }
            }
          }
      }
    `}
    
    render={({ allMarkdownRemark }) => {
      return (
        <div>
          <ul>
            <Tree edges={allMarkdownRemark.edges} />
          </ul>
        </div>
      );
    }}
  />
);

export default SidebarLayout;