import React from 'react';
import {Grid, makeStyles} from '@material-ui/core';
import background from '../res/tpk_background.png';

const useStyles = makeStyles(() => ({
    root : {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        top: 0,
        backgroundImage: `url(${background})`,
        backgroundSize: 'contain',
    }
}))

const Landing = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.root} >
        </Grid>
    )
}

export default Landing;