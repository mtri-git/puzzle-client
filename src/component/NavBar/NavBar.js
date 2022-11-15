import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../actions/auth-actions";
import { fetchCart } from "../../actions/cart-actions";
import "./NavBar.css";
import logo from '../../assets/img/logo.png';
import { Container, Row, Col, Nav, input } from 'react-bootstrap';

// use for root navlink not active in another address
const checkActive = (match, location) => {
    //some additional logic to verify you are in the home URI
    if(!location) return false;
    const {pathname} = location;
    console.log("Path: ",pathname);
    return pathname === "/";
}

class NavBar extends Component {
    componentDidMount() {
        this.props.fetchCart();
    }

    handleLogout = () => {
        this.props.logout();
    }


    render() {
        let cart;
        let links;
        let signOut;

        if (localStorage.getItem("isLoggedIn")) {
            links = (
                <li className="nav-item">
                    <Link to={"/account"}><span className="nav-link pl-5 pr-5">
                        <FontAwesomeIcon className="mr-2" icon={faUser} />Tài khoản</span></Link>
                </li>
            );
            signOut = (
                <Link to={"/"} onClick={this.handleLogout}>
                    <button className="btn btn-dark mr-3" style={{ color: "white" }}>
                        <FontAwesomeIcon className="mr-2" icon={faSignOutAlt} />Exit
                    </button>
                </Link>
            );
            cart = (
                <h5 className="d-inline"
                    style={{ position: "relative", right: "15px", bottom: "8px" }}>
                    <span className="badge badge-success">{this.props.cartItems.length}</span>
                </h5>
            );
        } else {
            links = (
                <>
                    <li className="nav-item">
                        <Link to={"/login"} className="nav-link pl-5 pr-3">
                            <FontAwesomeIcon className="mr-2" icon={faSignInAlt} />SIGN IN</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/registration"} className="nav-link">
                            <FontAwesomeIcon className="mr-2" icon={faUserPlus} />SIGN UP</Link>
                    </li>
                </>
            );
            cart = null;
        }

        return (
            <div className="content">
                <Container fluid className='navbar-wrapper'>
                    <Row>
                        <Col xl={1}>
                            <Link to={'/'} className='logo-wrapper'>
                                <img className="logo" src='/images/puzzle.svg' alt="logo" />
                                <div className="brand-title">Puzzle</div>
                            </Link>
                        </Col>
                        <Col xl={11}>
                            <div className="container-fluid bg-black">
                                <nav id="navbar-main" className={`container navbar navbar-expand-lg bg-black text-white `}
                                    style={{ fontSize: "18px" }}>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav mr-auto ">
                                            <li className="nav-item ">
                                                <NavLink to={"/"} activeClassName="active" isActive={checkActive}><span className="nav-link pl-5 pr-5 header-link">Trang chủ</span></NavLink>
                                            </li>
                                            <li className="nav-item ">
                                                <NavLink to={{ pathname: "/menu", state: { id: "all" } }}>
                                                    <span className="nav-link pl-5 pr-5 header-link">Việc làm</span></NavLink>
                                            </li>
                                            {/* <li className="nav-item ">
                                                <NavLink to={"/contacts"}><span className="nav-link pl-5 pr-5 header-link">Công ty</span></NavLink>
                                            </li> */}
                                            <li className="nav-item ">
                                                <NavLink to={"/resumes"}><span className="nav-link pl-5 pr-5 header-link">Cv</span></NavLink>
                                            </li>
                                        </ul>
                                        <ul className="navbar-nav ml-auto">
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to={"/jobs"}>
                                                    <i className="fas fa-lg pl-5" style={{ color: "white" }}>JOBS</i>
                                                    {cart}
                                                </NavLink>
                                            </li>
                                            {links}
                                        </ul>
                                        {signOut}
                                    </div>
                                </nav>
                            </div>
                        </Col>
                    </Row>
                        {/* <div className='search-group' style={{marginLeft: "auto", marginRight: "auto"}}>
                            <input className='search-box' placeholder='Nhập công việc bạn cần tìm ...'/>
                            <button className='search-button'>
                            <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div> */}

                </Container>
            </div>
        );
    }
}

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    fetchCart: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    cartItems: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    cartItems: state.cart.cartItems
});

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        fetchCart: () => dispatch(fetchCart())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
