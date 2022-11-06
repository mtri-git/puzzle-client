import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import {CompanyServiceIml, AccountServiceIml} from '../../actions/admin-actions';
import { Container, Row, Col, Nav, Form } from 'react-bootstrap';
import { Button, FormGroup, Input, Label } from 'reactstrap';
// import {EmployerService} from '../../actions/admin-actions';
import {AccountService} from '../../actions/admin-actions';
import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
const AddCompanyComponent = () => {

    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [website, setWebsite] = useState('')
    const [visaLeader, setVisaLeader] = useState('')
    const [members, setMembers] = useState([])
    const [status, setStatus] = useState('INACTIVE')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

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
            saveOrUpdateCompany(event);
        }
        setValidated(true);

    };

    const saveOrUpdateCompany = (e) => {
        e.preventDefault();

        const company = { number, name, description, visaLeader, members, status, website }

        if (id!='new') {
            CompanyServiceIml.updateCompany(id, company).then((response) => {
                navigate.push('/admin/companys/all')
            }).catch(error => {
                console.log(error)
            })

        } else {
            company.number = parseInt(company.number);
            CompanyServiceIml.createCompany(company).then((response) => {

                console.log(response.data)

                navigate.push('/admin/companys/all');

            }).catch(error => {
                console.log(error)
            })
        }

    }

    useEffect(() => {
        CompanyServiceIml.getCompanyById(id).then((response) => {
                setNumber(response.data.data.id)
                setName(response.data.data.name)
                setDescription(response.data.data.description)
                setWebsite(response.data.data.website)
                setVisaLeader(response.data.data.visaLeader)
                // setMembers(response.data.members)
                setStatus(response.data.data.isActive)
                // setStartDate(response.data.startDate)
                // setEndDate(response.data.endDate)
            }).catch(error => {
                setNumber('')
                setName('')
                setDescription('')
                setWebsite('')
                setVisaLeader('')
                setMembers([])
                setStatus("INACTIVE")
                setStartDate('')
                setEndDate('')
            })
    }, [id])

    const title = <h2>{id != 'new' ? 'Edit Company information' : 'New Company'}</h2>;
    const action = <div>{id != 'new' ? 'Edit Company' : 'Create Company'}</div>


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
            <div className="content company" style={{ minWidth: "82%"}}>
                <Container fluid>
                    <Row>
                        <Col xl={11}>
                            <p className="name-company">
                                <h1>{title}</h1>
                            </p>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <div className="container">
                                <div class="row form-group ">
                                    <div class="col-md-2 template required">Company name</div>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" value={name}
                                            onChange={(e) => setName(e.target.value)} required></input>
                                        <div class="valid-feedback">Valid.</div>
                                        <div class="invalid-feedback">Please fill out this field.</div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-2 template required">Description</div>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" value={description}
                                            onChange={(e) => setDescription(e.target.value)} required></input>
                                        <div class="valid-feedback">Valid.</div>
                                        <div class="invalid-feedback">Please fill out this field.</div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-2 template required">Website</div>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" value={website}
                                            onChange={(e) => setWebsite(e.target.value)}></input>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    {/* <div class="col-md-2 template required">Employer</div>
                                    <div class="col-md-3">
                                        <select name="employer" id="employer" class="form-control" value={visaLeader}
                                            onChange={(e) => setVisaLeader(e.target.value)}>
                                                {employerList}
                                        </select>
                                    </div> */}
                                </div>
                                {/* <div class="row form-group">
                                    <div class="col-md-2 template ">Members</div>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" value={visaLeader}
                                            onChange={(e) => setMembers(e.target.value)}></input>
                                    </div>
                                </div> */}
                                <div class="row form-group" style={{textAlign: "left"}}>
                                    <div class="col-md-2 template required">Status</div>
                                    <div class="col-md-3">
                                        <select name="status" id="status" class="form-control" value={status}
                                            onChange={(e) => setStatus(e.target.value)} >
                                            <option value="false">Inactive</option>
                                            <option value="true">Active</option>
                                        </select>
                                    </div>
                                    <div class="col-md-1"></div>
                                    <div class="col-md-2 template required">Employer</div>
                                    <div class="col-md-3">
                                        <select name="employer" id="employer" class="form-control" value={visaLeader}
                                            onChange={(e) => setVisaLeader(e.target.value)}>
                                                {employerList}
                                        </select>
                                    </div>
                                    {/* <div class="col-md-2 template ">Members</div>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" value={members}
                                            onChange={(e) => setMembers(e.target.value)}></input>
                                    </div> */}
                                </div>
                                {/* <div class="row form-group">
                                    <div class="col-md-2 template required">Start date</div>
                                    <div class="col-md-3"><input type="date" class="form-control" value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)} required></input></div>
                                    <div class="col-md-1"></div>
                                    <div class="col-md-2 template ">End date</div>
                                    <div class="col-md-3"><input type="date" class="form-control" value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}></input></div>
                                </div> */}
                            </div>
                        </Row>
                        <hr></hr>
                        <Row>
                            <div class="container">
                                <div class="row">
                                    <div className="col-md-7"></div>
                                    <div class="col-md-2">
                                        <Link to={"/companys/" + id} className="btn btn-light"> Cancel </Link>
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

export default AddCompanyComponent