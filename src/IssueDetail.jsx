import {Link,NavLink} from 'react-router-dom';
import { graphqlendpoint } from './graphqlendppoint.js';
const datereg = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
import React from 'react';



export default class IssueDetails extends React.Component{
    constructor(props){
        super(props);
        this.loadData = this.loadData.bind(this);
        this.state = {
            issues:[]
        }
    }
    componentDidMount(){
        this.loadData();
    }
    componentDidUpdate(prevProps){
        if(this.props.match.params.id!== prevProps.match.params.id){
            this.loadData();
        }
            
    }
    async loadData(){
        var id=parseInt(this.props.match.params.id);
        console.log(typeof(id));
        
        const query=`query Issue($issueId: Int!) {
            issue(id: $issueId) {
            description  
            }
          }`;
        const variables = {
            issueId: id
        }
        const data = await graphqlendpoint(query, variables);
        console.log("data"+data.issue.description);
        if(data){
            this.setState({
                issues:data.issue
            })

        }else{
            this.setState({issues:[]})
        }
    }
    render(){
        const issue = this.state.issues;
        return(
            <div>
                <h1>Description</h1>
               <h3>{issue.description}</h3>
            </div>
        )
    }
}