import React from 'react';
import { Button, Table } from 'reactstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Trash } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import {SkillServiceIml} from '../../actions/admin-actions';
import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";

const SkillList = () => {

    const type = "skill"
    const isAdmin = localStorage.getItem("userRole") === "ADMIN";
    const [skills, setSkills] = useState([]);
    useEffect(() => {
        SkillServiceIml.getAllSkills(type).then((response) => { setSkills(response.data.data) });
    }, [])

    const [keyword, setKeyword] = useState('');
    const [status, setStatus] = useState('');

    function handleInputChange(e) {
        setKeyword(e.target.value)
    }
    async function handleSearch() {
        const { data } = await SkillServiceIml.getSkillByKeyWordAndStatus(keyword, status);
        console.log(data);
        setSkills(data);
    }
    function remove(number) {
        SkillServiceIml.deleteSkill(number).then(() => SkillServiceIml.getAllSkills(type).then((response) => { setSkills(response.data.data) }));
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
            SkillServiceIml.deleteSkill(item).then(() => SkillServiceIml.getAllSkills(type).then((response) => { setSkills(response.data.data) }));
            var updatedList = [...checked];
            updatedList.splice(checked.indexOf(item), 1);
            setChecked(updatedList);
        })
    }
    const skillList = skills.map(skill => {
        return <tr key={skill.id}>
            <td><input type="checkbox" disabled={skill.active == false ? false : true} value={skill.id} onChange={handleCheck}></input></td>
            <td style={{ whiteSpace: 'nowrap' }}><Link to={"/admin/skills/addOrUpdateSkill/" + skill.id} >{skill.id}</Link></td>
            <td>{skill.name}</td>
            <td>{skill.active == false ? "INACTIVE" : "ACTIVE"}</td>
            <td  style={{ textAlign: 'right' }}>
                {skill.active == false ? <Button className='btn-delete' onClick={() => remove(skill.id)}><Trash /></Button> : ""}
            </td>
        </tr>
    });        

    return (
        <div className="container d-flex" style={{ minWidth: "90vw"}}>
            <AccountNavbar />

            <div className="content" style={{ minWidth: "82%"}}>
                <Container fluid>
                    <Row>
                        <Col xl={11}>
                            <p className="name">
                                <h1>Skill List</h1>
                            </p>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                        <Col xl={11} className="search">
                            <div class="container">
                                <div class="row">
                                    <div className="col-md-4">
                                        <input className='form-control' value={keyword} onChange={handleInputChange} placeholder='Skill number, name' >
                                        </input>
                                    </div>
                                    <div className="col-md-2">
                                        <select name="status" id="status" class="form-control" value={status}
                                            onChange={(e) => setStatus(e.target.value)}>
                                            <option value="" selected  >Skill status</option>
                                            <option value="false">INACTIVE</option>
                                            <option value="true">ACTIVE</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button submit" class="btn btn-primary" onClick={handleSearch}>Search Skill</button>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button" class="btn btn-light">Reset Search</button>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button" class="btn btn-light"><Link to={"/admin/skills/addOrUpdateSkill/new"} >New Skill</Link></button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={11}>
                            <Table className="col-md-12" bordered>
                                <thead>
                                    <tr>
                                        <th width="5%"></th>
                                        <th width="20%">Number</th>
                                        <th width="45%">Name</th>
                                        <th width="20%">Status</th>
                                        <th width="10%">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {skillList}
                                    <tr>
                                        <td colspan="5">{checked.length} items selected</td>
                                        <td  style={{ textAlign: 'right' }} colspan="3" >delete selected items <Button className='btn-delete' onClick={() => removeSelected(checked)} ><Trash /></Button></td>
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
export default SkillList;