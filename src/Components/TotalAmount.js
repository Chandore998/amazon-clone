import CurrencyFormat from "react-currency-format";
import {useSelector} from 'react-redux';

const TotalAmount = ()  => {
    let allItems = useSelector(state => state.basket.basket)
  
  const getTotalPrice = () =>{
    return allItems.reduce((sum, currentItems) => {
      return sum = sum + currentItems.price
    },0)
  }
  return (
        <CurrencyFormat
            renderText={(value) => (
                    <>
                        <p>Subtotal ({allItems.length} items) : <strong >{value}</strong></p>
                    </>
                    )}
        decimalScale={2}
        value={getTotalPrice()} 
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        />
  )

}



export default TotalAmount;