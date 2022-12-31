import React, {useState, useEffect, useContext} from 'react'
import { NavLink, useHistory } from "react-router-dom";
import Stripe from "react-stripe-checkout";

import { UserContext } from "../App"

const Mycart = () => {

    const {state, dispatch} = useContext(UserContext)

    const [cartUser, setCartUser] = useState([]);
    const [items, setItems] = useState([]);
    let itemsPrice;


    const getCartData = async () =>{
        try {
            const res = await fetch ('/getCartData', {
                method: 'GET',
            });

            const data = await res.json();
            setCartUser(data.userById)
            setItems(data.cartItems)
          

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCartData();
    }, [])
    
    items.map(items =>{
        itemsPrice = items.price;
    })

    const handlePayMethod = (itemsPrice, token) =>{    
        return fetch("/stripePay", {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    token: token.id, 
                    amount: itemsPrice
                })
            })
         
    }

    const tokenHandler = (token) =>{
        handlePayMethod(itemsPrice, token)
        updateDataBase();
    }

    const updateDataBase = () =>{
        return fetch("/updateDataBase", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                items
            })
        })
    }



    
    const Loginbutton= () =>{
        
        if(state){
            return <div> 
                <button ><NavLink className="btn" to="/signout">logout</NavLink></button>      
            </div>
        }
        else{
            return <div>  
                    <button ><NavLink className="btn" to="/signin">login</NavLink></button>
                    
                </div>
        }
    }

    let cartitemid
    const deleteItem = (e) =>{
        cartitemid = e.target.id;
        return fetch("/deleteitemfromcart", {
          method: "POST",
          headers:{
              "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            cartitemid
          })
      })
      }


    return (
        <>
            <header className="header">
                <div id="menu-btn" className="fas fa-bars"></div>
                <NavLink className="logo" to="/"> <span>Bike</span>Book </NavLink>

                <nav className="navbar">
                <NavLink  to="/">Home</NavLink>
                <NavLink to="/rentbike">Rent Bikes</NavLink>
                </nav>

                <div id="login-btn">
                     <Loginbutton />
                </div>
            </header>

            <div className='salecartMaindiv'>
            <div style={{
                marginTop: "150px",
                  
                }}>
            {items.map((items) => 
                    <div className = "salecartLidiv"  key={items._id} >
                            <ul>
                                <li style={{wordSpacing: "10px"}}>Brand: {items.brand} --- Model: {items.model} --- Quantity: {items.quantity} --- Price: {items.price}Taka <button id={items._id} onClick={deleteItem} className="btn"><i className="fa fa-trash"></i></button></li>
                            </ul> 
                        </div>
                     
            )}
                        <div style={{padding: "30px",  textAlign:"center"}}>
                            <h2>Pay Through Credit / Debit Biked</h2><br/>
                            <Stripe 
                                stripeKey = "pk_test_51Jyb5UBvc4Qazj8jy6qimLop4epxe5jziUD3ixj5ISycjjD6yYVGZhk688Pz9Lna32VTHbSHxRwkrvNNnnnr96P000M68u5jcd"
                                token = {tokenHandler}
                            />
                        </div>               
            </div>

            </div>
        </>
    )
}

export default Mycart
