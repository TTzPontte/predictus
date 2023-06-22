import React, { useState } from "react";
import { Button } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import Lambda from "aws-sdk/clients/lambda";

const useLambda = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const invokeLambda = async (functionName, payload) => {
    try {
      setLoading(true);
      const credentials = await Auth.currentCredentials();
      console.log("---",{credentials});
      const lambda = new Lambda({ region: "us-east-1", credentials });
      const params = {
        FunctionName: functionName,
        Payload: JSON.stringify(payload),
      };
      const result = await lambda.invoke(params).promise();
      console.log({response})
      setResponse(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { response, error, loading, invokeLambda };
};
const LambdaTeste = () => {
  const { response, error, loading, invokeLambda } = useLambda();
  const handleButtonClick = async () => {
    const functionName = "ApiSerasa-serasa";
    const payload = { numDocument: "44569144837", tipoPessoa: "PF" };
    console.log("step 1")
    const response = await invokeLambda(functionName, payload);
    console.log({ response });
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log("step 2", error)
    return <div>Error: {error.message}</div>;
  }
  if (response) {
    // Process the response here
    return <div>Response: {JSON.stringify(response)}</div>;
  }
  return (
    <div>
      <Button onClick={handleButtonClick}>Click Me!</Button>
    </div>
  );
};
export default LambdaTeste;
