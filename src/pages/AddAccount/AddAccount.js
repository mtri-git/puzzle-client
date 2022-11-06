import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import {CompanyServiceIml, AccountServiceIml} from '../../actions/admin-actions';
import { Container, Row, Col, Nav, Form } from 'react-bootstrap';
import { Button, FormGroup, Input, Label } from 'reactstrap';
// import {EmployerService} from '../../actions/admin-actions';
import {AccountService} from '../../actions/admin-actions';
import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
const AddAccountComponent = () => {

    const [number, setNumber] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [avatar, setAvatar] = useState('')
    const [isActive, setIsActive] = useState('INACTIVE')
    const [isOnline, setIsOnline] = useState('INACTIVE')
    const [joinDate, setJoinDate] = useState('')
    const [lastOnline, setLastOnline] = useState('')
    const [roleCodes, setRoleCodes] = useState([])

    const navigate = useHistory();
    const { id } = useParams();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            saveOrUpdateAccount(event);
        }
        setValidated(true);

    };

    const saveOrUpdateAccount = (e) => {
        e.preventDefault();

        const account = { number, username, email, password, phone, avatar, isOnline, joinDate, lastOnline, isActive, roleCodes }

        if (id!='new') {
            AccountServiceIml.updateAccount(id, account).then((response) => {
                navigate.push('/admin/users/all')
            }).catch(error => {
                console.log(error)
            })

        } else {
            account.number = parseInt(account.number);
            AccountServiceIml.createAccount(account).then((response) => {

                console.log(response.data)

                navigate.push('/admin/users/all');

            }).catch(error => {
                console.log(error)
            })
        }

    }

    useEffect(() => {
        AccountServiceIml.getAccountById(id).then((response) => {
                setNumber(response.data.data.id)
                setUsername(response.data.data.username)
                setEmail(response.data.data.email)
                setPassword(response.data.data.password)
                setPhone(response.data.data.phone)
                setAvatar(response.data.data.avatar)
                setIsActive(response.data.data.isActive)
                setIsOnline(response.data.data.isOnline)
                setJoinDate(response.data.data.joinDate)
                setLastOnline(response.data.data.lastOnline)
                setRoleCodes(response.data.data.roleCodes)
            }).catch(error => {
                setNumber('')
                setUsername('')
                setEmail('')
                setPassword('')
                setPhone('')
                setAvatar('')
                setRoleCodes([])
                setIsActive("INACTIVE")
                setIsOnline("INACTIVE")
                setJoinDate('')
                setLastOnline('')
            })
    }, [id])

    const title = <h2>{id != 'new' ? 'Edit Account information' : 'New Account'}</h2>;
    const action = <div>{id != 'new' ? 'Edit Account' : 'Create Account'}</div>


    const [employers, setEmployers] = useState([]);
    useEffect(() => {
        AccountServiceIml.getAllAccounts().then((response) => { setEmployers(response.data.data) });
    }, [])
    console.log("employer", employers)
    const employerList = employers.map(employer => {
        return<option value={employer.id}>{employer.email}</option>
    });

    return (
        <div className="container d-flex" style={{ minWidth: "90vw"}}>
            <AccountNavbar />
            <div className="content account" style={{ minWidth: "82%"}}>
                <Container fluid>
                    <Row>
                        <Col xl={11}>
                            <p className="name-account">
                                <h1>{title}</h1>
                            </p>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <div className="container">
                                <div class="row form-group ">
                                    <div class="col-md-2 template required">Account name</div>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" value={username}
                                            onChange={(e) => setUsername(e.target.value)} required></input>
                                        <div class="valid-feedback">Valid.</div>
                                        <div class="invalid-feedback">Please fill out this field.</div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-2 template required">Email</div>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" value={email}
                                            onChange={(e) => setEmail(e.target.value)} required></input>
                                        <div class="valid-feedback">Valid.</div>
                                        <div class="invalid-feedback">Please fill out this field.</div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-2 template required">Password</div>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" value={password}
                                            onChange={(e) => setPassword(e.target.value)}></input>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-2 template required">Avatar</div>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" value={avatar}
                                            onChange={(e) => setAvatar(e.target.value)}></input>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-2 template required">Phone</div>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" value={phone}
                                            onChange={(e) => setPhone(e.target.value)}></input>
                                    </div>
                                </div>
                                <div class="row form-group" style={{textAlign: "left"}}>
                                    <div class="col-md-2 template required">Active</div>
                                    <div class="col-md-3">
                                        <select name="isActive" id="isActive" class="form-control" value={isActive}
                                            onChange={(e) => setIsActive(e.target.value)} >
                                            <option value="false">Inactive</option>
                                            <option value="true">Active</option>
                                        </select>
                                    </div>
                                    <div class="col-md-1"></div>
                                    <div class="col-md-2 template required">Online</div>
                                    <div class="col-md-3">
                                        <select name="isOnline" id="isOnline" class="form-control" value={isOnline}
                                            onChange={(e) => setIsOnline(e.target.value)} >
                                            <option value="false">Inactive</option>
                                            <option value="true">Active</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-2 template required">Join date</div>
                                    <div class="col-md-3"><input type="date" class="form-control" value={joinDate}
                                        onChange={(e) => setJoinDate(e.target.value)} required></input></div>
                                    <div class="col-md-1"></div>
                                    <div class="col-md-2 template ">End date</div>
                                    <div class="col-md-3"><input type="date" class="form-control" value={lastOnline}
                                        onChange={(e) => setLastOnline(e.target.value)}></input></div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-2 template ">Role</div>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" value={roleCodes}
                                            onChange={(e) => setRoleCodes(e.target.value.replace(" ","").split(','))}></input>
                                    </div>
                                </div>
                            </div>
                        </Row>
                        <hr></hr>
                        <Row>
                            <div class="container">
                                <div class="row">
                                    <div className="col-md-7"></div>
                                    <div class="col-md-2">
                                        <Link to={"/accounts/" + id} className="btn btn-light"> Cancel </Link>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button submit" class="btn btn-primary" >{action}</button>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default AddAccountComponent