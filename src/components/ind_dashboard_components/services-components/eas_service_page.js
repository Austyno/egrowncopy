import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import EASVideoCard from './cards/eascard';
import EASService from './service-cards/easservice';



const EASServicePage = () => {

    const [pageEAS, setPageEAS] = useState(0);

    useEffect(() => {
        //get logged in user details
        const user = JSON.parse(sessionStorage.getItem('key'));

        if (user.sub_status_eas === 'active') {
            setPageEAS(1)
        } else {
            setPageEAS(2)
        }

        //make request to api to get sub status
        // axios.get(`http://localhost:5000/subscriptioneas/${userData.id}`)
        //     .then(res => {
        //         if (res.data[0] > 0) {
        //             res.data[0].sub_status == 'active' ? setPageEAS(1) : setPageEAS(2)
        //         }
        //     })
        //     .catch(err => console.log(err));

    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col col-lg-12 col-md-offset-3 col-sm-10">
                    {(pageEAS === 1) ? <EASService /> : (pageEAS === 2) ? <EASVideoCard /> : ""}
                    {/* <EASVideoCard /> */}
                </div>
            </div>
        </div>
    );
}

export default EASServicePage;
