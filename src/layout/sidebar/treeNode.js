import * as React from 'react';
import OpenedSvg from './opened';
import ClosedSvg from './closed';
import config from '../../../config';
import Link from '../../components/link';

const TreeNode = ({ className = '', setCollapsed, collapsed, id, url, name, items, ...rest }) => {
    const isCollapsed = collapsed[id];

    const collapse = () => {
        setCollapsed(id);
    };

    const hasChildren = items && items.length !== 0;

    let location;

    if (typeof document != 'undefined') {
        location = document.location;
    }
    const active =
        location && (location.pathname === url || location.pathname === config.gatsby.pathPrefix + url);


    const calculatedClassName = `${className} item ${active ? 'active bg-red-200 text-red-200' : ''}`;


    return (
        <li className={calculatedClassName}>
            {name && hasChildren ? (
                <button onClick={collapse} type="button" className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                    <span className="flex-1 ml-3 text-left whitespace-nowrap">{name}</span>
                    {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
                </button>
            ) : (name && <Link to={url} className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                {name}
            </Link>)}

            {hasChildren ? (
                <ul className={"py-2 space-y-2 " + (!isCollapsed ? " " : "hidden")}>
                    {items.map((item, index) => (
                        <TreeNode
                            key={item.id + index.toString()}
                            setCollapsed={setCollapsed}
                            collapsed={collapsed}
                            {...item}
                        />
                    ))}
                </ul>
            ) : null}
        </li>
    );
};

export default TreeNode;