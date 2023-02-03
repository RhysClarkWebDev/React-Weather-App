import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';



function SearchBar(){
    return(
        <>
        <div className="form-holder">
              <form id="location-form" action="/" method="post">
                  <input type="text" name="cityName" id="cityName" placeholder="Search for a Place"/>
                  <button type="submit" name="submitWeatherResponse">Search</button>
                  <p class="error"></p>
              </form>
          </div>
          <div id="modal"></div>
        </>
    )
}



export default SearchBar;