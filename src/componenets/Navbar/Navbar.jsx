import React from "react";
import "./Navbar.css";
import plus from "../../assets/images/Newlogo.ico";
import logo from "../../assets/images/logo.png";

function Navbar() {
  return (
   <div className="navbar flex" >


      <div className="left flex">
      <div className='logo'>
        <span className='icon'>
        <ion-icon name="play-outline"></ion-icon>
        </span>
        OnlineIDE
      </div>
        {/* <div className="searchbar">
          <input className="search" type="text" /><span>Save</span>
        </div> */}
        
      </div>

      <span className='menu'>
        <ion-icon name="menu"></ion-icon>
        </span>
      <div className="right flex">
      <button className="newbtn" >New</button>
            <select name="" id="" className="size">
              <option value="">SMALL</option>
              <option value="">MEDIUM</option>
              <option value="">LARGE</option>
            </select>

              <select name="" id="" className="language">
                <option value="">C</option>
                <option value="">C++</option>
                <option value="">Java</option>
                <option value="">Python</option>
              </select>

          <button className="login" >
            Login
          </button>
      </div>

   </div>
  );
}

export default Navbar;
