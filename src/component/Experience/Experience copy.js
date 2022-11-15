import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@chakra-ui/react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, FormControl, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack, Textarea, Select, Text, Col } from '@chakra-ui/react';
import { MdDelete, MdSave } from 'react-icons/md';
import { ExperienceServiceIml } from '../../actions/user-actions';

import AccountNavbar from "../AccountNavbar/AccountNavbar";
import Skill from '../Skill/Skill';

const Experience = () => {
    const [position, setPosition] = useState('')
    const [company, setCompany] = useState('')
    const [type, setType] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [description, setDescription] = useState('')
    const [skill, setSkill] = useState('')
    const { id } = useParams();
    const [experienceList, setExperienceList] = useState([]);


    const [experience = {
        id: "", position: "", company: "", type: "", startDate: "", endDate: "", description: "", skill: "",
    }, setExperience] = useState({ id: "", position: "", company: "", type: "", startDate: "", endDate: "", description: "", skill: "", });

    useEffect(() => {
        ExperienceServiceIml.getExperienceByCandidate().then((response) => { setExperienceList(response.data.data) });
    }, []);

    const addMore = () => {
        setExperienceList([...experienceList, experienceList]);
        // ExperienceServiceIml.createExperience(experience).then(() => ExperienceServiceIml.getExperienceByCandidate().then((response) => { setExperienceList(response.data.data) }));
    }

    const handleChange = (e, id) => {
        const { name, value } = e.target;
        const updatedExperienceList = experienceList.map((work) => (
            work.id === id ? Object.assign(work, { id: uuidv4(), [name]: value }) : work
        ));

        setExperienceList(updatedExperienceList);
    }

    const deleteExperience = (id) => {
        setExperienceList(experienceList.filter((elem) => elem.id !== id))
        ExperienceServiceIml.createExperience(experience).then(() => ExperienceServiceIml.getExperienceByCandidate().then((response) => { setExperienceList(response.data.data) }));
    }

    const saveOrUpdateJobPost = (e) => {
        e.preventDefault();
    
        const experience = { id, position, company, type, startDate, endDate, description, skill};
    
    
        if (id != 'new') {
          experience.id=id;
          ExperienceServiceIml.updateJobPost(experience).then((response) => {
            // navigate.push('/employer/jobs')
          }).catch(error => {
            console.log(error)
          })
    
        } else {
          experience.id = parseInt(experience.id);
          ExperienceServiceIml.createExperience(experience).then((response) => {
    
            console.log(response.data)
    
            // navigate.push('/employer/jobs');
    
          }).catch(error => {
            console.log(error)
          })
        }
    }


    return (
        <>
            <Accordion allowToggle defaultIndex={[0]}>
                {
                    experienceList.map((work, index) => (
                        <AccordionItem key={index}>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <Text fontWeight={'minium'}>{work.position ? work.position : "Position"}</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>


                                <HStack spacing={30}>
                                    <Input width="30%" value={work.position} onChange={(e) => setPosition( e.target.value)} name='position' type='text' variant='filled' placeholder='Position' />
                                    <Input width="30%" value={work.company} onChange={(e) => setCompany( e.target.value)} name='company' type='text' variant='filled' placeholder='Company' />
                                    <Select width="30%" value={work.type} onChange={(e) => setType( e.target.value)} name='type' variant='filled' placeholder='Employment Type'>
                                        <option value='Full-time'>Full-time</option>
                                        <option value='Part-time'>Part-time</option>
                                        <option value='Internship'>Internship</option>
                                        <option value='Freelance'>Freelance</option>
                                    </Select>
                                </HStack>

                                <HStack spacing={30} mt={6}>
                                    <FormControl width="45%">
                                        <FormLabel htmlFor='startDate'>Start Date</FormLabel>
                                        <Input width="90%" value={work.startDate} onChange={(e) => setStartDate( e.target.value)} name='startDate' id='startDate' type='date' variant='filled' placeholder='Start Date' />
                                    </FormControl>

                                    <FormControl width="45%">
                                        <FormLabel htmlFor='endDate'>End Date</FormLabel>
                                        <Input width="90%" value={work.endDate} onChange={(e) => setEndDate( e.target.value)} name='endDate' id='endDate' type='date' variant='filled' placeholder='Start Date' />
                                    </FormControl>

                                </HStack>

                                <FormControl mt={3}>
                                    <FormLabel htmlFor='description'>Description</FormLabel>
                                    <Textarea width="90%" value={work.description} onChange={(e) => setDescription( e.target.value)} name='description' id='description' variant='filled' placeholder='Description...' />
                                </FormControl>

                                <FormControl mt={3}>
                                    <Skill />
                                </FormControl>

                                <FormControl mt={3}>
                                <Button rightIcon={<MdSave />} onClick={() => saveOrUpdateJobPost(work.id)} mt={3} colorScheme={'green'}>Save</Button>
                                </FormControl>

                                <Button rightIcon={<MdDelete />} onClick={() => deleteExperience(work.id)} mt={3} colorScheme={'red'}>Delete</Button>

                            </AccordionPanel>
                        </AccordionItem>
                    ))
                }
            </Accordion>

            {
                <Button colorScheme={'purple'} my={5} onClick={addMore}>Add More</Button>
            }
        </>
    )
};

export default Experience;