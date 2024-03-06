import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_URL } from '../utils/Constants';
import store from '../utils/store';
import { cacheResults } from '../utils/searchSlice';

const Header = () => {
  
  //state variable for getting serach query;

  const [searchQuery, setSearchQuery]=useState("");
  //console.log(searchQuery);
  const [suggestionsBox,setSuggestionsBox]=useState([]);// for showing suggestion box

  const [showSuggestions,setShowSuggestions]=useState(false);
  
  const cacheResult=useSelector((store)=>store.search)

    //for serach suuggestions making api call

    useEffect(()=>{
       const timer=setTimeout(() =>{
         
   //reading from store cache
         if(cacheResult[searchQuery]){
          setSuggestionsBox(cacheResult[searchQuery])
         }else{
          searchSuggestions();
         }
        } , 200)

       

       return ()=>{
        clearTimeout(timer)
       };
    }, [searchQuery]);
    
    const searchSuggestions= async ()=>{
          //console.log(YOUTUBE_SEARCH_URL)
      const data=await fetch(YOUTUBE_SEARCH_URL+searchQuery);
      const json=await data.json();
     // console.log(json[1]);
      setSuggestionsBox(json[1]);

 //update cahce
      dispatch(
        cacheResults({
          [searchQuery]:json[1],
        })
      )

}
const dispatch=useDispatch();


const handlerClickMenu=()=>{
  dispatch(toggleMenu());
}



  return (
    <div className='grid grid-flow-col p-2 shadow-md'>
        <div className='flex col-span-1'>
        <img alt="HumbergerMenu" 
        onClick={()=>handlerClickMenu()}
        src="https://s3.amazonaws.com/www-inside-design/uploads/2019/03/hamburgerheader-810x810.jpg"
        className='w-11 mx-3 cursor-pointer'/>

        <img alt="youtubeImage" 
        src="https://1000logos.net/wp-content/uploads/2017/05/Youtube-logo.jpg"
        className='w-14 ml-2'/>
        </div>
        <div className='col-span-10 px-10 ml-8'>
        <div>
        <input type="text" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)}
        onFocus={()=>setShowSuggestions(true)}
        onBlur={()=>setShowSuggestions(false)}

        className='w-1/2 border border-gray-500 rounded-l-full p-2' />
        <button
        className='border border-gray-500 rounded-r-full p-2 font-black '>Search</button>
    
        </div>
        {showSuggestions && (
          <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestionsBox.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
        <div className='col-span-1'>
            <img 
            alt="userIcon" 
            src="https://openclipart.org/image/800px/247319" 
            className='w-10'/>
        </div>
  

        
    </div>
  )
}

export default Header