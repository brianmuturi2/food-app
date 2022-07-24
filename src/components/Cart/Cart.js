import {useContext, useState} from 'react';

import classes from './Cart.module.css'
import Modal from '../Shared/Modal/Modal';
import CartContext from '../../Store/Cart/cart-context';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout/Checkout';

const Cart = (props) => {

    const [order, setOrder] = useState({
        ordered: false
    })

    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    };

    const cartItems = cartCtx.items.map(item => (<CartItem
                                                    key={item.id}
                                                    name={item.name}
                                                    amount={item.amount}
                                                    price={item.price}
                                                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                                                    onAdd={cartItemAddHandler.bind(null, item)}
                                                />))

    const orderHandler = () => {
        setOrder(prevState => ({...prevState, ordered: true}))
    }

    const modalActions = (<div className={classes.actions}>
                            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
                        </div>)

    return (
        <Modal onClose={props.onClose}>
            <ul className={classes['cart-items']}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {order.ordered && <Checkout onClose={props.onClose}/>}
            {!order.ordered && modalActions}
        </Modal>
    )
}

export default Cart
