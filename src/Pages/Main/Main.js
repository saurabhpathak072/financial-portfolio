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
            value:null,
            count:10,
            date:new Date().toLocaleDateString()
        }
    }

   

    componentDidMount(){
        this.myStocksData();
        this.stockListData();
        this.currentData();
    }

    myStocksData = () =>{
        Axios.get(`https://finanial-portfolio.firebaseio.com/myStocks/0.json`)
        .then(res => {
            this.setState({
               mystocks:res.data
            },console.log("My Stocks",res.data))
        })
        .catch(error => console.log("error",error))
    }

    stockListData =() =>{
        Axios.get(`https://finanial-portfolio.firebaseio.com/allStocks/0.json`)
        .then(res=>{console.log("all",res.data);
            this.setState({
                allstocks:res.data
            },console.log("Stock List",res.data))
        })
        .catch(error => console.log("All stocks axios error ", error))
    }


    currentData = () =>{
        
        Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&datatype=json&apikey=WYK44F4DQD0987XS`)
        .then(res=>{console.log(res.data["Time Series (Daily)"]);
       
            this.setState({
                data:res.data["Time Series (Daily)"]
            },console.log("current data",this.state.data))
        })
    }

  

    

    selectedStock =  (value) =>{
   
      
    value && this.setState({
            showmodal:true,
            value
        })


   }

   addcounter = () =>{
        this.setState({
            count:this.state.count+1
        })
   }
   subcounter= ()=>{
       this.setState({
        count:this.state.count-1
       })
      
   }
   toggleModal = () => {
    this.setState({ showmodal: false , count:this.state.count - 1});
    this.myStocksData();
    this.stockListData();
  };
    

    render() {
        console.log("Main", this.props);
        
            let stocksName = this.state.mystocks && Object.keys(this.state.mystocks);
        let stocks = stocksName &&  stocksName.map((stocks)=>{
            
            return <Mystocks key={this.state.mystocks[stocks].symbol} stocks={this.state.mystocks[stocks]} myStocks={this.toggleModal} count={this.state.count} />
        })
    

            let allStocksName = this.state.allstocks && Object.keys(this.state.allstocks);
            let allStocks = allStocksName && allStocksName.map((allstocks)=>{
                if(this.state.allstocks[allstocks].isMyStocks)
                return;
                else
                return <StockList key={this.state.allstocks[allstocks].symbol} stocks={this.state.allstocks[allstocks]} selectedParentData={(value)=>this.selectedStock(value)} allStocks={this.stockListData} />
            })
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

                <h3 className="text-left font-weight-normal col-lg-4  h3 MyStocks">Add Stocks to My Stock</h3>

              
                {allStocks}
                   
                    {/* <StockList selectedParentData={(value)=>this.selectedStock(value)} count={this.state.count}  addcounter={this.addcounter} subcounter={this.subcounter}/> */}
                   

                </div>

                {
                    this.state.showmodal && <Modal title={this.state.value} modal={this.toggleModal} stocklistHandle={this.props.stocklistHandle} />
                }
                
                
            </div>
        )
    }
}

export default Main
