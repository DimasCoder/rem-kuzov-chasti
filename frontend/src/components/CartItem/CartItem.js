import {React, useState} from 'react';
import './CartItem.css'

const CartItem = props => {

    const [count, setCount] = useState(props.item.count)

    const increaseCount = (product, counter) => {
        props.increaseItem(product, counter);
        setCount(count + 1)
    }

    const decreaseCount = (product, counter) => {
        if(count > 1){
            props.decreaseItem(product, counter);
            setCount(count - 1)
        }
    }

    return (
        <div className="cart-item">
            <img
                src={`data:image/png;base64,${props.item.file.data}`}
                alt={`Product ${props.item.productName} image`}
            />
            <div className="item-info">
                <div className="item-name-price">
                    <h4>{props.item.productName}</h4>
                    <span>{props.item.price} ₴</span>
                </div>
                <p>SKU-63920724</p>
                <div className="item-options">
                    {/*<span>К-сть:</span>*/}
                    <div className="item-count">
                        <button className="btn" onClick={() => {decreaseCount(props.item, props.item.count)}}>
                            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                <path
                                    d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                            </svg>
                        </button>
                        <span className="counter">{count}</span>
                        <button className="btn" onClick={() => {increaseCount(props.item, props.item.count)}}>
                            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                <path
                                    d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                            </svg></button>
                    </div>
                    <span className="delete-item" onClick={() => {props.remove(props.item, props.item.count)}}>Видалити</span>
                </div>
            </div>
        </div>
    )
}

export default CartItem