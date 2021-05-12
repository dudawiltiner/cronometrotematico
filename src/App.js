
import './App.css';
import React from 'react'
import Chronometer from './Chronometer';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      showImage: 1,
    }
  }

  changeImage = () => {
    console.log('aqui')
    this.setState((prevState) => ({ showImage: prevState.showImage === 3 ? 1 : prevState.showImage + 1}));
  }

  render () {
    const { showImage } = this.state;
  return (
    <div className="App">
      <header className="App-header">
        {showImage === 3 ? <span onClick={this.changeImage}><img  src='./logoStarWars.svg' width='300' className="App-logo" alt="logo" /></span> : (showImage === 2 ?  <span onClick={this.changeImage}><img  src='./logoTrybe.svg' width='210' className="App-logo" alt="logo" /></span> :  <span onClick={this.changeImage}><img  src='./logo.svg' className="App-logo" alt="logo" /></span>)}
        <Chronometer className="Chronometer" tema={showImage} />
      </header>
    </div>
  );
  }
}
export default App;

