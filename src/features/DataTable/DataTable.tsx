import React, {useEffect} from 'react';
import styles from './DataTable.module.scss';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {DataTableRow} from './DataTableRow/DataTableRow';
import {getDocuments} from './dataTable-actions';
import TableSortLabel from '@mui/material/TableSortLabel';
import {DataType} from './dataTable-reducer';
import {OrderType, useAppDispatch, useAppSelector, useDataSort} from '../../common/hooks';

export const DataTable = () => {

    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.dataTable.data)

    useEffect(() => {
        dispatch(getDocuments())
    }, [])

    const [order, setOrder] = React.useState<OrderType>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof DataType>('deliveryDate');

    const dataSort = useDataSort<DataType>(data, order, orderBy)

    const cellsHeaders = data && Object.keys(data[0]).filter(el => el !== 'id')

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">

                <TableHead>
                    <TableRow>
                        {cellsHeaders && cellsHeaders.map((el, index) => {
                                const onClickHandler = () => {
                                    if (orderBy === el) setOrder(order === 'asc' ? 'desc' : 'asc')
                                    else {
                                        setOrder('asc')
                                        setOrderBy(el as keyof DataType)
                                    }
                                };

                                return (
                                    <TableCell key={index} sortDirection={orderBy === el ? order : false}
                                               className={styles.headerRow}>
                                        <TableSortLabel
                                            active={orderBy === el}
                                            direction={orderBy === el ? order : 'asc'}
                                            onClick={onClickHandler}
                                        >
                                            {el}
                                        </TableSortLabel>
                                    </TableCell>
                                )
                            }
                        )}

                    </TableRow>
                </TableHead>

                <TableBody>
                    {dataSort && dataSort.map((el) => <DataTableRow key={el.id} dataRow={el}/>)}
                </TableBody>

            </Table>
        </TableContainer>
    )
}