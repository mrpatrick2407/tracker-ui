
import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import URLSearchParams from 'url-search-params';
import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import IssueDetails from './IssueDetail.jsx'
import {graphqlendpoint} from './graphqlendppoint.js'
import {Button, FormLabel, Nav, NavItem, Navbar} from'react-bootstrap'
import {Card} from 'react-bootstrap'
import Toast from './Toast.jsx';
import IssueAdd from './IssueAdd.jsx';
import { Pagination } from 'react-bootstrap';
import withToast from './withToast.jsx';

const SECTION_SIZE=5;

function PageLink({page,params,activePage,children}){
    
    params.set('page',page);
    
    if (page === 0) return React.cloneElement(children, { disabled: true })
    return <NavLink active={page === activePage} to={`/issues/?${params.toString()}`}>{children}</NavLink>
}

     class IssueList extends React.Component{
    constructor(){
        super();
        this.state={issues:[],pages:null}
        this.createissue=this.createissue.bind(this);
        this.closeIssue=this.closeIssue.bind(this);
        this.deleteissue=this.deleteissue.bind(this);
    }
    componentDidMount(){
        this.loadData()
    }   
    componentDidUpdate(prevProps){
        console.log("Updates issuelist")
        const {location:{search:prevSearch}}=prevProps;
        const {location:{search}}=this.props;
        if(prevSearch!=search){
            this.loadData()
        }
    }
    

    async loadData(){
        const {location:{search}}=this.props;
        const params=new URLSearchParams(search);
        const vars={}
        if(params.get('status')){
            vars.status=params.get('status')
        }
        if(params.get('page')) vars.page=parseInt(params.get('page'))
        if(params.get('effortmin')){vars.effortmin=parseInt(params.get('effortmin'))}
        if(params.get('effortmax')){vars.effortmax=parseInt(params.get('effortmax'))}
        const query=`query Issues($page: Int, $status: statustype, $effortmin: Int, $effortmax: Int) {
            issueList(page: $page, status: $status, effortmin: $effortmin, effortmax: $effortmax) {
              issuesDb {
                id
                owner
                title
                status
                created
                description
                due
                effort
              }
              pages
            }
          }`;
    

    const data =await graphqlendpoint(query,vars,this.props.showerror);
    if(data){
        this.props.showsuccess("Issues loaded")
        this.setState({issues:data.issueList.issuesDb,pages:data.issueList.pages})
        
    }
    }

    async closeIssue(index){
        const issues=this.state.issues;
        console.log(index);
        const mutation =`mutation IssueUpdate($id: Int!) {
            issueUpdate(id: $id, Changes: {status:Closed}) {
              id title status owner effort created due description  
              }
            }`;
       const data =await graphqlendpoint(mutation,{id:issues[index].id});
       if(data){
        this.setState((prevState)=>{
            const newState =[...prevState.issues];
            newState[index] = data.issueUpdate;
            return {issues: newState};
        })
       }else{
        
        this.loadData();

       }
    }

    async deleteissue(index){
        const {issues}=this.state;
         const {id}=issues[index];
        const {location:{pathname,search},history}=this.props;
          console.log(pathname+search)
        console.log("delete issue")
        let restore;
        let issue;
        this.setState((prevState)=>{
            const newlist=[...prevState.issues];

            if(pathname==`/issues`){
                history.push({pathname:`/issues`,search:search})
            }
            issue= newlist.splice(index, 1);
            

            return {issues:newlist};
        });
        const undo=(
            <span>
                {`Deleted issue${id} successfully`}
                <Button variant='link' onClick={async(issue,index)=>{
                    this.loadData();
                    restore=true;
                    
                    }}>
                    Undo
                </Button>
            </span>)
            this.props.showsuccess(undo)
        console.log(index);
        setTimeout(async()=>{
            if(!restore){
                const mutation=`mutation IssueDelete($id: Int!) {
                    issueDelete(id: $id)
                  }`
                  
                  
                  const data= await graphqlendpoint(mutation,{id});
                  
                  if(data){
                  this.props.showsuccess("Issue deleted successfully")
                  }
            }
        },4000)
        
    }

    async createissue(issue){
        
        const query=`query issueAdd($issue:Issueinput!) {
            issueAdd(issue:$issue) {
            id
            }
        }`;
        const data =await graphqlendpoint(query,{issue},this.props.showerror);
        if(data){

            this.props.showsuccess("Created successfully")
            this.loadData();
        }
    }
    
    render(){
        console.log("Updates issuelist")

        const { match } = this.props;
        const pages=this.state.pages;
        const {location:{search}}=this.props;
        const params=new URLSearchParams(search);
        const page=params.get('page')?parseInt(params.get('page')):1;
        let items=[];
        let prevSection=0;
        let nextSection=6;
        let prevpage;
        let nextpage;
        if(pages){
      
        const startPage=((page-1)/SECTION_SIZE)*SECTION_SIZE+1;
       
        const endPage=Math.min(startPage+SECTION_SIZE-1,pages);
        
         prevSection=startPage==1?0:startPage-SECTION_SIZE;
         nextSection=endPage>=pages?0:startPage+SECTION_SIZE;
         if(prevSection<0){
            
            prevSection=1;
        }
          prevpage=`#/issues?page=${prevSection}`;
          prevpage=prevpage.toString();
          nextpage=`#/issues?page=${nextSection}`;
          nextpage=nextpage.toString();
       
        for(let i=startPage;i<=endPage;i++){
        const pagelink=`#/issues?page=${i}`.toString();
            
            items.push(
                <Pagination.Item href={pagelink} active={i===page}>{i}</Pagination.Item>
            )
        }

    }
    
        return (
            <React.Fragment>
                <Navbar bg='light'>
                
                <IssueAdd  createIssue={this.createissue}/>
               
                </Navbar>
                <Card >
                    <Card.Title>Filter</Card.Title>
                    <Card.Body >
                <IssueFilter urlbase="/issues"/>

                    </Card.Body>
                </Card>
                
                <Card >
                    
                    <Card.Body >
                         <IssueTable deleteissue={this.deleteissue} closeIssue={this.closeIssue}  issues={this.state.issues}/>

                    </Card.Body>
                </Card>
                         
                <Switch>
              <Route path={`/issues/:id`} component={IssueDetails} />
                </Switch>
                {pages && 
                <Pagination>
                        <div>
                        <Pagination.Item disabled={prevSection===0}  href={prevpage}>{'<'}
                        </Pagination.Item>
                        </div>
                        {items}
                        <div >
                        <Pagination.Item  href={nextpage}>{'>'}
                        </Pagination.Item>
                        </div>
                </Pagination>
    }

            </React.Fragment>
        );
    }
}
export default withToast(IssueList);