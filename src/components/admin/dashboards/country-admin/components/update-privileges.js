import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActionArea, Typography, CardActions } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import Modal from './update-modal';
import DeleteModal from './delete-modal';



const UpdatePrivileges = () => {

    const [admins, setAdmins] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [adminforupdate, setAdminForUpdate] = useState([]);
    const [show, setShow] = useState(false);
    const [deleteUserModal, setDeleteUserModal] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [Updatespinner, setUpdateSpinner] = useState(false);
    const [user, setUser] = useState();
    const [privilege, setPrivilege] = useState({
        EAS: false,
        EFA: false,
        LM: false,
        RM: false,
        LMExercise: false,
        RMExercise: false,
        AllServices: false,
        AllExercises: false
    });



    const showUpdateModal = (e) => {
        const adminId = e.target.getAttribute('data-id');

        const adminObj = admins.filter(ad => {
            return ad._id === adminId
        })

        setAdminForUpdate(adminObj[0])
        setShow(true)
    }


    const getDelDetails = e => {

        const adminId = e.target.getAttribute('data-id');

        const deladminObj = admins.filter(ad => {
            return ad._id === adminId
        })
        setDeleteUser(deladminObj[0]);
        setDeleteUserModal(true);


    }

    //get privileges to update
    const getPrivileges = event => {
        setPrivilege({ ...privilege, [event.target.name]: event.target.checked });
    };


    // update Admin privileges
    const updateUser = () => {

        // setUpdateSpinner(true)

        const userId = adminforupdate._id;

        const assignedPrivileges = Object.keys(privilege).filter(pri => {
            return privilege[pri] == true;
        })

        const data = {
            privilege: assignedPrivileges
        }


        axios.post(`http://localhost:5000/admin/update/${userId}`, data)
            .then(res => {
                if (res.data) {

                    axios.post(`http://localhost:5000/admin/admins/${user.country}`)
                        .then(res => {
                            if (res.data) {
                                setAdmins(res.data);
                            }
                        })
                        .catch(err => console.log(err))
                }
                setUpdateSpinner(false);
                setShow(false);
            })
            .catch(err => console.log(err));
        
        //clear old values
        setPrivilege({
            EAS: false,
            EFA: false,
            LM: false,
            RM: false,
            LMExercise: false,
            RMExercise: false,
            AllServices: false,
            AllExercises: false
        })
    }




    const deleteCA = () => {

        axios.post(`http://localhost:5000/admin/delete/${deleteUser._id}`)
            .then(res => {
                if (res.data) {

                    //fetch admins after delete
                    axios.post(`http://localhost:5000/admin/admins/${user.country}`)
                        .then(res => {
                            if (res.data) {
                                setAdmins(res.data);
                                setDeleteUserModal(false);
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))

    }



    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("key"));
        setUser(user)

        setSpinner(true)
        axios.post(`http://localhost:5000/admin/admins/${user.country}`)
            .then(res => {
                if (res.data) {
                    setAdmins(res.data);
                    setSpinner(false)

                }
            })
            .catch(err => console.log(err))
    }, []);


    return (
        <>
            {
                spinner ? <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    :
                    <div className="container">
                        <div className="row">

                            {admins.map(ad => {
                                return (

                                    <div className="col col-lg-3 col-sm-6">
                                        <Card>
                                            <CardActionArea >
                                                <CardContent style={{ height: "201px", background: '#E1E1E1' }} >
                                                    <Typography gutterBottom variant="" component="h5" style={{ textAlign: 'center' }}>
                                                        <span >{ad.name}</span>
                                                    </Typography>

                                                    <Typography gutterBottom variant="" component="h5" style={{ textAlign: 'center' }}>
                                                        <span style={{ fontWeight: 'Bold', fontSize: "16px" }}>{ad.country}</span>
                                                    </Typography><br />

                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <span>Privileges: &nbsp;</span>
                                                        <ul>
                                                            {ad.privilege.map(pri => {
                                                                return (
                                                                    <li style={{ fontWeight: 'Bold', fontSize: "16px" }}>{pri}</li>

                                                                );
                                                            })}
                                                        </ul>
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions style={{ background: '#E1E1E1' }}>
                                                <button className="btn btn-sm btn-default pull-left" style={{ fontStyle: 'italic' }} data-id={ad._id} onClick={showUpdateModal}>Update</button>
                                                <button className="btn btn-sm btn-default pull-right" style={{ fontStyle: 'italic', marginLeft: '55px' }} data-id={ad._id} onClick={getDelDetails}>Delete</button>
                                            </CardActions>
                                        </Card>
                                        <br />
                                    </div>

                                );
                            })}
                        </div>
                    </div>
            }
            <Modal show={show} hide={() => setShow(!show)} admin={adminforupdate} getprivilege={getPrivileges} privilege={privilege} update={updateUser} spinner={Updatespinner} />
            <DeleteModal show={deleteUserModal} hide={() => setDeleteUserModal(!deleteUserModal)} user={deleteUser} del={deleteCA} />
        </>
    );
}
export default UpdatePrivileges;