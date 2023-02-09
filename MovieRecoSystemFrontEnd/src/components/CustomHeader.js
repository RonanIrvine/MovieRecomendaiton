import React from 'react'
import {Link }from 'react-router-dom'
const CustomHeader = () => {

    return(
        <div>
            <header>
                <nav className = "navbar navbar-expand-md navbar-dark bg-dark"> 
                    <div>
                                   <a href="https://javaguides.net" className = "navbar-brand"> 
                                        Management System
                         </a>
                    </div>
                    <Link to="/login"  style={{ marginLeft: "auto", marginRight:'10px' }} className='btn btn-primary'>Login</Link>
                             </nav>
                      </header>
        </div>
  )
}
export default CustomHeader