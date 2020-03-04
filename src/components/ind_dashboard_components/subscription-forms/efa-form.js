import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap/';


export default function Form(props){
  
    const [modalShow, setModalShow] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [LOE, setLOE] = useState("");
    const [NIEL, setNIEL] = useState("");
    const [FIS, setFIS] = useState("");
    const [TIC, setTIC] = useState("");
    const [ticDisable, setTicDisable] = useState(true);
    

    const onChangeLOE = (e) => {
        setLOE(e.target.value);
    }

    const onChangeNIEL = (e) => {
        setNIEL(e.target.value);
    }

    const onRefferalChange = (e) => {
        if(e.target.value == "yes"){
            setTicDisable(false);
        }else if(e.target.value == "no"){
            setTicDisable(true);
            setTIC("");
        }
    }

    const onChangeFIS = (e) => {
        setFIS(e.target.value);
    }

    const onChangeTIC = (e) => {
        setTIC(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const SubObject = {
            user_id: props.user.id,
            sub_status: false,
            user_email: props.user.email,
            user_name: props.user.name,
            user_status: props.user.status,
            levelofeducation: LOE,
            next_intended_education_level: NIEL,
            field_of_intended_study: FIS,
            tic: TIC
        }
        //console.log(SubObject);
        try {
            setSpinner(true);
            axios.post('http://localhost:5000/subscriptionefa/add', SubObject)
            .then((res) => {
                console.log(res.data);
                setSpinner(false);
                setModalShow(false);
            })
            .catch((err) => {
                console.log('Err: ' + err);
                setSpinner(false);
                setModalShow(false);
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <div className="ml-auto d-flex align-items-center"> 
                <React.Fragment>
                    <button className="btn btn-info btn-sm" onClick={() => setModalShow(true)}>Subscribe</button>
                </React.Fragment>
                
        </div>
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            aria-labelledby="example-custom-modal-styling-title"
            centered
                >
                    <Modal.Body>
                        <form className="container py-4" onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col">
                                    <h6>Subscription Details</h6>
                                </div>
                            </div>
                            {/* Level of Education */}
                            <div className="row mt-3">
                                <div className="col">
                                    <input
                                        label="Level of Education"
                                        type="text"
                                        value={LOE}
                                        onChange={onChangeLOE} 
                                        placeholder='Level of Education'
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>

                         {/* Next intended education level field */}
                            <div className="row mt-3">
                                <div className="col"> 
                                    <input
                                        label=""
                                        type="text"
                                        value={NIEL}
                                        onChange={onChangeNIEL}
                                        placeholder="Next Intended Education Level"
                                        required
                                        className="form-control"  
                                    />
                                </div>
                            </div>

                               {/* Field of Intended Study */}
                               <div className="row mt-3">
                                <div className="col"> 
                                    <input
                                        label=""
                                        type="text"
                                        value={FIS}
                                        onChange={onChangeFIS}
                                        placeholder="Field of Intended Study"
                                        required
                                        className="form-control"  
                                    />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col">  
                                   <select className="form-control" onChange={onRefferalChange}>
                                       <option>Where you refered by a Teacher?</option>
                                       <option value="yes">Yes</option>
                                       <option value="no">No</option>
                                   </select>
                                </div>
                            </div>

                                   {/* Tic field */}
                            <div className="row mt-3">
                                <div className="col">
                                    
                                    <input
                                        label=""
                                        type="text"
                                        disabled={ticDisable}
                                        value={TIC}
                                        onChange={onChangeTIC}
                                        placeholder="TIC"
                                        className="form-control"
                                        
                                    />
                                </div>
                            </div>

                            {/* submit button */}
                            <div className="row mt-3">
                                <div className="col">
                                    <button
                                        type="submit"
                                        disabled={spinner}
                                        className="btn font-weight-light btn-primary mt-3 py-2 w-100 border-0"
                                        // disabled={null}
                                    >Proceed</button>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
        
        </React.Fragment>
    );
}