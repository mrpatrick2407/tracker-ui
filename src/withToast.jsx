import  React  from 'react'
import Toast from './Toast.jsx';
export default function withToast(OriginalComponent) {
    return class ToastWrapper extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                toastmessage:'',
                toasttype:"success",
                toastshowing:false
            }
            this.showsuccess=this.showsuccess.bind(this);
            this.showerror=this.showerror.bind(this);
            this.dismiss=this.dismiss.bind(this);
        }
        showsuccess(mess){
            this.setState({toastmessage:mess,toasttype:"success",toastshowing:true})
            console.log("Debugging Toast"+this.state.toastshowing)
        
           }
           showerror(mess){
            this.setState({toastmessage:mess,toasttype:"danger",toastshowing:true})
          
           }
           dismiss(){
          this.setState({toastshowing:false})
           }
           render() {
            const toastmessage=this.state.toastmessage;
            const toasttype=this.state.toasttype;
            const toastshowing=this.state.toastshowing;
            return(
                <>
                <OriginalComponent showsuccess={this.showsuccess} showerror={this.showerror} dismiss={this.dismiss} {...this.props}/> 
                <Toast
                type={toasttype} showing={toastshowing}  onDismiss={this.dismiss}>{toastmessage}</Toast>
                </>
            )
           }

    }
}