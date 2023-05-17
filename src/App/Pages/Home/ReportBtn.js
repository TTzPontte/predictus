import React, {useEffect, useState} from 'react';
import {Storage} from "@aws-amplify/storage";

const ReportBtn = () => {
    const [state, setState]= useState()
    useEffect(()=>{
     Storage.get('test.txt', {
        level: 'public'
    }).then(r=>setState(r)).catch(e=>console.log(e))
        console.log(state)
    })
    return (
        <div>

        </div>
    );
};

export default ReportBtn;
