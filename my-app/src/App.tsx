import React from 'react';
import logo from './logo.svg';
import './App.css';
import AjaxWrapper from './Async/AjaxWrapper';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={ () =>  ExecuteGet() }>Get!</button>
        <button onClick={ () =>  ExecutePost()}>Post!</button>
        <button onClick={ () =>  ExecutePut()}>Put!</button>
        <button onClick={ () =>  ExecuteDelete()}>Delete!</button>
      </header>
    </div>
  );
}

function ExecuteGet(){
    const promise = AjaxWrapper.get<string, string>("get", {});
    if(promise){
        promise.onSuccess(message => {
            console.log(message)
        });
        promise.onError(message => {
            console.log("Error: " + message)
        });
    }    
}

function ExecutePost(){
    const promise = AjaxWrapper.post<string, string>("post", {});
    if(promise){
        promise.onSuccess(message => {
            console.log(message)
        });
        promise.onError(message => {
            console.log("Error: " + message)
        });
    }    
}

function ExecutePut(){
    const promise = AjaxWrapper.put<string, string>("put", {});
    if(promise){
        promise.onSuccess(message => {
            console.log(message)
        });
        promise.onError(message => {
            console.log("Error: " + message)
        });
    }    
}

function ExecuteDelete(){
    const promise = AjaxWrapper.delete<string, string>("delete", {});
    if(promise){
        promise.onSuccess(message => {
            console.log(message)
        });
        promise.onError(message => {
            console.log("Error: " + message)
        });
    }    
}

export default App;
