import React, { useState } from 'react'
import "./AddSong.css"

import { createGlobalStyle, ThemeProvider } from 'styled-components';


import rose from 'react95/dist/themes/rose'; //Thema der UI-Elemente
import {Button} from 'react95';

function AddSong() {
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No selected file")
  return (
    <div className='parent'>
       <ThemeProvider theme={rose}>
      <div className='addSongtitleBar'>
        <div className='addSongtitleLable'>Add a new song</div>
        <div class="addSongtitle-bar-controls">
          <button className="help" aria-label="help">?</button>
        </div>
      </div>
      
      <div className='addSongcontent'>
        <Button primary>Upload mp3-file</Button>
        <Button primary>Funda ist kacke</Button>
        <div>
          <form action='' onClick={() => document.querySelector(".imageUploader").click()}>
            <input type='file' accept='image/*' className='imageUploader' hidden/>
           
          </form>
        </div>   
        <div>
        <input type='text' className='songtitle'/>
        </div>
        <input type='text' className='artist'/>
        <div className='Test'>Playlist-Zuordnung</div>
        <div>Genre</div>
        <input type='text' className='notesLyrics'/>
      </div>
      </ThemeProvider>
    </div>
  )
}

export default AddSong