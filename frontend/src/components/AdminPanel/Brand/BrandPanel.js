import React, {Component} from 'react';
import AdminData from "../AdminData/AdminData";
import axios from "axios";
import AuthService from "../../../services/auth.service";

class BrandPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: '',
            file: '',
            brands: [],
            brandID: 602,
            image: "https://image.flaticon.com/icons/png/512/37/37543.png",
            isLoading: true
        }
        console.log(this.props.currentUser)
        this.inputChange = this.inputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        this.findAllBrands();
    }

    /*Inputs*/

    inputChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    onFileChangeHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({image: reader.result})
            }
        }
        reader.readAsDataURL(e.target.files[0])
        e.preventDefault();
        this.setState({
            file: e.target.files[0]
        });

    };

    handleChange(e) {
        this.setState({brandID: e.target.value});
    }

    /*End of inputs*/


    findAllBrands() {
        axios.get("/api/brand/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({brands: data, isLoading: false})
            });
    }

    postBrand = () => {
        let data = new FormData();
        data.append('file', this.state.file);
        data.append('brand', this.state.brand);
        axios.post("/api/brand",
            data, {headers: {"Content-type": "multipart/form-data"}}
        )
        window.location.reload(true);
    }

    deleteBrand = (id) => {
        axios.delete("api/brand/" + id)
            .then(respone => {
                if (respone.data != null) {
                    this.setState({
                        brands: this.state.brands.filter(brand => brand.id !== id)
                    })
                }
            })
    }

    render() {
        const {brand, brands, image} = this.state
        return (
            <div>
                <div className="add-brand">
                    <h3>Добавити модель</h3>
                    <div className="add-brand_inner">
                        <div className="add-brand-group">
                            <label>Модель машини</label>
                            <input className="review-form-input" required={true} type="input"
                                   value={brand}
                                   name="brand"
                                   onChange={this.inputChange} placeholder="Марка машини"/>
                        </div>
                        <div className="add-brand-group">
                            <label className="choose-image" htmlFor="file">Вибрати фото</label>
                            <input type="file" name="file" id="file" hidden
                                   onChange={this.onFileChangeHandler}/>
                        </div>
                        <div className="add-brand-group">
                            <img
                                className="add-brand-image"
                                src={image}
                            />
                        </div>
                        <button className="btn-add-brand" type="submit"
                                onClick={this.postBrand}>
                            <a>Добавити</a>
                        </button>
                    </div>
                </div>

                <table className="data-table">
                    <tr>
                        <th>ID</th>
                        <th>Назва</th>
                        <th>Зображення</th>
                        <th>Видалити</th>
                    </tr>
                    {brands.map((brand, index) => (
                        <tr key={index}>
                            {console.log(brand)}
                            <td>{brand.id}</td>
                            <td>{brand.brandName}</td>
                            <td><img
                                className="data-image"
                                src={`data:image/png;base64,${brand.file.data}`}
                                alt="Admin data"
                            /></td>
                            <td><input type="button" value="X"
                                       onClick={this.deleteBrand.bind(this, brand.id)}
                                       className="btn-cancel"/>
                            </td>
                        </tr>
                    ))}
                </table>

            </div>
        );
    }
}

export default BrandPanel;
