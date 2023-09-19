import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import './detailed.scss'
import closeIcon from './close.png'

function Detailed({cart, setCart}) {
    const reference = useParams()
    const [detailed, setDetailed] = useState([]);


    useEffect(() => {
        axios(`https://fakestoreapi.com/products/${reference.id}`)
            .then(({ data }) => {
                setDetailed(data)
            })
    }, [])

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

    return (
        <>
            <div className="detailed">
                <div className="container">
                    <div className="detailed__row">
                    <Link to='/'>
                        <img className="detailed__row_close" src={closeIcon} alt="" />
                    </Link> 
                        <div className="detailed__row_card">
                            <img className='detailed__row_card-img' src={detailed.image} alt="" />
                            <div className="detailed__row_card-texts">
                                <h4 className='detailed__row_card-title'>{detailed.title}</h4>
                                <p className='detailed__row_card-description'><b> Описание:</b> {detailed.description}</p>
                                <p><b>Котегорие:</b> {detailed.category}</p>
                                <p><b>Цена:</b> {detailed.price}$</p>
                            <button className="detailed__row_btns-btn btn" onClick={()=>{
                                byCart(detailed)
                            }}>Купить</button>

                            </div>
                        </div>
                        <hr />
                        {/* <div className="detailed__row_btns">
                            <button className="detailed__row_btns-btn btn" >Купить</button>
                            <button className="detailed__row_btns-btn btn">Удалить</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detailed
