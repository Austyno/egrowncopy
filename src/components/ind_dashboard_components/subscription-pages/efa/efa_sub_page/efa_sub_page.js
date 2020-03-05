import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


import axios from 'axios';

class EfaUpdateForm extends Component {

    state = {
        levelOfEducation: '',
        nextIntendedEductionLevel: '',
        filedOfStudy: '',
        sub_status: false
    }


    handleUpdate = (props) => {
        // axios.post().then(response => console.log(response))
        const { toggle } = this.props;
        toggle();

        this.setState({ levelOfEducation: '', intendedStudy: '' });

        const data = {
            levelOfEducation: this.state.levelOfEducation,
            nextIntendedEductionLevel: this.state.nextIntendedEductionLevel,
            filedOfStudy: this.state.filedOfStudy
        };

        //make axios request and update



    }

    //make axios call to api and get data to be edited and store in state

    // axios.get()
    // .then(data => this.setState(levelOfEducation: data.levelOfEducation,intendedStudy:data.intendedStudy)

    changeHandler = event => {

        const name = event.target.name;

        const value = event.target.value;

        this.setState({ [name]: value });
    }


    render() {

        const { isOpen, toggle } = this.props;

        const sub_statusColor = this.state.sub_status === false ? '#ae2b26' : 'green';

        const buttonText = this.state.sub_status === false ? 'PAY' : 'PAID'
        return (

            <div>
                <Modal isOpen={isOpen} toggle={toggle} centered>
                    <ModalHeader>
                        Update your Info
                        <Button style={{ float: 'right', marginLeft: 280, backgroundColor: sub_statusColor, color: 'white' }}>{buttonText}</Button>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="levelOfEducation">Level Of Education</Label>
                                <Input type="text"
                                    name="levelOfEducation"
                                    value={this.state.levelOfEducation}
                                    onChange={this.changeHandler}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="levelOfEducation">next Intended Eduction Level</Label>
                                <Input type="text"
                                    name="nextIntendedEductionLevel"
                                    value={this.state.nextIntendedEductionLevel}
                                    onChange={this.changeHandler}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="intendedStudy">filed Of Study</Label>
                                <Input type="text"
                                    name="filedOfStudy"
                                    value={this.state.filedOfStudy}
                                    onChange={this.changeHandler}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ background: '#1c8496', color: 'white' }} onClick={this.handleUpdate}>Update</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )

    }
}
export default EfaUpdateForm;
