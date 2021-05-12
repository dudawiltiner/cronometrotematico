import React from 'react'
import './Chronometer.css'

class Chronometer extends React.Component {
  constructor(){
    super();
    
    this.state = {
      seconds: '00',
      minutes: '00',
      hour: '00',
      update: false,
      start: false,
    }
  }

  convertString(element){
    return (parseInt(element)).toString();
  }

  changeState = ({ target }) => {
    const { name } = target;
    const value = !target.value ? '00': target.value;
    this.setState({
      [name]: this.convertString(value).length === 2 ? this.convertString(value) : (`0${this.convertString(value)}`),
      update: false,
  });
  }

  convertSubtraiString(element){
    return (parseInt(element)-1).toString();
  }

  stopChronometer = () => {
    clearInterval(this.interval);
    this.setState({
      start: false,
  });
  }

  clearChronometer = () => {
    clearInterval(this.interval);
    this.setState({
      seconds: '00',
      minutes: '00',
      hour: '00',
      update: false,
  });
  }

  changeChronometer = () => {
    if( (this.state.seconds !== '00' || this.state.minutes !== '00' || this.state.hour !== '00') && this.state.start === false){
    this.interval = setInterval(() => {
      this.setState((state) => ({
        seconds: parseInt(state.seconds) === 0 ? '59' : (this.convertSubtraiString(state.seconds).length === 2 ? this.convertSubtraiString(state.seconds) : (`0${this.convertSubtraiString(state.seconds)}`)),
        minutes: parseInt(state.minutes) === 0 && parseInt(state.seconds) === 0? '59' : (parseInt(state.seconds) === 0 ? (this.convertSubtraiString(state.minutes).length === 2 ? this.convertSubtraiString(state.minutes) : (`0${this.convertSubtraiString(state.minutes)}`)) : state.minutes),
        hour: parseInt(state.minutes) === 0 && parseInt(state.seconds) === 0 && parseInt(state.hour) === 0? (this.convertSubtraiString(state.hour).length === 2 ? this.convertSubtraiString(state.hour) : (`0${this.convertSubtraiString(state.hour)}`)) : state.hour,
        update: true,
        start: true,
      }));
    }, 1000);
  }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.update){
      if( prevState.seconds === '00' && prevState.minutes === '00' && prevState.hour === '00' && this.state.start === true){
        this.setState({
          seconds: '00',
          minutes: '00',
          hour: '00',
          update: false,
          start: false,
      });
        clearInterval(this.interval);
        alert('Terminou o intervalo! VQV!')
      }
      else if( prevState.seconds === '00' && prevState.minutes === '00'){
        this.setState((state) => ({
          seconds: '59',
          minutes: '59',
          hour: (parseInt(state.hour) -1).toString(),
      }));
      }
    }
  }

  render(){
    const { seconds, minutes, hour} = this.state;
    let classChro = 'Chronometer';
    let classButton = 'buttonChronometer';
    let classInput = 'inputChronometer';
    let classText = 'textChronometer';
    let { tema } = this.props

    if(tema === 2){
      classChro = 'ChronometerTrybe';
      classButton = 'buttonChronometerTrybe';
      classInput = 'inputChronometerTrybe';
      classText = 'textChronometerTrybe';
    }

    if(tema === 3){
      classChro = 'ChronometerStar';
      classButton = 'buttonChronometerStar';
      classInput = 'inputChronometerStar';
      classText = 'textChronometerStar';
    }

    if(minutes === '02' && hour === '00'){
      classChro = 'Chronometer2'
    }

    if(minutes === '01' && hour === '00'){
      classChro = 'Chronometer3'
    }

    if(minutes === '00' && seconds !== '00' && hour === '00'){
      classChro = 'Chronometer1'
    }


  return (
    <div>
      <p className={ classChro }>{`${hour}:${minutes}:${seconds}`}</p>  
      <button className={classButton} onClick={this.changeChronometer}>Play</button>
      <button className={classButton} onClick={this.stopChronometer}>Stop</button>
      <button className={classButton} onClick={this.clearChronometer}>Clear</button>
      <form>
        <input className={classInput} name='minutes' type='button' onClick={this.changeState} value='5:00'/>
        <input className={classInput} name='minutes' type='button' onClick={this.changeState} value='10:00'/>
        <input className={classInput} name='minutes' type='button' onClick={this.changeState} value='15:00'/>
      </form>
      <form>
        <input className={classText} name='hour' type='number' onChange={this.changeState} min="0" max="24" placeholder="hour" required/> 
        <input className={classText} name='minutes' type='number' onChange={this.changeState} min="0" max="59" placeholder="minutes" required/> 
        <input className={classText} name='seconds' type='number' onChange={this.changeState} min="0" max="59" placeholder="seconds" required/> 
       </form>
    </div>
  );
}
}

export default Chronometer;
