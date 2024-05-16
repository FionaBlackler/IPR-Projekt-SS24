import React, { useState } from 'react'
import "./AddSong.css"

function AddSong() {
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No selected file")
  return (
    <div className='parent'>

      <div className='titleBar'>
        <div className='titleLable'>Add a new song</div>
        <div class="title-bar-controls">
          <button aria-label="help">?</button>
        </div>
      </div>
      
      <div className='content'>
        <div>mp3-Upload</div> 
        <div>
          <form action='' onClick={() => document.querySelector(".imageUploader").click()}>
            <input type='file' accept='image/*' className='imageUploader' hidden/>
           
          </form>
        </div>   
        <div>
        <input type='text' className='songtitle'/>
        </div>
        <input type='text' className='artist'/>
        <div>Playlist-Zuordnung</div>
        <div>Genre</div>
        <input type='text' className='notesLyrics'/>
      </div>
    </div>
  )
}

export default AddSong