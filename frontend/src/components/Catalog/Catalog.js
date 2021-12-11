import React, {Component} from 'react';
import "./Catalog.css"
import ProductCard from '../ProductCard/ProductCard'
import ProductDataService from '../../services/products.service'
import PaginationButton from '../PaginationButton/PaginationButton';
import DoubleArrowLeft from '../../assets/double-arrow-left.svg'
import DoubleArrowRight from '../../assets/double-arrow-right.svg'


class Catalog extends Component {
    constructor(props) {
        super();
        this.state = {
            products: [],
            searchName: '',
            currentProduct: null,
            currentIndex: -1,

            page: 1,
            count: 0,
            pageSize: 5,
            totalItems: 0,
        }
        this.pageSizes = [5, 10, 15];
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    }

    componentDidMount() {
        this.retrieveProducts();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.modelID !== this.props.modelID || prevProps.brandID !== this.props.brandID)
            this.retrieveProducts();
    }

    getRequestParams(searchName, page, pageSize, brand, model) {
        let params = {};

        if (searchName) {
            params["name"] = searchName;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        if(brand){
            params["brand"] = brand;
        }

        if (model) {
            params["model"] = model;
        }

        return params;
    }

    async retrieveProducts() {
        const {searchName, page, pageSize, brand, model} = this.state;
        const params = this.getRequestParams(searchName, page, pageSize, this.props.brandID, this.props.modelID);

        await ProductDataService.getAll(params)
            .then((response) => {
                const {totalItems, products, totalPages} = response.data;

                this.setState({
                    totalItems: totalItems,
                    products: products,
                    count: totalPages,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    inputSearch = (e) => {
        this.setState({searchName: e.target.value})
    }

    findByModel(){
        this.setState(
            {
                brand: this.props.brandID,
                model: this.props.id
            },
            () => {
                this.retrieveProducts();
            }
        )
        console.log(this.state.brand, " "< this.state.model)
    }

    handlePageChange(value) {
        this.setState(
            {
                page: value,
            },
            () => {
                this.retrieveProducts();
            }
        );
    }

    handlePageSizeChange(event) {
        this.setState(
            {
                pageSize: event.target.value,
                page: 1
            },
            () => {
                this.retrieveProducts();
            }
        );
    }

    render() {
        const {products, count, totalItems, page, pageSize} = this.state;
        return (
            <div className="catalog-container">
                <div className="additional-section">
                    <div className="additional-section__inner">
                        <div className="view-options">
                            Показано {page * pageSize - pageSize + 1}–{(page * pageSize) > totalItems ? totalItems : page * pageSize} із {totalItems} товарів</div>

                        <div className="view-options">
                            <div>Сортувати:
                                <select onChange={this.handlePageSizeChange} value={pageSize}>
                                    {this.pageSizes.map((size, index) => (
                                        <option key={index} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>Показати:
                                <select onChange={this.handlePageSizeChange} value={pageSize}>
                                    {this.pageSizes.map((size, index) => (
                                        <option key={index} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="catalog-brands" id="catalog">
                    {products.map((product, index) => (
                        <ProductCard key={index} cartItems={this.props.cartItems} addToCart={this.props.addToCart}
                                     product={product}/>
                    ))}
                </div>
                <div className="catalog-pagination">
                    <div className="pagination-buttons">
                        <div className={this.state.page === 1 ? "btn-page btn-disabled" : "btn-page"} onClick={() => this.handlePageChange(1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11"><path d="M6.7.3c-.4-.4-.9-.4-1.3 0L0 5.5l5.4 5.2c.4.4.9.3 1.3 0 .4-.4.4-1 0-1.3l-4-3.9 4-3.9c.4-.4.4-1 0-1.3z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11"><path d="M6.7.3c-.4-.4-.9-.4-1.3 0L0 5.5l5.4 5.2c.4.4.9.3 1.3 0 .4-.4.4-1 0-1.3l-4-3.9 4-3.9c.4-.4.4-1 0-1.3z"></path></svg>
                        </div>
                        {/*<div className={} onClick={() => this.handlePageChange(1)}>*/}

                        {/*</div>*/}
                        <div className={this.state.page === 1 ? "btn-page btn-disabled" : "btn-page"} onClick={() => this.handlePageChange(page  - 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11"><path d="M6.7.3c-.4-.4-.9-.4-1.3 0L0 5.5l5.4 5.2c.4.4.9.3 1.3 0 .4-.4.4-1 0-1.3l-4-3.9 4-3.9c.4-.4.4-1 0-1.3z"></path></svg>
                        </div>
                        {[...Array(count).keys()].map((pageNumber) => (
                            <div className={this.state.page === pageNumber + 1 ? "btn-page btn-active" : "btn-page"} key={pageNumber} onClick={() => this.handlePageChange(pageNumber + 1)}>{pageNumber + 1}</div>
                        ))}
                        <div className={this.state.page === count ? "btn-page btn-disabled" : "btn-page"} onClick={() => this.handlePageChange(page + 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11"><path d="M.3 10.7c.4.4.9.4 1.3 0L7 5.5 1.6.3C1.2-.1.7 0 .3.3c-.4.4-.4 1 0 1.3l4 3.9-4 3.9c-.4.4-.4 1 0 1.3z"></path></svg>
                        </div>
                        <div className={this.state.page === count ? "btn-page btn-disabled" : "btn-page"} onClick={() => this.handlePageChange(count)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11"><path d="M.3 10.7c.4.4.9.4 1.3 0L7 5.5 1.6.3C1.2-.1.7 0 .3.3c-.4.4-.4 1 0 1.3l4 3.9-4 3.9c-.4.4-.4 1 0 1.3z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11"><path d="M.3 10.7c.4.4.9.4 1.3 0L7 5.5 1.6.3C1.2-.1.7 0 .3.3c-.4.4-.4 1 0 1.3l4 3.9-4 3.9c-.4.4-.4 1 0 1.3z"></path></svg>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default Catalog;
