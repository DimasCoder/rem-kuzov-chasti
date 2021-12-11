import React from 'react';
import './HeaderIcon.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

const HeaderIcon = (props) => {
    return (
        <div className="icon-container">
            <FontAwesomeIcon className="header-icon" icon={props.icon}/>
            <a style={props.style} href={props.href}>{props.text}</a>
        </div>
    )
}

export default HeaderIcon