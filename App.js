import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage} from 'react-native';
import Header from './app/components/Header';
import Subtitle from './app/components/Subtitle';
import Input from './app/components/Input';
import Listitem from './app/components/Listitem';

export default class App extends React.Component {
  constructor(props){
    super(props); //상속받는 부모 class의 속성도 받아오는거에요
    this.state={
      InputValue:"",
      todos:[]
    }
  }
componentWillMount(){
  this.getData()
  }

storeData =() => {
    AsyncStorage.setItem('@todo:state', JSON.stringify(this.state));
  }
getData =() => {
    AsyncStorage.getItem('@todo:state').then((state)=>{
    if(state !== null){
      this.setState(JSON.parse(state));
    }
  })
}

  _makeTodoItem =({ item, index }) => {
    return (
      <Listitem name={item.title}
      isComplete={item.isComplete}
      changeComplete={() => {
        const newTodo = [...this.state.todos];
        newTodo[index].isComplete = !newTodo[index].isComplete;
        this.setState({todos:newTodo},this.storeData);
        }}
      deleteItem={() => {
        const newTodo = [...this.state.todos];
        newTodo.splice(index,1);
        this.setState({todos:newTodo},this.storeData);
        }} />    
      );
    }

  _changeText =(value)=>{
    this.setState({InputValue:value});
  }

  _addTodoItem =()=>{
    if(this.state.inputValue != ""){
      const prevTodo = this.state.todos; //현재의 todos를 prevTodo에 넣습니다.
      
      const newTodo = {title: this.state.inputValue, iscomplete: false}; //현재 input창에 있는 값을 새로운 할일로 등록
      
      this.setState({
        inputValue: '', //TodoItem이 추가되면 입력창은 비어야하므로
        todos: prevTodo.concat(newTodo) // 이전의 TodoItem에 새 Todo를 이어붙여 todos값으로 변경
      }, this.storeData);
    }
  }

  render(){
  return (
    <View style={styles.container}>
      <View style={styles.headercenter}>
        <Header/>
      </View>
      <View style={styles.Subtitleposition}>
        <Subtitle title="To Do"/>

        <Input
          value={this.state.InputValue}
          changeText={this._changeText}
          addTodoItem={this._addTodoItem}/>

      </View>
      <View style={styles.Subtitleposition}>
        <Subtitle title="To Do List"/>

        <FlatList
          data={this.state.todos}
          renderItem={this._makeTodoItem}
          keyExtractor={(item, index) => {return '${index}'}}/>
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headercenter: {
    alignItems: 'center',
    borderWidth: 5,
    marginTop: 20,
  },
  Subtitleposition:{
    marginLeft:30,
  },
});
