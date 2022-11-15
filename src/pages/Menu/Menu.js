import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Checkbox from "../../component/CheckBox/Checkbox";
import CheckboxRadio from "../../component/CheckboxRadio/CheckboxRadio";
import MenuCards from "../../component/MenuCards/MenuCards";
import JobBox from "../Home/JobBoxSm";
import { employmentType, minBuget } from "./MenuData";
import { Tag, TagCloseButton, TagLabel, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, FormControl, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack, Textarea, Select, Text, Col } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import {
    fetchPerfumes,
    fetchPerfumesByPerfumer,
    fetchPerfumesByGender,
    fetchPerfumesByFilterParams
} from "../../actions/perfume-actions";
import "./MenuStyle.css";

class Menu extends Component {
    state = {
        filterParams: {
            minBuget: 0,
            experienceYear: 0,
            employmentTypes: [],
            cities: [],
            positions: [],
            skills: [],
            others: []
        }
    };

    // componentDidMount() {
    //     const perfumeData = this.props.location.state.id;

    //     if (perfumeData === "female" || perfumeData === "male") {
    //         this.props.fetchPerfumesByGender({ perfumeGender: perfumeData });
    //         window.scrollTo(0, 0);
    //     } else if (perfumeData === "all") {
    //         this.props.fetchPerfumes();
    //         window.scrollTo(0, 0);
    //     } else if (perfumeData) {
    //         this.props.fetchPerfumesByPerfumer({ perfumer: perfumeData });
    //         window.scrollTo(0, 0);
    //     }
    // }

    getProducts = (variables) => {
        this.props.fetchPerfumesByFilterParams(variables);
    };

    handleNumber = (value) => {
        const data = minBuget;
        let number = 0;

        for (let key in data) {
            if (data[key].id === parseInt(value, 10)) {
                number = data[key].value;
            }
        }

        return number;
    };

    handleAddTag = (value, category)=>{
        const newFilters = this.state.filterParams
        if(value){
            newFilters[category].push(value)
        }
        this.getProducts(newFilters)
        this.setState(newFilters);
    }

    handleDeleteTag = (value, category)=>{
        const newFilters = this.state.filterParams
        const new_arr =  newFilters[category].filter(item => item !== value);
        newFilters[category] = new_arr;
        this.getProducts(newFilters)
        this.setState(newFilters);
    }

    handleFilters = (filters, category) => {
        const newFilters = this.state.filterParams
        newFilters[category] = filters

        if (category === "minBuget") {
            let minSalaryValues = this.handleNumber(filters)
            newFilters[category] = minSalaryValues
        }

        if (category === "experienceYear") {
            let experienceYearValues = parseInt(filters)
            newFilters[category] = experienceYearValues
        }


        this.getProducts(newFilters)
        this.setState(newFilters);
    };

