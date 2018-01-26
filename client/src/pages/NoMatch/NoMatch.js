import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import { Link } from "react-router-dom";
import { H1, H3 } from '../../components/Headings'
import { FormBtn } from '../../components/Form'

const NoMatch = () =>
  <Container fluid>
    <Row>
      <Col size="sm-10" offset='sm-1'>
        <Jumbotron>
          <H1>404 Page Not Found</H1>
          <H1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
              <br/>
              <Link to="/"><FormBtn type='warning' additional='btn-lg'>Return to the main page</FormBtn></Link>
            </span>
          </H1>
        </Jumbotron>
      </Col>
    </Row>
  </Container>;

export default NoMatch;
