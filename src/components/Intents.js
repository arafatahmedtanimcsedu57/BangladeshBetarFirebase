import React, {Component, createRef} from 'react';
import {base} from '../firebase/firebase';
import { Card, Icon } from 'antd';
import ContentEditable from 'react-contenteditable'

class Intents extends Component {
    constructor(props) {
        super(props);
  
        this.state={
            products: null,
            createAddProductIntentFormVisiable:false
        }
  
        this.productRef = createRef();
        this.lastYearRef = createRef();
        this.nextYearRef = createRef();
        this.useRef = createRef()
    }
      

    componentDidMount() {
        this.ref = base.syncState(`products`, {
            context: this,
            state: "products"
        });
    }

    createAddProductIntentFormShow = () => this.setState({createAddProductIntentFormVisiable: !this.state.createAddProductIntentFormVisiable})

    render() {
        return  (
            <>{this.props.userInfo?
                <div 
                    id="products" 
                    style={{width: '100%', padding: "25px"}} 
                >        
                    <Card
                        style={{margin: '2px'}} 
                        title={
                            <span style={{color:'rgb(0, 75, 222)'}}>
                                Intents
                            </span>
                        }
                        extra={
                            <Icon 
                                style={{color: 'green'}}
                                type="edit" 
                                key="edit"
                                onClick={this.createAddProductIntentFormShow} 
                            />
                        }
                    >
                    
                        <div style={{float: 'center'}} className='row'>
                            <div className='col-lg-6 col-md-12 col-sm-12'>
                                <span style={{color:'rgba(0, 75, 222, 0.5)'}}>Running Intent</span>
                                <table 
                                    style={{color: "rgba(0, 0, 0, 0.5)"}} 
                                    className="table table-responsive table-borderless"
                                >{Object.keys(this.props.userInfo[`running-intent`].items).length>0?
                                    <thead>
                                        <tr style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}>
                                            <th scope="col">Selected</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Product Model</th>
                                            <th scope="col">Product Manufacturer</th>
                                            <th scope="col">Consumption of Last 2 Year</th>
                                            <th scope="col">Req. of Last 2 Year</th>
                                            <th scope="col">Quantity in Use</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    :''}
                                    <tbody>{Object.keys(this.props.userInfo[`running-intent`].items).map(key => (
                                        <tr 
                                            key={key} 
                                            style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}
                                        >
                                            <td key={key}>
                                                <input
                                                    key={key}
                                                    type="checkbox" 
                                                    onChange={(event)=>this.props.updateRunningIntentSelected(key, event.target.checked)}
                                                    checked={this.props.userInfo[`running-intent`].items[key][`selected`]}
                                                />
                                            </td>
                                            <td>
                                                <ContentEditable
                                                    html={this.props.userInfo[`running-intent`].items[key][`product-name`]}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.props.updateRunningIntentProductName(key, event.target.value)}
                                                />
                                            </td>
                                        
                                            <td>
                                                <ContentEditable
                                                    html={this.props.userInfo[`running-intent`].items[key][`product-model`]}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.props.updateRunningIntentProductModel(key, event.target.value)}
                                                />
                                            </td>

                                            <td>
                                                <ContentEditable
                                                    html={this.props.userInfo[`running-intent`].items[key][`product-manufacturer`]}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.props.updateRunningIntentProductManufacturer(key, event.target.value)}
                                                />
                                            </td>

                                            <td>
                                                <ContentEditable
                                                    html={this.props.userInfo[`running-intent`].items[key][`last-year`]}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.props.updateRunningIntentLastYear(key, event.target.value)}
                                                />
                                            </td>

                                            <td>
                                                <ContentEditable
                                                    html={this.props.userInfo[`running-intent`].items[key][`next-year`]}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.props.updateRunningIntentNextYear(key, event.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <ContentEditable
                                                    html={this.props.userInfo[`running-intent`].items[key][`use`]}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.props.updateRunningIntentUse(key, event.target.value)}
                                                />
                                            </td>
                                    
