import React from 'react';
import Button from "react-bootstrap/Button";

const TestButton = () => {
    const hanfdleClick = async ()=>{
        const response =await fetch('https://mphzmv3svpiwy6iwdscu6oajba0eibgj.lambda-url.us-east-1.on.aws/').then(r=>console.log({r}))
        // const x = response.json()
        // console.log({x})
    }
    return <Button onClick={hanfdleClick}>Open New Tab</Button>;

};

export default TestButton;
