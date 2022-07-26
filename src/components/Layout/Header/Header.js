import { Fragment } from 'react'
import HeaderCartButton from '../HeaderCardButton/HeaderCartButton';
import classes from './Header.module.css'
import mealsImage from '../../../assets/images/meals.jpg'

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton showCart={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of delicious food!"/>
            </div>
        </Fragment>
    )
}

export default Header;
