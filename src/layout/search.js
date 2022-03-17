import React from "react"
import { Search as SearchIcon } from "react-feather"
// import { useFlexSearch } from 'react-use-flexsearch'

export default function Search() {
    return (
        <React.Fragment>
            <div className="relative">
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                    <SearchIcon></SearchIcon>
                </div>
            </div>
        </React.Fragment>
    )
}