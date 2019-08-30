class App extends React.Component{
  constructor(){
    super()
    this.state={
      word:"",
      list : [],
      alert: "",
      deletedtasks: []
    }
  }

  addItem(){
    let array = this.state.list
    array.push(this.state.word)
    this.setState({list:array, word:""})
  }

  deleteItem(index){
    let array = this.state.list
    let deletedArray = this.state.deletedtasks
    deletedArray.push(array.splice(index,1))
    this.setState({list:array, deletedtasks:deletedArray})
  }

  editItem(obj,index){
    let array = this.state.list
    array[index] = obj
    this.setState({list:array})
  }

  updateWord(e){
    this.setState({word: e.target.value})
  }

  render(){
    return(
      <div>
        {this.state.alert}
        <h1>Wow Form</h1>
        <Form updateWord={this.updateWord.bind(this)} value={this.state.word} addItem={this.addItem.bind(this)}/>
        <h1>My Stuff</h1>
        <div style={{backgroundColor:"pink"}}>
        <List editItem={this.editItem.bind(this)} deleteItem={this.deleteItem.bind(this)} tasks={this.state.list}/>
        </div>
        <h1>Deleted Stuff</h1>
        <div style={{backgroundColor:"yellow"}}>
        <DeletedList deletedtasks={this.state.deletedtasks}/>
        </div>
      </div>
    )
  }
}

class Form extends React.Component{
  constructor(){
    super()
  }

  enterKey(e){
    if (e.which === 13){
      this.props.addItem()
    }
  }

  render(){
    return(
      <div>
        <input type="text" value={this.props.value} onKeyPress={this.enterKey.bind(this)} onChange={this.props.updateWord}></input>
        <button onClick={this.props.addItem}>Add Item</button>
      </div>
    )
  }
}

class List extends React.Component{
  render(){
    let tasks = this.props.tasks.map((obj,index)=>{
      return <Item key={index} task={obj} index={index} editItem={this.props.editItem} deleteItem={this.props.deleteItem}/>
    })
    return(
      <ul>
      {tasks}
      </ul>
    )
  }
}

class DeletedList extends React.Component{
  render(){
    let tasks = this.props.deletedtasks.map((obj,index)=>{
      return <li key={index}>{obj}</li>
    })
    return(
      <ul>
      {tasks}
      </ul>
    )
  }
}

class Item extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      showField:"",
      showEdit: <button onClick={this.showEditField.bind(this)}>Edit Task</button>,
      showSubmit: "",
      taskEdit: ""
    }
  }

  enterKey(e){
    if (e.which === 13){
      this.submitChange()
    }
  }

  showEditField(task, index){
    let field = <input type="text" onKeyPress={this.enterKey.bind(this)} defaultValue={this.props.task} onChange={this.updateEdit.bind(this)}></input>
    let submit = <button onClick={this.submitChange.bind(this)}>SubmitChange</button>
    this.setState({showField: field, showEdit: "", showSubmit:submit})
  }

  updateEdit(e){
    this.setState({taskEdit:e.target.value})
  }

  submitChange(){
    let edit = <button onClick={this.showEditField.bind(this)}>Edit Task</button>
    this.setState({showField: "", showEdit: edit, showSubmit:""})
    this.props.editItem(this.state.taskEdit,this.props.index)
  }

  render(){
    return(
      <li>
        <p>{this.props.task}</p>
        {this.state.showField}
        {this.state.showEdit}
        {this.state.showSubmit}
        <button onClick={this.props.deleteItem.bind(this,this.props.index)}>Delete Task</button>
      </li>
    )
  }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
