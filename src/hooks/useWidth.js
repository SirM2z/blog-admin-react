// import { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useWidth = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('lg'));
}

export default useWidth;
