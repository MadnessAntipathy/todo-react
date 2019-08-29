class List extends React.Component {
  constructor(){
    super()

    this.state = {
      word:"",
      list : [],
      alert: ""
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.addItem = this.addItem.bind(this)
  }

  addItem(item){
    if (item.length > 0){
      let list = this.state.list
      list.push(item)
      this.setState({list:list, alert:""})
    }else{
      this.setState({alert:"You need to enter something"})
    }
  }

  changeHandler(e){
    this.setState({word:e.target.value})
  }

  removeItem(e){
    let list = this.state.list
    list.splice(e.target.value,1)
    this.setState({list:list})
  }

  render() {
      // render the list with a map() here

      console.log("rendering");
      return (
        <div className="list">
          <input onChange={(event)=>{this.changeHandler(event)}} value={this.state.word}/>
          <button onClick={()=>{this.addItem(this.state.word)}}>add item</button>
          <br/>{this.state.alert}
          <div>
          <ul>
          {this.state.list.map((obj,index)=>{
            return <Item task={obj} index={index} key={index} remove={this.removeItem.bind(this)}/>
          })}
          </ul>
          </div>
        </div>

      );
  }
}

class Item extends React.Component{

  render(){
    return(
      <li>{this.props.task}
      <button onClick={this.props.remove} value={this.props.index}>Remove task</button>
      </li>
    )
  }
}



ReactDOM.render(
    <List/>,
    document.getElementById('root')
);
