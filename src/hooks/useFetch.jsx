import { useEffect, useState } from "react";
import { useRefSync } from "./useRefSync";

/**
 * Fetch some JSON data
 * 
 * @param {string} endpoint 
 * @param {FetchEventInit} options 
 * @returns 
 */
export function useFetch(endpoint, options) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const optionsRef = useRefSync(options)

    useEffect(() => {
        fetch(endpoint, {
            ...optionsRef.current,
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                ...optionsRef.current?.headers,
            }
        })
            .then(r => r.json())
            .then(data => {
                setLoading(false)
                setData(data)
            })
            .catch((e) => {
                setLoading(false)
                setError(e)
            })
    }, [endpoint])

    return {
        loading,
        data,
        error,
        setData
    }
}