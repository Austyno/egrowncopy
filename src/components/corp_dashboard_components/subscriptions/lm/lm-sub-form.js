import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Spinner } from 'react-bootstrap';
import PayStackButton from '../../../ind_dashboard_components/paystack/paystackpaymentbutton';
import StaffModal from '../components/all-staff';





const LMSubForm = ({ show, onHide, closeModal }) => {

    const [user, setUser] = useState();
    const [amount, setAmount] = useState();
    const [plan, setPlan] = useState();
    const [payModal, setPayModal] = useState(false);
    const [spinner, setSpinner] = useState(false)
    const [staff, setStaff] = useState([]);
    const [staffModal, setStaffModal] = useState(false)
    const [total, setTotal] = useState();
    const [subPeriod, setSubPeriod] = useState();


    // const [state, setState] = useState({
    //     companyName: '',
    //     email: '',
    //     doi: ''
    // });

    useEffect(() => {
        const userr = JSON.parse(sessionStorage.getItem('key'));
        setUser(userr)


        axios.get(`http://localhost:5000/individuals/staff/${userr.id}`)
            .then(res => {
                const unsubscribedStaff = res.data.filter(staff => {
                    return staff.sub_status === 'inactive';
                })
                setStaff(unsubscribedStaff);
            }).catch(err => console.log(err));

    }, []);


    const onChangePlan = (e) => {
        const plan = e.target.value.split('/');
        setAmount(plan[1]);
        setPlan(plan[0]);

    }

    const showStaff = () => {
        setStaffModal(true);
        closeModal();
    }

    //get total amount * number of staff and sub
    const closeStaffModal = (plantotal) => {
        setStaffModal(false);
        setTotal(plantotal);
        setPayModal(true);

    }


    //payment functions
    const close = () => {
        console.log("Payment closed");
        setPayModal(false)
    }

    const onSuccess = (res) => {
        setPayModal(false);



        const data = {
            ref: res.reference,
            sub_status: 'active',
            start_data: Date.now(),
            end_date: 86400000 * plan
        }

        //update substatus of paid staff
        staff.map(st => {
            axios.post(`http://localhost:5000/individuals/update/substatus/${st._id}`,data)
                .then(res => console.log(res.data))
                .catch(err => console.log(err));
        })


    }




    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header>
                    <span style={{ fontSize: '18px' }}>Corporate Subscription</span>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        {/* <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}> Company Name</label>
                                <input type="text" name="companyName" value={state.companyName} onChange={handleChange} placeholder="Company Name" className="form-control" required />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}> Official Email</label>
                                <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="Official Email" className="form-control" required />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Date of Incorporation</label>
                                <input type="date" name="doi" value={state.doi} onChange={handleChange} placeholder="Date of Incorporation" className="form-control" required />
                            </div>
                        </div> */}

                        <div className="row mt-3">
                            <div className="col">
                                <label style={{ fontWeight: 'bold' }}>Select A Plan</label>
                                <select name="plan" className="form-control" onChange={onChangePlan} required>
                                    <option >Select a Plan</option>
                                    <option value="90/280000">3 Months Plan - 2800</option>
                                    <option value="180/455000">6 Months Plan - 4550</option>
                                    <option value="365/797000">1 Year Plan  - 7970 </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <button
                                type="submit"
                                className="btn font-weight-light btn-primary mt-3 py-2 w-100 border-0"
                                disabled={spinner}
                                // onClick={subscribe}
                                onClick={showStaff}

                            >
                                {spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> : "Proceed"}
                            </button>
                        </div>
                    </div>

                </Modal.Body>

            </Modal>
            <PayStackButton
                show={payModal}
                onHide={() => setPayModal(false)}
                close={close}
                callback={onSuccess}
                email={user ? user.email : ""}
                amount={total}
            />

            <StaffModal
                show={staffModal}
                onHide={() => setStaffModal(!staffModal)}
                amount={amount}
                closeStaffModal={closeStaffModal}
            />
        </>
    );
}
export default LMSubForm;