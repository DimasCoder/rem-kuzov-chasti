import {React, useState} from 'react'
import "./MainSection.css"
import Catalog from "../Catalog/Catalog";
import Main from "../Main/Main";

const MainSection = props => {

    const [brandID, setBrandID] = useState(0);
    const [modelID, setModelID] = useState(0);

    const findByModel = (brand, model) =>{
        setBrandID(brand)
        setModelID(model)
    }


    return (
        <div>
            <Main findByModel={findByModel}/>
            <div className="catalog-header">
                <div className="container">
                    <h2>Каталог товарів</h2>
                    <div className="catalog-header-decoration">
                        <div className="catalog-header-line"></div>
                        <div className="catalog-header-circle"></div>
                        <div className="catalog-header-line"></div>
                    </div>
                </div>
            </div>
            <div className="catalog-section">
                <div className="container">
                    <div className="main-container">
                        {/*<div className="side-container">*/}
                        {/*    <SideBar/>*/}
                        {/*</div>*/}
                        <div className="center-container">
                            <Catalog cartItems={props.cartItems} addToCart={props.addToCart} brandID={brandID} modelID={modelID} q={props.q}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainSection;
