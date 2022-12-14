import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const Btn = ({ action } ) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      action()
    }
  }, [isLoading]);

  const handleClick = () => setLoading(!isLoading);

  return (
    <Button variant="primary" disabled={isLoading} onClick={!isLoading ? handleClick : null}>
      {isLoading ? "Loading…" : "Click to load"}
    </Button>
  );
};

export default Btn;

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}
