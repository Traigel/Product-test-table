import TableRow from "@mui/material/TableRow"
import TableCell from '@mui/material/TableCell';
import {DataType, setCheckedItem} from "../dataTable-reducer";
import Checkbox from '@mui/material/Checkbox';
import React, {ChangeEvent} from 'react';
import {useAppDispatch} from '../../../common/hooks';

type DataTableRowPropsType = {
    dataRow: DataType
}

export const DataTableRow = ({dataRow}: DataTableRowPropsType) => {

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
            <TableCell component="th" scope="row">{dataRow.name}</TableCell>
            <TableCell>{dataRow.status}</TableCell>
            <TableCell>{dataRow.volume}</TableCell>
            <TableCell>{dataRow.sum}</TableCell>
            <TableCell>{dataRow.qty}</TableCell>
            <TableCell>{dataRow.deliveryDate}</TableCell>
            <TableCell>{dataRow.currency}</TableCell>
            <TableCell>{dataRow.total}</TableCell>
        </TableRow>
    )
}