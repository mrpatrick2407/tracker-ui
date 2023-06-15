import React from "react"
import store from "./store.js"
import { graphqlendpoint } from "./graphqlendppoint.js";
export default class IssueAbout extends React.Component {
    static async fetch(){
        const data =await graphqlendpoint('query{about}')
        console.log("data"+data);
        return data;
    }
    constructor(){
        super()
        const apidata=store.inital?store.inital:null;
        if(apidata===null){
            this.state={data:null}
        }
        else{
        this.state={data:apidata.about}
        }
    }
    componentDidMount(){
        const api=this.state.data;
        if(api===null){
            const data=IssueAbout.fetch();
            this.setState({data:data.about});
        }
    }
    render(){
        const api=this.state.data;
        return(
        <div className="text-center" >
            <h1>{api}</h1>
        </div>)
    }
}