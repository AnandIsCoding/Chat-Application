import React, { useState } from 'react';
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { IoAddSharp } from "react-icons/io5";
import Notification from './Notification.';
import Creategroup from './Creategroup';
import {useNavigate} from 'react-router-dom'
import { userExists, userNotExists } from "../redux/reducers/auth";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
const backendServer = import.meta.env.VITE_BASE_URL;
function Navbar() {
  const dispatch = useDispatch()
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [showNotification, setShownotification] = useState(false)
  const [showCreategroup, setShowcreategroup] = useState(false)
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('');

  const handleLogout = async () => {
    try {
      const response = await axios.delete(`${backendServer}/api/v1/users/logout`, { withCredentials: true });
  
      if (response.data.success) {
        toast.success('User logged out successfully');
        dispatch(userNotExists());  // Reset the user state in Redux store
      } else {
        toast.error('Error during logout');
      }
    } catch (error) {
      // Handle cases where the response is undefined or missing
      if (error.response) {
        toast.error(error.response.data.message || 'An error occurred during logout');
      } else {
        toast.error('Logout failed. Please try again.');
      }
  
      console.error('Logout error:', error); // Log error for debugging
    }
  };
  
  const handlesearchbar = () =>{
    setShowSearchbar((prev) => !prev)
    setShowcreategroup(false)
    setShownotification(false)
  }
  const handlecreategroup = () =>{
    setShowcreategroup(prev => !prev)
    setShowSearchbar(false)
    setShownotification(false)
  }
  const handleshownotification = () =>{
    setShownotification(prev => !prev)
    setShowSearchbar(false)
    setShowcreategroup(false)
  }


  const handlePromptSubmit = (event) => {
    event.preventDefault();
    console.log(prompt);
  };

  return (
    <div className="w-full bg-[#202C33]  h-[10vh] px-2 md:px-4 py-4 flex justify-between">
    <img onClick={()=>navigate('/')} src='https://cdn3d.iconscout.com/3d/premium/thumb/chat-3d-icon-download-in-png-blend-fbx-gltf-file-formats--messenger-logo-box-bubble-speech-chatting-app-communication-and-information-pack-network-icons-7845465.png?f=webp' alt='logo' className='cursor-pointer w-[15vw] h-[15vw] md:w-[4vw] md:h-[4vw] rounded-full absolute left-32 md:left-44 top-3 md:top-1' />
      <h1 onClick={() => navigate('/')} className="block cursor-pointer text-2xl mt-2 md:mt-0 md:text-3xl font-semibold text-green-400 md:font-bold">
        Happy-Chat
      </h1>
      <div className=" md:flex items-center  text-white pt-3 md:pt-0">
        <button onClick={handlesearchbar} aria-label="Search">
          <IoMdSearch size={26}  />
        </button>
        <button onClick={handlecreategroup} aria-label="Create Group">
          <IoAddSharp size={26} className="font-bold ml-1   md:ml-4 md:mr-4" />
        </button>
        <button  onClick={()=>navigate('/groups')} aria-label="Groups">
          <BsPeopleFill size={26} className="font-bold ml-1 mdLml-4 md:mr-2"/>
        </button>
        <button className="text-[red]" onClick={ handleshownotification } aria-label="Notifications">
          <FaBell size={26} className="font-bold ml-2 md:ml-4" />
        </button>
        <button onClick={handleLogout} aria-label="Logout">
          <AiOutlineLogout size={26} className="font-bold ml-2 md:ml-4"/>
        </button>
      </div>

      {showSearchbar && (
        <div className="absolute border-2 shadow-2xl shadow-[black] border-black top-[20%] md:top-[40%] z-[999] right-0 left-0 w-[95%] py-6 md:py-2 bg-white rounded-xl duration-[1s] search md:w-[55%] mx-auto  flex flex-col px-4">
          <form onSubmit={handlePromptSubmit} className='flex flex-col relative '>
            <div onClick={()=> setShowSearchbar(prev => !prev)} className=' cursor-pointer absolute right-1 top-0 w-[15vw] md:w-[3vw] h-[14px] md:h-[10px] rounded-full bg-black'></div>
            <label className="text-lg font-semibold mb-2 md:mb-0 " htmlFor="prompt">
              Find People
            </label>
            <input
              onChange={(event) => setPrompt(event.target.value)}
              type="text"
              name="prompt"
              id="prompt"
              value={prompt}
              className="h-full px-2 py-2 outline-none bg-transparent border-2 border-black rounded-xl text-black"
            />
            <button
              type="submit"
              className="py-1 bg-violet-400 text-lg font-bold mt-3 md:mt-4 rounded-xl text-white"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {
        showNotification && <Notification setShownotification={setShownotification} />
      }

      {
        showCreategroup ? <Creategroup setShowcreategroup={setShowcreategroup} /> : null
      }

    </div>
  );
}

export default Navbar;
