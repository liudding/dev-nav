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

const prepareMenu = menu => {
  menu.id = unid();
  if (menu.slug && !menu.url) {
    menu.url = '/categories/' + menu.slug
  }

  if (menu.items) {
    for (const item of menu.items) {
      prepareMenu(item);
    }
  }

  return menu;
}

const Tree = ({ edges }) => {
  let [treeData] = useState(() => {

    return prepareMenu(menu);
  });

  const defaultCollapsed = {};

  treeData.items.forEach(item => {
    if (item.expanded) {
      defaultCollapsed[item.id] = true;
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
      {...treeData}
    />
  );
};

export default Tree;

