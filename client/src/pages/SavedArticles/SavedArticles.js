import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Panel, PanelHeading, PanelBody } from '../../components/Panel'

class SavedArticles extends Component {
  state = {
    savedArticles: []
  };

  componentDidMount() {
    this.loadArticles();
  }

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
              <h1>Saved New York Times Articles</h1>
              <Link to="/">Click here to go home</Link>
            </Jumbotron>
            <Panel>
              <PanelHeading>
                <h3>Saved Articles</h3>

              </PanelHeading>
              <PanelBody>
                {
                  this.state.savedArticles.map((article, i) => {
                    return (
                      <Panel key={i}>
                        <PanelHeading>
                          <h4 className="pull-left" style={{display: 'inline-block'}}>{article.title}</h4>
                          <button onClick={() => this.deleteArticle(article._id)} className='btn btn-danger btn-lg pull-right'>Delete</button>
                        </PanelHeading>
                        <PanelBody>
                          <a href={article.url} target="_blank">Click here to view article</a>
                          <p>{article.summary}</p>
                        </PanelBody>
                      </Panel>
                    )
                  })
                }
              </PanelBody>
            </Panel>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SavedArticles;
