import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@chakra-ui/react';
import { Tag, TagCloseButton, TagLabel, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, FormControl, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack, Textarea, Select, Text, Col } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

import AccountNavbar from "../AccountNavbar/AccountNavbar";
import Skill from '../Skill/Skill';
import { ExperienceServiceIml } from '../../actions/user-actions';

import './Experience.css'

const Experience = () => {
    const [experienceList, setExperienceList] = useState([]);
    useEffect(() => {
        ExperienceServiceIml.getExperienceByCandidate().then((response) => { setExperienceList(response.data.data) });
    }, []);
    const addMore = () => {
        setExperienceList([...experienceList, {
            id: "-1",
            title: "",
            company: "",
            employmentType: "",
            startDate: "",
            endDate: "",
            description: "",
            skills: "",
        }]);
        const skill = document.getElementById("skills")
        skill.value = ""
        
    }
    const saveOrUpdate = () => {
        experienceList.map((work) => (
            work.id == '-1' && work.title != "" ? ExperienceServiceIml.createExperience(work) : ExperienceServiceIml.updateExperience(work)
        ));
        console.log(experienceList);
    }

    const handleChange = (e, id) => {
        const { name, value } = e.target;
        const updatedExperienceList = experienceList.map((work) => (
            work.id === id ? Object.assign(work, { [name]: value }) : work
        ));

        setExperienceList(updatedExperienceList);
    }

    const handleSkill= (e, id) => {
        e.preventDefault();
        const { name, value } = e.target[0];
        const updatedExperienceList = experienceList.map((work) => (
            work.id === id ? Object.assign(work, { [name]: work.skills+value+',' }) : work
        ));

        setExperienceList(updatedExperienceList);
    }

    const deleteExperience = (id) => {
        setExperienceList(experienceList.filter((elem) => elem.id !== id))
        ExperienceServiceIml.deleteExperience(id)
    }

    const [skill, setSkill] = useState("");

    const deleteSkill = (skill,id) => {
        const updatedExperienceList = experienceList.map((work) => (
            work.id === id ? Object.assign(work, { ["skills"]: work.skills.replace(skill+',','') }) : work
        ));

        setExperienceList(updatedExperienceList);
    }

    return (
        <>
            <Accordion allowToggle defaultIndex={[0]}>
                {
                    experienceList.map((work, index) => (
                        <AccordionItem key={index}>
                            <h2>
                                <AccordionButton  className='main-color'>
                                    <Box flex='1' textAlign='left'>
                                        <h3 fontWeight={'medium'}>{work.title ? work.title : "Title"}</h3>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>


                                <HStack spacing={30} paddingTop={10} paddingLeft={10}>
                                    <Input width="30%" className='input-field' value={work.title} onChange={(e) => handleChange(e, work.id)} name='title' type='text' variant='filled' placeholder='Title' />
                                    <Input width="30%" className='input-field' value={work.company} onChange={(e) => handleChange(e, work.id)} name='company' type='text' variant='filled' placeholder='Company' />
                                    <Select width="30%" value={work.employmentType} onChange={(e) => handleChange(e, work.id)} name='employmentType' variant='filled' placeholder='Employment Type'>
                                        <option value='Full-time'>Full-time</option>
                                        <option value='Part-time'>Part-time</option>
                                        <option value='Internship'>Internship</option>
                                        <option value='Freelance'>Freelance</option>
                                    </Select>
                                </HStack>

                                <HStack spacing={30} mt={6}>
                                    <FormControl width="45%">
                                        <FormLabel htmlFor='startDate'>Start Date</FormLabel>
                                        <Input className='input-field' width="90%" value={work.startDate} onChange={(e) => handleChange(e, work.id)} name='startDate' id='startDate' type='date' variant='filled' placeholder='Start Date' />
                                    </FormControl>

                                    <FormControl width="45%">
                                        <FormLabel htmlFor='endDate'>End Date</FormLabel>
                                        <Input className='input-field' width="90%" value={work.endDate} onChange={(e) => handleChange(e, work.id)} name='endDate' id='endDate' type='date' variant='filled' placeholder='Start Date' />
                                    </FormControl>

                                </HStack>

                                <FormControl mt={3}>
                                    <FormLabel htmlFor='description'>Description</FormLabel>
                                    <Textarea className='input-field' width="90%" value={work.description} onChange={(e) => handleChange(e, work.id)} name='description' id='description' variant='filled' placeholder='Description...' />
                                </FormControl>

                                <FormControl mt={3}>
                                    <HStack spacing={4} alignItems={'flex-end'} as='form' onSubmit={(e) =>handleSkill(e, work.id)}>
                                        <FormControl>
                                            <FormLabel htmlFor='skill'>Kỹ năng</FormLabel>
                                            <Input className='input-field' onChange={(e) => setSkill(e.target.value)} value={skill} name='skills' id='skills' type='text' variant='filled' placeholder='Skill' />
                                        </FormControl>
                                        <Button id="add-skill-button" type='submit' colorScheme={'purple'}>Add</Button>
                                    </HStack>

                                    <Box  borderWidth={'1px'} rounded={'sm'} my={4} p={2} marginLeft={20}>
                                        {work.skills ? work.skills.split(',').map((skill) => (
                                            <Tag
                                                className='show-tag'
                                                size={'lg'}
                                                borderRadius='full'
                                                variant='solid'
                                                colorScheme='purple'
                                                m={0.5}
                                                marginLeft={2}
                                                marginRight={2}
                                            >
                                                <TagLabel>{skill}</TagLabel>
                                                {skill ? <TagCloseButton className='delete-tag' onClick={() => deleteSkill(skill,work.id)}/>:""}
                                                
                                            </Tag>
                                        )) : (
                                            "No Skills Added"
                                        )}
                                    </Box>
                                </FormControl>

                                <Button id="delete-button" rightIcon={<MdDelete />} onClick={() => deleteExperience(work.id)} mt={3} colorScheme={'red'}>Xóa</Button>

                            </AccordionPanel>
                        </AccordionItem>
                    ))
                }
            </Accordion>

            {
                (
                    <><Button className='action-button' colorScheme={'purple'} my={5} onClick={addMore}>Add More</Button>
                        <Button className='action-button' colorScheme={'purple'} my={5} onClick={saveOrUpdate}>Save</Button></>
                )

            }
        </>
    )
};

export default Experience;