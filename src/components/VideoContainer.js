import React, { useEffect, useState } from 'react'
import Videos from './Videos'
import { YOUTUBE_URL } from '../utils/Constants';
import { Link } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';


const VideoContainer = () => {
const [getVideo ,setGetVideo]=useState([]);
  useEffect(()=>{
    fetchData();
  },[]);
  const fetchData=async ()=>{
    const data =await fetch(YOUTUBE_URL);
    const json=await data.json();
    //console.log(json);
    setGetVideo(json.items);
  }
  return (
    <div className='flex flex-col'>
    <div className='flex flex-wrap'>
      {
        getVideo.map((eachItem)=>
          <Link key={eachItem.id} to={"/watch?v=" + eachItem.id}><Videos  info={eachItem}/></Link>
        )
      }
    </div>
  
    </div>
  )
}

export default VideoContainer