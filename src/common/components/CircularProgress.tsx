import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useAppSelector} from '../hooks';

export const ProgressCircular = () => {

  const isInitialized = useAppSelector(state => state.dataTable.isInitialized)

  return (
    <>
      {!isInitialized &&
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
          backgroundColor: '#F3F3F3',
          width: '100%',
          height: '100%'
        }}>
          <Box sx={{position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <CircularProgress size={70}/>
          </Box>
        </Box>
      }
    </>
  );
}