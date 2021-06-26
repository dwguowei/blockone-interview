import React from 'react';
import {
  Link
} from "react-router-dom";
import useAxiosFetch from "../util/AxiosFetch";

const Account = () => {

  const {data:accounts, isLoading, hasError, errorMessage} = useAxiosFetch(`/mock-api/account.json`);

  return (
    <div>
      <h1>Account</h1>
      {hasError
        ? <p>{errorMessage}</p>
        : isLoading
          ? <p>Loading accounts...</p>
          : !accounts || accounts.length === 0
            ? <p>You have no accounts with us</p>
            : accounts.map((account) => {
                return (
                  <p key={account.accountNo}>
                    <Link to={`/account/${account.accountNo}`}>{account.accountNo}</Link>
                  </p>  
                );
              })
      }
      <p>
        <Link to="/transfer">Make a Transfer</Link>
      </p>
    </div>
  );
}

export default Account;