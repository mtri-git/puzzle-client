import React from 'react';
import { Button, Table } from 'reactstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../CompanyList/CompanyList.css';
import { format } from 'date-fns';
import { Trash } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import { AccountServiceIml } from '../../actions/admin-actions';
import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers} from "@fortawesome/free-solid-svg-icons";

const UserList = () => {

    const isAdmin = localStorage.getItem("userRole") === "ADMIN";
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        AccountServiceIml.getAllAccounts().then((response) => { 
            setAccounts(response.data.data);
            console.log("res:",response.data); 
        });
    }, [])

    const [keyword, setKeyword] = useState('');
    const [status, setStatus] = useState('');

    function handleInputChange(e) {
        setKeyword(e.target.value)
    }
    async function handleSearch() {
        const { data } = await AccountServiceIml.getAccountByKeyWordAndStatus(keyword, status);
        console.log(data);
        setAccounts(data);
    }
    function remove(number) {
        AccountServiceIml.deleteAccount(number).then(() => AccountServiceIml.getAllAccounts().then((response) => { setAccounts(response.data.data) }));
    }
    const [checked, setChecked] = useState([]);
    // Add/Remove checked item from list
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
        console.log(checked)
    };
    function removeSelected(checked) {
        checked.map(item => {
            AccountServiceIml.deleteAccount(item).then(() => AccountServiceIml.getAllAccounts().then((response) => { setAccounts(response.data.data) }));
            var updatedList = [...checked];
            updatedList.splice(checked.indexOf(item), 1);
            setChecked(updatedList);
        })
    }
    const accountList = accounts?.map(account => {
        return <tr key={account.id}>
            <td><input type="checkbox" disabled={account.active == false ? false : true} value={account.id} onChange={handleCheck}></input></td>
            <td style={{ whiteSpace: 'nowrap' }}><Link to={"/admin/accounts/addOrUpdateAccount/" + account.id} >{account.id}</Link></td>
            <td>{account.username}</td>
            <td>{account.email}</td>
            {/* <td>{account.password}</td> */}
            <td>{account.phone}</td>
            <td>{account.avatar}</td>
            <td>{account.isOnline == false ? "🕛" : "✅"}</td>
            {/* <td>{account.joinDate}</td>
            <td>{account.lastOnline}</td> */}
            <td>{account.active == false ? "INACTIVE" : "ACTIVE"}</td>
            <td>{account.roleCodes.join(',')}</td>
            {/* <td>{account.followingCandidate.length}</td>
            <td>{account.jobPostEntities.length}</td> */}
            <td style={{ textAlign: 'right' }}>
                {account.active == false ? <Button className='btn-delete' onClick={() => remove(account.id)}><Trash /></Button> : ""}
            </td>
        </tr>
    });

    return (
        <div className="container d-flex" style={{ minWidth: "90vw" }}>
            <AccountNavbar />

            <div className="content" style={{ minWidth: "82%" }}>
                <Container fluid>
                    <Row>
                        <Col xl={11}>
                            <p className="name">
                                <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faUsers} /> List of all users</h4>
                            </p>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                        <Col xl={11} className="search">
                            <div class="container">
                                <div class="row">
                                    <div className="col-md-4">
                                        <input className='form-control' value={keyword} onChange={handleInputChange} placeholder='Account number, name' >
                                        </input>
                                    </div>
                                    <div className="col-md-2">
                                        <select name="status" id="status" class="form-control" value={status}
                                            onChange={(e) => setStatus(e.target.value)}>
                                            <option value="" selected  >Account status</option>
                                            <option value="false">INACTIVE</option>
                                            <option value="true">ACTIVE</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <button type="button submit" class="btn btn-primary" onClick={handleSearch}>Search Account</button>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button" class="btn btn-light">Reset Search</button>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button" class="btn btn-light"><Link to={"/admin/accounts/addOrUpdateAccount/new"} >New Account</Link></button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            <Table className="col-md-12 overflow-auto" style={{tableLayout: "fixed", width: "100%"}} bordered>
                                <thead>
                                    <tr>
                                        <th width="5%"></th>
                                        <th width="8%">Number</th>
                                        <th width="10%">UserName</th>
                                        <th width="22%">Email</th>
                                        {/* <th width="10%">Password</th> */}
                                        <th width="10%">Phone</th>
                                        <th width="10%">Avatar</th>
                                        <th width="7%">Online</th>
                                        {/* <th width="5%">Join Date</th>
                                        <th width="5%">Last Online</th> */}
                                        <th width="10%">Status</th>
                                        <th width="15%">Role</th>
                                        <th width="7%">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accountList}
                                    <tr>
                                        <td colspan="6">{checked.length} items selected</td>
                                        <td style={{ textAlign: 'right' }} colspan="4" >delete selected items <Button className='btn-delete' onClick={() => removeSelected(checked)} ><Trash /></Button></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                </Container>
            </div>
        </div>
    );
}
export default UserList;