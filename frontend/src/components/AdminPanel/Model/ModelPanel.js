import React, {Component} from 'react';
import AdminData from "../AdminData/AdminData";
import axios from "axios";
import AuthService from "../../../services/auth.service";

class ModelPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: '',
            file: '',
            brands: [],
            models: [],
            model: '',
            brandID: 602,
            image: "https://image.flaticon.com/icons/png/512/37/37543.png",
            isLoading: true
        }
        this.inputChange = this.inputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        console.log(this.state.brands)
    }

    componentDidMount() {
        this.findAllBrands();
        // this.findAllModels();
    }

    inputChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    handleChange(e) {
        this.setState({brandID: e.target.value});
        console.log(this.state.brandID)
    }

    findAllBrands() {
        axios.get("/api/brand/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({brands: data, isLoading: false})
            });
    }

    // findAllModels() {
    //     axios.get("/api/test/all")
    //         .then(response => response.data)
    //         .then((data) => {
    //             this.setState({models: data, isLoading: false})
    //         });
    // }

    postModel = () => {
        let data = new FormData();
        data.append('model', this.state.model);
        data.append('brand', this.state.brandID);
        axios.post("/api/model",
            data
        )
        window.location.reload(true);
    }

    deleteModel = (id) => {
        axios.delete("api/model/" + id)
            .then(respone => {
                if (respone.data != null) {
                    this.setState({
                        brands: this.state.brands.filter(brand => { return brand.models.filter(model => model.id !== id)})
                    })
                }
            })
        window.location.reload(true);

    }

    render() {
        const {
            model,
            brandID,
            brands,
        } = this.state

        let filteredBrands = brands.filter((brand => brand.id === Number.parseInt(brandID)));
        return (
            <div>
                <div className="add-brand">
                    <h3>Добавити марку</h3>
                    <div className="add-brand_inner">
                        <div className="add-brand-group">
                            <label>Марка машини</label>
                            <select value={brandID} onChange={this.handleChange}
                                    name="cars">
                                {brands.map((brand, index) => (
                                    <option key={index}
                                            value={brand.id}>{brand.brandName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="add-brand-group">
                            <label>Модель машини</label>
                            <input className="review-form-input" required={true}
                                   type="input"
                                   value={model}
                                   name="model"
                                   onChange={this.inputChange}
                                   placeholder="Модель машини"/>
                        </div>

                        <button className="btn-add-brand" type="submit"
                                onClick={this.postModel}>
                            <a>Добавити</a>
                        </button>
                    </div>
                </div>
                <div className="admin-data-model">

                    <table className="data-table">
                        <tr>
                            <th>ID</th>
                            <th>Назва</th>
                            <th>Марка</th>
                            <th>Видалити</th>
                        </tr>
                        {filteredBrands.map((brand, index) => {
                            return (
                                <tr>
                                    <img
                                        src={'data:image/png;base64,' + brand.file.data}
                                        alt="Admin data"
                                        className="data-image"
                                    />
                                </tr>,
                                    brand.models.map(model => (
                                            <tr>
                                                <td>{model.id}</td>
                                                <td>{model.modelName}</td>
                                                <td>                                    <img
                                                    src={'data:image/png;base64,' + brand.file.data}
                                                    alt="Admin data"
                                                    className="data-image"
                                                /></td>
                                                <td><input type="button" value="X"
                                                           onClick={this.deleteModel.bind(this, model.id)}
                                                           className="btn-cancel"/></td>
                                            </tr>
                                    )))
                        })}

                    </table>
                </div>
            </div>
        )
            ;
    }
}

export default ModelPanel;
