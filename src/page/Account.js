import React from "react";
import {
  Link
} from "react-router-dom";

const Account = () => {
  return (
    <div>
      <h1>Account</h1>
      <p>
        <Link to="/account/1">Account 1</Link>
      </p>
      <p>
        <Link to="/account/2">Account 2</Link>
      </p>
      <p>
        <Link to="/transfer">Transfer</Link>
      </p>
    </div>
  );
}

export default Account;