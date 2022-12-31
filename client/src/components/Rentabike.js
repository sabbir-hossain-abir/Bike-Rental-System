import React, {useState, useEffect, useContext} from 'react'
import { NavLink, useHistory } from "react-router-dom";

import { UserContext } from "../App"

const Rentabike = () => {

    const {state, dispatch} = useContext(UserContext)

    const history = useHistory(); 

    const [rentBikesData, setRentBikesData] = useState([]);

    const allRentBikes = async () =>{
        try {

            if(!state){
                window.alert("Please signin to see all available bikes for rent!")
                history.push('/signin')
            }

            const res = await fetch ('/getRentBikeData', {
                method: 'GET',
            });

            const data = await res.json();
            setRentBikesData(data)
            
           

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        allRentBikes();
    }, [])


    const specsDiv = document.getElementsByClassName("specsDivRentbike");
    const bikeDiv = document.getElementsByClassName("bikedivRentbike");
    const formDiv = document.getElementsByClassName("formDivRentbike");

    const showDetails= (e) =>{
        let currentBike = e.target.id;
            if(specsDiv[currentBike].style.display === "none" && bikeDiv[currentBike].style.display === "block"){
                bikeDiv[currentBike].style.display = "none";
                specsDiv[currentBike].style.display = "block";
            }
            else{
                bikeDiv[currentBike].style.display = "block"
                specsDiv[currentBike].style.display = "none"

            }
    }

    const showBike= (e) =>{
        let currentBike = e.target.id;
            if(specsDiv[currentBike].style.display === "block" && bikeDiv[currentBike].style.display === "none"){
                specsDiv[currentBike].style.display = "none";
                bikeDiv[currentBike].style.display = "block";
            }
            else{
                specsDiv[currentBike].style.display = "block"
                bikeDiv[currentBike].style.display = "none"
            }
    }

    const [rentHours, setRentHours] = useState('')
    const handleInputs = (e) =>{
        let value = e.target.value;
        setRentHours(value);
    }

    const addToCart= (e) =>{
        let currentBike = e.target.id;
        if(formDiv[currentBike].style.display === "none" && specsDiv[currentBike].style.display === "none" && bikeDiv[currentBike].style.display === "block"){
            bikeDiv[currentBike].style.display = "none";
            specsDiv[currentBike].style.display = "none";
            formDiv[currentBike].style.display = "block";
        }
        else{
            formDiv[currentBike].style.display = "none"
            specsDiv[currentBike].style.display = "none"
            bikeDiv[currentBike].style.display = "block"
        }
    }

    const showBikeAgain = (e) =>{
        let currentBike = e.target.id;
        if(formDiv[currentBike].style.display === "block" && specsDiv[currentBike].style.display === "none" && bikeDiv[currentBike].style.display === "none"){
            bikeDiv[currentBike].style.display = "block";
            specsDiv[currentBike].style.display = "none";
            formDiv[currentBike].style.display = "none";
        }
        else{
            formDiv[currentBike].style.display = "block"
            specsDiv[currentBike].style.display = "none"
            bikeDiv[currentBike].style.display = "none"
        }
    }

    const proceedToCart= async (e) =>{
        e.preventDefault();
        let itemId = e.target.id;
       

        const res = await fetch("/addrentcartocart", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                itemId, rentHours
            })
        })
        
        const data = await res.json();

        if(res.status === 500 || !data){
            window.alert("Something went wrong");
        }
        else{
            window.alert("Item added. Please click on Go To cart to complete the purchase");
        }

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



    const [searchText, setSearchText] = useState('');

    const searchTextBtn = async () =>{
        const res = await fetch("/searchRentBike", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                searchText
            })
        })

        getSearchData();
    }



    const getSearchData = async () =>{
        try {
            const res = await fetch ('/rentbikesearchCategory', {
                method: 'GET',
            });

            const data = await res.json();
            
            setRentBikesData(data)                
          
            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        
            <header className="header">
                <div id="menu-btn" className="fas fa-bars"></div>
                <NavLink className="logo" to="/"> <span>Bike</span>Book </NavLink>
                <nav className="navbar">
                <NavLink className="nav-link" to="/">Home</NavLink>
                    
                <NavLink className="nav-link" to="/rentbikecart">Go To Cart</NavLink>
                
                <input type="text" name="name"  placeholder="Search Bike" style={{ width: "30%", height: "8%"}}value={searchText} onChange={(e)=>setSearchText(e.target.value)}className="btn"/>
                <button type="submit" onClick={searchTextBtn} className="btn"><i className="fa fa-search"></i></button>
                </nav>
                <div id="login-btn">
                <Loginbutton />
                </div>

            </header> 

            <div className="rentbikebiked">

                {rentBikesData.map((rentBikesData, index) => 
                    
                        [<div className = "bikedivRentbike"  key={rentBikesData._id}>    

                            <img src={rentBikesData.filePath} alt="" style={{width: "80%", height: "70%"}}/>
                            <h4>{rentBikesData.brand}</h4>
                            <p>{rentBikesData.model}</p>

                            <div style={{display: "flex", gap: "15px"}}>
                            <button className='bikedbtn' id={index}  onClick={showDetails}>Details</button><br/>
                            <button className='bikedbtn' id={index}  onClick={addToCart}>Add To Cart</button><br/>
                            </div>
                        </div>,

                        <div className ="specsDivRentbike" key={new Date}>
                        
                            <p>Brand : {rentBikesData.brand}</p>
                            <p>Model : {rentBikesData.model}</p>
                            <p>Year : {rentBikesData.year}</p>
                            <p>Color : {rentBikesData.color}</p>
                            <p>Seats : {rentBikesData.seats}</p>
                            <p>Rent Per Hour : {rentBikesData.rent}</p>
                            <p style={{color: "red"}}>Availibility : {rentBikesData.availability +" hours"}</p>
                            
                            <div style={{display: "flex", gap: "15px"}}>
                            <button className='bikedbtn' ><NavLink className="nav-link" to={{pathname: '/rentbikereviews', state:{id: rentBikesData._id}}} >Bike Reviews</NavLink></button>
                            <button className='bikedbtn' id = {index} onClick={showBike}>show bike</button>
                            </div>
                        </div>,

                        <div className = "formDivRentbike"  key={index}>

                            <form method="POST" >
                             <h3>Before click on proceed please enter for how many hours do you want to rent the bike</h3><br/>   
                            <label htmlFor="lname">Rent Hours: </label><br/>
                            <input type="text"  className='bikedbtn' name="rentforhours" value={rentHours} onChange={handleInputs} placeholder="Enter rent hours" /><br/>
                            
                            <input type="submit" className='bikedbtn' value="Proceed" id={rentBikesData._id} onClick={proceedToCart}/>
                            </form> 
                            <button className='bikedbtn' id = {index} onClick={showBikeAgain}>show bike</button>    
                            
                        </div>]    
                   
                )}
            </div>


        </>
    )
}

export default Rentabike
