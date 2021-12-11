import React from 'react';
import {Link} from "react-scroll";
import './SideDrawer.css'
import logo from "../../assets/rem7.png";
import {NavLink} from "react-router-dom";

const SideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses = 'side-drawer open';
    }
    return(
        <div className={drawerClasses}>
            <div className="side-drawer__logo">
                <img
                    src={logo}
                    className="side-drawer__logo-image"
                    alt="Logo"
                />
            </div>
            <nav className="side-drawer__navigation">
                <Link to="/" className="side-drawer__navigation-link">Головна</Link>
                <Link to="/catalog" className="side-drawer__navigation-link">Каталог</Link>
                <Link to="/reviews" className="side-drawer__navigation-link">Відгуки</Link>
                <Link to="/contact" className="side-drawer__navigation-link">Контакти</Link>
                <Link to="/aboutUs" className="side-drawer__navigation-link">Про нас</Link>

            </nav>
            <div className="side-drawer__contact">
                <a className="contact-phone" href="tel:0999990999"><span>(</span>+380<span>)</span>-999-09-99</a>
                <a className="contact-phone" href="tel:0999990999"><span>(</span>+380<span>)</span>-999-09-99</a>
            </div>
        </div>
    )
}
export default SideDrawer;