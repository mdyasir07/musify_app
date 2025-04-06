import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { _DB } from '../../Backend/Firebase'
import { NavLink, data } from 'react-router-dom'
import "./style.css"
import { GiLoveSong } from "react-icons/gi";


const Album = () => {
    let [album, setalbum] = useState()
    useEffect(() => {
        async function fetchAlbum() {
            try {
                let AlbumCollection = collection(_DB, "music_musify")
                let albumData = await getDocs(AlbumCollection);
                console.log(albumData.docs.data)

                let newalbumdata = albumData.docs.map((album) => ({
                    ...album.data()

                }))
                setalbum(newalbumdata)

                console.log(newalbumdata)
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchAlbum()

    }, [])


    return (
        <div >
            <h1
            className='my '>
            <GiLoveSong />

                My Fav Song 
            </h1>
            <main>

                {
                    album && (
                        <section className='flex'>

                            {
                                album.map((data) => {
                                    return (
                                        <>
                                       
 
                
                                        


                                        <NavLink to="song"  state={{ album: data }}>
                                        <div className='felx'>
                                        <div className='album-card'>
                                        <img src={data?.Thumbnail} alt="amaran" className='minnale'/>
                                        <div className='mtilte'>
                                            {
                                                data?.albumtitle 
                                            }
                                        </div>
                                        
                                        </div>
                                        </div>
                                     

                                        </NavLink>
                                        
                                    
                                       
                                        </>
                                    
                                    )
                                })
                            }
                        </section>
                    )
                }
            </main>


        </div>


    )
}

export default Album