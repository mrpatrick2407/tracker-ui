export default  class Change extends React.Component {
    constructor(){
        super()
        this.state = {count:0};
    }
    componentDidMount(){
        console.log("Mounted component");
    }
    componentDidUpdate(){
        console.log("Updated component");
    }
    render() {
        return (
            <div>
               <button onClick={()=>this.setState({count:this.state.count+1})}>Increment</button>
               <button onClick={()=>this.setState({count:this.state.count-1})}>Decrement</button>
               <div>{this.state.count}</div>
    
            </div>
        )
      }
    }

