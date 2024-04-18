import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';


const Product = ({ product, isLoading }) => {

    const dispatch = useDispatch();

    const [btnText, setBtnText] = useState("Add to cart");
    const [imageInView, setImageInView] = useState(false);
    const imageRef = useRef(null);

    const addToCartHandler = () => {
        if (product.countInStock > 0) {
            dispatch(addToCart(product._id, 1));
            toast.success(`${product.name} added to your cart`);
            setBtnText("Go to cart");
        } else {
            toast.warn('Out of Stock');
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setImageInView(true);
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.1, // Adjust the threshold as needed
            }
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, []);

    // const [added, setAdded] = useState(false)

    return (
        <div className="cards" id={product.countInStock === 0 ? 'out-of-stock-card' : ''} style={{width: "20%"}}>
            {/* <div style={{position: "absolute", right: 10, top: 10, fontSize: 16}}>
                    <i class={added ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={{color: "red"}} onClick={() =>setAdded((prev) => !prev) }></i>
            </div> */}
            {product.countInStock === 0 ? <div className="out-of-stock">out of stock</div> : ''}
            <Link to={`/product/${product._id}?category=${product.category}`}>
                <div className="card-image" ref={imageRef}>
                    {imageInView && <img src={product.image} alt="" loading="lazy" />}
                </div>
            </Link>

            <div className="card-title">
                <p>
                    {product.name}
                </p>
            </div>

            <div className="card-price">
                ${product.price}
            </div>

            <button className="product-card-btn" onClick={addToCartHandler}>{btnText}</button>
        </div>
    )
}

export default Product;
