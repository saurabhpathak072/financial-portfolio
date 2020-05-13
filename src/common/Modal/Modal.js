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

    addStocks = async (event) =>{
        event.preventDefault();
        alert(
            `Number of shares ${this.state.shares} price ${this.state.buyPrice} Date ${this.state.buyDate}`
        );

        // let modal={

        //     symbol:this.props.title.symbol,
        //     name:this.props.title.name,
        //     shares : this.state.shares,
        //     buyPrice: this.state.buyPrice,
            

        // }
       
        while(this.state.id < 5){
       await Axios.put(`https://finanial-portfolio.firebaseio.com/myStocks/${this.state.id}.json`,{

            symbol:this.props.title.name
            
        })
        .then((resp=>console.log(resp)))
        .catch((err)=>console.log(err))

        if(this.state.id==5){
            this.setState({
                id:0
            });
        }
        else{
            this.setState({
                id:this.setState.id+1
            })
        }
        
    }

     

    }

    render() {

        // console.log("render",this.props.content);
        // let datakey =  Object.keys(this.props.content);
        // console.log(datakey);
        return (
            <div className="container">
                
                <Backdrop />
                <div style={{height:'auto', textAlign:'center', position:'fixed', backgroundColor:'#fff', zIndex: 500, left: '15%', top: '10%', boxSizing: 'border-box', width: '70%',padding:'2rem'}}>
                    <h5>Add {this.props.title.name} to My Stocks</h5 >
                    <form onSubmit={this.addStocks}>
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