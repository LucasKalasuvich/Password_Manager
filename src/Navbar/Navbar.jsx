import React from 'react'
import { Link } from 'react-router-dom'
import classes from './style.module.scss'

const Navbar = () => {
  return (
    <div className={classes.container}>
        <Link to="/" className={classes.navbar}>
           <h3>List User</h3>
        </Link>
    </div>
  )
}

export default Navbar
