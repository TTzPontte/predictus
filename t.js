export const handler = async (event) => {
  // TODO implement
  const options = {
    method: "POST",
    body: JSON.stringify({ file_name: 'test' })
  };
  const url = '"https://75sh91wz4i.execute-api.us-east-1.amazonaws.com/Prod/hello/"';

  const r = await fetch(url, options);
  console.log(r)
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!")
  };

  return response;
};
