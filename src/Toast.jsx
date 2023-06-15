import {Collapse,Alert} from 'react-bootstrap';
import React from 'react';



export default class Toast extends React.Component{
componentDidUpdate(){
    const {showing ,onDismiss} = this.props
    if(showing){
        clearTimeout(this.dismissTimer)
        this.dismissTimer=setTimeout(onDismiss,4000)
    }
}
componentWillUnmount() {
        clearTimeout(this.dismissTimer);
}
      render(){
        const showing=this.props.showing;
        const onDismiss=this.props.onDismiss;
        const children=this.props.children;
        const type=this.props.type;
        console.log("Working in toast"+showing +children);
        return(
        <Collapse in={showing}>
            <div style={{ position: 'fixed',
              width: '10rem',
              zIndex:'99999',
              height: 'auto',
              bottom: '1rem',
              left: '1rem',}}>
                <Alert variant={type} onDismiss={onDismiss}  >
                    {children}
                </Alert>
            </div>
        </Collapse>
        )
      }

}