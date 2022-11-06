import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faSync, faUndo } from "@fortawesome/free-solid-svg-icons";

import { resetPassword, fetchResetPasswordCode, formReset } from "../../actions/auth-actions";
import { checkPasswords, validatePassword } from "../../utils/input-validators";
import AccountNavbar from '../../component/AccountNavbar/AccountNavbar';
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

class ResetPassword extends Component {
    state = {
        oldpassword: "",
        password: "",
        password2: "",
        validatePasswordError: "",
        validateRepeatPasswordError: ""
    };

    componentDidMount() {
        this.props.formReset();

        if (this.props.match.params.code) {
            this.props.fetchResetPasswordCode(this.props.match.params.code);
        }
    }

    onClickReset = (event) => {
        event.preventDefault();

        const { oldpassword,password, password2 } = this.state;
        const validateErrors = {};
        validateErrors.validatePasswordError = validatePassword(oldpassword);
        validateErrors.validatePasswordError = validatePassword(password);
        validateErrors.validateRepeatPasswordError = checkPasswords(password, password2);

        if (validateErrors.validatePasswordError || validateErrors.validateRepeatPasswordError) {
            this.setState({
                ...validateErrors
            });
        } else {
            const data = {
                email: this.props.user.email,
                oldpassword: this.props.user.password,
                password,
                password2
            };

            this.props.resetPassword(data, this.props.history);
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const { oldpassword, password, password2, validatePasswordError, validateRepeatPasswordError } = this.state;
        const { passwordError, password2Error } = this.props.errors;

        return (
            <div className="container d-flex">
                <AccountNavbar />
                <Container fluid>
                <Row>
                    <h4><FontAwesomeIcon className="mr-2" icon={faSync} /> RESET PASSWORD</h4>
                </Row>
                {/* <hr align="left" width="550"/> */}
                {this.props.error ?
                    <div className="alert alert-danger col-6" role="alert">{this.props.error}</div> : null}
                <Row>
                    <form onSubmit={this.onClickReset} style={{ position: "relative", width: "100%" }}>
                        <div className="form-group row" style={{ marginTop: "2%" }}>
                            <label className="col-sm-3 col-form-label">Current password: </label>
                            <FontAwesomeIcon style={{ position: "relative", top: "8px" }} icon={faLock} />
                            <div className="col-sm-6">
                                <input
                                    type="password"
                                    name="oldpassword"
                                    value={oldpassword}
                                    className={passwordError || validatePasswordError ? "form-control is-invalid" : "form-control"}
                                    onChange={this.handleInputChange} />
                                <div className="invalid-feedback">{passwordError || validatePasswordError}</div>
                            </div>
                        </div>
                        <div className="form-group row" style={{ marginTop: "2%" }}>
                            <label className="col-sm-3 col-form-label">New password: </label>
                            <FontAwesomeIcon style={{ position: "relative", top: "8px" }} icon={faLock} />
                            <div className="col-sm-6">
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    className={passwordError || validatePasswordError ? "form-control is-invalid" : "form-control"}
                                    onChange={this.handleInputChange} />
                                <div className="invalid-feedback">{passwordError || validatePasswordError}</div>
                            </div>
                        </div>
                        <div className="form-group row" style={{ marginTop: "2%" }}>
                            <label className="col-sm-3 col-form-label">Confirm password: </label>
                            <FontAwesomeIcon style={{ position: "relative", top: "8px" }} icon={faLock} />
                            <div className="col-sm-6">
                                <input
                                    type="password"
                                    name="password2"
                                    value={password2}
                                    className={password2Error || validateRepeatPasswordError ? "form-control is-invalid" : "form-control"}
                                    onChange={this.handleInputChange} />
                                <div className="invalid-feedback">{password2Error || validateRepeatPasswordError}</div>
                            </div>
                        </div>
                        <div className="form-group row" style={{ marginTop: "2%" }}>
                            <button type="submit" className="btn btn-dark mx-3">
                                <FontAwesomeIcon className="mr-3" icon={faUndo} />Reset
                            </button>
                        </div>
                    </form>
                </Row>
                </Container>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    fetchResetPasswordCode: PropTypes.func.isRequired,
    formReset: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    errors: state.auth.errors,
    error: state.auth.error
});

export default connect(mapStateToProps, { resetPassword, fetchResetPasswordCode, formReset })(ResetPassword);