                                            <td>
                                                <Icon
                                                    style={{color: 'red'}} 
                                                    type="delete" 
                                                    key="delete" 
                                                    onClick={()=>this.deleteProduct(key)}
                                                />
                                            </td>
                                        </tr>        
                                    ))}</tbody>
                                </table>

                                <ul className="list-group">{
                                    Object.keys(this.props.userInfo.intents).map((item, index)=> 
                                        <li key={index} style={{color:'rgba(0, 75, 222, .7)'}} className="list-group-item">
                                            <b>{this.props.userInfo.intents[item].name}</b>
                                            <p>
                                                <span style={{color:'rgba(0, 75, 222, .5)'}}>
                                                    {this.props.userInfo.intents[item].type.charAt(0).toUpperCase()}{this.props.userInfo.intents[item].type.slice(1)}
                                                </span>-<i>
                                                    {this.props.userInfo.intents[item].year}
                                                </i>
                                            </p>

                                            <table 
                                                style={{color: "rgba(0, 0, 0, 0.5)"}} 
                                                className="table table-responsive table-borderless"
                                            >{Object.keys(this.props.userInfo.intents[item].items).length>0?
                                                <thead>
                                                    <tr style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}>
                                                        <th scope="col">Product Name</th>
                                                        <th scope="col">Product Manufacturer</th>
                                                        <th scope="col">Product Model</th>
                                                        <th scope="col">Consumption Last 2 Year</th>
                                                        <th scope="col">Consumption Next 2 Year</th>
                                                        <th scope="col">Quantity in Use</th>
                                                    </tr>
                                                </thead>
                                                :''
                                            }
                                                <tbody>{Object.keys(this.props.userInfo.intents[item].items).map(key => (
                                                    <tr 
                                                        key={key} 
                                                        style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}
                                                    >
                                                        <td>{this.props.userInfo.intents[item].items[key][`product-name`]}</td>
                                                        <td>{this.props.userInfo.intents[item].items[key][`product-manufacturer`]}</td>
                                                        <td>{this.props.userInfo.intents[item].items[key][`product-model`]}</td>
                                                        <td>{this.props.userInfo.intents[item].items[key][`last-year`]}</td>
                                                        <td>{this.props.userInfo.intents[item].items[key][`next-year`]}</td>
                                                        <td>{this.props.userInfo.intents[item].items[key][`use`]}</td>
                                                    </tr>           
                                                ))}</tbody>
                                            </table>
                                        </li>
                                    )
                                }</ul>
                            </div>

                            <div className='col-lg-6 col-md-12 col-sm-12'>{this.state.createAddProductIntentFormVisiable === true?
                                <form onSubmit={(event)=>{
                                    event.preventDefault()


                                    console.log( Object.keys(this.props.userInfo[`running-intent`][`items`]).length,
                                    this.state.products[this.productRef.current.value][`Name`],
                                    this.state.products[this.productRef.current.value][`Model`],
                                    this.state.products[this.productRef.current.value][`Manufacturer`],
                                    this.state.products[this.productRef.current.value][`Type`])
                                    this.props.addProductIntent(
                                        Object.keys(this.props.userInfo[`running-intent`][`items`]).length,
                                        this.state.products[this.productRef.current.value][`Name`],
                                        this.state.products[this.productRef.current.value][`Model`],
                                        this.state.products[this.productRef.current.value][`Manufacturer`],
                                        this.state.products[this.productRef.current.value][`Type`], 
                                        this.lastYearRef.current.value, 
                                        this.nextYearRef.current.value,
                                        this.useRef.current.value,
                                    )

                                    event.currentTarget.reset();
                                }}>
                                    <div className="form-group">
                                        <select 
                                            className="form-control" 
                                            ref={this.productRef}
                                        >{Object.keys(this.state.products)?
                                        Object.keys(this.state.products).map((item, index)=>
                                            <option 
                                                key={index} 
                                                value={item} 
                                                className="dropdown-item" 
                                            >
                                                {this.state.products[item].Type}
                                                -
                                                {this.state.products[item].Name} 
                                                ({this.state.products[item].Model})
                                                -
                                                {this.state.products[item].Manufacturer}
                                            </option>)
                                            :''
                                        }</select>                  
                                    </div>
                                
                                    <div className="form-group">
                                        <input
                                            name="lastYear"
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            ref={this.lastYearRef}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            name="nextYear"
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            ref={this.nextYearRef}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            name="use"
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            ref={this.useRef}
                                        />
                                    </div>

                                    <button 
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Submit
                                    </button>
                                </form>
                                :''
                            }</div>
                        </div>
                    </Card>
                </div>
                :''
            }</>
        )
    }
}


export default Intents