import React from "react"
import Link from "../components/link"

const SearchItem = ({ item, name, className }) => {

    return (
        <div name={name} className={"search-item " + className}>
            <Link to={item.url} target="_blank" className="flex items-center rounded-lg p-2 mt-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 search-item__content">
                {/* <div style={{ width: 40, height: 40, minWidth: 40, lineHeight: "40px" }} className="text bg-gray-200 rounded-full text-center">hi</div> */}
                {/* <AppLogo url={result.logo} name={result.name}></AppLogo> */}
                <div className="ml-3">
                    <div className="font-bold text-xl dark:text-white">{item.name}</div>
                    <div className="text-gray-500 text-sm line-clamp-1">{item.desc}</div>
                </div>
            </Link>
        </div>
    )
};

export default SearchItem