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



    let allst = this.props.stocks;

    let stocklist = (
        <span className="col-lg-12">
            <span className="col-lg-4">
            <button type="button" onClick={(e)=>{e.preventDefault();this.stockhandler(allst)}} className="btn btn-light  stock-button">{allst.symbol}</button>
    <span className=" h6">{allst.name}</span>
    </span>
        </span>
    )

        return (
            <> 
            <span className="container">

                {
                
                stocklist}
                </span>
                
            </>
        )
        }
}

export default StockList
