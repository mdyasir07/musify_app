import React, { useState, useContext } from 'react';
import { myGarage } from '../../authcontex/Authucontex';
import "./style.css";
import { addDoc, collection } from 'firebase/firestore';
import { _DB } from '../../Backend/Firebase';
import toast from 'react-hot-toast';

function Createalbum() {
  const { authuser } = useContext(myGarage);
  let [songdetails, setsongdetails] = useState([{
    songtitle: "",
    songsingers: "",
    songdirector: "",
    songthumbnail: "",
    songaudio: ""
  }
  ])
  const { uid, email, photoURL, displayName } = authuser || {};

  const [data, setData] = useState({
    albumtitle: "",
    albumdate: "",
    albumstarcast: "",
    albumscription: "",
    albumlang: "",
    albumtype: "",
    director: "",
    albumthumbnail: "",
    songscount: "",
    songs: []
  });

  let {
    albumtitle,
    albumdate,
    albumstarcast,
    albumscription,
    albumlang,
    albumtype,
    director,
    albumthumbnail,
    songscount,

  } = data
  function handlesong(e, index) {
    let name = e.target.name
    let value = e.target.value
    let newsongdata = [...songdetails]
    newsongdata[index][name] = value
    setsongdetails(newsongdata)
  }
  function handlesongfile(e, index) {
    let file = e.target.files[0]
    let name = e.target.name
    let value = e.target.value
    let newsonfile = [...songdetails]
    newsonfile[index][name] = file
    setsongdetails(newsonfile)
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handlethumbnail = (e) => {
    let file = e.target.files[0]
    setData({ ...data, albumthumbnail: file })
  }


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let albumthumbnailUrl=""
        if (albumthumbnail) {
            let albumdata = new FormData();
            albumdata.append("file", albumthumbnail);
            albumdata.append("upload_preset", "music_musify");
            albumdata.append("cloud_name", "dvtlegtme");

            let albumresponse = await fetch("https://api.cloudinary.com/v1_1/dvtlegtme/image/upload", {
                method: "POST",
                body: albumdata
            });
            const  albumthumbnailresult = await albumresponse.json();
             albumthumbnailUrl = albumthumbnailresult.url;
           
        }

        let songdata=[]

      
        await Promise.all(songdetails.map(async (song, index) => {
          let updatedSong={...song}
            

            let songthumbnailUrl=""
            if (song.songthumbnail) {
                let songthumbnaildata = new FormData();
                songthumbnaildata.append("file", song.songthumbnail);
                songthumbnaildata.append("upload_preset", "music_musify");
                songthumbnaildata.append("cloud_name", "dvtlegtme");

                let songresponse = await fetch("https://api.cloudinary.com/v1_1/dvtlegtme/image/upload", {
                    method: "POST",
                    body: songthumbnaildata
                });

                let songthumbnailresult = await songresponse.json();
                songthumbnailUrl = songthumbnailresult.url;
                // console.log(songthumbnailUrl);
            }

            let songobjectdata={}
            if (song.songaudio) {
              let songaudiodata = new FormData();
              songaudiodata.append("file", song.songaudio);
              songaudiodata.append("upload_preset", "music_musify");
              songaudiodata.append("cloud_name", "dvtlegtme");

              let songaudioresponse = await fetch("https://api.cloudinary.com/v1_1/dvtlegtme/raw/upload", {
                  method: "POST",
                  body: songaudiodata
              });

              let songaudioresult = await songaudioresponse.json();
              updatedSong.songaudio = songaudioresult.url;
              console.log(`Song ${index + 1} Audio URL:, updatedSong.songaudio`);

                 songobjectdata={
                  id:songaudioresult.asset_id,
                  url:songaudioresult.url,
                  duration: (() => {
                    const seconds = Math.floor(songaudioresult.duration);
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = seconds % 60;
                    return `${minutes}:${remainingSeconds
                      .toString()
                      .padStart(2, "0")}`;
                  })(),
                  size: (songaudioresult.bytes / (1024 * 1024)).toFixed(2) +" MB",
             

                };
                console.log(songobjectdata)
            }

            songdata.push(
              {
              ...songobjectdata,
              songtitle:song.songtitle,
              songsingers:song.songsingers,
              songdirector:song.songdirector,
              songthumbnail:songthumbnailUrl

              }
            
            )

            
        }));

        let payload={
          ...data,
          songs: songdata,
          Thumbnail: albumthumbnailUrl || "" 
        }
        delete payload.albumthumbnail; 
        let albumcollection=collection(_DB,"music_musify")
        await addDoc(albumcollection,payload)
        toast.success("album created sucessfully")




        console.log(payload)


        
        console.log("All song uploads completed!");

    } catch (error) {
        console.error("Error during submission:", error);
    }
}

function addSong(){
  setsongdetails([
    ...songdetails,
    {
      songtitle: "",
    songsingers: "",
    songdirector: "",
    songthumbnail: "",
    songaudio: ""
    },
  ])
}

