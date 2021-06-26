import React from "react";
import {
  Link
} from "react-router-dom";

const Transation = (props) => {
  const id = props.match.params.id;
  return (
    <div>
        <h1>Account {id} Transation</h1>
        <p>
          <Link to="/transfer">Transfer</Link>
        </p>
        <p>
          <Link to="/account">Account</Link>
        </p>
    </div>
  );
}

export default Transation;