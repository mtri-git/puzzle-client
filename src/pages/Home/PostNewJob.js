import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { JobPostServiceIml, AccountServiceIml } from '../../actions/user-actions';
import { Container, Row, Col, Nav, Form } from 'react-bootstrap';
import { Button, FormGroup, Input, Label } from 'reactstrap';
// import {EmployerService} from '../../actions/admin-actions';
import { AccountService } from '../../actions/admin-actions';
import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
const AddJobPostComponent = () => {

  const [number, setNumber] = useState('')
  const [title, setTitle] = useState('')
  const [blind, setBlind] = useState('')
  const [deaf, setDeaf] = useState('')
  const [handDis, setHandDis] = useState('')
  const [labor, setLabor] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [workplaceType, setWorkplaceType] = useState('')
  const [workStatus, setWorkStatus] = useState('')
  const [communicationDis, setCommunicationDis] = useState('')
  const [skills, setSkills] = useState('')
  const [level, setLevel] = useState('')

  const [type, setType] = useState('')
  const [quantity, setQuantity] = useState('')
  const [experienceYear, setExperienceYear] = useState('')
  const [educationLevel, setEducationLevel] = useState('')
  const [employmentType, setEmploymentType] = useState('')
  const [minBudget, setMinBudget] = useState('INACTIVE')
  const [maxBudget, setMaxBudget] = useState('')
  const [dueTime, setDueTime] = useState('')
  const [description, setDescription] = useState('')



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
      saveOrUpdateJobPost(event);
    }
    setValidated(true);

  };

  const saveOrUpdateJobPost = (e) => {
    e.preventDefault();

    const jobPost = {
      id, number, title, blind, deaf, handDis, description, labor, city, address, workplaceType, workStatus, communicationDis
      , communicationDis, skills, level, type, quantity, experienceYear, educationLevel, employmentType, minBudget, maxBudget, dueTime
    }

    console.log(jobPost);

    if (id != 'new') {
      jobPost.id=id;
      JobPostServiceIml.updateJobPost(jobPost).then((response) => {
        navigate.push('/employer/jobs')
      }).catch(error => {
        console.log(error)
      })

    } else {
      jobPost.number = parseInt(jobPost.number);
      const {id, ...data} = jobPost
      JobPostServiceIml.createJobPost(data).then((response) => {

        console.log(response.data)

        navigate.push('/employer/jobs');

      }).catch(error => {
        console.log(error)
      })
    }

  }

  useEffect(() => {
    JobPostServiceIml.getJobPostById(id).then((response) => {
      setNumber(response.data.data.id)
      setTitle(response.data.data.title)
      setBlind(response.data.data.blind)
      setDeaf(response.data.data.deaf)
      setHandDis(response.data.data.handDis)
      setLabor(response.data.data.labor)
      setCity(response.data.data.city)
      setAddress(response.data.data.address)
      setDescription(response.data.data.description)
      setWorkplaceType(response.data.data.workplaceType)
      setWorkStatus(response.data.data.workStatus)
      setSkills(response.data.data.skills)
      setCommunicationDis(response.data.data.communicationDis)
      setLevel(response.data.data.level)
      setType(response.data.data.type)
      setQuantity(response.data.data.quantity)
      setExperienceYear(response.data.data.experienceYear)
      setEducationLevel(response.data.data.educationLevel)
      setType(response.data.data.type)
      setMinBudget(response.data.data.minBudget)
      setMaxBudget(response.data.data.maxBudget)
      setDueTime(response.data.data.dueTime)
    }).catch(error => {
      setNumber('')
      setTitle('')
      setBlind('')
      setDeaf('')
      setHandDis('')
      setLabor('')
      setCity('')
      setAddress('')
      setWorkplaceType('')
      setWorkStatus('')
      setSkills('')
      setCommunicationDis('')
      setLevel('')
      setType('')
      setQuantity('')
      setExperienceYear('')
      setEducationLevel('')
      setType('')
      setMinBudget('')
      setMaxBudget('')
      setDueTime('')
    })
  }, [id])

  const titlePage = <h2>{id != 'new' ? 'Edit JobPost information' : 'New JobPost'}</h2>;
  const action = <div>{id != 'new' ? 'Edit JobPost' : 'Create JobPost'}</div>

  return (
    <div className="container d-flex" style={{ minWidth: "90vw" }}>
      <AccountNavbar />
      <div className="content jobPost" style={{ minWidth: "82%" }}>
        <Container fluid className="col-lg-8 job-info-container">
          <Row>
            <Col xl={11}>
              <p className="name-jobPost">
                <h1>{titlePage}</h1>
              </p>
            </Col>
          </Row>
          <hr></hr>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <div className="container">
                <div class="row form-group ">
                  <div class="col-md-2 template required">JobPost name</div>
                  <div class="col-md-9">
                    <input type="text" class="form-control" value={title}
                      onChange={(e) => setTitle(e.target.value)} required></input>
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
                  <div class="col-md-2 template required">City</div>
                  <div class="col-md-2">
                    <input type="text" class="form-control" value={city}
                      onChange={(e) => setCity(e.target.value)}></input>
                  </div>
                  <div class="col-md-2 template required">Address</div>
                  <div class="col-md-5">
                    <input type="text" class="form-control" value={address}
                      onChange={(e) => setAddress(e.target.value)}></input>
                  </div>
                </div>
                <div class="row form-group" style={{ textAlign: "left" }}>
                  <div class="col-md-2 template required">Blind</div>
                  <div class="col-md-3">
                    <select name="blind" id="blind" class="form-control" value={blind}
                      onChange={(e) => setBlind(e.target.value)} >
                      <option value="false">Allow</option>
                      <option value="true">Not Allow</option>
                    </select>
                  </div>
                  <div class="col-md-1"></div>
                  <div class="col-md-2 template required">HandDis</div>
                  <div class="col-md-3">
                    <select name="handDis" id="handDis" class="form-control" defaultValue={true} value={handDis}
                      onChange={(e) => setHandDis(e.target.value)} >
                      <option value="false">Allow</option>
                      <option value="true">Not Allow</option>
                    </select>
                  </div>
                </div>
                <div class="row form-group" style={{ textAlign: "left" }}>
                  <div class="col-md-2 template required">Labor</div>
                  <div class="col-md-3">
                    <select name="labor" id="labor" class="form-control" value={labor}
                      onChange={(e) => setLabor(e.target.value)} >
                      <option value="false">Allow</option>
                      <option value="true">Not Allow</option>
                    </select>
                  </div>
                  <div class="col-md-1"></div>
                  <div class="col-md-2 template required">Deaf</div>
                  <div class="col-md-3">
                    <select name="deaf" id="deaf" class="form-control" value={deaf}
                      onChange={(e) => setDeaf(e.target.value)} >
                      <option value="false">Allow</option>
                      <option value="true">Not Allow</option>
                    </select>
                  </div>
                </div>
                <div class="row form-group" style={{ textAlign: "left" }}>
                  <div class="col-md-2 template required">Workplace</div>
                  <div class="col-md-3">
                    <input type="text" class="form-control" value={workplaceType}
                      onChange={(e) => setWorkplaceType(e.target.value)}></input>
                  </div>
                  <div class="col-md-1"></div>
                  <div class="col-md-2 template required">Work Status</div>
                  <div class="col-md-3">
                    <select name="deaf" id="deaf" class="form-control" value={workStatus}
                      onChange={(e) => setWorkStatus(e.target.value)} >
                      <option value="false">Inactive</option>
                      <option value="true">Active</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row form-group" style={{ textAlign: "left" }}>
                <div class="col-md-2 template required">Experience Year</div>
                <div class="col-md-3">
                  <input type="text" class="form-control" value={experienceYear}
                    onChange={(e) => setExperienceYear(e.target.value)}></input>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-2 template required">Education Level</div>
                <div class="col-md-3">
                  <input type="text" class="form-control" value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}></input>
                </div>
              </div>
              <div class="row form-group" style={{ textAlign: "left" }}>
                <div class="col-md-2 template required">Min Budget</div>
                <div class="col-md-3">
                  <input type="text" class="form-control" value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}></input>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-2 template required">Max Budget</div>
                <div class="col-md-3">
                  <input type="text" class="form-control" value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}></input>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-2 template required">Quantity</div>
                <div class="col-md-3"><input type="text" class="form-control" value={quantity}
                  onChange={(e) => setQuantity(e.target.value)} required></input></div>
                <div class="col-md-1"></div>
                <div class="col-md-2 template ">End date</div>
                <div class="col-md-3"><input type="date" class="form-control" value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}></input></div>
              </div>
            </Row>

            {/* setSkills('')
            setCommunicationDis('')
            setLevel('')
            setType('')
            setType('') */}


            <hr></hr>
            <Row>
              <div class="container">
                <div class="row">
                  <div className="col-md-7"></div>
                  <div class="col-md-2">
                    <Link to={"/jobPosts/" + id} className="btn btn-light"> Cancel </Link>
                  </div>
                  <div class="col-md-3">
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

export default AddJobPostComponent