import React, {useEffect, useState} from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import backend from '../api';

export default function ReRouter() {
    const navigate = useNavigate();
    const {short} = useParams();
    const [longURL, setLongURL] = useState({});
    const [seconds, setSeconds] = useState(10);
    const [isExpired, setIsExpired] = useState();

    useEffect(() => {
        async function getRedirect() {
            let long = await backend.getRedirectLink(short)
            setLongURL(long);
        };
        getRedirect();
    },[])

    useEffect(() => {
        if (longURL) {
            let time = seconds
            let timer = setInterval(() => {
                if (time <= 0) {
                    clearInterval(timer);
                    document.location.href = longURL.long_url;
                }
                time = time - 1
                setSeconds(time);
    
            }, 1000);
        }
    },[longURL]);

    return (
        <>
        {isExpired ? 
            <div>
                <h1>Link has expired.</h1>
            </div>
            : 
            <div>
                <h1>You are about to be routed to:</h1>
                <h2>{longURL.long_url}</h2>
                <h6>in {`${seconds}`}s</h6>

                <p>Please if you do not recognize this link, select "Do Not Trust"</p>
            </div>
        }
        </>
    )
}