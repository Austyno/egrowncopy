import React, { useState, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';



const EditStaff = ({ show, onHide, details, spinner, user }) => {

    return (
        <>
            <Modal show={show} onHide={onHide} centered>

                {
                    spinner ? <Spinner animation="grow" /> :
                        <>
                            <div className="container" style={{ background: '#e9ecef' }} >
                                <div >
                                    <div className="row col" style={{ fontSize: '17px' }}>{user && user.org_type === "school" ? "Teacher" : "Staff"} Details</div>

                                    <div className="row mt-3">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }}>Full Name</label>
                                            <input type="text" value={details.fullname} className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }}>Email</label>
                                            <input type="text" value={details.email} className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }}>Gender</label>
                                            <input type="text" disabled value={details.gender} className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }}>Teacher Identification Code</label>
                                            <input type="text" disabled value={details.tic} className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col">
                                            <label style={{ fontWeight: 'bold' }}>SignUp Date</label>
                                            <input type="text" value={new Date(details.createdAt).toDateString()} className="form-control" required />
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button
                                            className="btn mb-2 w-100 border-0"
                                            style={{ background: '#21A5E7', color: 'white' }}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </Modal>
        </>
    );
}

export default EditStaff;