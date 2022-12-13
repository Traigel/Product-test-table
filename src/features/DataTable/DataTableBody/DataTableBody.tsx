import TableRow from "@mui/material/TableRow"
import TableCell from '@mui/material/TableCell';
import {DataType, setCheckedItem} from "../dataTable-reducer";
import Checkbox from '@mui/material/Checkbox';
import React, {ChangeEvent} from 'react';
import {useAppDispatch} from '../../../common/hooks';

type DataTableRowPropsType = {
  dataRow: DataType
}

export const DataTableBody = ({dataRow}: DataTableRowPropsType) => {

  const dispatch = useAppDispatch()

  const onChangeTableCellHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setCheckedItem({id: dataRow.id, checked: e.currentTarget.checked}))

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={dataRow.checked}
          onChange={onChangeTableCellHandler}
        />
      </TableCell>
      <TableCell align={'right'}>{dataRow.name}</TableCell>
      <TableCell align={'right'}>{dataRow.status}</TableCell>
      <TableCell align={'right'}>{dataRow.volume}</TableCell>
      <TableCell align={'right'}>{dataRow.sum}</TableCell>
      <TableCell align={'right'}>{dataRow.qty}</TableCell>
      <TableCell align={'right'}>{dataRow.deliveryDate}</TableCell>
      <TableCell align={'right'}>{dataRow.currency}</TableCell>
      <TableCell align={'right'}>{`${dataRow.total} ${dataRow.currency}`}</TableCell>
    </TableRow>
  )
}