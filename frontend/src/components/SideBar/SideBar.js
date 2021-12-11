import React, {Component} from 'react'
import "./SideBar.css"
import Line from "../Line/Line";
import AutoBrand from "../AutoBrand/AutoBrand";
import AutoBrandAdaptive from "../AutoBrand/AutoBrandAdaptive";
import axios from "axios";
import Backdrop from "../Backdrop/Backdrop";
import Loader from "../Loader/Loader";
import UserService from "../../services/user.service";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            brands: [],
        };
    }


    componentDidMount() {
        this.findAllBrands();
    }

    findAllBrands() {
        axios.get("/api/brand/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({brands: data, isLoading: false})

            });
    }

    render() {
        const {isLoading, brands} = this.state
        return (
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-header__inner">
                        <h2>Фільтри</h2>
                    </div>
                </div>
                <div className="sidebar-main">
                    <div className="sidebar-filters-item">
                        <input type="checkbox" id="categories"/>
                        <label htmlFor="categories" className="door-category-text">
                                <h3>Категорії</h3>
                            <span><FontAwesomeIcon icon={faChevronUp}/></span>
                        </label>
                        <ul className="dropdown-filter">
                            <li>Фари та освітлення</li>
                            <li>Паливна система</li>
                            <li>Деталі інтер'єру</li>
                            <li>Шини та колеса</li>
                            <li>Двигун і трансмісія</li>
                        </ul>
                    </div>
                    <div className="sidebar-filters-item">
                        <input type="checkbox" id="categories"/>
                        <label htmlFor="categories" className="door-category-text">
                            <h3>Категорії</h3>
                            <span><FontAwesomeIcon icon={faChevronUp}/></span>
                        </label>
                        <ul className="dropdown-filter">
                            <li>Фари та освітлення</li>
                            <li>Паливна система</li>
                            <li>Деталі інтер'єру</li>
                            <li>Шини та колеса</li>
                            <li>Двигун і трансмісія</li>
                        </ul>
                    </div>
                    <div className="sidebar-filters-item">
                        <input type="checkbox" id="categories"/>
                        <label htmlFor="categories">
                            <h3>Категорії</h3>
                            <span><FontAwesomeIcon icon={faChevronUp}/></span>
                        </label>
                        <ul className="dropdown-filter">
                            <li>Фари та освітлення</li>
                            <li>Паливна система</li>
                            <li>Деталі інтер'єру</li>
                            <li>Шини та колеса</li>
                            <li>Двигун і трансмісія</li>
                        </ul>
                    </div>
                </div>
            </aside>
        )
    }
}
