import React from 'react';
import { Form, Button, Modal, Nav, NavLink, Row, Col } from 'react-bootstrap';
import { NavItem, withRouter } from 'react-router-dom';
import { IoAdd } from 'react-icons/io5';


class IssueAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showmodal: false }
    this.handle = this.handle.bind(this)
  }
  
  handle(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    console.log(form.owner.value+"heheh")
    const newissue = { owner: form.owner.value, title: form.title.value, due: new Date(new Date().getTime() + 1000 * 24 * 60 * 60 * 10) }
    const createissue = this.props.createIssue;
    createissue(newissue)
    form.owner.value = '';
    form.title.value = '';
    this.setState({showmodal:false})
  }

  render() {
    const showmodal = this.state.showmodal;
    
    return (
      <React.Fragment>
        <Button variant="secondary" onClick={() => { this.setState({ showmodal: true }) }}>
          <IoAdd />
          Add
        </Button>
        <Row>
          <Modal size='lg' show={showmodal}>
            <Modal.Header>
              <Modal.Title>Create Issue</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form name="issueAdd" onSubmit={(e) => this.handle(e)}>
                <Form.Group>
                  <Form.Label>Owner</Form.Label>
                  <Form.Control autoFocus name="owner" placeholder="owner"></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control name="title" placeholder="title"></Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Col lg={2}>
                <Button onClick={this.handle} type="submit" className='w-100'>Submit</Button>
              </Col>
              <Col>
                <Button onClick={()=>{this.setState({showmodal:false})}}  style={{ width: "140px" }} variant="secondary">Cancel</Button>
              </Col>
            </Modal.Footer>
          </Modal>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(IssueAdd);
