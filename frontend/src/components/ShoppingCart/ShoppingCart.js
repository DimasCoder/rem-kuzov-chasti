import React from 'react';
import {Link} from "react-router-dom";
import './ShoppingCart.css'
import basket from "../../assets/car.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBag, faTimes} from '@fortawesome/free-solid-svg-icons'
import CartItem from "../CartItem/CartItem";

const ShoppingCart = props => {
    let drawerClasses = 'shopping-cart';
    if(props.show){
        drawerClasses = 'shopping-cart open';
    }
    return(
        <div className={drawerClasses}>
            <div className="shopping-cart__inner">
                <div className="shopping-cart__header">
                    <div className="shop-cart__header-icon">
                        <FontAwesomeIcon className="shop-cart-icon" icon={faShoppingBag}/>
                        {props.cartItems.reduce((a, c) => a + c.count, 0) !== 0 &&
                        <span>{props.cartItems.reduce((a, c) => a + c.count, 0)}</span>
                        }
                        Кошик
                    </div>
                    <div className="shopping-cart-close" onClick={props.click}>
                        <FontAwesomeIcon className="shop-cart-icon" icon={faTimes}/>
                    </div>
                </div>
                <div className="shopping-cart__items">
                {props.cartItems.length > 0 ? props.cartItems.map((item, index) => (
                    <CartItem
                        key={index}
                        item={item}
                        remove={props.removeFromCart}
                        increaseItem={props.increaseItem}
                        decreaseItem={props.decreaseItem}
                    />
                ))
                :
                    <div className="empty-cart">
                        <img
                            src={basket}
                            alt="Порожня корзина"/>
                        <span>На жаль, Ваш кошик порожній, будь ласка, оберіть товар</span>
                    </div>
                }
                </div>
            <div className="shopping-cart-footer">
                <div className="order-sum">
                    <p>Сума замовлення: </p>
                    <p>{props.cartItems.reduce((a, c) => a + c.count*c.price, 0)}.00₴</p>
                </div>
                <div className="order-sum">
                    <p>Знижка: </p>
                    <p>0.00₴</p>
                </div>
                <div className="order-sum">
                    <span>Загалом: </span>
                    <span>{props.cartItems.reduce((a, c) => a + c.count*c.price, 0)}.00 ₴</span>
                </div>
                <Link className="order-button" to="/checkout" onClick={() => {props.click()}}>Перейти до оформлення</Link>
            </div>
            </div>
        </div>
    )
}
export default ShoppingCart;
