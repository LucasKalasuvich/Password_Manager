import React from 'react'
import './style.module.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home/Home'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
