import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "./Form";
import Test from "./Test";
import Button from "react-bootstrap/Button";
import ModalComponent from "./MoodalComponent";
import './styles.scss'
function HeaderAndFooterExample() {
  return (
    <ModalComponent>
      <Card className="text-center">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>

          <Test />

          {/*<Button variant="primary">Go somewhere</Button>*/}
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </ModalComponent>
  );
}

const New = (props) => (
  <Container>
    <article className="contractPage">
      <title>Ofx</title>
      <meta name="description" content="Ofx" />
      <div className="contractPage--header" style={{ padding: "0 1em" }}>
        <h1>Aferição de renda</h1>
        <br />
      </div>
      <hr />
      <div className="react-tabs__tab-panel react-tabs__tab-panel--selected">
        <div className="ofx">
          <div className="container">
            <Row>
              <Col>
                {/*<Card style={{width: "18rem"}}>*/}
                {/*<Card >*/}
                {/*    <Card.Body>*/}
                {/*        <Card.Title>Card Title</Card.Title>*/}
                {/*        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>*/}
                {/*        /!*<Card.Text>*!/*/}
                {/*        /!*    Some quick example text to build on the card title and make up the bulk of*!/*/}
                {/*        /!*    the card's*!/*/}
                {/*        /!*    content.*!/*/}
                {/*        /!*</Card.Text>*!/*/}

                {/*        <Card.Link href="#">Card Link</Card.Link>*/}
                {/*        <Card.Link href="#">Another Link</Card.Link>*/}
                {/*    </Card.Body>*/}
                {/*</Card>*/}
                <HeaderAndFooterExample />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </article>
  </Container>
);

export default New;
