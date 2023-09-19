import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './categories.scss'
import '../Main/main.scss'

function Categories({ cart, setCart}) {
    const link = useParams();
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios(`https://fakestoreapi.com/products/category/${link.name}`)
            .then(({ data }) => { setCategories(data) })
    }, [])

    const deleteProduct = (id) => {
        setCategories(categories.filter((item, idx) => {
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

    return (
        <>
            <div className="container">
                <div className="category">
                    {/* <ul className='main__section_ul'>
                        {categories.map((item, idx) => {
                            return (
                                <button className='main__section_ul-btn btn' key={idx}>
                                    <Link className='main__section_ul-link' to={`/categories/${item}`}>{item}</Link>
                                </button>
                            )
                        })}
                    </ul> */}
                </div>

                <div class="row main__row">

                    {categories.length > 0 ?
                        categories.map((item, idx) => {
                            return (
                                <div className="col s11 m3" key={idx}>
                                    <div className="card main__row_card">
                                        <div className="card-image main__row_card-img">
                                            <img src={item.image} alt="" />
                                        </div>
                                        <div className="card-content main__row_card-info">
                                            <span className="card-title main__card_info-title">
                                                {item.title.length > 15 ? `${item.title.substr(0, 17)}...` : item.title}
                                            </span>
                                            <p className='main__card_info-price'>Цена: {item.price}$</p>
                                            <Link to={`/detailed/${item.id}`}>Подробное</Link>
                                        </div>
                                        <div class="card-action main__card_info-btn">
                                            <button className='btn' onClick={() => {
                                                byCart(item)
                                            }}>Купить</button>
                                            <button className='btn' onClick={() =>
                                                deleteProduct(idx)
                                            }>Удалить</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : ""}

                </div>
            </div>

        </>
    )
}

export default Categories
