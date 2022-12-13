import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Button from '@mui/material/Button';
import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import {useAppDispatch} from '../../../common/hooks';
import {submitItemsIds} from '../dataTable-actions';

type CancelItemModalPropsType = {
  onClose: () => void
  checkedItem: string[] | null
}

export const CancelItemModal = ({onClose, checkedItem}: CancelItemModalPropsType) => {

  const dispatch = useAppDispatch()

  const onCloseRequestHandler = async () => {
    if (checkedItem && checkedItem.length) {
      dispatch(submitItemsIds(checkedItem))
    }
    onClose()
  }

  const checkedItemString = checkedItem && checkedItem.length ? checkedItem.join(', ') : 'No items selected'

  return (
    <Stack width={350} padding={3} textAlign={'center'} border={'3px solid #0069D9'}>
      <Typography fontWeight={600}>Are you sure you want to cancel the item(s):</Typography>
      <Typography fontWeight={600} mb={5} mt={5}>{checkedItemString}</Typography>

      <Stack direction={'row'} justifyContent={'space-between'}>
        <Button
          onClick={onCloseRequestHandler}
          sx={{width: 120}}
          variant={'contained'}
          color={'success'}
        >
          <DoneIcon sx={{marginRight: 1}}/> Apply
        </Button>
        <Button
          onClick={onClose}
          sx={{width: 120}}
          variant={'contained'}
          color={'error'}
        >
          <CancelPresentationIcon sx={{marginRight: 1}}/> Cancel
        </Button>
      </Stack>
    </Stack>
  )
}