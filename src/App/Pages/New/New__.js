import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
// import ModalComponent from "./MoodalComponent";
import "./styles.scss";

function SerasaCreditScoreSearch() {
    return (
        <>
            <header className="header">
                <div className="container">
                    <h1>Serasa Credit Score</h1>
                </div>
            </header>
            <main className="main">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="search-form">
                                <h2>Check your credit score</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="document-number">Document Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="document-number"
                                            placeholder="Enter your document number"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="footer">
                <div className="container">
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>Featured</Card.Header>
                                <Card.Body>
                                    <Card.Title>Special title treatment</Card.Title>
                                    <Card.Text>
                                        With supporting text below as a natural lead-in to additional content.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-muted">2 days ago</Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </footer>
        </>
    );
}


function New() {
  return (
    <Container>
      <article className="contractPage">
        <title>Ofx</title>
        <meta name="description" content="Ofx" />
        <div className="contractPage--header">
          <h1>Aferição de renda</h1>
        </div>
        <hr />
        <div className="ofx">
          <div className="container">
            <Row>
              <Col>
                <SerasaCreditScoreSearch />
              </Col>
            </Row>
          </div>
        </div>
      </article>
    </Container>
  );
}


export default New;
