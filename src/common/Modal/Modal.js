import React, { Component } from 'react';
import './Modal.css';
import Backdrop from './../Backdrop/Backdrop';
import Axios from 'axios';

class Modal extends Component {
    constructor(props){
        super(props);
        this.state ={ 
            id:0,
            shares:'',
            buyPrice:'Buy Price',
            buyDate:'Buy Date'
        
        }
    }

    handleShares = (event) =>{
        this.setState({
          
            shares:event.target.value
        })
    }

    handleBuyPrice = (event) =>{
        this.setState({
         
            buyPrice:event.target.value
        })

    }

    handleBuyDate = (event) =>{
        this.setState({
         
            buyDate: event.target.value
        })
    }


    render() {
        console.log("Modal props",this.props);
        return (
            <div className="container">
                
                <Backdrop />
                <div style={{height:'auto', textAlign:'center', position:'fixed', backgroundColor:'#fff', zIndex: 500, left: '15%', top: '10%', boxSizing: 'border-box', width: '70%',padding:'0.5rem'}}>
                    <h5>Add {this.props.title.name} to My Stocks</h5 >
                    <form onSubmit={(e)=>{e.preventDefault();this.props.stocklistHandle(this.state)}}>
                    <div className="content">

                        <div className="form-group col-lg-12">
                            <label className="">
                                <h6>Company Name :</h6>
                            </label>
                            <label className="col-lg-4">{this.props.title.name}</label>
                        </div>

                        <div className="form-group col-lg-12">
                          <label className="col-lg-4">
                              <h6>No.Of Shares :</h6>
                            </label>
                            <input type="text" className="col-lg-4" onChange={this.handleShares} value={this.state.shares} placeholder="No.of shares"/>
                        </div>
                      
                        <div className="form-group col-lg-12">
                            <label className="col-lg-4">
                                <h6>Buy Price :</h6>
                            </label>
                            
                            <input type="number" className="col-lg-4 " onChange={this.handleBuyPrice} value={this.state.buyPrice} placeholder="Buy Price"/>
                        </div>
                        <div className="form-group col-lg-12">
                            <label className="col-lg-4">
                                <h6>Buy Date :</h6>
                            </label>
                           
                                <input type="Date" className="col-lg-4" onChange={this.handleBuyDate} value={this.state.buyDate} placeholder=""/>
                            
                        </div>
                    </div>

                    <button type="submit" className="btn btn-success" value="submit">Add</button>
                    </form>
                   
                </div>
            </div>
        )
    }
}

export default Modal;