import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@chakra-ui/react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, FormControl, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack, Textarea, Select, Text, Col } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

import AccountNavbar from "../AccountNavbar/AccountNavbar";
import Skill from '../Skill/Skill';

const Experience = () => {
    const [experienceList, setExperienceList] = useState([
        {
            id: "",
            position: "",
            company: "",
            type: "",
            startDate: "",
            endDate: "",
            description: "",
            skill: "",
        },
    ]);

    const addMore = () => {
        setExperienceList([...experienceList, experienceList]);
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
                                        <Text fontWeight={'medium'}>{work.position ? work.position : "Position"}</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>


                                <HStack spacing={30}>
                                    <Input width="30%" value={work.position} onChange={(e) => handleChange(e, work.id)} name='position' type='text' variant='filled' placeholder='Position' />
                                    <Input width="30%" value={work.company} onChange={(e) => handleChange(e, work.id)} name='company' type='text' variant='filled' placeholder='Company' />
                                    <Select width="30%" value={work.type} onChange={(e) => handleChange(e, work.id)} name='type' variant='filled' placeholder='Employment Type'>
                                        <option value='Full-time'>Full-time</option>
                                        <option value='Part-time'>Part-time</option>
                                        <option value='Internship'>Internship</option>
                                        <option value='Freelance'>Freelance</option>
                                    </Select>
                                </HStack>

                                <HStack spacing={30} mt={6}>
                                    <FormControl width="45%">
                                        <FormLabel htmlFor='startDate'>Start Date</FormLabel>
                                        <Input width="90%" value={work.startDate} onChange={(e) => handleChange(e, work.id)} name='startDate' id='startDate' type='date' variant='filled' placeholder='Start Date' />
                                    </FormControl>

                                    <FormControl width="45%">
                                        <FormLabel htmlFor='endDate'>End Date</FormLabel>
                                        <Input width="90%" value={work.endDate} onChange={(e) => handleChange(e, work.id)} name='endDate' id='endDate' type='date' variant='filled' placeholder='Start Date' />
                                    </FormControl>

                                </HStack>

                                <FormControl mt={3}>
                                    <FormLabel htmlFor='description'>Description</FormLabel>
                                    <Textarea width="90%" value={work.description} onChange={(e) => handleChange(e, work.id)} name='description' id='description' variant='filled' placeholder='Description...' />
                                </FormControl>

                                <FormControl mt={3}>
                                    <Skill />
                                </FormControl>

                                <Button rightIcon={<MdDelete />} onClick={() => deleteExperience(work.id)} mt={3} colorScheme={'red'}>Delete</Button>

                            </AccordionPanel>
                        </AccordionItem>
                    ))
                }
            </Accordion>

            {
                experienceList.length < 3 && (
                    <Button colorScheme={'purple'} my={5} onClick={addMore}>Add More</Button>
                )
            }
        </>
    )
};

export default Experience;