    render() {
        const { perfumes } = this.props;

        return (
            <div className="container d-flex" style={{ "width": "100vw" }}>
                <div>
                <nav id="sidebar" style={{ "width": "20vw" }}>
                    <div className="sidebar-header">
                        <h3>Search Job</h3>
                    </div>
                    <ul className="list-unstyled components">
                        <h5>Employment Type</h5>
                        <li className="active mb-2" id="homeSubmenu">
                            <Checkbox list={employmentType}
                                handleFilters={(filters) => this.handleFilters(filters, "employmentTypes")} />
                        </li>
                        <h5>Min Salary</h5>
                        <li className="active mb-2">
                            <CheckboxRadio list={minBuget}
                                handleFilters={(filters) => this.handleFilters(filters, "minBuget")} />
                        </li>
                        <h5>ExperienceYear</h5>
                        <li className="active mb-2">
                            <Input className="input-field" onBlur={(filters) => this.handleFilters(filters.target.value, "experienceYear")} />
                        </li>
                    </ul>
                </nav>
                <FormControl mt={3}>
                    <HStack spacing={4} alignItems={'flex-end'} as='form'>
                        <FormControl>
                            <FormLabel htmlFor='skill'>Add Skills</FormLabel>
                            <Input className="input-field" onBlur={(filters) => this.handleAddTag(filters.target.value, "skills")} />
                        </FormControl>
                    </HStack>

                    <Box borderWidth={'1px'} rounded={'sm'} my={4} p={2}>
                        {this.state.filterParams.skills.length>0 ? this.state.filterParams.skills.map((skill) => (
                            <Tag
                                className="show-tag"
                                size={'lg'}
                                borderRadius='full'
                                variant='solid'
                                colorScheme='purple'
                                m={0.5}
                            >
                                <TagLabel>{skill}</TagLabel>
                                {skill ? <TagCloseButton className="delete-tag" onClick={() => this.handleDeleteTag(skill, "skills")} /> : ""}

                            </Tag>
                        )) : (
                            "No Skills Added"
                        )}
                    </Box>
                </FormControl>
                <FormControl mt={3}>
                    <HStack spacing={4} alignItems={'flex-end'} as='form'>
                        <FormControl>
                            <FormLabel  htmlFor='position'>Add Positions</FormLabel>
                            <Input className="input-field" onBlur={(filters) => this.handleAddTag(filters.target.value, "positions")} />
                        </FormControl>
                    </HStack>

                    <Box borderWidth={'1px'} rounded={'sm'} my={4} p={2}>
                        {this.state.filterParams.positions.length>0 ? this.state.filterParams.positions.map((position) => (
                            <Tag
                                className="show-tag"
                                size={'lg'}
                                borderRadius='full'
                                variant='solid'
                                colorScheme='purple'
                                m={0.5}
                            >
                                <TagLabel>{position}</TagLabel>
                                {position ? <TagCloseButton className='delete-tag' onClick={() => this.handleDeleteTag(position, "positions")} /> : ""}

                            </Tag>
                        )) : (
                            "No Positions Added"
                        )}
                    </Box>
                </FormControl>
                <FormControl mt={3}>
                    <HStack spacing={4} alignItems={'flex-end'} as='form'>
                        <FormControl>
                            <FormLabel htmlFor='city'>Thành phố</FormLabel>
                            <Input className="input-field" onBlur={(filters) => this.handleAddTag(filters.target.value, "cities")} />
                        </FormControl>
                    </HStack>

                    <Box borderWidth={'1px'} rounded={'sm'} my={4} p={2}>
                        {this.state.filterParams.cities.length>0 ? this.state.filterParams.cities.map((city) => (
                            <Tag className="show-tag"
                                size={'lg'}
                                borderRadius='full'
                                variant='solid'
                                colorScheme='purple'
                                m={0.5}
                            >
                                <TagLabel>{city}</TagLabel>
                                {city ? <TagCloseButton className='delete-tag' onClick={() => this.handleDeleteTag(city, "cities")} /> : ""}

                            </Tag>
                        )) : (
                            "No Cities Added"
                        )}
                    </Box>
                </FormControl>
                <FormControl mt={3}>
                    <HStack spacing={4} alignItems={'flex-end'} as='form'>
                        <FormControl>
                            <FormLabel htmlFor='others'>Add Others</FormLabel>
                            <Input className="input-field" onBlur={(filters) => this.handleAddTag(filters.target.value, "others")} />
                        </FormControl>
                    </HStack>

                    <Box borderWidth={'1px'} rounded={'sm'} my={4} p={2}>
                        {this.state.filterParams.others.length>0 ? this.state.filterParams.others.map((other) => (
                            <Tag
                            className="show-tag"
                                size={'lg'}
                                borderRadius='full'
                                variant='solid'
                                colorScheme='purple'
                                m={0.5}
                            >
                                <TagLabel>{other}</TagLabel>
                                {other ? <TagCloseButton className='delete-tag' onClick={() => this.handleDeleteTag(other, "others")} /> : ""}

                            </Tag>
                        )) : (
                            "No Others Added"
                        )}
                    </Box>
                </FormControl>
                </div>
                <Route exact component={() => <MenuCards data={perfumes} itemsPerPage={15} searchByData={[]} />} />
            </div>
        );
    }
}

Menu.propTypes = {
    fetchPerfumes: PropTypes.func.isRequired,
    fetchPerfumesByPerfumer: PropTypes.func.isRequired,
    fetchPerfumesByGender: PropTypes.func.isRequired,
    fetchPerfumesByFilterParams: PropTypes.func.isRequired,
    perfumes: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    perfumes: state.perfume.perfumes,
});

export default connect(mapStateToProps, {
    fetchPerfumes,
    fetchPerfumesByPerfumer,
    fetchPerfumesByGender,
    fetchPerfumesByFilterParams
})(Menu);
