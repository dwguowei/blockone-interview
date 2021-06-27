import React from "react";
import {
  Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useAxiosFetch from "../util/AxiosFetch";
import useForm from "../util/FormValidation";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  submit: {
    color: "white",
    backgroundColor: theme.palette.success.main, 
    '&:hover': {
      color: "white",
      backgroundColor: theme.palette.success.dark, 
    }
  },
  container: {
    padding: theme.spacing(3),
  },
  formControl: {
    minWidth: '24ch',
  },
  formControlCurrency: {
    minWidth: '16ch',
  }
}));

const Transfer = () => {
  const classes = useStyles();

  const {
    handleSubmit, // handles form submission
    handleChange, // handles input changes
    data, // access to the form data
    errors: formErrors, // form errors to show
  } = useForm({ // hook to validate form
    validations: {
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
      transferCurrency: {
        required: {
          value: true,
          message: 'This field is required',
        },
      },
    },
    onSubmit: () => alert('Transfer success!'),
    initialValues: { // used to initialize the data
      fromAccountNo: undefined,
      toAccountNo: undefined,
      transferAmount: '',
      transferCurrency: undefined,
    },
  });

  const {data:accounts, isLoading, hasError, errorMessage} = useAxiosFetch(`/mock-api/account.json`);

  const uniqCurrency = [];
  accounts?.map(acc => {
    if (uniqCurrency.indexOf(acc.currency) === -1) {
      uniqCurrency.push(acc.currency)
    }
  });
  const transferCurrency = uniqCurrency.map((curr)=>({currency: curr}))
  return (
    <div>
      <Typography variant="h2" component="h1" gutterBottom>Transfer</Typography>
      {hasError && (
        <Box mb={1}><Alert variant="filled" severity="error">{errorMessage}</Alert></Box>
      )}
      <Paper variant="outlined" className={classes.container}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1" component="p">Transfer funds:</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Autocomplete
                      id="fromAccountNo"
                      options={accounts || []}
                      getOptionLabel={(option)=>option.accountNo || ""}
                      value={data.fromAccountNo || {}}
                      disableClearable
                      loading={isLoading}
                      onChange={(event, newValue)=>handleChange('fromAccountNo')({...event,target:{...event.target,value:newValue}})}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          label="From Account" 
                          margin="dense" 
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
                          error={!!formErrors.fromAccountNo} 
                          helperText={formErrors.fromAccountNo}/>
                      )} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Autocomplete
                      id="toAccountNo"
                      options={accounts || []}
                      getOptionLabel={(option)=>option.accountNo || ""}
                      value={data.toAccountNo || {}}
                      disableClearable
                      loading={isLoading}
                      onChange={(event, newValue)=>handleChange('toAccountNo')({...event,target:{...event.target,value:newValue}})}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          label="To Account" 
                          margin="dense" 
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
                          error={!!formErrors.toAccountNo} 
                          helperText={formErrors.toAccountNo}/>
                      )} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={9} md={6}>
                  <TextField 
                    value={data.transferAmount}
                    onFocus={(e)=>{if (e.target.value==="0"){handleChange('transferAmount')({...e, target: {...e.target, value: ""}})}}}
                    onChange={handleChange('transferAmount', (value)=>RegExp("^[0-9\.]*$").test(value) ? value : data.transferAmount)}
                    label="Transfer Amount" 
                    margin="dense" 
                    fullWidth
                    error={!!formErrors.transferAmount} 
                    helperText={formErrors.transferAmount}/>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                  <Autocomplete
                    id="transferCurrency"
                    options={transferCurrency}
                    getOptionLabel={(option)=>option.currency || ""}
                    value={data.transferCurrency || {}}
                    disableClearable
                    loading={isLoading}
                    onChange={(event, newValue)=>handleChange('transferCurrency')({...event,target:{...event.target,value:newValue}})}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        label="Currency" 
                        margin="dense" 
                        
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                        error={!!formErrors.transferCurrency} 
                        helperText={formErrors.transferCurrency}/>
                    )} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <br/>
          <br/>
          <Button type="submit" variant="contained" className={classes.submit}>Submit</Button>
        </form>
      </Paper>
      <p>
        <Button component={Link} to="/account" startIcon={<ArrowBackIcon/>} variant="contained" color="secondary">Back to Account</Button>
      </p>
    </div>
  );
}

export default Transfer;