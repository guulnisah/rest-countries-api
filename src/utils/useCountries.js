import { useState, useEffect } from 'react'

export default function useCountries(url) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                setLoading(false)
                throw new Error("Couldn't find what you were looking for...")
            })
            .then(data => {
                setData(data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message)
            });
    }, [url])


    return [data, loading, error];
}
