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
                throw new Error("Something went wrong...")
            })
            .then(data => {
                setData(data)
                setLoading(false)
                setError('')
            })
            .catch((error) => {
                setError(error.message)
            });
    }, [url])


    return [data, loading, error];
}
