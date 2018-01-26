import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import {FormBtn} from '../../components/Form';
import Jumbotron from "../../components/Jumbotron";
import { H1, H3, H4 } from '../../components/Headings';
import { Container, Row, Col } from "../../components/Grid";
import { Panel, PanelHeading, PanelBody } from '../../components/Panel'

class SavedArticles extends Component {
  state = {
    savedArticles: []
  };

  componentDidMount() {
    this.loadArticles();
  };

  loadArticles = () => {
    API
      .getArticles()
      .then(results => {
        this.setState({savedArticles: results.data})
      })
  };

  deleteArticle = id => {
    API
      .deleteArticle(id)
      .then(results => {
        let savedArticles = this.state.savedArticles.filter(article => article._id !== id)
        this.setState({savedArticles: savedArticles})
        this.loadArticles();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="sm-10" offset='sm-1'>
            <Jumbotron>
              <H1>Saved New York Times Articles</H1>
              <Link to="/"><FormBtn type='warning' additional='btn-lg'>Go home</FormBtn></Link>
            </Jumbotron>
            <Panel>
              <PanelHeading>
                <H3>Saved Articles</H3>
              </PanelHeading>
              <PanelBody>
                { this.state.savedArticles.length > 0 ?
                  (this.state.savedArticles.map((article, i) => (
                      <Panel key={i}>
                        <PanelHeading>
                          <H4 className="pull-left" style={{display: 'inline-block'}}>{article.title}</H4>
                          <FormBtn
                            onClick={() => this.deleteArticle(article._id)}
                            type='danger'
                            additional="pull-right btn-md"
                            >Delete
                          </FormBtn>
                        </PanelHeading>
                        <PanelBody>
                          <a href={article.url} target="_blank">Click here to view article</a>
                          <br/>
                          {article.summary}
                        </PanelBody>
                      </Panel>
                    )
                  )) : <H1>You have no saved articles.</H1>
                }
              </PanelBody>
            </Panel>
          </Col>
        </Row>
      </Container>
    );
  };
};

export default SavedArticles;
