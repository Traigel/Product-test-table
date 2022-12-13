import React from 'react';
import Stack from "@mui/material/Stack"
import {useAppDispatch, useAppSelector} from '../hooks';
import Snackbar from '@mui/material/Snackbar';
import {setError, setServerMessages} from '../../features/DataTable/dataTable-reducer';
import Alert from '@mui/material/Alert';

type ShowNotificationsPropsType = {
  variant: 'success' | 'error'
}

export const ShowNotifications = ({variant}: ShowNotificationsPropsType) => {

  const dispatch = useAppDispatch()
  const serverMessages = useAppSelector(state => state.dataTable.serverMessages)
  const error = useAppSelector(state => state.dataTable.error)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (variant === 'success') dispatch(setServerMessages({serverMessages: null}))
    if (variant === 'error') dispatch(setError({error: undefined}))
  };

  const open = variant === 'success' ? !!serverMessages : !!error
  const severity = variant === 'success' ? 'success' : 'error'
  const alertText = variant === 'success' ? serverMessages : error

  return (
    <Stack spacing={2} sx={{width: '100%'}}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={severity} variant={'filled'} sx={{width: '100%'}}>
          {alertText}
        </Alert>
      </Snackbar>
    </Stack>
  )
}