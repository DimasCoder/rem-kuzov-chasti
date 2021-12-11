import React, {Component} from 'react';
import './Checkout.css'
import CartItem from "../CartItem/CartItem";
import {Link} from "react-router-dom";

const Checkout = (props) => {
    return (
        <section className="checkout">
            <div className="checkout-header">
                <div className="container">
                    <h2>Оформлення замовлення</h2>
                    <div className="checkout-header-decoration">
                        <div className="checkout-header-line"></div>
                        <div className="checkout-header-circle"></div>
                        <div className="checkout-header-line"></div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="checkout__inner">
                    <div className="checkout__inner-left">
                        <div className="checkout-customer-data">
                            <h2>Ваші дані</h2>
                            <div className="data-wrap">
                                <div className="data-field">
                                    <span>Ім'я *</span>
                                    <input className="review-form-input" required={true} type="name"
                                           name="firstName"
                                           placeholder="Ваше ім'я"/>
                                </div>
                                <div className="data-field">
                                    <span>Прізвище *</span>
                                    <input className="review-form-input" required={true} type="input"
                                           name="lastName"
                                           placeholder="Ваше прізвище"/>
                                </div>
                            </div>
                            <div className="data-wrap">
                                <div className="data-field">
                                    <span>Номер телефону *</span>
                                    <input className="review-form-input" required={true} type="text"
                                           name="number"
                                           placeholder="Ваш номер телефону"/>
                                </div>
                                <div className="data-field">
                                    <span>Електронна адреса *</span>
                                    <input className="review-form-input" required={true} type="email"
                                           name="email"
                                           placeholder="Ваша електронна адреса"/>
                                </div>
                            </div>
                            <div className="data-wrap">
                                <div className="data-field">
                                    <span>Область *</span>
                                    <input className="review-form-input" required={true} type="text"
                                           name="region"
                                           placeholder="Ваш номер телефону"/>
                                </div>
                                <div className="data-field">
                                    <span>Місто *</span>
                                    <input className="review-form-input" required={true} type="email"
                                           name="city"
                                           placeholder="Ваша електронна адреса"/>
                                </div>
                            </div>
                            <Link className="order-button" to="/">Замовити</Link>

                        </div>
                    </div>
                    <div className="checkout__inner-right">
                        <div className="checkout-cart">
                            <div className="checkout-cart__inner">
                                <h2>Ваше замовлення</h2>
                                <span>Всього товарів: {props.cartItems.reduce((a, c) => a + c.count, 0)}</span>
                                {props.cartItems.map((item, index) => (
                                    <CartItem key={index} item={item} increaseItem={props.increaseItem}
                                              decreaseItem={props.decreaseItem} remove={props.removeFromCart}/>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Checkout;
