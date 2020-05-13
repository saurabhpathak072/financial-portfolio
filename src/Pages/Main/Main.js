import React, { Component } from 'react';
import './Main.scss';

import Mystocks from '../../components/Mystocks/Mystocks';
import StockList from '../../components/StockList/StockList';
import Modal from '../../common/Modal/Modal';

import Axios from 'axios';

class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            mystocks:null,
            allstocks:null,
            showmodal:false,
            value:null
        }
    }

   

    componentDidMount(){
        Axios.get(`https://finanial-portfolio.firebaseio.com/myStocks.json`)
         .then(res => {
             this.setState({
                mystocks:res.data
             },console.log("res",res.data))
         })
         .catch(error => console.log("error",error))

        //  Axios.get(`https://finanial-portfolio.firebaseio.com/allStocks.json`)
        //     .then(res=>{
        //         this.setState({
        //             allstocks:res.data
        //         })
        //     })
        //     .catch(error => console.log("All stocks axios error ", error))
    }

    

    selectedStock =  (value) =>{
    //     value &&
    //   this.setState({
    //       test:value
    //   },console.log("test",this.state.test))

        // this.setState({
        //     value,
        //     showmodal:true
        // },console.log("Value",value))
        debugger;
    value &&
        Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${value.symbol}&apikey=WYK44F4DQD0987XS`)
        // .then(res => console.log("res",res.data))
        .then( res =>
           this.setState({
                value,
                showmodal:true,
                data:res.data
            },console.log("value1",this.state.value,"showmodal",this.state.showmodal,"data",this.state.data))
        )

        .catch(err=>console.log(err))
    

        
//     try{
//     this.setState({
//         test:value
//     })
// }
// catch(err){
//     console.log("try err",err)
// }

   }
    

    render() {
        

        let stocks = this.state.mystocks && this.state.mystocks.map((stocks)=>{
            
            return <Mystocks key={stocks.symbol} stocks={stocks}/>
        })

    //   let allstockstitle = this.state.allstocks && this.state.allstocks.map((stocks)=>{
    //         return <StockList key={stocks.symbol} stock={stocks}/>
    //   }) 

    

    //  let allstockstitle = this.state.allstocks && <StockList stock={this.state.allstocks} selectedParentData={ (value)=> this.selectedStock(value)}/>
        return (
            
            <div className="container">
                <div className="header h3">Financial Portfolio Tracker</div>
                
                <div className="MyStocks container-fluid">
                <h5 className="text-left font-weight-normal h3 MyStocks">My Stocks</h5>
                <table className="MyStocksTable table container-fluid">
                    <thead>
                    <tr>
                        <th scope="col">Stock Symbol</th>
                        <th scope="col">Stock Name</th>
                        <th scope="col">No. of shares</th>
                        <th scope="col">Buy Price</th>
                        <th scope="col">Current Price</th>
                        <th scope="col">Profit/Loss</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                {stocks}
                </table>
                </div>

                <hr/>

                <div className="AddStocksTitle">

                <h3 className="text-left font-weight-normal h3 MyStocks">Add Stocks to My Stock</h3>

                    {/* {allstockstitle} */}
                    <StockList selectedParentData={(value)=>this.selectedStock(value)}/>
                   

                </div>

                {
                    this.state.showmodal && <Modal title={this.state.value} />
                }
                
                
            </div>
        )
    }
}

export default Main
