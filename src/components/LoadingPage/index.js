import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export const LoadingPage = ({ element, ...props }) => {
    return(
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
  
export default LoadingPage;