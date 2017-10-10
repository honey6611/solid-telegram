import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Output from './components/output';
import Select from './components/controls/select';
import Text from './components/controls/text';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      paras:0,
      html: true,
      text:''
    }
  }

  componenWillMount (){
      this.getSampleText();
  }

  getSampleText(){
    axios.get('https://www.hoppa.com/qa/dev/text/?paras='+this.state.paras+'&html='+this.state.html)
    .then((response)=>{
      this.setState({text: response.data.text},function(){
          console.log(this.state)
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  showHtml(x){
    this.setState({html: x}, this.getSampleText)
    }

  changeParas(number){
    this.setState({paras: number}, this.getSampleText)
    }
  render() {
    return (
      <div className="App container">
        <h1 className="text-center">Basic react text generator</h1>
		<div>Making api request and printing data</div>
        <hr/>
        <form className="form-inline">
        <div className="form-group">
              <label>Paragraph</label>
              <Text value={this.state.paras} onChange={this.changeParas.bind(this)}/>
             </div>           
            <div className="form-group">
              <label>Show HTML</label>
              <Select value={this.state.html} onChange={this.showHtml.bind(this)}/>
             </div>
            
          </form><br/><br/>
        <Output value={this.state.text}/>
      </div>
    );
  }
}

export default App;
