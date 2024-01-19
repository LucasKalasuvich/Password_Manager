import React from 'react'
import Navbar from '../Navbar/Navbar'
import Content from '../Content/Content'
import classes from './style.module.scss'

const Home = () => {
  return (
    <>
    <div>
      <Navbar />
    </div>
    <div>
      <Content />
    </div>
    
    </>
  )
}

export default Home
