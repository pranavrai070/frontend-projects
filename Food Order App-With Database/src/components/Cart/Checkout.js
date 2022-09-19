import useInput from '../../hooks/use-input';
import classes from './Checkout.module.css';

const Checkout = (props) => {
  
   const {
       value:enteredName,
       isValid:nameIsValid,
       hasError:namehasError,
       inputBlurHandler:nameBlurHandler,
       valueChangeHandler:nameChangeHandler,
       reset:resetNameInput
   }=useInput(value=>value.trim()!=='');

   const {
       value:enteredPhone,
       isValid:phoneIsValid,
       hasError:phonehasError,
       inputBlurHandler:phoneBlurHandler,
       valueChangeHandler:phoneChangeHandler,
       reset:resetPhoneInput
   }=useInput(value=>value.trim().length===10);
   
   const {
       value:enteredStreet,
       isValid:streetIsValid,
       hasError:streethasError,
       inputBlurHandler:streetBlurHandler,
       valueChangeHandler:streetChangeHandler,
       reset:resetStreetInput
   }=useInput(value=>value.trim()!=='');
   const {
       value:enteredPostal,
       isValid:postalIsValid,
       hasError:postalhasError,
       inputBlurHandler:postalBlurHandler,
       valueChangeHandler:postalChangeHandler,
       reset:resetPostalInput
   }=useInput(value=>value.trim().length===6);

   const {
    value:enteredCity,
    isValid:cityIsValid,
    hasError:cityhasError,
    inputBlurHandler:cityBlurHandler,
    valueChangeHandler:cityChangeHandler,
    reset:resetCityInput
}=useInput(value=>value.trim()!=='');

   let formIsValid=false;

   if(nameIsValid && streetIsValid && postalIsValid && cityIsValid & phoneIsValid){
       formIsValid=true;
   }


  const confirmHandler = (event) => {
    event.preventDefault();

    if(!formIsValid){
        return;
    }

    props.onSubmit({
      name:enteredName,
      city:enteredCity,
      phone:enteredPhone,
      postal:enteredPostal,
      street:enteredStreet
    });

    console.log(enteredName);

    resetNameInput();
    resetPhoneInput();
    resetStreetInput();
    resetCityInput();
    resetPostalInput();
  };

  const nameInputClasses=`${classes.control} ${namehasError?classes.invalid:''}`;

  const streetInputClasses=`${classes.control} ${streethasError?classes.invalid:''}`;

  const postalInputClasses=`${classes.control} ${postalhasError?classes.invalid:''}`;

  const cityInputClasses=`${classes.control} ${cityhasError?classes.invalid:''}`;

  const phoneInputClasses=`${classes.control} ${phonehasError?classes.invalid:''}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name'
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        value={enteredName} />
      </div>
      {namehasError && <p className={classes.error}>Please enter a valid Name</p>}
      <div className={phoneInputClasses}>
        <label htmlFor='phone'>Phone</label>
        <input type='text' id='phone'
        onChange={phoneChangeHandler}
        onBlur={phoneBlurHandler}
        value={enteredPhone} />
      </div>
      {phonehasError && <p className={classes.error}>Please enter a valid Phone Number</p>}
      <div className={streetInputClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street'
         onChange={streetChangeHandler}
         onBlur={streetBlurHandler}
         value={enteredStreet} />
      </div>
      {streethasError && <p className={classes.error}>Please enter a valid Street</p>}
      <div className={postalInputClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal'
         onChange={postalChangeHandler}
         onBlur={postalBlurHandler}
         value={enteredPostal} />
      </div>
      {postalhasError && <p className={classes.error}>Please enter a valid Postal Code</p>}
      <div className={cityInputClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city'
         onChange={cityChangeHandler}
         onBlur={cityBlurHandler}
         value={enteredCity} />
      </div>
      {cityhasError && <p className={classes.error}>Please enter a valid City Name</p>}
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;