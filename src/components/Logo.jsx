import React, {useState, useContext, useEffect} from 'react';
import { SessionContext } from '../context';
import Logo from '../../public/logo.svg';

export default function DynamicLogo() {
    const { popping } = useContext(SessionContext);
    

    return (
        <span className='home-icon'>
            <div className={`pop-corn popping-${popping.state}-${popping.direct}`} style={popping.state ? {} : {display:'none'}}>copied!</div>
            <img src={Logo} alt="" style={{height:'160px', justifySelf:'center'}}/>
        </span>
    )
}