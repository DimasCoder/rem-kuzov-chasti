import React, {Component} from 'react';
import "./Header.css";
import "../..//App.css";
import logo from '../../assets/rem7.png';
import ToggleButton from '../ToggleButton/ToggleButton'
import {NavLink} from "react-router-dom";
import {faEnvelope, faPhoneAlt} from '@fortawesome/free-solid-svg-icons'
import {faClock} from '@fortawesome/free-regular-svg-icons'
import {faFacebookF, faInstagram} from "@fortawesome/free-brands-svg-icons";
import Line from "../Line/Line";
import HeaderIcon from "../HeaderIcon/HeaderIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import shoppingCart from '../../assets/shopping-cart.png'


class Header extends Component {
    constructor() {
        super();
        this.state = {
            style: {
                color: '#fab702'
            }
        }
    }


    render() {
        const {cartItems} = this.props
        return (
            <header className="header">
                <div className="container">
                    <div className="top-header">
                        <div className="top-header-info">
                            <HeaderIcon icon={faPhoneAlt} href="tel:0634118945" text="(063) 411-89-45"/>
                            <HeaderIcon icon={faEnvelope} href="javascript:{void}" text="remkuzovchasti@gmail.com"/>
                            <HeaderIcon icon={faClock} style={this.state.style} text="Пн-Пт 10:00-18:00"/>
                        </div>
                        <div className="top-header-social">
                            <a target="_blank" href="http://facebook.com"> <FontAwesomeIcon className="social-icon"
                                                                                            icon={faFacebookF}/></a>
                            <a target="_blank" href="http://instagram.com"> <FontAwesomeIcon className="social-icon"
                                                                                             icon={faInstagram}/></a>
                        </div>
                    </div>
                </div>
                <Line/>
                <div className="container">
                    <div className="header__inner">
                        <img
                            src={logo}
                            className="header__inner-logo"
                            alt="Logo"
                        />
                        <nav className="header-navigation">
                            <NavLink exact to="/" activeClassName="header-active"
                                     className="header__navigation-link">Головна</NavLink>
                            <NavLink exact to="/catalog" activeClassName="header-active"
                                     className="header__navigation-link">Каталог</NavLink>
                            <NavLink exact to="/reviews" activeClassName="header-active"
                                     className="header__navigation-link">Відгуки</NavLink>
                            <NavLink exact to="/contact" activeClassName="header-active"
                                     className="header__navigation-link">Контакти</NavLink>
                            <NavLink exact to="/aboutUs" activeClassName="header-active"
                                     className="header__navigation-link">Про нас</NavLink>
                            {this.props.role && (
                                <NavLink exact to="/admin-panel" activeClassName="header-active"
                                         className="header__navigation-link">Адмін панель</NavLink>
                            )}
                            <div className="shopping-cart-icon" onClick={this.props.shoppingCartClickHandler}>
                                {/*<FontAwesomeIcon className="cart-icon" icon={faShoppingCart}/>*/}
                                <img src={shoppingCart} alt="Shopping cart"/>
                                {cartItems.reduce((a, c) => a + c.count, 0) !== 0 &&
                                <span>{cartItems.reduce((a, c) => a + c.count, 0)}</span>
                                }

                            </div>
                        </nav>

                        <div className="header__inner-toggle">
                            <div className="shopping-cart-icon" onClick={this.props.shoppingCartClickHandler}>
                                {/*<FontAwesomeIcon className="cart-icon" icon={faShoppingCart}/>*/}
                                <img src={shoppingCart} alt="Shopping cart"/>
                                {cartItems.reduce((a, c) => a + c.count, 0) !== 0 &&
                                <span>{cartItems.reduce((a, c) => a + c.count, 0)}</span>
                                }

                            </div>
                            <ToggleButton click={this.props.drawerClickHandler} toggle={this.props.toggle}/>
                        </div>
                    </div>
                </div>

            </header>

        )
    }

}

export default Header;
