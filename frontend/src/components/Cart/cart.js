import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'

const Cart = () => {
  const state = useContext(GlobalState)
  const [cart] = state.userAPI.cart

  // console.log(cart)
  return (
    <div>
      <div>
        {
          cart.map(pro => (

            <ul>
              <li>{pro.title}</li>
              <li></li>
            </ul>
          ))
        }
      </div>
    </div>
  )
}

export default Cart
