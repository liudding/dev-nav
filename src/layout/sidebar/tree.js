import React, { useState } from 'react';
import config from '../../../config';
import TreeNode from './treeNode';
// import categories from '../../data/categories';
import menu from '../../data/menu'
import { unid } from '../../utils/index'

// const calculateTreeData = edges => {
//   let originalData = edges.map(item => item.node.frontmatter);

//   return originalData.reduce((acc, item) => {
//     const existed = acc.items.find(i => i.name === item.cate1)
//     if (!existed) {
//       acc.items.push({
//         id: item.cate1,
//         name: item.cate1,
//         items: [{
//           id: item.category,
//           name: categories[item.category] || item.category,
//           slug: item.slug,
//           url: '/categories/' + item.category,
//           items: []
//         }]
//       })
//     } else {
//       const level2 = existed.items.find(i => i.name === item.category);
//       if (!level2) {
//         existed.items.push({
//           id: item.category,
//           name: categories[item.category] || item.category,
//           url: '/categories/' + item.category,
//         })
//       }
//     }

//     return acc;
//   }, { items: [] })

// };

const isBrowser = typeof window !== "undefined"

const prepareMenu = menu => {
  
  if (menu.items) {
    for (const item of menu.items) {
      prepareMenu(item);

      const active = isBrowser && window.location && (window.location.pathname === item.url || window.location.pathname === config.gatsby.pathPrefix + item.url);
      
      if (active) {
        item.active = true;
        menu.expanded = true;
      }
    }
  }

  return menu;
}




const Tree = ({ edges }) => {
  let [treeData] = useState(() => {

    const menuTree =  prepareMenu(menu);
    return menuTree
  });

  const defaultCollapsed = {};

  treeData.items.forEach(item => {
    if (item.expanded) {
      defaultCollapsed[item.id] = false;
    } else {
      defaultCollapsed[item.id] = true
    }
  });
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const toggle = id => {
    setCollapsed({
      ...collapsed,
      [id]: !collapsed[id],
    });
  };

  return (
    <TreeNode
      className={`${config.sidebar.frontLine ? 'showFrontLine' : 'hideFrontLine'} firstLevel`}
      setCollapsed={toggle}
      collapsed={collapsed}
      menu={treeData}
    />
  );
};

export default Tree;

