import React from "react";
import {
  Link
} from "react-router-dom";
import useAxiosFetch from "../util/AxiosFetch";
import useForm from "../util/FormValidation";

const Transfer = () => {

  const {
    handleSubmit, // handles form submission
    handleChange, // handles input changes
    data, // access to the form data
    errors: formErrors, // includes the errors to show
  } = useForm({ // the hook we are going to create
    validations: {
      // name: {
      //   pattern: {
      //     value: '^[A-Za-z]*$',
      //     message: "You're not allowed to...",
      //   },
      // },
      // age: {
      //   custom: {
      //     isValid: (value) => parseInt(value, 10) > 17,
      //     message: 'You have to be at least 18 years old.',
      //   },
      // },
      fromAccountNo: {
        required: {
          value: true,
          message: 'This field is required',
        },
        custom: {
          isValid: (value) => value !== data.toAccountNo,
          message: 'Source and destination account are the same!',
        },
      },
      toAccountNo: {
        required: {
          value: true,
          message: 'This field is required',
        },
        custom: {
          isValid: (value) => value !== data.fromAccountNo,
          message: 'Source and destination account are the same!',
        },
      },
      transferAmount: {
        required: {
          value: true,
          message: 'This field is required',
        },
        pattern: {
          value: '^[0-9]+(\.[0-9]{1,2})?$',
          message: "Please input valid amount",
        },
      },
    },
    onSubmit: () => alert('Transfer success!'),
    initialValues: { // used to initialize the data
      fromAccountNo: '',
      toAccountNo: '',
    },
  });

  const {data:accounts, isLoading, hasError, errorMessage} = useAxiosFetch(`/mock-api/account.json`);

  return (
    <div>
        <h1>Transfer</h1>
        {hasError && <p>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fromAccountNo">Transfer from account:</label>
          <select id="fromAccountNo" value={data.fromAccountNo || ''} onChange={handleChange('fromAccountNo')}>
            <option value="">Please select an account</option>
            {accounts && accounts.map(account => {
              return (
                <option key={account.accountNo} value={account.accountNo}>{account.accountNo}</option>
              )
            })}
          </select>
          <p className="error">{formErrors.fromAccountNo}</p>
          
          <label htmlFor="toAccountNo">Transfer to account:</label>
          <select id="toAccountNo" value={data.toAccountNo || ''} onChange={handleChange('toAccountNo')}>
            <option value="">Please select an account</option>
            {accounts && accounts.map(account => {
              return (
                <option key={account.accountNo} value={account.accountNo}>{account.accountNo}</option>
              )
            })}
          </select>
          <p className="error">{formErrors.toAccountNo}</p>

          <label htmlFor="transferAmount">Amount to transfer:</label>
          <input type="text" id="transferAmount" value={data.transferAmount || ''} onChange={handleChange('transferAmount')}/>
          <p className="error">{formErrors.transferAmount}</p>

          <p><button type="submit">Transfer</button></p>
        </form>
        <p>
          <Link to="/account">Account</Link>
        </p>
    </div>
  );
}

export default Transfer;