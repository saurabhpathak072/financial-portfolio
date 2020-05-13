import React from 'react';
import './Mystocks.scss';

function Mystocks(props) {

   let st = props.stocks;
let stocks = (
<>
<td>{st.symbol}</td>
<td>{st.name}</td>
<td>{st.numberOfShares}</td>
<td>{st.closingPrice}</td>
<td>{st.currentPrice}</td>
<td></td>
<td><button type="button" className="btn btn-danger">Stop Tracking</button></td>
<th></th>
    </>
    )
   
    // let mystocks = stocks.map((stock)=>{
    //     return(
    //        <td>{props.stocks[stock]}</td> 
    //     )
    // })


    let symbol =props.stocks.symbol;
 
    
    return (
     
                <tbody>
                    <tr scope="row">
                        {/* {mystocks} */}
                        {stocks}

                    </tr>
                    
                </tbody>
            
    )
}

export default Mystocks
