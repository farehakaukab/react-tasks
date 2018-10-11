import React from 'react'
import "./../css/styles.css";

const HomeButton= ({onNavigationHome})=>{
    return(<button onClick={onNavigationHome}>Home</button>);
}

export default HomeButton;