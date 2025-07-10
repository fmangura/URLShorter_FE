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
    const [animatingTitle, setAnimatingTitle] = useState(currSession ? false : true);
    const [popping, setPopping] = useState({state:false, direct:''});
    const [error, setError] = useState({name:'', msg:''});

    useEffect(() => {
        startSession();
        setIsLoading(false);
    },[])

    
    const makePop = () => {
        let newLoc = Math.round(Math.random()*100);
        (newLoc <= 50 ? setPopping({state:true, direct:'left'}) : setPopping({state:true, direct:'right'}));
        setTimeout(() => setPopping({state:false, direct:''}), 800);
    }

    async function startSession() {
        if (!currSession || !isConnected) {
            await backend.startSession(currSession);
        }
        await getAllLinks();
    }

    async function getAllLinks() {
        let res = await backend.getLinks();
        setAllLinks(res);
    }

    async function handleDel(short_url) {
        let res = await backend.delLink(short_url);
        setAllLinks(res);
    }

    function changeAnimate() {
        setAnimatingTitle((animatingTitle) => !animatingTitle);
    }

    return (
        <SessionContext.Provider value={{
            startSession,
            currSession,
            allLinks,
            setAllLinks,
            isLoading,
            getAllLinks,
            handleDel,
            animatingTitle,
            changeAnimate,
            makePop,
            popping,
            error
        }}>
            {children}
        </SessionContext.Provider>
    )
}

export default Session;