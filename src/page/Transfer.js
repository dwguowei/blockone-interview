import React from "react";
import {
  Link
} from "react-router-dom";

const Transfer = () => {
  return (
    <div>
        <h1>Transfer</h1>
        <p>
          <Link to="/account">Account</Link>
        </p>
    </div>
  );
}

export default Transfer;