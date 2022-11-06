import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllUsersOrders } from "../../actions/admin-actions";
import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import Skill from "../../component/Skill/Skill";
import Experience from "../../component/Experience/Experience";
import "../../assets/img/photo-1431578500526-4d9613015464.jpeg";
import "./UserProfile.css";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

class UserProfile extends Component {
    state = {
        user_id: this.props.user_id,
        username: this.props.username,
        email: this.props.email,
        profileImage: this.props.profileImage,
        msg: this.props.msg,
        uploadedFile: null
    };

    onFormSubmit = (event) => {
        event.preventDefault();

        const userData = {
            password: this.state.password,
            email: localStorage.getItem("email")
        };

        this.props.updateUserInfo(userData, this.props.history);
    }

    changeProfileImage = (event) => {

        this.setState({ uploadedFile: event.target.files[0] });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    componentDidMount() {
        this.props.fetchAllUsersOrders();
    }


    render() {
        return (
            <div className="container d-flex">
                {/* <Box
                    bg={'white'}
                    maxW={'xl'}
                    minH={'80vh'}
                    rounded={'md'}
                    shadow={'md'}
                    overflow={'hidden'}
                    minW={'60vw'}
                > */}
                <AccountNavbar />
                {/* <Tabs isFitted size="sm" variant='enclosed'>
                        <TabList>
                            <Tab><Text fontWeight={'medium'}>About</Text></Tab>
                            <Tab><Text fontWeight={'medium'}>Experience</Text></Tab>
                            <Tab><Text fontWeight={'medium'}>Skills</Text></Tab>
                        </TabList> */}
                {/* <TabPanels> */}
                {/* <TabPanel> */}
                <Container fluid>
                    <Row>
                        <Col md="9">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Edit Profile</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <Form.Group>
                                                    <label>First Name</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="First Name"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <Form.Group>
                                                    <label>Last Name</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="Last Name"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <Form.Group>
                                                    <label>Education</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="Education"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="6">
                                                <Form.Group>
                                                    <label>Work Status</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="Work Status"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <Form.Group>
                                                    <label>Phone number</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        disabled
                                                        placeholder="Phone number"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="px-1" md="4">
                                                <Form.Group>
                                                    <label>Username</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="Username"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <Form.Group>
                                                    <label htmlFor="exampleInputEmail1">
                                                        Email address
                                                    </label>
                                                    <Form.Control
                                                        placeholder="Email"
                                                        type="email"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="12">
                                                <Form.Group>
                                                    <label>Address</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="Home Address"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-1" md="4">
                                                <Form.Group>
                                                    <label>City</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="City"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="px-1" md="4">
                                                <Form.Group>
                                                    <label>Country</label>
                                                    <Form.Control
                                                        defaultValue={this.state.username}
                                                        placeholder="Country"
                                                        type="text"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pl-1" md="4">
                                                <Form.Group>
                                                    <label>Postal Code</label>
                                                    <Form.Control
                                                        placeholder="ZIP Code"
                                                        type="number"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <Form.Group>
                                                    <label>About Me</label>
                                                    <Form.Control
                                                        cols="80"
                                                        defaultValue={this.state.username}
                                                        placeholder="Here can be your description"
                                                        rows="4"
                                                        as="textarea"
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button
                                            className="btn-fill pull-right"
                                            type="submit"
                                            variant="info"
                                            onClick={this.onFormSubmit}>
                                            Update Profile
                                        </Button>
                                        <div className="clearfix"></div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card className="card-user">
                                <Card.Body>
                                    <div className="author">
                                        <img
                                            alt="..."
                                            className="avatar border-gray"
                                            src={require("../../assets/img/faces/face-3.jpg")}
                                        ></img>
                                        <h5 className="title">Name</h5>
                                    </div>
                                </Card.Body>
                                <hr></hr>
                                <div className="button-container mr-auto ml-auto">
                                    <Form.Group controlId="formCategory4">
                                        <Form.Label>Profile Image</Form.Label>
                                        <Form.Control type="file" name="profileImage" onChange={this.changeProfileImage} />
                                    </Form.Group>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md="12">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Experience</Card.Title>
                                </Card.Header>
                                <Experience />
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h4">Skill</Card.Title>
                                </Card.Header>
                                <Skill skill={this.props.skill} />
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

UserProfile.propTypes = {
    updateUserInfo: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    fetchAllUsersOrders: PropTypes.func.isRequired,
    skill: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    skill: state.admin.orders,
});

export default connect(mapStateToProps, { fetchAllUsersOrders })(UserProfile);
