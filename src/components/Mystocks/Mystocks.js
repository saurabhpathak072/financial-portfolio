import React from 'react';
import './Mystocks.scss';
import Axios from 'axios';

class Mystocks extends React.Component {
    constructor(props){
        super(props);
    }


   removeStocks = async (value) =>{
     
       console.log("e",value);
        // Axios.delete(`https://finanial-portfolio.firebaseio.com/myStocks/0/${e.target.value}.json`)
        // .then(()=>this.props.myStocks())
        // .catch((err)=>console.log(err))





       await Axios.put(`https://finanial-portfolio.firebaseio.com/allStocks/0/${value.symbol}.json`,{
            isMyStocks: false,
            name:value.name,
            symbol:value.symbol
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))


          Axios.delete(`https://finanial-portfolio.firebaseio.com/myStocks/0/${value.symbol}.json`)
        .then(()=>this.props.myStocks())
        .catch((err)=>console.log(err))
   }

   

 
 
    render(){
        console.log(this.props.count);
        let symbol =this.props.stocks.symbol;
   let st = this.props.stocks;
   let stocks = (
    <>
    
    <td>{st.symbol}</td>
    <td>{st.name}</td>
    <td>{st.numberOfShares}</td>
    <td>{st.closingPrice}</td>
    <td>{st.currentPrice}</td>
    <td></td>
    <td><button type="button" className="btn btn-danger" onClick={(e)=>{e.preventDefault();this.removeStocks(st)}}>Stop Tracking</button></td>
    <th></th>
        </>
        )
    return (
     
                <tbody>
                    <tr scope="row">
                        {/* {mystocks} */}

                        
                        {
                     this.props.count>0?
                        stocks:( alert('My Stocks is full')  )}
                        

                    </tr>
                    
                </tbody>
            
    )
                        }
}

export default Mystocks
