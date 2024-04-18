import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {Dropdown} from 'react-bootstrap'

// import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import '../index.css';

import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../actions/userActions';
import axios from 'axios';
import { remote_config } from '../config/remoteURL';


const Header = () => {

    const navigate = useNavigate();

    const [searchKeyword, setSearchKeyword] = useState("")
    const [suggestionList, setSuggestionList] = useState([]);

    const userLogin = useSelector(state => state.userLogin)

    const {userInfo} = userLogin

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout)
    }

    const keywordHandler = async(event) => {
        const suggestionSet = new Set();
        setSearchKeyword(event.target.value)
        if(event.target.value.length > 1){
            const {data} = await axios.get(`${remote_config.BACKEND_URL}/api/products?keyword=${event.target.value}&price=`);
            suggestionSet.add(data)
             setSuggestionList((item) => [...suggestionSet])
            console.log(suggestionList[0])
        }else setSuggestionList([])
       

    }

    const searchHandler = (e) => {
        e.preventDefault()
        navigate(`/search?q=${searchKeyword}`)
    }

    const isAdmin = useSelector(state => state.userLogin?.userInfo?.isAdmin);



    return (
        <nav>
            <div className='logo'>
                <Link to='/' style={{color:"white"}}>ShopNow</Link> 
            </div>

            {
                !isAdmin &&  
                <div className='nav-form'>
                    <form  method='GET' style={{display: 'flex'}}>
                        <input value={searchKeyword} onChange={keywordHandler}   type="text" id="input-search"  placeholder="Search..."/>
                        <button onClick={searchHandler} style={{color: "black", outline:"none", border:"none", padding:"0 10px"}}><i className='fas fa-search'></i></button>
                    </form>
                </div>
            }
           
            <div className='navlink'>
                <Link to='/cart'> <i className='fas fa-shopping-cart'></i> <span>Cart {cartItems.length}</span></Link>
                {
                    userInfo 
                   ? <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-basic" className='dr-btn'>
                        {userInfo.name.split(' ')[0]}
                        </Dropdown.Toggle>
        
                        <Dropdown.Menu>
                            <Dropdown.Item class><Link to='/profile'> Profile  </Link></Dropdown.Item>
                            <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    : <Link to='/login'>
                            <i className='fas fa-user-alt'></i> 
                            <span>Login</span>
                       </Link>
                }
                {userInfo?.isAdmin? "" : ""}

                
            </div> 

         
           
        </nav>
    );
}

export default Header;
