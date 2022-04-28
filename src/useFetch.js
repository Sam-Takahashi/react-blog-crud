import { useEffect, useState } from "react";
// ! Custom hooks need to start with 'use' (eg. useFetch)

const useFetch = (url) => {

    //* STATES(1) [blogs(state values), setBlogs(update state) ]
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // * useEffect hook(runs everytime component is rendered)
    useEffect(() => {
        const abortCtrl = new AbortController();

        // console.log('use effect has run!');
        fetch(url, { signal: abortCtrl.signal }) // url, {signal:associating AbortController with fetch request}
            .then(res => { // get response object
                if (!res.ok) { // response not ok throw error msg
                    throw Error('could not fetch the data for that resource');
                }
                return res.json(); // convert to json
            })
            .then(jsonData => { // then get that data(converted json)
                // console.log(data);
                setData(jsonData);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    console.log(err.message);
                    setIsLoading(false);
                    setError(err.message);
                }
            });
        // cleanup function(abort controller)
        return () => abortCtrl.abort();

    }, [url]); // rerun if url changes

    return { data, isLoading, error }
}

export default useFetch;