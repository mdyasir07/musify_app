import { updateProfile } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { myGarage } from '../authcontex/Authucontex';

function Reset() {
    let { authuser } = useContext(myGarage)
    let [photoFile, setPhotoFile] = useState("");
    let [photoPreview, setPhotoPreview] = useState("");

    function handlePhoto(e) {
        let file = e.target.files[0]; // Fixed typo `file` -> `files`
        if (file) {
            setPhotoFile(file);
            let data = URL.createObjectURL(file);
            setPhotoPreview(data);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let data = new FormData()
        data.append("file", photoFile)
        data.append("upload_preset","music_musify")
        data.append("cloud_name", "dvtlegtme")


        let response = await fetch("https://api.cloudinary.com/v1_1/dvtlegtme/image/upload", {
            method: "POST",
            body: data
        })


        let result = await response.json()
        let imageurl = result.url

        await updateProfile(authuser, {
            photoURL: imageurl
        })
        console.log(result)


    }

    return (
        <>
            <div className='reset-upload'>
                <form className='form-upload'>
                    <label htmlFor="upload" className='label-add'>Upload Photo Here</label>
                    <span >
                        {photoPreview && <img src={photoPreview} alt="Preview"  className='photo'/>}



                    </span>


                    <input type="file" id='upload' className='input-add' onChange={handlePhoto} />

                    <br /><br />

                    <button className='log' style={{ cursor: 'pointer' }} onClick={handleSubmit}>
                        Upload
                    </button>

                    <h1 className='upload-phtoto'>UPLOAD PHOTO</h1>

                    {/* <div className='create'>
                        <NavLink to="/login" className="back">Back to Login</NavLink>
                    </div> */}
                </form>
            </div>
        </>
    );
}

export default Reset;