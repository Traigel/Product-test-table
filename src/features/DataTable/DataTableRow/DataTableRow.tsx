import TableRow from "@mui/material/TableRow"
import TableCell from '@mui/material/TableCell';
import { DataType } from "../dataTable-reducer";

type DataTableRowPropsType = {
    dataRow: DataType
}

export const DataTableRow = ({dataRow}: DataTableRowPropsType) => {

    return (
        <TableRow>

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