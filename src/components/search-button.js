
import React from "react"
import { Search as SearchIcon } from "react-feather"

export default function SearchButton({ onClick, className }) {
    return (
        <button onClick={onClick} type="button" style={{ width: 208 }} className={"flex items-center justify-between  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2  hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:none appearance-none outline-none " + className} aria-label="Search">
            <span className="flex items-center justify-between">
                <SearchIcon size="18" color="gray"></SearchIcon>
                <span className="text-gray-500 pl-1">Search</span>
            </span>
            <span className="text-gray-500">
                <span>⌘</span>
                <span>K</span>
            </span>
        </button>
    )
}