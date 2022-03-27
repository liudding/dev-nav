import { useState, useEffect, useMemo } from 'react'
import FlexSearch from 'flexsearch'

export const useFlexSearch = (query, providedIndex, store, searchOptions) => {
    const [index, setIndex] = useState(null)

    useEffect(() => {
        if (!providedIndex && !store)
            console.warn(
                'A FlexSearch index and store was not provided. Your search results will be empty.',
            )
        else if (!providedIndex)
            console.warn(
                'A FlexSearch index was not provided. Your search results will be empty.',
            )
        else if (!store)
            console.warn(
                'A FlexSearch store was not provided. Your search results will be empty.',
            )
    }, [providedIndex, store])

    useEffect(() => {
        if (!providedIndex) {
            setIndex(null)
            return
        }

        if (providedIndex instanceof FlexSearch) {
            setIndex(providedIndex)
            return
        }

        const importedIndex = FlexSearch.create({
            tokenize: (str) => {
                const latin = str.toLowerCase().replace(/[^\w]+/g, " ").split(" ").filter(i => !!i)
                const chinese = str.replace(/[\x00-\x7F]/g, "").split("").filter(i => !!i)
                const tokens = latin.concat(chinese).filter(i => !!i && i.length > 0)
                return tokens
            }
        })
        importedIndex.import(providedIndex)

        setIndex(importedIndex)
    }, [providedIndex])

    return useMemo(() => {
        if (!query || !index || !store) return []

        const rawResults = index.search(query, searchOptions)
        return rawResults.map(id => store[id])
    }, [query, index, store])
}