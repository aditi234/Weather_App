import React, { Component } from 'react';
import './App.css';
import Weather from './components/weather.component';
import 'weather-icons-master/css/weather-icons.css';
import Form from './components/form.component'; 
import Clear from './assets/clear.jpg';
import Clouds from './assets/cloud.jpg';
import Thunder from './assets/thunder.jpg';
import Rain from './assets/rain.jpg';
import Drizzle from './assets/drizzle.jpg';
import Snow from './assets/snow.jpg';
import Haze from './assets/haze.jpeg';
//api call  api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
const API_key="7335c82298e021518e15da2b03b5e832"

class App extends React.Component {
  constructor(){
    super();
    this.state={
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error:false,
      image: ''
    };
  
    this.weatherIcon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-shower",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    }

  
  }
  

  calCelsius(temp){
    let cell=Math.floor(temp-273.15);
    return cell;
  }

  get_WeatherIcon(icon,rangeId){
    switch(true){
      case rangeId>=200&&rangeId<=232:
         this.setState({icon:this.weatherIcon.Thunderstorm,
                        image: Thunder});
         break;
      case rangeId>=300&&rangeId<=321:
         this.setState({icon:this.weatherIcon.Drizzle,
                        image: Drizzle});
         break;
      case rangeId>=500&&rangeId<=531:
         this.setState({icon:this.weatherIcon.Rain,
                        image: Rain});
         break;    
      case rangeId>=600&&rangeId<=622:
         this.setState({icon:this.weatherIcon.Snow,
                        image: Snow});
         break;
      case rangeId>=701&&rangeId<=781:
         this.setState({icon:this.weatherIcon.Atmosphere,
                        image: Haze});
         break;
      case rangeId===800:
         this.setState({icon:this.weatherIcon.Clear,
                        image: Clear});

         break;   
      case rangeId>=801&&rangeId<=804:
         this.setState({icon:this.weatherIcon.Clouds,
                        image: Clouds});
         break; 
      default:
         this.setState({icon:this.weatherIcon.Clear,
                        image: Clear});   
    }
  }

  getWeather=async(e)=>{
    e.preventDefault();
    
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city&&country){
      const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

    const response=await api_call.json();
    console.log(response);
    this.setState({
      city:`${response.name},${response.sys.country}`,
      celsius:this.calCelsius(response.main.temp),
      temp_max:this.calCelsius(response.main.temp_max),
      temp_min:this.calCelsius(response.main.temp_min),
      description: response.weather[0].description,
    });
    this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);
    }
    else{
      this.setState({error:true});
    }
  }
 

  render() {
    return (
      <div className="App" style={ {backgroundImage: `url(${this.state.image})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height:"100%"

        } }>

        <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather 
        city={this.state.city} 
        country={this.state.country} 
        temp_celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        description={this.state.description} 
        weatherIcon={this.state.icon}
        />

       
      </div>
    );
  }
}

export default App;
