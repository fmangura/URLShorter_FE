import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SessionContext from './provider/SessionProvider';
import Home from './routes/Home';
import ReRouter from './routes/ReRouter';

export default function App() {

  return (
    <>
      <BrowserRouter>
        <SessionContext>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exacat path={'/:short'} element={<ReRouter/>}/>
          </Routes>
        </SessionContext>
      </BrowserRouter>
    </>
  )
}
