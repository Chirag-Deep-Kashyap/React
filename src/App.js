import React, {Component} from 'react';
//import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';
import Radium, {StyleRoot} from 'radium';
import styled from 'styled-components' ; 


const StyledButton = styled.button`
background-color: ${props => props.alt ? 'black' : 'white'};  
color: ${props => props.alt ? 'white' : 'black'};  
font: inherit;
border: 1px solid blue;
padding: 8px;
cursor: pointer;

&:hover {
  background-color: ${props => props.alt ? 'salmon' : 'lightgreen'}; 
  color: black;

`;

class App extends Component{
  /// since our class extends Component class so we can use special property named state.
      state={
        ///creating arrays of person and each entry of array has name and age associated with it
        persons:[
          {id:'a', name: 'Max', age: 28},
          {id:'b', name: 'Manu', age: 29},
          {id:'c', name: 'Stephanie', age: 26}
        ],
        showPersons: false
      }
  
      ///Initially name was something different and now we want to change it to mentioned below.
      // switchNameHandler = ()=>{
      //   //console.log("Was Clicked!");
      //   this.setState({
      //     persons:[
      //       {name: 'Maximilian', age: 28},
      //       {name: 'Manu', age: 29},
      //       {name: 'Stephanie', age: 27}
      //     ]
      //   })
      // }

      /// Used for two way binding
       nameChangedHandler = (event, id)=>{
        const personIndex = this.state.persons.findIndex(p => {
          return p.id === id;
        });

        
        const persons = [...this.state.persons];
        persons[personIndex].name = event.target.value;
    
        this.setState( {
          persons: persons
        } );
      }
      

    /// Rendering content conditionally
      togglePersonHandler = () =>{
        const doesShow = this.state.showPersons;
        this.setState({showPersons : !doesShow});
      };

      deletePersonHandler = (personIndex) =>{
        const persons = [...this.state.persons];
        persons.splice(personIndex,1);
        this.setState({persons: persons});
      }

      render(){
        const style = {
          backgroundColor: 'white',
          font: 'inherit',
          border: '1px solid blue',
          padding: '8px',
          cursor: 'pointer',
          ':hover':{
            backgroundColor: 'lightgreen',
            color: 'black'
          }
        };

        /// whenever react wants to update stream, it will execute everything inside render() but it will not execute return ().
        let persons = null;

        if(this.state.showPersons){
          persons = (
          <div>
            {
              this.state.persons.map((person,index) => {
                return <Person
              click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed ={(event)=> this.nameChangedHandler(event,person.id)}/>
            })}
          </div>
          );
          style.backgroundColor="salmon"
          style.color="white"
          style[':hover']={
            backgroundColor: 'yellow',
            color: 'black'
          }
        }

///dynamically changing class behaviour
        const classes = [];
        if(this.state.persons.length<=2){
          classes.push('red');
        }

        if(this.state.persons.length<=1){
          classes.push('bold');
        }        
    return (
      // <StyleRoot>
      <div className="App">
        
      <h1>Hi, I'm a React App</h1>
      <p className = {classes.join(' ')}>This is really working!</p>

      <StyledButton alt={this.state.showPersons} onClick={()=>this.togglePersonHandler()}>Toggle Name</StyledButton>
      {persons}
     
     </div>
    //   </StyleRoot> 
    );
   
  }


};
export default App;

