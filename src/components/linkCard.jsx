import React, {useState} from 'react'
import Timer from '../helpers/timer'
const APP_URL = process.env.VITE_APP_URL

export default function LinkCard({data, expandCard, shortLink}) {
    const {long_url, 
        short_url, 
        expiry, 
        click_counter, 
        msg,
        tag } = data;

    async function copyTitle() {
        await navigator.clipboard.writeText(shortLink)
    }

    return (
        <div className='linkCard' id={short_url} key={short_url}>
            <h1>{tag}</h1>
            <small>{shortLink}</small>
            <textarea value={long_url}/>
        </div>
    )
}