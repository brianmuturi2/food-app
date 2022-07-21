import classes from './HeaderCartButton.module.css'
import CartIcon from '../../Cart/CartIcon/CartIcon';
import {useContext} from 'react';
import CartContext from '../../../Store/Cart/cart-context';

const HeaderCartButton = (props) => {

    const cartCtx = useContext(CartContext)
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)

    return (
        <button className={classes.button} onClick={props.showCart}>
            <span className={classes.icon}><CartIcon/></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
};

export default HeaderCartButton;
