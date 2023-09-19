import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './main.scss'

function Main({ categories, setCategories, cart, setCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios('https://fakestoreapi.com/products')
            .then(({ data }) => {
                setProducts(data)
            })
    }, [])

    useEffect(() => {
        axios('https://fakestoreapi.com/products/categories')
            .then(({ data }) => {
                setCategories(data)
            })
    }, [])



    const deleteProduct = (id) => {
        setProducts(products.filter((item, idx) => {
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
            <div className="main">
                <div className="container">
                    <section className="main__section">
                        <ul className='main__section_ul'>
                            {categories.map((item, idx) => {
                                return (
                                    <button className='main__section_ul-btn btn ctgr__card_btn' key={idx}>
                                        <Link className='main__section_ul-link' to={`/categories/${item}`}>{item}</Link>
                                    </button>
                                )
                            })}
                        </ul>
                        <div class="row main__row">
                            {products.map((item, idx) => {
                                return (
                                    <div class="col s11 m4" key={idx}>
                                        <div class="card main__row_card">
                                            <div class="card-image main__row_card-img">
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className="card-content main__row_card-info">
                                                <span className="card-title main__card_info-title">
                                                    {item.title.length > 15 ? `${item.title.substr(0, 17)}...` : item.title}
                                                </span>
                                                <p main__card_info-price>Цена: {item.price}$</p>
                                                <div className="det">
                                                    <Link to={`/detailed/${item.id}`}>Подробное</Link>
                                                </div>

                                            </div>
                                            <div class="card-action main__card_info-btn">
                                                <button className='btn card_btn' onClick={() => {
                                                    byCart(item)
                                                }}>Купить</button>
                                                <button className='btn card_btn' onClick={() =>
                                                    deleteProduct(idx)
                                                }>Удалить</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Main
