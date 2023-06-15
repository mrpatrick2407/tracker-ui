import { Link, NavLink ,withRouter} from "react-router-dom";
import {Button,Tooltip,OverlayTrigger} from 'react-bootstrap'
import {FaTimes} from 'react-icons/fa'
import {AiFillDelete,AiTwotoneEdit} from 'react-icons/ai'
import React from 'react';
import UserContext from './UserContext.js';
 class IssueRowPlain extends React.Component{
  render(){
    const issue=this.props.issue;
    const closeIssue=this.props.closeIssue;
    const index=this.props.index;
    const  deleteissue=this.props.deleteissue;
    const user=this.context;
    const disabled=!user.signedIn;
    const edit=(props)=>(
      <Tooltip id="button-tooltip" {...props}>
          Edit Issue
        </Tooltip>
    )
    const Close = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Close Issue
        </Tooltip>
      );
    const Delete = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Delete Issue
        </Tooltip>
      );
    function handler(){
     
      window.location = `#/issues/${issue.id}`;
    }
    function deleteissuefun(e){
      e.preventDefault();
      deleteissue(index);
    }
    function closeissuefun(e){
      e.preventDefault();
      closeIssue(index);
    }


    return ( 
        <>
        <tr style={{cursor:"pointer"}}>
        <td onClick={handler}>{issue.id}</td> 
        <td onClick={handler} >{issue.status}</td> 
        <td onClick={handler} >{issue.owner}</td> 
        <td onClick={handler}>{issue.created.toDateString()}</td> 
        <td onClick={handler}>{issue.effort}</td> 
        <td onClick={handler}>{issue.due? issue.due.toDateString():''}</td> 
        <td onClick={handler}>{issue.title}</td> 
        <td>
        <OverlayTrigger
      placement="top"
      delay={{ show: 200, hide: 100 }}
      overlay={edit}
    >
      <Link disabled={disabled} style={{margin:'10px'}} onClick={(e)=>{e.preventDefault(); window.location=`#/edit/${issue.id}`}} to={`/edit/${issue.id}`} size="sm" className="button btn=primary" ><AiTwotoneEdit/></Link>
    </OverlayTrigger>
        <OverlayTrigger
      placement="top"
      delay={{ show: 200, hide: 100 }}
      overlay={Close}
    >
      <span style={{margin:'10px'}} size="lg" type="button" onClick={closeissuefun}><FaTimes/></span>
    </OverlayTrigger>
        
    <OverlayTrigger
      placement="top"
      delay={{ show: 200, hide: 100 }}
      overlay={Delete}
    >
        <Button disabled={disabled} style={{margin:'10px'}} variant="danger" size="sm"  type="button" onClick={deleteissuefun}><AiFillDelete/></Button>
    </OverlayTrigger>
        </td>
        
        </tr>
        </>
        );
   } 
 }
 IssueRowPlain.contextType = UserContext;
const IssueRow = withRouter(IssueRowPlain);
delete IssueRow.contextType;
export default withRouter(IssueRow)
