import React from 'react';
import { Card, Table } from 'react-bootstrap';
import IssueFilter from './IssueFilter.jsx';
import URLSearchParams from 'url-search-params';
import { graphqlendpoint } from './graphqlendppoint.js';
import withToast from './withToast.jsx';
 class IssueReport extends React.Component{
    constructor(props){
        super(props);
        this.state={stats:''}
        this.loaddata=this.loaddata.bind(this);
    }
    componentDidMount(){
        this.loaddata();
    }
   
    componentDidUpdate(prevProps){
        if(prevProps.location.search!==this.props.location.search){
            this.loaddata();
        }
    }
    
    async loaddata(){
        
        const {location:{search}}=this.props;
        const params=new URLSearchParams(search);
        const vars={}
        if(params.get('status')){
            vars.status=params.get('status')
        }
        if(params.get('effortmin')){vars.effortmin=parseInt(params.get('effortmin'))}
        if(params.get('effortmax')){vars.effortmax=parseInt(params.get('effortmax'))}
        const query=`query IssueCount( $status: statustype, $effortmin: Int, $effortmax: Int) {
            issueCount( status: $status, effortmin: $effortmin, effortmax: $effortmax) {
              Assigned
              Closed
              Fixed
              New
              owner
            }
          }`;

          const data=await graphqlendpoint(query,vars,this.props.showerror);
          console.log(data);
          if(data){
            this.props.showsuccess("Data Loaded Sucessfully")
            this.setState({stats:data.issueCount});
          }
          else{
            this.setState({stats:''});
          }
          
    
    }
    
    render(){
        const statuses=["New","Assigned","Fixed","Closed"]
        const {stats}=this.state;
        
        const headercolumns=(
            statuses.map(status=>(<th key={status}>{status}</th>))
        )
        let statRows;
        if(stats){
         statRows = stats.map((counts) => (
            <tr key={counts.owner}>
              <td>{counts.owner}</td>
              {statuses.map((status) => (
                <td key={status}>{counts[status]}</td>
              ))}
            </tr>
          ));
              }
              else{
                 statRows=null
              }
        return(
            <>
             <Card >
                    <Card.Title>Filter</Card.Title>
                    <Card.Body >
                <IssueFilter urlbase="/report"/>
                    </Card.Body>
             </Card>
                <Table striped bordered hover responsive="sm">
                    <thead>
                        <th>Owner</th>
                        {headercolumns}
                        
                    </thead>
                    <tbody>
                        {statRows}
                    </tbody>
         
                </Table>
            </>
        )
    }
}
export default withToast(IssueReport)

