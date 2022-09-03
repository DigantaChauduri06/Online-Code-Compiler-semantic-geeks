import React,{useState} from "react";
import "./Navbar.css";
import plus from "../../assets/images/Newlogo.ico";
import logo from "../../assets/images/logo.png";
import { Icon } from 'react-icons-kit'
import {menu} from 'react-icons-kit/feather/menu'
import {x} from 'react-icons-kit/feather/x'

export const Navbar = () => {
  const[toggle, setToogle]=useState(false);
  const handleToogle=() => {
    setToogle(!toggle);
  }
  return (
   <div className={toggle?'navbar expanded':'navbar flex'} >
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

        <div className="p-right">
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
                <option value="">Javascript</option>
              </select>

          <button className="login" >
            Login
          </button>
      </div>
      </div>
      <div className="toggle-icon" onClick={handleToogle}>
        {toggle?<Icon icon={x} size={28}/>:<Icon icon={menu} size = {28}/>}
      </div>
   </div>
  );
}

export default Navbar;
