import React, {useState, useEffect, useContext} from 'react'
import {NavLink} from "react-router-dom";

import { AdminContext } from "../../App"

const Rentbikereports = () => {

  const {adminState, dispatchadmin} = useContext(AdminContext)

  const [income, setIncome] = useState([]);
  let allsoldItems = [];

  const getrentbikeincome = async () =>{
      try {
          const res = await fetch ('/getrentbikeincome', {
              method: 'GET',
          });

          const data = await res.json();
          
          setIncome(data);

      }
      catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
    getrentbikeincome();
  }, [])

  income.map(income=>{
    income.soldItems.map(soldItems=>{
      allsoldItems.push(soldItems)
    })
      
  })


  const Loginbutton= () =>{
        
    if(adminState){
        return <div> 
            <button className="logoutbtnDash"><NavLink className="nav-link" to="/adminsignout">logout</NavLink></button>      
        </div>
    }
    else{
        return <div>  
                <button className="logoutbtnDash"><NavLink  className="nav-link" to="/signin">login</NavLink></button>
                
            </div>
    }
  }


    return (
        <>
            

            
            <div className="sidebar">
    <div className="logo-details">
      <i className=''></i>
      <span className='logo_name1'>Bike</span><span className="logo_name">Book</span>
    </div>
      <ul className="nav-links">
        <li>
            <NavLink className="dashlinks" to="/dashboard">
            <i className='bx bx-grid-alt' ></i>
            <span className="allLinks_name">Dashboard</span>
            </NavLink>
        </li>
        <li>
            <NavLink className="dashlinks" to="/addbikes">
            <i class="fa-sharp fa-solid fa-square-plus"></i>
            <span className="allLinks_name">Add Bikes</span>
            </NavLink>
        </li>
        <li>
            <NavLink className="dashlinks" to="/getrentbikesforadmin">
            <i class="fa-sharp fa-solid fa-motorcycle"></i>
            <span className="allLinks_name">Available Rent Bikes</span>
            </NavLink>
        </li>
        <li>
            <NavLink className="dashlinks" to="/rentbikesreports">
            <i class="fa-solid fa-sack-dollar"></i>
            <span className="allLinks_name">Rent Bikes Income</span>
            </NavLink>
        </li>
        <li>
          <NavLink className="dashlinks" to="/availableusers">
          <i class="fa-solid fa-users"></i>
            <span className="allLinks_name">Available Users</span>
          </NavLink>
        </li>
      </ul>

      <div className="logoutbtnDashDiv">
        <Loginbutton/>
      </div>
  </div>



  <section className="home-section">
    <nav>
      <div className="sidebar-button">
        <span className="dashboard">Dashboard</span>
      </div>
      
      <div className="profile-details">
        <span className="admin_name">Admin</span>
      </div>
    </nav>



    
    <div className = "salecartableDiv">

            <h1 className="heading"><span>Rented Bikes Income Report</span></h1>

            <table className = "salecartable">
                  <thead>
                    <tr>
                      <th >BRAND </th>
                      <th >MODEL </th>
                      <th >RETAIL </th>
                      <th >BOOKED HOURS </th>
                      <th >INCOME </th>
                    </tr>
                    </thead>
            
        

        {allsoldItems.map((allsoldItems) => 
            <tbody key={allsoldItems._id} >
                <tr>
                  <td >{allsoldItems.brand}</td>
                  <td >{allsoldItems.model}</td>
                  <td >{allsoldItems.retailPricePerItem} Taka</td>
                  <td >{allsoldItems.bookedHours}</td>
                  <td >{allsoldItems.totalIncome} Taka</td>
                </tr> 
            </tbody>
         
        )}
        </table>
        </div>
    </section>
        </>
    )
}

export default Rentbikereports
