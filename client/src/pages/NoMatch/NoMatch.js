import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";

const NoMatch = () =>
  <Container fluid>
    <Row>
      <Col size="md-12">
        <Jumbotron>
          <h1>404 Page Not Found</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
              <h3><Link to="/">Click here to return to the main page</Link></h3>
            </span>
          </h1>
        </Jumbotron>
      </Col>
    </Row>
  </Container>;

export default NoMatch;
