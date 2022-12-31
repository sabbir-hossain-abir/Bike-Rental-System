import React, {useState, useEffect, useContext} from 'react'
import { NavLink, useLocation, useHistory } from "react-router-dom";

import { UserContext } from "../App"

const Rentbikereviews = () => {

    const {state, dispatch} = useContext(UserContext)

    let location = useLocation();
    const selectedBikeId = location.state
    const [userData, setUserData] = useState({id:"", name:"", email:"", message:""});
    const [renttbikesData, setrenttbikesData] = useState({
        id: "",
        brand : "",
        model : "",
        year : "",
        color : "",
        seats : "",
        rent : "",
        fileName : "",
        filePath : "",
        fileType : "",
        fileSize : ""
    });
    const [allrenttbikeReviews, setAllrenttbikeReviews] = useState([]);

    const sendId = async () =>{
        try {
            const res = await fetch("/sendReviewRentBikeId", {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    selectedBikeId
                })
            })

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        sendId();
    }, [])

    const reviewBikeData = async () =>{
        try {
            const res = await fetch ('/getRentBikeReviews', {
                method: 'GET',
            });

            const data = await res.json();
            setrenttbikesData({
            id : data.findBike._id,
            brand : data.findBike.brand,
            model : data.findBike.model,
            year : data.findBike.year,
            color : data.findBike.color,
            seats : data.findBike.seats,
            rent : data.findBike.rent,
            fileName : data.findBike.fileName,
            filePath : data.findBike.filePath,
            fileType : data.findBike.fileType,
            fileSize : data.findBike.fileSize
            })
            
            setUserData({...userData, id:data.findUser._id, name:data.findUser.name, email:data.findUser.email})

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        reviewBikeData();
    }, [])



    const getallreviews = async () =>{
        try {
            const res = await fetch ('/getallreviewsforselectedrentbike', {
                method: 'GET',
            });

            const data = await res.json();

            setAllrenttbikeReviews(data.allReviews);

        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getallreviews();
    }, [])



    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value });
    }



     
    const submitReviews = async (e) =>{
        e.preventDefault();

        const {id, name, email, message}= userData;

        const res = await fetch('/postrentbikereviews',{
            method:'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                id, name, email, message, selectedBikeId
            })
        });

        const data = await res.json();


        if(data.status === 500 || !data){
            window.alert("reviews not submited");
            console.log("reviews not submited");
        }
        else if(data.status===201){
            window.alert("reviews submited");
            setUserData({...userData, message:""});
        }
        else{
            window.alert("reviews submited");
            setUserData({...userData, message:""});
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


    return (
        <>
            <header className="header">
                <div id="menu-btn" className="fas fa-bars"></div>
                <NavLink className="logo" to="/"> <span>Bike</span>Book </NavLink>
                <nav className="navbar">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/rentbike">Rent Bikes</NavLink>
                </nav>
                <div id="login-btn">
                <Loginbutton />
                </div>
            </header>
            

            
            <div className = "reviewsdiv">    

                <img src={renttbikesData.filePath} alt="" style={{width: "80%", height: "70%"}}/>
                <h4><b>{renttbikesData.brand}</b></h4>
                <p>Model : {renttbikesData.model}</p>
                <p>Year : {renttbikesData.year}</p>
                <p>Color : {renttbikesData.color}</p>
                <p>Seats : {renttbikesData.seats}</p>
                <p>Rent : {renttbikesData.rent}</p>

            </div>
                   
            
        <section className="contact" id="contact">
            <h1 className="heading"><span>Reviews</span></h1>

            {allrenttbikeReviews.map((allrenttbikeReviews) => 
                    <div className = "reviewsli"  key={allrenttbikeReviews._id}>
                            <ul>
                                <li style={{wordSpacing: "10px"}}>{allrenttbikeReviews.name} :- {allrenttbikeReviews.comments}</li>
                            </ul> 
                        </div>
                     
            )}

            <div className="row">
                <form method="POST">
                    <h3>write your reviews</h3>
                    <input type="text" name="name" value={userData.name} onChange={handleInputs} placeholder="your name" className="box"/>
                    <input type="email" name="email" value={userData.email} onChange={handleInputs} placeholder="your email" className="box"/>
                    <textarea placeholder="your reviews" name="message" value={userData.message} onChange={handleInputs} className="box" cols="30" rows="10"></textarea>
                    <input type="submit" value="submit reviews" onClick={submitReviews} className="btn"/>
                </form>

            </div>

        </section>
        </>
    )
}

export default Rentbikereviews
