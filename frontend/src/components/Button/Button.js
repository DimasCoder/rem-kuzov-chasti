import React from 'react';
import './Button.css';

const Button = props =>
    (
        <div className="button">
            <a href="#">
                Often&nbsp;Unseen&nbsp;
                <span className="shift">›</span>
            </a>
            <div className="mask"></div>
        </div>
    )
export default Button
