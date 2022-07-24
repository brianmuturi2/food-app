import classes from './Checkout.module.css'
import {useRef, useState} from 'react';

const isEmpty = value => value.trim() === '';
const isFiveChars = value =>  value.trim().length === 5;

const Checkout = props => {

    const [checkOutValidity, setCheckoutValidity] = useState({
        nameIsValid: true,
        streetIsValid: true,
        postalIsValid: true,
        cityIsValid: true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        if (event) {
            event.preventDefault()
        }

        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostal = postalInputRef.current.value
        const enteredCity = cityInputRef.current.value

        const nameIsValid = !isEmpty(enteredName)
        const streetIsValid = !isEmpty(enteredStreet)
        const postalIsValid = isFiveChars(enteredPostal)
        const cityIsValid = !isEmpty(enteredCity)

        setCheckoutValidity({
            nameIsValid,
            streetIsValid,
            postalIsValid,
            cityIsValid
        })

        const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid

        if (!formIsValid) {
            return
        }

        // Submit cart data
    }

    return (
        <form onSubmit={confirmHandler} className={classes.form}>
            <div className={`${classes.control} ${checkOutValidity.nameIsValid ? '' : classes.invalid}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id={'name'} ref={nameInputRef}/>
                {!checkOutValidity.nameIsValid && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${classes.control} ${checkOutValidity.streetIsValid ? '' : classes.invalid}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id={'street'} ref={streetInputRef}/>
                {!checkOutValidity.streetIsValid && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${classes.control} ${checkOutValidity.postalIsValid ? '' : classes.invalid}`}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id={'postal'} ref={postalInputRef}/>
                {!checkOutValidity.postalIsValid && <p>Please enter a valid postal code (5 characters)!</p>}
            </div>
            <div className={`${classes.control} ${checkOutValidity.cityIsValid ? '' : classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input type="text" id={'city'} ref={cityInputRef}/>
                {!checkOutValidity.cityIsValid && <p>Please enter a valid city!</p>}
            </div>
            <div className={`${classes.control}`}>
                <button type={'button'} onClick={props.onClose}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout
