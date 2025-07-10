import React, {useState, useContext, useEffect} from 'react';
import { SessionContext } from '../context';
import Logo from '../../public/logo.svg';

export default function LandingPage() {
    const {currSession, animatingTitle, changeAnimate} = useContext(SessionContext);
    const [titleName, setTitleName] = useState('');
    const [animate, setAnimate] = useState('')
    
    useEffect(() => {
        let initial = 'Uniform Resource Locator Shorter';
        let i = 0;

       function animateTitle() {
            if (i < initial.length-1 && animatingTitle) {
                setTitleName(titleName => titleName + initial[i]);
                i++;
                setTimeout(animateTitle, 80);
            } else {
                setTimeout(() => {
                    initial = 'URL Shorter';
                    i = 0;
                    setAnimate('highlight');
                    setTimeout(() => {
                        setTitleName('URL Shorter');
                        setAnimate('');
                        setTimeout(() => changeAnimate(), 1000);
                    }, 1000);
                }, 800);

            }
        }

        animateTitle()

    },[])

    return (
        <>
        {!currSession ? 
            <div className={`title-page animating-${animatingTitle}`}>
                <img src={Logo} alt="" style={{height:'500px', justifySelf:'center'}}/>
                <h1 className={`${animate}`}>{titleName}</h1> 
            </div>
            : <></> }
        </>
    )
}