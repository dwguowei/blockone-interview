import React from "react";
import {
  Link
} from "react-router-dom";
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import Alert from '@material-ui/lab/Alert';
import useAxiosFetch from "../util/AxiosFetch";
import TransationTable from "../component/TransactionTable";

const Transation = (props) => {
  const id = props.match.params.id;
  const {data, isLoading, hasError, errorMessage} = useAxiosFetch(`/mock-api/transaction-${id}.json`);
  
  let transactions = []
  if (data){
    transactions = data.map((d)=>{
      return {...d,timestamp:moment(d.timestamp)}
    }).sort((a, b) => b.timestamp - a.timestamp);  
  }


  const columns = [
    { id: 'timestamp', 
      label: 'Timestamp', 
      minWidth: 200,
      format: (value) => value?.format('YYYY-MM-DD hh:mm A'),
    },
    { 
      id: 'action', 
      label: 'Action', 
      minWidth: 50,
      format: (value) => value === 'credit' ? <font style={{color:"green"}}>{value}</font> : <font style={{color:"red"}}>{value}</font>
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 120,
      align: 'right',
      format: (value) => parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    { id: 'currency', label: 'Currency', minWidth: 50 },
    { id: 'description', label: 'Description', minWidth: 250 },
  ];

  return (
    <div>
      <Typography variant="h2" component="h1" gutterBottom>Account Transactions</Typography>
      <Typography variant="h5" component="h2">Account Number: {id}</Typography>
      {hasError
        ? <Alert variant="filled" severity="error">{errorMessage}</Alert>
        : isLoading
          ? <TransationTable columns={columns} rows={[{},{},{},{},{}]} isLoading={isLoading}/>
          : <TransationTable columns={columns} rows={transactions}/>
      }

      <p>
        <Button component={Link} to="/transfer" endIcon={<SendIcon/>} variant="contained" color="primary">Make a Transfer</Button>
      </p>
      <p>
        <Button component={Link} to="/account" startIcon={<ArrowBackIcon/>} variant="contained" color="secondary">Back to Account</Button>
      </p>
    </div>
  );
}

export default Transation;