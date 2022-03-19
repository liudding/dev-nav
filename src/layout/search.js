import React from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { Search as SearchIcon } from "react-feather"
import ReactModal from 'react-modal';
import { useFlexSearch } from 'react-use-flexsearch'
import SearchButton from "../components/search-button"
import Link from "../components/link"

export default function Search() {
    const { localSearchApps } = useStaticQuery(graphql`
        query {
            localSearchApps {
                store
                index
            }
        }
    `)


    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function onInputChange(e) {
        setQuery(e.target.value)
    }


    const store = {
        1: { id: 1, title: 'Document 1' },
        2: { id: 2, title: 'Document 2' },
        3: { id: 3, title: 'Document 3' },
    }


    const [query, setQuery] = React.useState(null)
    const results = useFlexSearch(query, localSearchApps.index, localSearchApps.store)

    return (
        <React.Fragment>
            <div className="relative ml-6 xl:ml-16 xl:pl-4">
                <SearchButton onClick={openModal}></SearchButton>
            </div>

            <ReactModal isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal} shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true} style={{
                    content: {
                        top: 100,
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, 0)',
                        maxHeight: 500,
                        width: 700,
                        padding: 0,
                        border: 'none',
                        background: 'none',
                        overflow: 'auto',
                        // borderRadius: 8,
                        // boxShadow: '5px 0px 20px rgba(0, 0, 0, 0.1)',
                    },
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        backdropFilter: "blur(4px)",
                        zIndex: 100000
                    }

                }}>

                <div className="bg-white rounded-lg shadow-lg " style={{ minWidth: 400, minHeight: 250, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);" }}>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 mr-3 pointer-events-none">
                            <SearchIcon size="20"></SearchIcon>
                        </div>
                        <input onInput={onInputChange} type="text" autofocus="autofocus" className="border-none text-gray-900 text-lg  block w-full pl-12 p-2.5 py-4 hover:none focus:none  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="输入搜索内容" />
                        <div className="flex absolute inset-y-0 right-0 items-center pr-3">
                            <button onClick={closeModal} style={{ fontSize: 10 }} className="text-xs px-1 border rounded hover:bg-gray-100">ESC</button>
                        </div>
                    </div>
                    <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />
                    <div className="p-6">
                        <ul className="list-none">
                            {results.map(result => (
                                <li className="">
                                    <Link to={result.url} className="flex items-center bg-gray-100 rounded-lg p-2 mt-4 cursor-pointer hover:bg-blue-200">
                                        <div style={{ width: 40, height: 40, lineHeight: "40px" }} className="bg-gray-200 rounded-full text-center">hi</div>
                                        <div className="ml-3">
                                            <div className="font-bold">{result.name}</div>
                                            <div className="text-gray-500 text-sm">{result.desc}</div>
                                        </div>
                                    </Link>

                                </li>
                            ))}

                        </ul>

                    </div>
                </div>
            </ReactModal>

        </React.Fragment>
    )
}