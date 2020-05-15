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
            date:new Date()
        }
    }

   

    componentDidMount(){
        this.myStocksData();
        this.stockListData();
        
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


    currentData = (value) =>{
        console.log("curent Data value",value)
        Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${value.symbol}&datatype=json&apikey=WYK44F4DQD0987XS`)
        .then(res=>{res=res.data["Time Series (Daily)"];
         let dates = Object.keys(res);

         let close=   dates[0];
         let close1 = res[close]
         let closeprice= close1["4. close"]
        console.log("Date", closeprice);
            this.setState({
                closeprice
            },console.log("current data",this.state.closeprice))
        })
    }

//--------------------------------------------------------------------------------

addStocks = async (value) =>{
    
   if(value.shares && value.buyPrice){
    await Axios.put(`https://finanial-portfolio.firebaseio.com/allStocks/0/${this.state.value.symbol}.json`,{
        isMyStocks: true,
        name:this.state.value.name,
        symbol:this.state.value.symbol
    })
    .then((resp=>console.log(resp)))
    .catch((err)=>console.log('isMyStock error',err))

    
let profit=(value.buyPrice - this.state.closeprice )*value.shares;
console.log("profit",profit);
   await Axios.put(`https://finanial-portfolio.firebaseio.com/myStocks/0/${this.state.value.symbol}.json`,{

    symbol:this.state.value.symbol,
    name:this.state.value.name,
    numberOfShares : value.shares,
    currentPrice: value.buyPrice,
     closingPrice:this.state.closeprice,
     profit:profit
        
    })
    .then((resp=>console.log(resp)))
    .then(()=>this.toggleModal())

   
    .catch((err)=>console.log(err))

}
else{
    alert("Please Fill all the Data");
}

   

}
//--------------------------------------------------------------------------------




  

    

    selectedStock =  (value) =>{
   
      
    value && this.setState({
            showmodal:true,
            value
        })

        this.currentData(value);
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

        let days= this.state.date.getDay() == 6 || this.state.date.getDay()==0 ? "Stocks are closed Closing price will show of Friday":"Stocks Are Open for Market";
        console.log("Main", days);
        
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
                <div className="header h3">Financial Portfolio Tracker </div>
                <p> {days}</p>
               
                <div className="MyStocks container-fluid">
                <h5 className="text-left font-weight-normal h3 MyStocks">My Stocks</h5>
                <div class="table-responsive">
                <table className="MyStocksTable table container-fluid ">
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
                </div>

                <hr/>

                <div className="AddStocksTitle">

                <h3 className="text-left font-weight-normal col-lg-4  h3 MyStocks">Add Stocks to My Stock</h3>
            <div className="d-flex flex-wrap  row ">
              
                {allStocks}
                </div>
                   
                   

                </div>

                {
                    this.state.showmodal && <Modal title={this.state.value} modal={this.toggleModal} stocklistHandle={this.addStocks} />
                }
                
                
            </div>
        )
    }
}

export default Main
