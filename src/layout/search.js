import React from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { Search as SearchIcon } from "react-feather"
import ReactModal from 'react-modal';
import hotkeys from 'hotkeys-js';
import { useFlexSearch } from '../utils/use-flexsearch'
import SearchButton from "../components/search-button"
import Link from "../components/link"
import AppLogo from "../components/app-logo"

const hasDocument = typeof localStorage !== "undefined"

export default function Search({ className }) {
    const { localSearchApps } = useStaticQuery(graphql`
        query {
            localSearchApps {
                store
                index
            }
        }
    `)

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function toggleModal(open) {
        if (open === undefined) {
            setIsOpen(!modalIsOpen);
        } else {
            setIsOpen(!!open);
        }
    }
    function openModal() {
        toggleModal(true);
    }

    function afterOpenModal() {

    }

    function closeModal() {
        toggleModal(false);
    }

    function onInputChange(e) {
        setQuery(e.target.value)
    }


    const [query, setQuery] = React.useState(null)
    const results = useFlexSearch(query, localSearchApps.index, localSearchApps.store)

    if (hasDocument) {
        hotkeys.filter = function (event) {
            return true;
        }

        hotkeys('cmd+k, ctr+k', function (event, handler) {
            // Prevent the default refresh event under WINDOWS system
            event.preventDefault()
            toggleModal()
        });
    }

    return (
        <React.Fragment>
            <div className={"relative ml-6 xl:ml-16 xl:pl-4 hidden lg:block" + className}>
                <SearchButton onClick={openModal}></SearchButton>
            </div>

            <button onClick={openModal} className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <SearchIcon color="gray"></SearchIcon>
            </button>


            <ReactModal isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal} shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true}
                className="bg-none border-none max-w-[40rem] mx-auto appearance-none outline-none"
                overlayClassName="fixed top-0 left-0 w-full h-full box-border p-8"
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        backdropFilter: "blur(4px)",
                        zIndex: 100000,
                    }

                }}>

                <div className="mx-auto bg-white rounded-lg shadow-lg dark:bg-slate-900 min-h-content max-h-content max-w-[40rem] overflow-hidden" style={{}}>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 mr-3 pointer-events-none text-gray-900 dark:text-gray-400">
                            <SearchIcon size="20"></SearchIcon>
                        </div>

                        <input id="search-input" onInput={onInputChange} autoFocus type="text" className="bg-transparent appearance-none outline-none border-none focus-visible:border-none text-gray-900 text-lg  block w-full pl-12 p-2.5 py-4 hover:none focus:none active:none  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" placeholder="输入搜索内容" />
                        <div className="flex absolute inset-y-0 right-0 items-center pr-3">
                            <button onClick={closeModal} style={{ fontSize: 10 }} className="text-xs px-1 border rounded hover:bg-gray-100 dark:border-none dark:bg-gray-500 dark:text-gray-200">ESC</button>
                        </div>
                    </div>
                    <hr className="border-gray-200 sm:mx-auto dark:border-gray-500" />
                    <div className="p-6 max-h-content overflow-y-auto" style={{ minHeight: 250, maxHeight: 400 }}>
                        <ul className="list-none ">
                            {results.map(result => (
                                <li className="" key={result.id}>
                                    <Link to={result.url} target="_blank" className="flex items-center bg-slate-800 rounded-lg p-2 mt-4 cursor-pointer hover:bg-blue-200">
                                        {/* <div style={{ width: 40, height: 40, minWidth: 40, lineHeight: "40px" }} className="text bg-gray-200 rounded-full text-center">hi</div> */}
                                        {/* <AppLogo url={result.logo} name={result.name}></AppLogo> */}
                                        <div className="ml-3">
                                            <div className="font-bold text-xl dark:text-white">{result.name}</div>
                                            <div className="text-gray-500 text-sm line-clamp-1">{result.desc}</div>
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