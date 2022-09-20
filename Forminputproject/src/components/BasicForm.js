import useInput from "../hooks/use-input";

const BasicForm = (props) => {

 const notEmpty=value=>value.trim()!=='';
 const validEmail=value=>value.includes('@');

  const{
    value:enteredFirstName,
        isValid:FirstNameIsValid,
        hasError:FirstNameHasError,
        valueChangeHandler:FirstNameChangeHandler,
        inputBlurHandler:FirstnameBlurHandler,
        reset:resetFirstNameInput
  }=useInput(notEmpty);

  const{
    value:enteredLastName,
        isValid:lastNameIsValid,
        hasError:lastNameHasError,
        valueChangeHandler:lastNameChangeHandler,
        inputBlurHandler:lastnameBlurHandler,
        reset:resetLastNameInput
  }=useInput(notEmpty);

  const{
    value:enteredEmail,
        isValid:emailIsValid,
        hasError:emailHasError,
        valueChangeHandler:emailChangeHandler,
        inputBlurHandler:emailBlurHandler,
        reset:resetEmailInput
  }=useInput(validEmail);



  let formIsValid=false;

  if(FirstNameIsValid && lastNameIsValid && emailIsValid){
    formIsValid=true;
  }

  const formSubmissionHandler=event=>{
    event.preventDefault();

   if(!formIsValid){
     return;
   }

   console.log(enteredFirstName);
   console.log(enteredLastName);
   console.log(enteredEmail);

   resetFirstNameInput();
   resetLastNameInput();
   resetEmailInput();

  }

  const FirstnameInputClasses=FirstNameHasError?'form-control invalid':'form-control';
  const lasttnameInputClasses=lastNameHasError?'form-control invalid':'form-control';
  const emailInputClasses=emailHasError?'form-control invalid':'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={FirstnameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' onChange={FirstNameChangeHandler} 
          onBlur={FirstnameBlurHandler}
          value={enteredFirstName}
          />
          {FirstNameHasError && <p className="error-text">Can't Lave Empty</p>}
        </div>
        <div className={lasttnameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' onChange={lastNameChangeHandler}
          onBlur={lastnameBlurHandler}
          value={enteredLastName} />
          {lastNameHasError && <p className="error-text">Can't be Empty</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='email' id='email'
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={enteredEmail} />
        {emailHasError && <p className="error-text">Can't be Empty</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid} >Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
