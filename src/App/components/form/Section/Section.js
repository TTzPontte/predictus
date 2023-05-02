import React from "react";
import { Accordion } from "react-bootstrap";

const Section = ({ header, hasInputs = true, children }) => (
  <Accordion>
    <Accordion.Item eventKey="0">
      <Accordion.Header>{header}</Accordion.Header>
      <Accordion.Body>
        <>
          {hasInputs ? (
            <div className={"form__grid"}>{children}</div>
          ) : (
            children
          )}
        </>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
);

export default Section;