function removesong(index){
  let newsong=songdetails.filter((song,i)=>index!==i)
  setsongdetails(newsong)
}


  return (
    <div className="create">
      <form className="form-create" onSubmit={handleSubmit}>
        {/* Album Title */}
        <div className='first-three'>
          <div className="input-group">
            <label htmlFor="albumtitle" className="label-add">Album Title</label>
            <input
              type="text"
              id="albumtitle"
              className="input-add"
              name="albumtitle"
              onChange={handleChange}
              value={albumtitle}
            />
          </div>

          {/* Album Date */}
          <div className="input-group">
            <label htmlFor="albumdate" className="label-add">Album Date</label>
            <input
              type="date"
              id="albumdate"
              className="input-add"
              name="albumdate"
              onChange={handleChange}
              value={albumdate}
            />
          </div>

          {/* Album Starcast */}
          <div className="input-group">
            <label htmlFor="albumstarcast" className="label-add">Album Starcast</label>
            <input
              type="text"
              id="albumstarcast"
              className="input-add"
              name="albumstarcast"
              onChange={handleChange}
              value={albumstarcast}
            />
          </div>


        </div>

        {/* Album Description */}
        <div className='last-three'>
          <div className="input-group">
            <label htmlFor="albumscription" className="label-add">Album Description</label>
            <input
              id="albumscription"
              className="input-add"
              name="albumscription"
              onChange={handleChange}
              value={albumscription}
              rows="4"
            ></input>
          </div>

          {/* Album Language */}
          <div className="input-group">
            <label htmlFor="albumlang" className="label-add">Album Language</label>
            <input
              type="text"
              id="albumlang"
              className="input-add"
              name="albumlang"
              onChange={handleChange}
              value={albumlang}
            />
          </div>

          {/* Album Type */}
          <div className="input-group">
            <label htmlFor="albumtype" className="label-add">Album Type</label>
            <input
              type="text"
              id="albumtype"
              className="input-add"
              name="albumtype"
              onChange={handleChange}
              value={albumtype}
            />
          </div>

        </div>
        <div className="input-group">
          <label htmlFor="albumtype" className="label-add">Album thumbnail</label>
          <input
            type="file"
            id="albumtype"
            className="input-add"
            name="albumthumbnail"
            onChange={handlethumbnail}
          // value={data.albumthumbnail}
          />
        </div>
        <div className="input-group">
          <label htmlFor="albumtype" className="label-add">songs count</label>
          <input
            type="text"
            id="albumtype"
            className="input-add"
            name="songscount"
            onChange={handleChange}
            value={songscount}
          />
        </div>
        <div className="input-group">
          <label htmlFor="albumtype" className="label-add">Director</label>
          <input
            type="text"
            id="albumtype"
            className="input-add"
            name="director"
            onChange={handleChange}
            value={director}
          />
        </div>

        <h1 className='add-song'>
          ADD SONG
        </h1>
        {songdetails.map((song, index) => {
          return (
            <>
              <div className='big'>
                <div className="small">

                  <div>
                    <label htmlFor=" songtitle" className='label-song'>
                      song title

                    </label>
                    <input
                      type="text"
                      id="songtitle"
                      className="input-song"
                      name="songtitle"
                      onChange={(e) => handlesong(e, index)}
                      value={song.songtitle} />
                  </div>


                  <div>
                    <label htmlFor=" songsingers" className='label-song'>
                      song singers

                    </label>
                    <input
                      type="text"
                      id="songsingers"
                      className="input-song"
                      name="songsingers"
                      onChange={(e) => handlesong(e, index)}
                      value={song.songsingers}></input>
                  </div>
                  <div>
                    <label htmlFor=" songdirector" className='label-song'>
                      song director

                    </label>
                    <input
                      type="text"
                      id="songdirector"
                      className="input-song"
                      name="songdirector"
                      onChange={(e) => handlesong(e, index)}
                      value={song.songdirector}></input>
                  </div>


                </div>



              </div>

              <div className='big2'>
                <div className='small2'>
                  <label htmlFor=" songthumbnail" className='label-song'>
                    song thumbnail

                  </label>
                  <input
                  accept='/image*'
                    type="file"
                    id="songthumbnail"
                    className="input-song2"
                    name="songthumbnail"
                    onChange={(e) => handlesongfile(e, index)}
                  ></input>
                </div>
                <div>
                  <label htmlFor=" songaudio" className='label-song'>
                    song audio

                  </label>
                  <input
                  accept='/audio*'
                    type="file"
                    id="songthumsongaudionail"
                    className="input-song2"
                    name="songaudio"
                    onChange={(e) => handlesongfile(e, index)}
                  ></input>
                </div>
              </div>
              <div className='big2'>
                <button type='button' className='add-buton'  onClick={addSong}>
                  Add Song 
                </button>
                {
                  index>=1 &&( <button type='button' className='remove-buton'  onClick={()=>removesong(index)}>
                  Remove Song 
                </button>

         ) }
              </div>
            </>
          




          )

        })}
        <br />


        {/* Submit Button */}
        <button type="submit" className="add-log">Add Album</button>
      </form>
    </div>
  );
}

export default Createalbum;
