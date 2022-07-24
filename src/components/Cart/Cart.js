import {Fragment, useContext, useState} from 'react';

import classes from './Cart.module.css'
import Modal from '../Shared/Modal/Modal';
import CartContext from '../../Store/Cart/cart-context';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout/Checkout';

const Cart = (props) => {

    const [order, setOrder] = useState({
        ordered: false,
        isSubmitting: false,
        didSubmit: false
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

    const submitOrderHandler = async userData => {
        setOrder(prevState => ({...prevState, isSubmitting: true}))
        const response = await fetch('https://react-meals-2a831-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
        setOrder(prevState => ({ordered: true, isSubmitting: false, didSubmit: true}))
        cartCtx.clearCart()
    }

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

    const cartModalContent = (
        <Fragment>
            <ul className={classes['cart-items']}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {order.ordered && <Checkout onClose={props.onClose} onSubmit={submitOrderHandler}/>}
            {!order.ordered && modalActions}
        </Fragment>
    )

    const isSubmittingModalContent = (
        <p>Sending order data</p>
    )

    const didSubmitModalContent = (
        <Fragment>
            <p>Successfully sent the order</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
        </Fragment>
    )

    return (
        <Modal onClose={props.onClose}>
            {!order.isSubmitting && !order.didSubmit && cartModalContent}
            {order.isSubmitting && isSubmittingModalContent}
            {order.didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart
