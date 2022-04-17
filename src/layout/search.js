import React from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { Search as SearchIcon } from "react-feather"
import ReactModal from 'react-modal';
import hotkeys from 'hotkeys-js';
import HotKeys from 'react-hot-keys';
import { useFlexSearch } from '../utils/use-flexsearch'
import SearchButton from "../components/search-button"
import SearchItem from './search-item'
import { scroller } from 'react-scroll'


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
    const [selectedSearchResult, setSelectedSearchResult] = React.useState(0);

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

    let searchInput = '';
    function onInputChange(e) {
        if (e.target.value === searchInput) {
            return;
        }
        searchInput = e.target.value.trim();
        setQuery(searchInput)
        // setSelectedSearchResult(-1)
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

        if (document.getElementById('search-input')) {
            document.getElementById('search-input').addEventListener('keydown', function (e) {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                }
            });
        }

    }

    function onOpenSearch(event) {
        // event.preventDefault()
        toggleModal()
    }

    var index = -1;
    function onArrowKeysDown(event, handler) {
        if (results.length === 0) {
            return;
        }
        if (handler.key === 'ArrowDown') {
            index++;
        } else {
            index--;
        }

        index = Math.max(Math.min(index, results.length - 1), 0);

        setSelectedSearchResult(index)

        scroller.scrollTo('search-result-' + index, {
            duration: 300,
            delay: 0,
            smooth: true,
            containerId: 'search-results',
            offset: -16,
        })
    }

    const onKeyDown = React.useCallback((event, handler) => {
        event.preventDefault && event.preventDefault()

        if (handler.key === 'ArrowDown' || handler.key === 'ArrowUp') {
            onArrowKeysDown(event, handler);
            return;
        }
        if (handler.key === 'Enter') {
            window.open(results[index].url, '_blank').focus();
        }

        // console.log(handler.key)

    }, [results])

    const onHover = React.useCallback((e) => {
        console.log(e)
        e.target.className = 'search-item active';
    })

    const onMouseEnter = React.useCallback((e) => {
        e.target.className = "";
    })




    return (
        <React.Fragment>
            {/* <HotKeys keyName="cmd+k, ctr+k" onKeyDown={onOpenSearch}> */}
                <div id="search-button" className={"relative ml-6 xl:ml-16 xl:pl-4 hidden lg:block" + className}>
                    <SearchButton onClick={openModal}></SearchButton>
                </div>
            {/* </HotKeys> */}

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
                    <HotKeys keyName="up,down,enter" onKeyDown={onKeyDown.bind(this)}>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 mr-3 pointer-events-none text-gray-900 dark:text-gray-400">
                                <SearchIcon size="20"></SearchIcon>
                            </div>

                            {/* <HotKeys keyName="up,down" onKeyDown={(e) => { e.preventDefault(); }}> */}
                            <input id="search-input" onInput={onInputChange} autoFocus type="text" className="bg-transparent appearance-none outline-none border-none focus-visible:border-none text-gray-900 text-lg  block w-full pl-12 p-2.5 py-4 hover:none focus:none active:none  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" placeholder="输入搜索内容" />
                            {/* </HotKeys> */}
                            <div className="flex absolute inset-y-0 right-0 items-center pr-3">
                                <button onClick={closeModal} style={{ fontSize: 10 }} className="text-xs px-1 border rounded hover:bg-gray-100 dark:border-none dark:bg-gray-500 dark:text-gray-200">ESC</button>
                            </div>
                        </div>
                        <hr className="border-gray-200 sm:mx-auto dark:border-gray-500" />
                        <div id="search-results" className="p-6 max-h-content overflow-y-auto" style={{ minHeight: 250, maxHeight: 400 }}>
                            {/* <ul className="list-none "> */}
                            {results.map((result, index) => (
                                <SearchItem item={result} name={'search-result-' + index} onMouseEnter={onHover.bind(this)} onMouseLeave={onMouseEnter.bind(this)} className={"search-item " + (selectedSearchResult === index ? 'active' : '')} key={result.id}></SearchItem>
                            ))}

                            {/* </ul> */}
                        </div>
                    </HotKeys>
                </div>
            </ReactModal>

        </React.Fragment>
    )
}