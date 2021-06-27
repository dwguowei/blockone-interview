import React from 'react';
import {
  Link
} from "react-router-dom";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const AccountCard = ({accountNo,balance,currency,isLoading}) => {
  const formatedBalance = parseFloat(balance).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          <Grid container spacing={1}>
            <Grid item xs={9}>
              {isLoading
                ?<Skeleton animation="wave" height={34} width={160} />
                :<Typography component="span" variant="h6">{accountNo}</Typography>
              }
            </Grid>
            <Grid item xs={3}>
              {isLoading
                ?<Skeleton animation="wave" height={34} width={120} />
                :<><Typography component="span" variant="caption">{currency}</Typography> <Typography component="span" variant="h6">{formatedBalance}</Typography></>
              }
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
      <CardActions>
        {isLoading
          ?<Box px={1}><Skeleton animation="wave" height={30} width={160} /></Box> 
          :<Button component={Link} to={`/account/${accountNo}`} size="small" color="secondary">See transactions</Button>
        }
      </CardActions>
    </Card>
  )
}

export default AccountCard;