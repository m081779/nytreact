import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { Panel, PanelHeading, PanelBody } from '../../components/Panel';

export default class Articles extends Component {
  state = {
    topic: '',
    sYear: '',
    eYear: '',
    results: []
  };


  saveArticle = (article) => {
    let newArticle = {
      date: article.pub_date,
      title: article.headline.main,
      url: article.web_url,
      summary: article.snippet
    }
    let unsavedArticles = this.state.results.filter(article => article.headline.main !== newArticle.title)
    this.setState({results: unsavedArticles})

    API
      .saveArticle(newArticle)
      .then(results => console.log(''))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    let { name, value } = event.target;
    this.setState({[name] : value})
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let { topic, sYear, eYear } = this.state;
    let query = { topic, sYear, eYear }

    this.getArticles(query)

  };

  getArticles = query => {

    let queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json??sort=newest`
    let key = `&api-key=33c676fd7fd14e90a532f9698ab4dd4a`
    if (query.topic){
      queryUrl+= `&fq=${query.topic}`
    }
    if(query.sYear){
      console.log(query.sYear)
      queryUrl+= `&begin_date=${query.sYear}`
    }
    if(query.eYear){

      queryUrl+= `&end_date=${query.eYear}`
    }
    queryUrl+=key;
    console.log(queryUrl)
      API
        .queryNYT(queryUrl)
        .then(results => {
          console.log(results)
          this.setState({results: results.data.response.docs})
        })
        .catch(err=> console.log(err))
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="sm-10" offset='sm-1'>
            <Jumbotron>
              <h1 className='page-heading'>New York Times Article Scrubber</h1>
              <h2>Search for and annotate articles of interest</h2>
              <Link to="/savedArticles">Click here to view saved articles</Link>
            </Jumbotron>
            <Panel>
              <PanelHeading>
                <h3>Search</h3>
              </PanelHeading>
              <PanelBody>
                <form>
                  <div className="form-group">
                    <label htmlFor="topic">Enter a topic to search for:</label>
                    <Input onChange={this.handleInputChange} name='topic' value={this.state.topic} placeholder='Topic'/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="sYear">Enter a beginning date to search for (optional):</label>
                    <Input onChange={this.handleInputChange} type='date' name='sYear' value={this.state.sYear} placeholder='Start Year'/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="eYear">Enter an end date to search for (optional):</label>
                    <Input onChange={this.handleInputChange} type='date' name='eYear' value={this.state.eYear} placeholder='End Year'/>
                  </div>
                  <FormBtn onClick={this.handleFormSubmit}>Submit</FormBtn>
                </form>
              </PanelBody>
            </Panel>
            <Panel>
              <PanelHeading>
                <h3>Results</h3>
              </PanelHeading>
              <PanelBody>
                  {
                    this.state.results.map((article, i) => {
                      return (
                        <Panel key={i}>
                          <PanelHeading >
                            <h4 className="pull-left" style={{display: 'inline-block'}}>{article.headline.main}</h4>
                            <button onClick={() => this.saveArticle(article)} className='btn btn-success btn-lg pull-right'>Save</button>
                          </PanelHeading>
                          <PanelBody>
                            <a href={article.web_url} target="_blank">Click here to view article</a>
                            <p>{article.snippet}</p>
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
