import React, {Component} from 'react';
import './AdminPanel.css'
import AuthService from "../../services/auth.service";
import {Redirect} from "react-router-dom";
import Line from "../Line/Line";
import AdminLink from "./AdminLink/AdminLink";
import ProductPanel from "./Product/ProductPanel";
import BrandPanel from "./Brand/BrandPanel";
import ModelPanel from "./Model/ModelPanel";

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: '',
            file: '',
            brands: [],
            models: [],
            products: [],
            model: '',
            brandID: 602,
            redirect: null,
            userReady: false,
            currentUser: {username: ""},
            showBrands: true,
            showModels: false,
            showProducts: false,
            image: "https://image.flaticon.com/icons/png/512/37/37543.png",
            isLoading: true
        }
        console.log(this.props.currentUser)
        this.showBrand = this.showBrand.bind(this);
        this.showModel = this.showModel.bind(this);
        this.showProduct = this.showProduct.bind(this);
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({redirect: "/"});
        this.setState({currentUser: currentUser, userReady: true})
    }






    showBrand() {
        this.setState({showBrands: true, showModels: false, showProducts: false})
    }

    showModel() {
        this.setState({showBrands: false, showModels: true, showProducts: false})
    }


    showProduct() {
        this.setState({showBrands: false, showModels: false, showProducts: true})
    }




    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        const {
            model,
            brandID,
            isLoading,
            showBrands,
            showModels,
            showProducts,
            brand,
            brands,
            models,
            image
        } = this.state
        console.log(showBrands)
        return (
            <div className="container">
                {(this.state.userReady) ?
                    <div className="admin-container">
                        <div className="admin-category">
                            <div className="admin-category-container">
                                <div className="admin-category-header">
                                    <h2>Адмін-меню</h2>
                                    <a href="/admin" className="admin-logout"
                                       onClick={() => {
                                           this.props.logOut()
                                       }}>
                                        Вийти
                                    </a>
                                </div>
                                <Line/>
                                <AdminLink name="Марки" click={this.showBrand}/>
                                <AdminLink name="Моделі" click={this.showModel}/>
                                <AdminLink name="Товари" click={this.showProduct}/>
                            </div>
                        </div>
                        <div className="admin-content">
                            <div className="admin__inner-panel">
                                {showBrands ? (
                                        <BrandPanel/>
                                    )
                                    : showModels ? (
                                            <ModelPanel/>
                                        )
                                        : showProducts ? (
                                                <ProductPanel/>
                                            )
                                            : null
                                }
                            </div>
                        </div>
                    </div>
                    : null}

            </div>
        );
    }

}

export default AdminPanel;
