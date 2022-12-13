import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from '../hooks';

export const ProgressLinear = () => {

  const status = useAppSelector(state => state.dataTable.status)

  return (
    <>
      {status === 'loading' &&
        <Box sx={{width: '100%', position: 'absolute', top: 0, left: 0}}>
          <LinearProgress sx={{height: '5px'}}/>
        </Box>
      }
    </>
  );
}