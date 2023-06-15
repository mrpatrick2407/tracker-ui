const webpack=require('webpack')
const merge=require('webpack-merge')
const serverconfig =require('./web.config.js')[1]
module.exports = merge(serverconfig,{
entry:{server: ['./node_modules/webpack/hot/poll?1000']},
plugins:[
  new webpack.HotModuleReplacementPlugin()
]

})