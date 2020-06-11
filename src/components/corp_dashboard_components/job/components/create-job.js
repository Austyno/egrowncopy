import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Modal } from 'react-bootstrap';
import { Card, CardContent } from '@material-ui/core';





const CteateJob = ({ show, onHide, closeModal }) => {


    const [companyName, setCompanyName] = useState('');

    const [jobsData, setJobsData] = useState([]);

    const [spinner, setSpinner] = useState(false);

    const [user, setUser] = useState()

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('key'));
        setUser(user)
    },[])


    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setJobsData({ ...jobsData, [name]: value })
    };



    const setCompany = (e) => {
        setCompanyName(e.target.value);
    };


    //send data to server
    const createJob = () => {

        setSpinner(true)

        const submitData = {
            company_name: companyName,
            jobs: jobsData,
            company_id: user.id
        }

        //post job to server
        axios.post(`http://localhost:5000/jobs/add`, submitData)
            .then(res => {
                console.log(res.data)
                if (res.data) {
                    setSpinner(false);
                    closeModal();
                }
                
            })
            .catch(err => console.log(err));

        setJobsData({
            title: '',
            email: '',
            start_date: '',
            dead_line: '',
            desc: ''

        });
        setCompanyName('')
    }

    return (
        <>

            <Modal show={show} onHide={onHide} centered>

                <div className="container">
                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}> Company Name</label>
                            <input type="text" name="companyName" value={companyName} onChange={setCompany} placeholder="Company Name" className="form-control" required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Job Title</label>
                            <input type="text" name="title" value={jobsData.title} onChange={handleChange} placeholder="Job Title" className="form-control" required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Email</label>
                            <input type="email" name="email" value={jobsData.email} onChange={handleChange} placeholder="Email to apply to" className="form-control" required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Start Date</label>
                            <input type="date" name="start_date" value={jobsData.startDate} onChange={handleChange} placeholder="Exercise Title" className="form-control" required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Dead Line</label>
                            <input type="date" name="dead_line" value={jobsData.endDate} onChange={handleChange} placeholder="Exercise Title" className="form-control" required />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <label style={{ fontWeight: 'bold' }}>Job Description</label>
                            <textarea type="text" name="desc" rows="5" value={jobsData.desc} onChange={handleChange} placeholder="Job Description" className="form-control" required ></textarea>
                        </div>
                    </div>
                    <Modal.Footer>
                        <div className="row mt-3">
                            <div className="col">
                                <button
                                    className="btn mt-3 w-100 border-0"
                                    style={{ background: '#21A5E7', color: 'white' }}
                                    onClick={createJob}
                                >
                                    {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : "Create Job"}
                                </button>
                            </div>
                        </div>
                    </Modal.Footer>
                </div>

            </Modal>
        </>
    );
}
export default CteateJob;