import DateInput from "./DateInput.jsx";
import Numinput from "./NumInput.jsx";
import { graphqlendpoint } from "./graphqlendppoint";
import {Link} from 'react-router-dom'
import TextInput from "./TextInput.jsx";
import {Button, FormLabel} from 'react-bootstrap'
import { Form,Card,InputGroup,Row,Col,Alert } from "react-bootstrap";
import {useState} from 'react';
import Toast from "./Toast.jsx";
import React from 'react';
import withToast from "./withToast.jsx";
import UserContext from "./UserContext.js";


 class IssueEdit extends React.Component {
  constructor() {
    super();
    this.state = { 
      showvalmessage:false
,

        issue: {
          id: '',
          title: '',
          owner: '',
          created: '',
          due: '',
          description: '',
          _id: '',
          status: '',
          effort: '',
        },
        invalidfields:{},
      };
    this.onChange = this.onChange.bind(this);
    this.handler=this.handler.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.show=this.show.bind(this);
    
    
  }
  componentDidMount() {
    this.loaddata();
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.loaddata();
    }
  }

  onChange(e,val){
   const {name,value:test}=e.target;
   let rvalue;
   console.log("valll"+val+"testttt"+test)
if((name=='due'||name=='created') && val!==null){
  rvalue=new Date(val).toISOString();
  console.log("rrrrvalll"+rvalue)

}
   const value = Number.isNaN(val) ?val:test;
   console.log(value+"from parent"+name)
   if((name=='due'||name=='created') && val!==null){
   this.setState(prevState=>({issue:{...prevState.issue,[name]:rvalue}}))
   }else{
   this.setState(prevState=>({issue:{...prevState.issue,[name]:value}}))

   }
  }

  onValidityChange(e,valid){
    const {name}=e.target;
    this.setState((prevState)=>{
      const invalidfields={...prevState.invalidfields,[name]:!valid}
      if(valid) delete invalidfields[name];
      return {invalidfields}
    })
  }

  


  async handler(e){
    e.preventDefault();
    this.show()
    const issue=this.state.issue;
    const query=`mutation IssueUpdate($id: Int!, $changes: Issueupdateinput!) {
      issueUpdate(id: $id, Changes: $changes) {
        id title status owner effort created due description  
        }
      }`
      const {_id,id,created,...changes}=issue;
      const data= await graphqlendpoint(query,{id,changes},this.props.showerror)
      console.log(data.issueUpdate.title)
     if(data){
      this.props.showsuccess("Updated successfully")
      console.log(data.issueUpdate.id)
        this.setState({issue: {
          id:id,
          created:created,
          title:data.issueUpdate.title,
          status:data.issueUpdate.status,
          description:data.issueUpdate.description,
          owner:data.issueUpdate.owner,
          effort:data.issueUpdate.effort,
          due:data.issueUpdate.due,
          
        }});
        
        
      }

  }
  



  async loaddata() {
    const id = parseInt(this.props.match.params.id);
    const query = `query Issue($issueId: Int!) {
            issue(id: $issueId) {
            id
            title
            owner
            created
            due
            description
            _id
            status
            effort  
            }
          }`;

    let vars = { issueId: id };
    const data = await graphqlendpoint(query, vars,this.props.showerror);
    if (data) {
      this.props.showsuccess("Loaded successfully")
        const { issue } = data;
        //issue.due = issue.due ? issue.due.toDateString() : "";
        issue.created = issue.created ? issue.created.toDateString() : "";
        
        issue.owner = issue.owner != null ? issue.owner : "";
        issue.description = issue.description != null ? issue.description : "";
        this.setState({ issue });
        
    } else {
      this.setState({ issue: {} });
    }
  }
 
  show(){
    this.setState({ showvalmessage: true });

  }
 


  render() {

    const issue = this.state.issue;
    const user=this.context;
    var created=issue.created;
    const showvalmessag=this.state.showvalmessage
   const {invalidfields}=this.state;
   const toastmessage=this.state.toastmessage;
   const toastshowing=this.state.toastshowing;
   const toasttype=this.state.toasttype;
   console.log(toastmessage+" "+toastshowing+" "+toasttype)
   console.log("parent edit"+issue.due)
   let messgae;
   console.log("cal message"+showvalmessag)
   if(Object.keys(invalidfields).length!==0 && showvalmessag){
    messgae=(<Alert onClose={()=>{this.setState({showvalmessag:false})}} variant="danger" dismissible><Alert.Heading>Oh Snap ! Check your input again</Alert.Heading><p>Please enter the correct date</p></Alert>)
   }
    return (
      <Col lg={6}>
      <Card lg ={6}  sm={3} xs={3}    >

     <Form  onSubmit={this.handler}>
       <Card bg="secondary"> 
        <Card.Title className="mb-3 mt-3 ms-3 me-3">{`Editing issue: ${issue.id}`}</Card.Title>
       </Card>
        <InputGroup className="mb-3 mt-3 ms-5 me-5" >
        
         
             <InputGroup.Text style={{background:'grey',color:'white'}} bg="secondary">Created</InputGroup.Text> 

          
           <InputGroup.Text name="created">{issue.created}</InputGroup.Text> 
          
          </InputGroup>
        <Form.Group className="mb-3 mt-3 ms-5 me-5" >
         <Row >
          <Col lg ={6} sm={3} xs={3}>
             <Form.Label >Owner </Form.Label>

          </Col>
           <Col lg ={6} sm={9} xs={9}>
           <TextInput className="secondary" key={issue.id}  name="owner" value={issue.owner} onChange={this.onChange} />
           </Col> 
         </Row>
        </Form.Group>
        <Form.Group className="mb-3 mt-3 ms-5 me-5" >
         <Row >
          <Col lg ={6}  sm={3} xs={3}>
             <Form.Label >Status </Form.Label>

          </Col>
           <Col lg ={6}  sm={9} xs={9}>
           <Form.Select  name="status" value={issue.status} aria-label="Default select example">
           <option value="New">New</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Closed">Closed</option>
          </Form.Select>
           </Col> 
         </Row>
        </Form.Group>
        
        <Form.Group className="mb-3 mt-3 ms-5 me-5" >
         <Row >
          <Col lg ={6}  sm={3} xs={3}>
             <Form.Label >Effort </Form.Label>

          </Col>
           <Col lg ={6}  sm={9} xs={9}>
           <Numinput key={issue.id}  name="effort" value={issue.effort} onChange={this.onChange} />
            
           </Col> 
         </Row>
        </Form.Group>
        <Form.Group className="mb-3 mt-3 ms-5 me-5" >
         <Row >
          <Col lg ={6}  sm={3} xs={3}>
             <Form.Label >Due </Form.Label>

          </Col>
           <Col lg ={6}  sm={9} xs={9}>
           <DateInput onValidityChange={this.onValidityChange} key={issue.id}  name="due" value={issue.due} onChange={this.onChange} />

           </Col> 
         </Row>
        </Form.Group>
        <Form.Group className="mb-3 mt-3 ms-5 me-5" >
         <Row >
          <Col lg ={6}  sm={3} xs={3}>
             <Form.Label >Title </Form.Label>

          </Col>
           <Col lg ={6}  sm={9} xs={9}>
           <TextInput  key={issue.id}  name="title" value={issue.title} onChange={this.onChange} />
           </Col> 
         </Row>
        </Form.Group>
        <Form.Group className="mb-3 mt-3 ms-5 me-5" >
         <Row >
          <Col lg ={6}  sm={3} xs={3}>
             <Form.Label >Description </Form.Label>

          </Col>
           <Col lg ={6}  sm={9} xs={12}>
           <TextInput tag="textarea" key={issue.id} rows={3}  name="description" value={issue.description} onChange={this.onChange} />

           </Col> 
         </Row>
         
        </Form.Group>
        <Form.Group className="mb-3 mt-3 ms-5 me-5" >
         <Row >
          <Col lg ={12}  sm={3} xs={3}>
             <Button disabled={!user.signedIn}  style={{width:'200px'}} type="submit" >Submit </Button>

          </Col>
           </Row>
        </Form.Group>
        <Form.Group>
          {messgae}
        </Form.Group>
        
       
        <Link className="mb-3 mt-3 ms-3" to={`/edit/${issue.id - 1}`}>Prev</Link> {" | "}{" "}
        <Link className="mb-3 mt-3 ms-3" to={`/edit/${issue.id + 1}`}>Next</Link>{" "}
    </Form>
        </Card>
        </Col>
    )
  }
}
IssueEdit.contextType = UserContext;
export default withToast(IssueEdit);
/*
 <table>
          <tbody>
            <tr>
              <td>Created:</td>
              <td>{issue.created}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>
                <select name="status"  value={issue.status} onChange={this.onChange}>
                  <option value="New">New</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Closed">Closed</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Owner:</td>
              <td>
                <TextInput key={issue.id}  name="owner" value={issue.owner} onChange={this.onChange} />
              </td>
            </tr>
            <tr>
              <td>Effort:</td>
              <td>
                <Numinput key={issue.id} name="effort" value={issue.effort} onChange={this.onChange}  />
              </td>
            </tr>
            <tr>
              <td>Due:</td>
              <td>
                <DateInput onValidityChange={this.onValidityChange} key={issue.id} name="due" value={issue.due} onChange={this.onChange} />
              </td>
            </tr>
            <tr>
              <td>Title:</td>
              <td>
                <TextInput
                key={issue.id}
                  size={50}
                  name="title"
                  value={issue.title}
                  onChange={this.onChange}
                />{" "}
              </td>{" "}
            </tr>{" "}
            <tr>
              {" "}
              <td>Description:</td>{" "}
              <td>
                {" "}
                <TextInput
                tag="textarea"
                key={issue.id}
                  rows={8}
                  cols={50}
                  name="description"
                  value={issue.description}
                  onChange={this.onChange}
                />{" "}
              </td>{" "}
            </tr>{" "}
            <tr>
              {" "}
              <td />{" "}
              <td>
                <button type="submit">Submit</button>
              </td>{" "}
            </tr>{" "}
          </tbody>{" "}
        </table>{" "}
     
*/