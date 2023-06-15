import path from "path";
import express from "express";
import proxy from "http-proxy-middleware";
import render from "./render.jsx";
import dotenv from 'dotenv';

 

const app = express();

dotenv.config();
const port = process.env.PORT;

if(true){
    const webpack = require('webpack');
    const devMiddleware = require('webpack-dev-middleware');
    const hotMiddleware = require('webpack-hot-middleware');
    const config = require('../web.config.js')[0];
config.entry.app.push('webpack-hot-middleware/client');
config.plugins = config.plugins || [];
config.plugins.push(new webpack.HotModuleReplacementPlugin());
   
const compiler = webpack(config);
 app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler));
}

if (!process.env.UI_API_ENDPOINT) {
  process.env.UI_API_ENDPOINT = 'http://localhost:3000/graphql';
}

if (!process.env.UI_SERVER_API_ENDPOINT) {
  process.env.UI_SERVER_API_ENDPOINT = process.env.UI_API_ENDPOINT;
}

if (!process.env.UI_AUTH_ENDPOINT) {
  process.env.UI_AUTH_ENDPOINT = 'http://localhost:3000/auth';
}

app.get('/env.js', (req, res) => {
  const env = { UI_API_ENDPOINT: process.env.UI_API_ENDPOINT ,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
  };
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});
app.use(express.static('src'));
app.get("/about",(req,res,next)=>{
  render(req,res,next)
});
const apiProxyTarget = process.env.API_PROXY_TARGET;

if (apiProxyTarget) {
  console.log(apiProxyTarget);
  app.use('/graphql', proxy({ target: apiProxyTarget }));
  app.use('/auth', proxy({ target: apiProxyTarget }));
}

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../src', 'index.html');
  res.sendFile(indexPath);
});
app.listen(port, () => { console.log(`Listening onport ${port}`); });
if(module.hot.accept){
  module.hot.accept('./render.jsx')
}