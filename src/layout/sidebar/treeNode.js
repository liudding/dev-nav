import * as React from 'react';
import { ChevronRight as ClosedIcon, ChevronDown as OpenedIcon } from 'react-feather';
import Link from '../../components/link';

const hasDocument = typeof document !== "undefined"

const TreeNode = ({ className = '', setCollapsed, collapsed, menu }) => {
    const { items, name, url, id } = menu;
    const isCollapsed = collapsed[id];

    const collapse = () => {
        setCollapsed(id);
    };

    const hasChildren = items && items.length !== 0;

    let location;

    if (hasDocument) {
        location = document.location;
    }
    const active =
        location && (location.pathname === url);


        if (active){
            console.log(location.pathname, url);
        }


    const itemClassName = (active ? 'active font-bold text-primary' : 'font-normal text-gray-900') + " flex items-center p-2 w-full text-base rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700";
    const calculatedClassName = `${className} item ${active ? 'active' : ''}`;

    return (
        <li className={calculatedClassName}>
            {name && hasChildren ? (
                <button onClick={collapse} type="button" className={itemClassName}>

                    <span className={"flex-1 ml-3 text-left whitespace-nowrap"}>{name}</span>
                    {!isCollapsed ? <OpenedIcon size="16"/> : <ClosedIcon size="16"/>}
                </button>
            ) : (name && <Link to={url} className={itemClassName}>
                <span className={"flex-1 ml-3 text-left whitespace-nowrap pl-9"}>{name}</span>
            </Link>)}

            {hasChildren ? (
                <ul className={"py-2 space-y-2 "  + (!isCollapsed ? " " : "hidden")}>
                    {items.map((item, index) => (
                        <TreeNode
                            key={item.id + index.toString()}
                            setCollapsed={setCollapsed}
                            collapsed={collapsed}
                            menu={item}
                        />
                    ))}
                </ul>
            ) : null}
        </li>
    );
};

export default TreeNode;