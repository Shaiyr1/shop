import React from 'react'
import { Link } from 'react-router-dom'
import './header.scss'


function Header({cart, setCart}) {
    return (
        <div className='header'>
            <nav className="header__nav">
                <div className='header__nav_wrapper'>
                    <Link to="/" className="brand-logo header__nav_wrapper-logo">
                        Shaiyr
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li className='header__nav_ul-li'>
                            <Link className='header__nav_ul-link' to="/">Главная</Link>
                        </li>
                        <li className='header__nav_ul-li'>
                            <Link className='header__nav_ul-link' to="/cart">
                                Корзина
                                <span className='header__nav_ul-notification'>{cart.length === 0 ? '': cart.reduce((acc,rec)=>{
                                return acc+rec.count
                            }, 0)}</span>
                            </Link>
                            
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header
