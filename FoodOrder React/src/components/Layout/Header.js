import React from "react";

import mealsImage from '../../assets/farmhouse.png'
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

const Header = props=>{
return (
<React.Fragment>
<header className={classes.header}>
    <h1>Pizza Time</h1>
    <HeaderCartButton onCartClick={props.onCartDemand}/>
</header>
<div className={classes['main-image']}>
    <img src={mealsImage}/>
</div>
</React.Fragment>
)
};

export default Header;