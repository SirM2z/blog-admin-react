import React from 'react'
import tinycolor from 'tinycolor2';
import { makeStyles } from '@material-ui/core/styles';

const Spin = () => {
  const classes = useStyles();
  return (
    <div className={classes.balls}>
      <div className={classes.balls1}></div>
      <div></div>
      <div className={classes.balls3}></div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  balls: {
    width: '4em',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& div': {
      width: '0.8em',
      height: '0.8em',
      borderRadius: '50%',
      backgroundColor: tinycolor(theme.palette.info.main).setAlpha(0.8),
    }
  },
  balls1: {
    transform: 'translateX(-100%)',
    animation: '$left-swing 0.5s ease-in alternate infinite',
  },
  balls3: {
    transform: 'translateX(-95%)',
    animation: '$right-swing 0.5s ease-out alternate infinite',
  },
  '@keyframes left-swing': {
    '50%,100%': {
      transform: 'translateX(95%)'
    }
  },
  '@keyframes right-swing': {
    '50%': {
      transform: 'translateX(-95%)'
    },
    '100%': {
      transform: 'translateX(100%)'
    }
  }
}));

export default Spin;
