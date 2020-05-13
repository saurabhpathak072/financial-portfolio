import React from 'react';
import Axios from 'axios';

import './StockList.scss';


class StockList extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            allstocks:null,
            
        }
    }

    componentDidMount(){

           Axios.get(`https://finanial-portfolio.firebaseio.com/allStocks.json`)
            .then(res=>{
                this.setState({
                    allstocks:res.data
                })
            })
            .catch(error => console.log("All stocks axios error ", error))
    }

    stockhandler = async (stock) =>{

        debugger;
       console.log("Stock",stock);
        // event.preventDefault();
       
    //     Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock.symbol}&apikey=WYK44F4DQD0987XS`)
    //     .then(res=>{
            
    //         this.setState({
    //             selection:{
                
    //                 showModal:true,
    //                 selectedStock:stock,
    //                 selectedData:res.data
    //             }
               
    //         },console.log("selection",this.state.selection));
    //     })
    //    .then(
    //     this.props.selectedParentData(this.state.selection)
    //    )
    //     .catch(err=>console.log(err))  ;
    //      await this.props.selectedParentData(this.state.selection)   
           await this.setState({
              
                    
                    value:stock
                    
                
            });
debugger;
          this.props.selectedParentData(this.state.value);
           
           
    }
    
render(){

    let stocklist = this.state.allstocks && this.state.allstocks.map((stock)=>{
    return (<div 
        className="col-lg-4 stock-tag" key={stock.symbol}
        ><button type="button" onClick={(e) =>{e.preventDefault();this.stockhandler(stock)}}
         className="btn btn-light float-left stock-button"
         >{stock.symbol}
         </button>
         <h6 className="align-middle"
         >{stock.name}
         </h6>
         </div>)
    })
        return (
            <div className="row container">            
                {stocklist}
                
                {/* {this.props.selectedData(this.state.selection && this.state.selection)} */}
            </div>
        )
        }
}

export default StockList
