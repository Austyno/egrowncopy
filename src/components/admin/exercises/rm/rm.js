import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RMexercisesLog from '../components/exercise_log';
import RMexercisesNewContent from '../components/new_exercise';


const RMexercises = () => {

    const title = "RM Exercises Log";
    const NewContentTitle = "Create new RM Exercises and Questions";
    const service = "RM";

    const [ex, setEx] = useState([]);
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        //get exercises then questions using exercise id
        axios.get(`http://localhost:5000/excercise/`)
            .then(res => {
                if (res.data.length > 0) {
                    const rmEx = res.data.filter((ex) => {
                        return ex.service == "RM"
                    });
                    setEx(rmEx);
                    setSpinner(false);
                }
            })
            .catch(err => console.log(err));

    },[])



    return (
        <>
            <div className="container">
                <div className="row">
                    <RMexercisesLog title={title} ex={ex} spinner={spinner} />
                    <RMexercisesNewContent service={service} title={NewContentTitle} />
                </div>
        </div>
        </>
    );
}
export default RMexercises;