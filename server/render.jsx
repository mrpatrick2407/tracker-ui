import React from 'react';
import ReactDOMServer from 'react-dom/server'
import template from './template.js';
import { StaticRouter } from 'react-router-dom';
import Pages from '../src/Page.jsx';
import { graphqlendpoint } from '../src/graphqlendppoint.js';    
import store from '../src/store.js'
import IssueFilter from '../src/IssueFilter.jsx';
import IssueAbout from '../src/IssueAbout.jsx';

    async function render(req,res){
    const inital= await IssueAbout.fetch();
    store.inital=inital;
    const ele=(
    <StaticRouter location={req.url} content={{}}>
      <Pages/>
    </StaticRouter>)
    const body=ReactDOMServer.renderToString(ele)
    console.log("this is the body"+body);

    res.send(template(body,inital))
    }

export default render
