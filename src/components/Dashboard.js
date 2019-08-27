import React, {Component} from 'react';
import {base} from '../firebase/firebase';
import Stations from './Stations';
import Manufactures from './Manufactures';
import Products from './Proructs';
import Intents from './Intents';


  class Dashboard extends Component {
    constructor(props){
      super(props)

      this.state={
        userInfo: null
      }
    }
    componentDidMount(){
      this.ref = base.syncState(`users/${this.props.user.uid}`, {
        context: this,
        state: "userInfo",
      });
    }

    addProductIntent = (
      id,
      name,
      model,
      manufacturer,
      type, 
      lastYear, 
      nextYear,
      use,
  ) => {
    const userInfo = { ...this.state.userInfo };
    userInfo[`running-intent`][`items`][`${id}`]={
        "product-manufacturer" : manufacturer, 
        "product-model" :  model,
        "product-name" : name,
        "selected" : false,
        "use": use,
        "last-year": lastYear,
        "next-year": nextYear
      };
    this.setState({ userInfo });
  };

    updateRunningIntentSelected = (id, selected) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`selected`]=selected;
      this.setState({userInfo})
    }

    updateRunningIntentProductManufacturer = (id, manufacturer) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`product-manufacturer`] = manufacturer;
      this.setState({userInfo})
    }

    updateRunningIntentProductModel = (id, model) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`product-model`] = model;
      this.setState({userInfo})
    }

    updateRunningIntentProductName = (id, name) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`product-name`] = name;
      this.setState({userInfo})
    }

    updateRunningIntentLastYear = (id, lastYear) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`last-year`] = lastYear;
      this.setState({userInfo})
    }

    updateRunningIntentNextYear = (id, nextYear) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`next-year`] = nextYear;
      this.setState({userInfo})
    }

    updateRunningIntentUse = (id, use) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`use`] = use;
      this.setState({userInfo})
    }

    updateRunningIntentSelected = (id, selected) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`selected`] = selected;
      this.setState({userInfo})
    }

    render() {
      return  (
        this.state.userInfo!==null?
        <>
          <div style={{
              background:'#007bff',
              position: 'sticky',
              top: 0,
              zIndex: 100
            }} 
            className="top-nav"
          >
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a style={{color: 'black'}} className="nav-link" href="#stations">Stations</a>
              </li>

              <li className="nav-item">
                <a style={{color: 'black'}} className="nav-link" href="#manufactures">Manufactures</a>
              </li>

              <li className="nav-item">
                <a style={{color: 'black'}} className="nav-link" href="#products">Products</a>
              </li>
            </ul>
          </div>
          <div className="main">
            <Stations />
            <Manufactures />
            <Products />
            <Intents 
              userInfo={this.state.userInfo}

              addProductIntent={this.addProductIntent}
              updateRunningIntentSelected={this.state.updateRunningIntentSelected}
              updateRunningIntentLastYear={this.updateRunningIntentLastYear}
              updateRunningIntentNextYear={this.updateRunningIntentNextYear}
              updateRunningIntentProductManufacturer={this.updateRunningIntentProductManufacturer}
              updateRunningIntentProductModel={this.updateRunningIntentProductModel}
              updateRunningIntentProductName={this.updateRunningIntentProductName}
              updateRunningIntentUse={this.updateRunningIntentUse}
              updateRunningIntentSelected={this.updateRunningIntentSelected}
            />
          </div>
        </>:<h1>Session Out</h1>
      )
    }
  }
  
  
  export default Dashboard;
  