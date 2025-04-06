// Songs.jsx
import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPlay,FaStop } from "react-icons/fa";


const Songs = () => {
  const location = useLocation();
  const album = location.state?.album;
 
  const audioRef = useRef(null);

  const play = (url) => {
    // Stop currently playing audio (if any)
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Create new audio instance and play
    const audio = new Audio(url);
    audio.play();
    audioRef.current = audio;
  };
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // reset to start
      audioRef.current = null;
    }
  };



  return (
    <div>
    <div className='full-album'>
    

     
        <div className='album-details'>

     
      {/* <h1 className='mtitle'>{album?.albumtitle }</h1> */}
      
      <img src={album?.Thumbnail} alt={album?.albumtitle} className='minnale2' />
 
      <div className='side-album'>

      <div className='album-title'>

        {album?.albumtitle}
      </div>
      <div  className='album-dis'>
        Album Description:
        {album?.albumscription}
      </div>
      <div className='album-lang'>
        Albuml anguage: 
        {album?.albumlang}

      </div>
      <div className='album-dis'> 
      Starcast:
        {album?.albumstarcast}

      </div>
      <div className='album-dis'> 
        Director:
        {album?.director}
      </div>
      <div className='album-dis'>
        NO of Songs:
        {album?.songscount}
      </div>
      </div>
      </div >
      </div>
      

      {/* If album contains songs list, render it */}
      {album?.songs?.map((song, index) => (
        <div key={index}>
          <div className='song-details'>
          <p className='mtilte'>{song.songtitle}</p>
          <p>
            <img src={song.songthumbnail} alt="" className='song-cover'/>
          </p>
          <p className='mtilte'>
            {
              song.songsingers
            }
          </p>
          <p className='mtilte'> {song.songdirector}</p>
          
        
          
          <FaPlay onClick={()=> play(song.url)} />
          <FaStop onClick={handleStop}
          title='stop'/>
          

          
          </div>
          <div>

          </div>
          
        </div>
      ))}
    </div>
  );
};

export default Songs;