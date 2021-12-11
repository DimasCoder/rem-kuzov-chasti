import React from 'react'
import './ProductCard.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'

const ProductCard = props => {
    let avalaibility = props.product.available
    let available;
    if (avalaibility) {
        available = <span className="span-available"><p>В наявності</p> <FontAwesomeIcon style={{color: "green"}}
                                                                                         icon={faCheckCircle}/></span>
    } else {
        available = <span className="span-available"><p>Нема в наявності</p> <FontAwesomeIcon style={{color: "red"}}
                                                                                              icon={faTimesCircle}/></span>
    }

    let image = 'data:image/png;base64,' + props.product.file.data;

    return (

        <div className="auto-card-container" key={props.id}>
            <img
                src={image}
                alt="Auto"
                className="auto-logo"/>
            <p>SKU-63920724</p>
            <h3>{props.product.productName}</h3>
            <div className="auto-brand-card-footer">
                <span>₴{props.product.price}.00</span>
                <button className="to-cart" onClick={() => {
                    props.addToCart(props.product)
                }}></button>
            </div>

        </div>
    )
}
export default ProductCard;
