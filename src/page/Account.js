import React from 'react';
import {
  Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import Alert from '@material-ui/lab/Alert';
import useAxiosFetch from "../util/AxiosFetch";
import AccountCard from '../component/AccountCard';

const Account = () => {

  const {data:accounts, isLoading, hasError, errorMessage} = useAxiosFetch(`/mock-api/account.json`);

  return (
    <div>
      <Typography variant="h2" component="h1" gutterBottom>Account</Typography>
      {hasError
        ? <Alert variant="filled" severity="error">{errorMessage}</Alert>
        : (
          <Grid container spacing={1}>
          {isLoading
            ? [{},{}].map((account,idx) => {
                return (
                  <Grid key={idx} item xs={12}>
                    <AccountCard isLoading/>
                  </Grid>
                )
              })
            : !accounts || accounts.length === 0
              ? <Grid item xs={12}>
                  <Alert variant="filled" severity="info">You have no accounts with us</Alert>
                </Grid>
              : accounts.map((account) => {
                  return (
                    <Grid key={account.accountNo} item xs={12}>
                      <AccountCard accountNo={account.accountNo} balance={account.balance} currency={account.currency}/>
                    </Grid>
                  );
                })
          }
          </Grid>)
      }
      <p>
        <Button component={Link} to="/transfer" endIcon={<SendIcon/>} variant="contained" color="primary">Make a Transfer</Button>
      </p>
    </div>
  );
}

export default Account;