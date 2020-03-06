import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


import axios from 'axios';

class EasUpdateForm extends Component {

    state = {
        levelOfEducation: '',
        intendedStudy: '',
        sub_status: false,
        user_id: '',
        message: ''
    }


    handleUpdate = (props) => {





        const { levelOfEducation, intendedStudy } = this.state;

        const id = this.state.user_id;


        const data = {
            levelofeducation: levelOfEducation,
            field_of_intended_study: intendedStudy
        }


        //make axios request to update db
        axios.post(`http://localhost:5000/subscriptioneas/update/${id}`, data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ message: 'Subscription details updated successful' })
                }
            })
            .catch(err => console.log(err.message))


    }


    //get values to be updated
    componentDidMount() {
        const userData = JSON.parse(sessionStorage.getItem('key'));

        this.setState({ user_id: userData.id });


        axios.get(`http://localhost:5000/subscriptioneas/${userData.id}`)
            .then(response => this.setState({
                levelOfEducation: response.data[0].levelofeducation,
                intendedStudy: response.data[0].field_of_intended_study
            }))

            .catch(err => err.message)

    }



    changeHandler = event => {

        const name = event.target.name;

        const value = event.target.value;

        this.setState({ [name]: value });
    }


    render() {
        const { isOpen, toggle } = this.props;

        const sub_statusColor = this.state.sub_status === false ? '#ae2b26' : 'green';

        const buttonText = this.state.sub_status === false ? 'PAY' : 'PAID';


        return (

            <div>
                <Modal isOpen={isOpen} toggle={toggle} centered>
                    <ModalHeader>
                        <div style={{ float: 'left' }}><p style={{ font: 'verdana', fontSize: 18 }}>Education Advisory Services Subscription</p></div>
                        <div style={{ float: 'right', marginLeft: 300, marginTop: -45, paddingRight: 0 }}><Button style={{ float: 'right', backgroundColor: sub_statusColor, color: 'white' }}>{buttonText}</Button></div>
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
                                <Label for="intendedStudy">Field Of Intended Study</Label>
                                <Input type="text"
                                    name="intendedStudy"
                                    value={this.state.intendedStudy}
                                    onChange={this.changeHandler}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.message === 'Subscription details updated successful' ? <span style={{ color: 'green' }}>{this.state.message}</span> : <span style={{ color: 'red' }}>{this.state.message}</span>}
                        {' '}{''}
                        <Button style={{ background: '#1c8496', color: 'white' }} onClick={this.handleUpdate}>Update</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )

    }
}


export default EasUpdateForm;
