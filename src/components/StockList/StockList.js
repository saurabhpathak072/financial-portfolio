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

          this.stocklistData();
    }

    stocklistData = () =>{
        Axios.get(`https://finanial-portfolio.firebaseio.com/allStocks/0.json`)
        .then(res=>{console.log("all",res.data);
            this.setState({
                allstocks:res.data
            })
        })
        .catch(error => console.log("All stocks axios error ", error))
    }


    stockhandler = async (stock) =>{

    
       console.log("Stock",stock);
        
           

         await  this.props.selectedParentData(stock);
     
           
           
    }
    
    setCounter=()=>{
        this.setState({
            count:this.props.count
        })
    }

render(){

    console.log("StockList props", this.props);

    let allst = this.props.stocks;

    let stocklist = (
        <div >
            <button type="button" onClick={(e)=>{e.preventDefault();this.stockhandler(allst)}} className="btn btn-light float-left stock-button">{allst.symbol}</button>
    <h6 className="align-middle">{allst.name}</h6>
        </div>
    )



    // let stocklistName = this.state.allstocks && Object.keys(this.state.allstocks);
    // let stocklist = stocklistName && stocklistName.map((stock)=>{
    //   if(this.state.allstocks[stock].isMyStocks)
    //   {return}
    //   else
    // return (<div 
    //     className="col-lg-4 stock-tag" key={stock}
       
    //     ><button type="button" onClick={(e) =>{e.preventDefault();this.stockhandler(this.state.allstocks[stock])}}
    //      className="btn btn-light float-left stock-button"
    //      >{stock}
    //      </button>
    //      <h6 className="align-middle"
    //      >{this.state.allstocks[stock].name}
    //      </h6>
    //      </div>)
    // })
        return (
            <div className="row container"> 

                {
                
                stocklist}
                
                {/* {this.props.selectedData(this.state.selection && this.state.selection)} */}
            </div>
        )
        }
}

export default StockList
