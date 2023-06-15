import  React  from 'react'
import {NavDropdown,Modal,NavItem,Button, Image} from 'react-bootstrap'
import withToast from './withToast.jsx';
import jwtDecode from 'jwt-decode';



class SignInNavLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show:false,modalmount:false,disabled:true,user:{signedIn:false,img:'',givenName:''}}
    this.showmodal=this.showmodal.bind(this);
    this.hidemodal=this.hidemodal.bind(this);
    this.signin=this.signin.bind(this);
    this.signout=this.signout.bind(this);
  }
  componentDidMount(){
    const clientId = '612036327662-2ejj7joqr8ql9ufv17mcrtahrjaqm4r8.apps.googleusercontent.com';
    google.accounts.id.initialize({
      client_id: clientId,
      callback: this.signin,
    })

    google.accounts.id.renderButton(document.getElementById('buttonsignin'),
     {
  theme:"filled_blue2",size:"large",text:"signin",shape:"pill",}
      )
       this.loadData();
  }
  async loadData() {
    
    const apiEndpoint = "http://localhost:3000/auth";
    const response = await fetch(`${apiEndpoint}/user`, {
    method: 'POST',
    credentials: 'include',
    });
    const body = await response.text();
    const result = JSON.parse(body);
    const { signedIn,givenName,image }=result;
//alert(signedIn+ " "+givenName+" "+image)
    this.setState({user:{signedIn:signedIn,givenName:givenName,img:image}})
    }
  hidemodal(){
    this.setState({show:false});
  }
  showmodal(){
    this.setState({show:true});
  }
  async signin(response){
    try {
      /*
     console.log(JSON.stringify(response.credential))

      const decode=jwtDecode(response.credential)
     console.log(JSON.stringify(decode))
      
      const givenName=decode.given_name
      const image=decode.picture*/
      const apiendpoint='/auth/signin';
      const res=await fetch(apiendpoint,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials: 'include',
        body:JSON.stringify({google_token:response.credential})
      });
      const body=await res.text();
      
      const result=JSON.parse(body);
      const { signedIn,givenName,image }=result;
      //alert(signedIn+ " "+givenName+" "+image)
      this.setState({user:{signedIn:signedIn,givenName:givenName,img:image}});
      this.props.showsuccess(`Welcome ${givenName}`);
      const onUserChange=this.props.onUserChange;
      onUserChange({signedIn,givenName})
    } catch (error) {
      this.props.showerror(error)
    }
    


  }
    
  
  async signout(){
    
    const apiendpoint='/auth/signout';
    const res=await fetch(apiendpoint,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials: 'include',

    });
    this.props.showsuccess('Signed Out');
  
    document.getElementById('buttonsignin').hidden=false;
    this.setState({user:{signedIn:false,givenName:''}});
    google.accounts.id.disableAutoSelect();
    
  }
  render(){
    
    const user=this.state.user;
    const img=this.state.user.img;
   
    
    if(user.signedIn){
      document.getElementById('buttonsignin').hidden=true;
      console.log(user.givenName+"this is the given name")
      if(img){
      return (
        <> 
        <div id='buttonsignin'></div>
        <NavDropdown style={{position:'absolute',right:'20px',top:'10px'}} title={user.givenName} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={this.signout}>Sign Out</NavDropdown.Item>
        </NavDropdown>
        <img src={img}  style={{position:'relative',top:'2px',right:'-1.5rem',width:'50px',borderRadius:'50%',border:'1px solid black',height:'50px'}}/>

        </>
      )
      }
    }

    return(
        <>
         <div id='buttonsignin'>
        </div>
        </>
        
    )


  }
  
}
export default withToast(SignInNavLink);