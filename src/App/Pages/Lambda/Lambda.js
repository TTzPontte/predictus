import Auth from '@aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda'; // npm install aws-sdk
const run = ()=>{

Auth.currentCredentials()
    .then(credentials => {
        const lambda = new Lambda({
            credentials: Auth.essentialCredentials(credentials)
        });
        return lambda.invoke({
            FunctionName: 'ocr',
            Payload: JSON.stringify({ hello: "world" }),
        });
    })
}


run()
