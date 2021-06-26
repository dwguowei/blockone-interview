import React from "react";
import {
  Link
} from "react-router-dom";
import useAxiosFetch from "../util/AxiosFetch";
import moment from 'moment';

const Transation = (props) => {
  const id = props.match.params.id;
  const {data, isLoading, hasError, errorMessage} = useAxiosFetch(`/mock-api/transaction-${id}.json`);
  
  let transactions = []
  if (data){
    transactions = data.map((d)=>{
      return {...d,timestamp:moment(d.timestamp)}
    }).sort((a, b) => b.timestamp - a.timestamp);  
  }

  return (
    <div>
      <h1>Account {id} Transactions</h1>
      {hasError
        ? <p>{errorMessage}</p>
        : isLoading
          ? <p>Loading accounts...</p>
          : transactions.length === 0
            ? <p>You have no transactions this month</p>
            : (
              <table>
                <thead>
                  <td>Timestamp</td>
                  <td>Action</td>
                  <td>Amount</td>
                  <td>Description</td>
                </thead>
                {transactions.map((transaction) => {
                  return (
                    <tr key={transaction.transactionId}>
                      <td>{transaction.timestamp.format("YYYY-MM-DD hh:mm A")}</td>
                      <td>{transaction.action}</td>
                      <td>{transaction.amount} {transaction.currency}</td>
                      <td>{transaction.description}</td>
                    </tr>  
                  );
                })}
              </table>)
      }
        <p>
          <Link to="/transfer">Make a Transfer</Link>
        </p>
        <p>
          <Link to="/account">Back to Account</Link>
        </p>
    </div>
  );
}

export default Transation;