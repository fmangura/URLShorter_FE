import React, {useState, useEffect} from 'react';
import { SessionContext } from '../context';

import Cookies from 'universal-cookie';
import backend from '../api';

const cookies = new Cookies(null, {path: '/'});

function Session({ children }) {
    const [currSession, setCurrSession] = useState(cookies.get('session_cookie') || "");
    const [isConnected, setConnected] = useState(!!cookies.get('user_token'));
    const [allLinks, setAllLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        startSession();
        getAllLinks();
        setIsLoading(false);
    },[])

    async function startSession() {
        if (!currSession || !isConnected) {
            await backend.startSession(currSession);
        }
    }

    async function getAllLinks() {
        let res = await backend.getLinks();
        setAllLinks(res);
    }

    return (
        <SessionContext.Provider value={{
            startSession,
            currSession,
            allLinks,
            setAllLinks,
            isLoading,
            getAllLinks,
        }}>
            {children}
        </SessionContext.Provider>
    )
}

export default Session;