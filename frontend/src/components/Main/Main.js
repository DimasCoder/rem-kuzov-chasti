import React, {useState, useEffect} from 'react';
import './Main.css';
import {Link} from 'react-scroll';
import axios from "axios";

const Main = (props) => {

    const initialState = [{
        id: 0,
        modelName: 'Оберіть модель'
    }]

    const [brands, setBrands] = useState([{id: 0, brandName: 'Оберіть марку'}]);
    const [models, setModels] = useState(initialState);
    const [brandID, setBrandID] = useState(0);
    const [modelID, setModelID] = useState(0);
    const [modelSelect, setModelSelect] = useState(true);


    useEffect(() => {
        const fetchBrands = async () => {
            const brandsResult = await axios(
                "https://remkuzovchasti.herokuapp.com/api/brand/all",
            )
            setBrands([...brands, ...brandsResult.data])

        };
        fetchBrands();

    }, []);

    useEffect(() => {
        if (brandID === 0) return
        const fetchModels = async () => {
            const modelsResult = await axios(
                `https://remkuzovchasti.herokuapp.com/api/model/?brand=${brandID}`,
            );
            setModels([...initialState, ...modelsResult.data])
            setModelID((models.shift().id))
            // setModelID((models.shift().id))
        }

        fetchModels()

    }, [brandID]);


    const selectChangeBrand = (e) => {
        setBrandID(e)
        // console.log("modelID", modelID, "models.shift.id")
        if (e === '0') {
            setModelSelect(true)
        } else {
            setModelSelect(false)
        }
    }

    const selectChangeModel = (e) => {
        setModelID(e)
    }


    return (
        <main className="main">
            <div className="container">
                <div className="main-info">
                    <div className="main-text">
                        <h2>Магазин автозапчастин</h2>
                        <h1>REMKUZOVCHASTI</h1>
                        <p>Минимальная плата за аренду, действует система скидок предусмотрены тарифы «Рабочая неделя»,
                            «Выходного дня». Постоянный технический контроль за исправностью каждого автомобиля в нашем
                            парке обеспечивает уверенность в надежности и безопасности.</p>
                    </div>
                    <div className="main-filter">
                        <div className="main-filter-header">
                            <h3>Оберіть потрібний вам автомобіль</h3>
                        </div>
                        <div className="main-filter-body">
                            <select className="main-filter-select"
                                    value={brandID}
                                    onChange={e => selectChangeBrand(e.currentTarget.value)}
                                    disabled={false}>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                                ))}
                            </select>
                            <select className="main-filter-select"
                                    value={modelID}
                                    onChange={e => selectChangeModel(e.currentTarget.value)}
                                    disabled={modelSelect}>
                                {models.map((model) => (
                                    <option key={model.id} value={model.id}>{model.modelName}</option>
                                ))}

                            </select>


                            <Link to="catalog" smooth={true} onClick={() => {
                                props.findByModel(brandID, modelID)
                            }} className="filter-button">Шукати</Link>
                        </div>
                    </div>
                </div>
            </div>


        </main>
    )
}
export default Main