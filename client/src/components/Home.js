import React, {useState, useEffect, useContext} from 'react'
import { NavLink } from "react-router-dom";

import { UserContext } from "../App"

const Home = () => {
    const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});
    

    
    const {state, dispatch} = useContext(UserContext)

    

    const userContact = async () =>{
        try {
            const res = await fetch ('/getdata', {
                method: 'GET',
                headers:{
                    "Content-Type" : "application/json"
                },
            });

            const data = await res.json();
            
            setUserData({...userData, name:data.name, email:data.email, phone:data.phone});


            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
       userContact();
    }, [])

    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value });
    }

    const sendMessage = async (e) =>{
        e.preventDefault();

        const {name, email, phone, message}= userData;

        const res = await fetch('/contact',{
            method:'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();

        if(!data){
            console.log("message not sent");
        }
        else{
            alert("Message send")
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

            <NavLink className="logo" to="/"> Bike<span>Book</span></NavLink>
        
            

            <nav className="navbar">
                <NavLink  to="/">Home</NavLink>
                <NavLink  to="/rentbike">Rent Bikes</NavLink>
                <a href="#services">Testimonial</a>
                <a href="#contact">Contact</a>
            </nav>
            <div id="login-btn">
                    <Loginbutton />
            </div>

        </header> 


        

<section className="home" id="home">

<h3 data-speed="-2" className="home-parallax">Rent a Bike</h3>

<img data-speed="5" className="home-parallax" src="/image/home.png" alt=""/>

<NavLink className="btn" to="/exploreRentBikes">Bike Showcase</NavLink>

</section>

<section className="icons-container">

<div className="icons">
    <i className="fas fa-home"></i>
    <div className="content">
        <h3>150+</h3>
        <p>branches</p>
    </div>
</div>

<div className="icons">
  <i class="fa-sharp fa-solid fa-person-biking"></i>
    <div className="content">
        <h3>4770+</h3>
        <p>Bikes Rented</p>
    </div>
</div>

<div className="icons">
    <i className="fas fa-users"></i>
    <div className="content">
        <h3>320+</h3>
        <p>happy clients</p>
    </div>
</div>

<div className="icons">
<i class="fa-sharp fa-solid fa-motorcycle"></i>
    <div className="content">
        <h3>1500+</h3>
        <p>Available Bikes</p>
    </div>
</div>

</section>

<section className="services" id="services">

<h1 className="heading"> Our Customers <span>Thoughts</span> </h1>

<div className="box-container">

    <div className="box">
        <div className="rev-img">
            <img src="https://scontent.fdac136-1.fna.fbcdn.net/v/t39.30808-6/312703748_3478501779085230_1950780946585482384_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeGkwHPUk95MDAfygYTyGWU7X3HO7w5t9apfcc7vDm31qpmla904Bn5UkCZ7ObAXeE6s97HwrxX59lb7HBl528sV&_nc_ohc=9c5en2xXM18AX-BdD7P&_nc_ht=scontent.fdac136-1.fna&oh=00_AfAzZsPJ2adgBqspzwz4T8kHfHPcm6E07csvy1wh1YMN-A&oe=63B51CB5" alt="" />
        </div>
        <h3>Sabbir Hossain Abir</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis voluptate repellat eos, expedita culpa laboriosam vel fuga dolore unde quisquam earum explicabo aliquid, ducimus ullam saepe. Tempore, esse est. Possimus.</p>
    </div>

    <div className="box">
    <div className="rev-img">
            <img src="https://scontent.fdac136-1.fna.fbcdn.net/v/t39.30808-6/302145899_156532100373085_2010151763920459654_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHrbcdLZRWuaHsXyYUqG_jpdhVNC4mwOVF2FU0LibA5UT8iradxAwDYoNQF4d_Zqs77lKP1RnqwDQ1gm3jJy1wC&_nc_ohc=4iFR4J4vO6MAX87zxFw&tn=hr3FB-mU0E1Jjxz3&_nc_ht=scontent.fdac136-1.fna&oh=00_AfAZfiNQl5VvdFFbumJkgwpxKH1VD595Nrna4L9g10pnoA&oe=63B40E67" alt="" />
        </div>
        <h3>Zakaria Bin Moti</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi modi quaerat accusantium consectetur eos soluta dolor quas nam quos veniam expedita architecto optio fugit possimus earum reiciendis rem, dicta nemo.</p>
    </div>


    <div className="box">
    <div className="rev-img">
            <img src="https://scontent.fdac136-1.fna.fbcdn.net/v/t39.30808-6/314706916_1532727437148345_5356733734063348288_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeGi-Fe-pxZvDOWFXu32V4tIyyC-tKKPgdHLIL60oo-B0Y4ywceIpFaJENe1ExTPOaLyzEPhnSs8fZXHFPDZJxy-&_nc_ohc=Q8a2pz_MnqoAX9hf_B4&_nc_ht=scontent.fdac136-1.fna&oh=00_AfA5j5ghvAIVLgdwNYNYvmYOqkk_07CFFrWeyXtKF0_w7A&oe=63B41F9C" alt="" />
        </div>
        <h3>Protick Saha</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia amet maiores magni commodi. Voluptatem aut aliquid mollitia sunt iusto sapiente numquam culpa illo recusandae sequi nam sed eaque, accusantium nesciunt!</p>
    </div>

</div>

</section>





<section className="contact" id="contact">

<h1 className="heading"><span>contact</span> us</h1>

<div className="row">

    <form method="POST">
        <h3>get in touch</h3>
        <input type="text" name="name" value={userData.name} onChange={handleInputs} placeholder="your name" className="box"/>
        <input type="email" name="email" value={userData.email} onChange={handleInputs} placeholder="your email" className="box"/>
        <input type="tel" name="phone" value={userData.phone} onChange={handleInputs} placeholder="your phone" className="box"/>
        <textarea placeholder="your message" name="message" value={userData.message} onChange={handleInputs} className="box" cols="30" rows="10"></textarea>
        <input type="submit" value="send message" onClick={sendMessage} className="btn"/>
    </form>

</div>

</section>

<section className="footer" id="footer">

<div className="box-container">

    <div className="box">
        <h3>our branches</h3>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Mirpur </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Farmgate </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Badda </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Aftabnagar </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Uttara </a>
    </div>

    <div className="box">
        <h3>quick links</h3>
        <a href="#"> <i className="fas fa-arrow-right"></i> home </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> vehicles </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> services </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> featured </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> reviews </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> contact </a>
    </div>

    <div className="box">
        <h3>contact info</h3>
        <a href="#"> <i className="fas fa-phone"></i> +123-456-7890 </a>
        <a href="#"> <i className="fas fa-phone"></i> +111-222-3333 </a>
        <a href="#"> <i className="fas fa-envelope"></i> bikebook@gmail.com </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Aftabnagar, Badda, Dhaka </a>
    </div>

    <div className="box">
        <h3>contact info</h3>
        <a href="#"> <i className="fab fa-facebook-f"></i> facebook </a>
        <a href="#"> <i className="fab fa-twitter"></i> twitter </a>
        <a href="#"> <i className="fab fa-instagram"></i> instagram </a>
        <a href="#"> <i className="fab fa-linkedin"></i> linkedin </a>
        <a href="#"> <i className="fab fa-pinterest"></i> pinterest </a>
    </div>

</div>

<div className="credit"> Made with ❤️ | All rights reserved </div>

</section>





        </>
    )
    
}



export default Home
