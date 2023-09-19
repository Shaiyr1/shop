import React from 'react'
import './cart.scss'
import bin from './bin.png'

function Cart({ cart, setCart }) {
  const deleteCart = (id) => {
    setCart(cart.filter((item, idx) => {
      return idx !== id
    }))
  }

  const byCart = (obj) => {
    const idx = cart.findIndex((item) =>
      item.id === obj.id
    );
    if (idx === -1) {
      setCart([...cart, {
        ...obj,
        count: 1
      }])
    } else {
      cart[idx].count++
      setCart([...cart])
    }

  }

  const subCart = (id) => {
    const idx = cart.findIndex((item) =>
      item.id === id
    );
    if (cart[idx].count > 1) {
      cart[idx].count--
      setCart([...cart])
    } else {
      setCart(cart.filter((item) => {
        return item.id !== id
      }))
    }
  }


  return (
    <div className="cart">
      <div className='container'>
        <h2>Корзина</h2>
        {cart.length === 0 ? <><h2>Вы ничего не выбрали!</h2></> :
          <>
            <table className='cart__table'>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Количество</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => {
                  return (
                    <tr>
                      <td>{item.title}</td>
                      <td className='cart__td'>
                        {item.count}
                        <div className="cart__td_btns">
                          <button className="cart__td_btns-btn" onClick={() => {
                            subCart(item.id)
                          }}>➖</button>
                          <button className="cart__td_btns-btn" onClick={() => {
                            byCart(item)
                          }}>➕</button>
                        </div>


                      </td>
                      <td>{item.price * item.count} $</td>
                      <td>
                        <img className='cart__table_img' src={bin} alt="icon" onClick={() => {
                          deleteCart(idx)
                        }} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <p>Итог: {cart.reduce((acc, rec) =>
              acc + rec.price * rec.count, 0
            )} $</p>
          </>
        }

      </div>
    </div>

  )
}

export default Cart
