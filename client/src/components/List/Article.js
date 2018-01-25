import React from 'react';
import { Panel, PanelHeading, PanelBody } from '../Panel';

export const Article = props => (
  <Panel>
    <PanelHeading>
      <a href={props.url}><h2>{props.title}</h2></a>
    </PanelHeading>
    <PanelBody>
      {props.text}

    </PanelBody>
  </Panel>
)
