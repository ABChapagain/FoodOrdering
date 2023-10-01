import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from '../context/cart.js';
import { toast } from 'react-toastify'

import '../styles/CategoryProductStyles.css'
import axios from "axios";
const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (params?.slug) getPrductsByCat();
    }, [params?.slug]);
    const getPrductsByCat = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/product-category/${params.slug}`
            );
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout>
            <div className="container mt-3 category">
                <h4 className="text-center">Category - {category?.name}</h4>
                <h6 className="text-center">{products?.length} result found </h6>
                <div className="row">
                    <div className="col-md-9 offset-1">
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
                                <div
                                    className="card m-2"
                                    style={{ width: "25rem" }}
                                    key={p._id}
                                >
                                    <img
                                        src={`${process.env.REACT_APP_API}/product-photo/${p._id}`}
                                        className="card-img-top "
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">
                                            {p.description.substring(0, 30)}...
                                        </p>
                                        <p className="card-text"> Rs {p.price}</p>
                                        <button
                                            className="btn btn-primary ms-1"
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            More Details
                                        </button>
                                        <button className="btn btn-secondary ms-1 mt-2" onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, p])
                                            );
                                            toast.success("Item Added to cart");
                                        }}>
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct