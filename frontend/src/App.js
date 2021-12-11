import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Backdrop from "./components/Backdrop/Backdrop";
import Header from "./components/Header/Header";
import SideDrawer from "./components/SideDraw/SideDrawer";
import MainSection from "./components/MainSection/MainSection";
import AutoPage from "./components/AutoPage/AutoPage";
import Home from "./components/Auth/home.component";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Profile from "./components/Auth/profile.component";
import AuthService from './services/auth.service'
import AdminPanel from "./components/AdminPanel/AdminPanel";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Checkout from "./components/Checkout/Checkout";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            sideDrawerOpen: false,
            shoppingCartOpen: false,
            q: '',
            cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    addToCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        let alreadyInCart = false;
        cartItems.forEach((item) => {
            if (item.id === product.id) {
                alreadyInCart = true
            }
        });
        if (!alreadyInCart) {
            cartItems.push({...product, count: 1});
        }
        this.setState({cartItems});
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        console.log(cartItems.length)
    }

    removeFromCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        if(cartItems.length !== 1){
            cartItems.forEach((item) => {
                if(product.id === item.id){
                    console.log(item.id)
                    cartItems.splice(cartItems.indexOf(item), 1)
                }
            })
            this.setState({cartItems})
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }else if(cartItems.length === 1){
            cartItems.forEach((item) => {
                if(product.id === item.id){
                    console.log(item.id)
                    cartItems.splice(cartItems.indexOf(item), 1)
                }
            })
            localStorage.clear()
            this.setState({cartItems})

        }

    };

    logOut() {
        AuthService.logout();
    }

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen}
        });
    };

    shoppingCartClickHandler = () => {
        this.setState((prevState) => {
            return {shoppingCartOpen: !prevState.sideDrawerOpen}
        });
    };

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false, shoppingCartOpen: false})
    }

    inputSearch = (e) => {
        this.setState({q: e})
    }

    increaseItem = (product, count) => {
        const cartItems = this.state.cartItems.slice()
        product.count++;
        this.setState({count: count + 1});
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    };

    decreaseItem = (product, count) => {
        const cartItems = this.state.cartItems.slice()
        if (product.count > 1) {
            product.count--;
            this.setState({count: count - 1});
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    };

    render() {
        let backdrop;

        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }

        if (this.state.shoppingCartOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        const { currentUser, showModeratorBoard,q, showAdminBoard } = this.state;

        return (
            <div>
                <Router>
                    <Header logOut={this.logOut}
                            currentUser={currentUser}
                            role={showAdminBoard}
                            drawerClickHandler={this.drawerToggleClickHandler}
                            shoppingCartClickHandler={this.shoppingCartClickHandler}
                            toggle={this.state.sideDrawerOpen}
                            search={this.inputSearch}
                            cartItems={this.state.cartItems}
                    />
                    <SideDrawer show={this.state.sideDrawerOpen}/>
                    <ShoppingCart
                        cartItems={this.state.cartItems}
                        removeFromCart={this.removeFromCart}
                        click={this.backdropClickHandler}
                        show={this.state.shoppingCartOpen}
                        increaseItem={this.increaseItem}
                        decreaseItem={this.decreaseItem}
                    />
                    {backdrop}
                    <Switch>
                        <Route exact path="/" render={() => <MainSection cartItems={this.state.cartItems} addToCart={this.addToCart} q={q}/>}/>
                        <Route exact path="/:brand/:model" component={AutoPage}/>
                        <Route exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/admin" component={Login}/>
                        <Route exact path="/signup" component={Login}/>
                        <Route exact path="/registration" component={Register}/>
                        <Route exact path="/checkout"
                               render={() =>
                                   <Checkout
                                       cartItems={this.state.cartItems}
                                       increaseItem={this.increaseItem}
                                       decreaseItem={this.decreaseItem}
                                       removeFromCart={this.removeFromCart}/>}
                        />
                        <Route exact path="/admin-panel" render={() => <AdminPanel logOut={this.logOut} user={currentUser} />}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
