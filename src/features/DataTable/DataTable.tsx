import React, {ChangeEvent, useEffect, useState} from 'react';
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
import {DataType, setAllChecked} from './dataTable-reducer';
import {OrderType, useAppDispatch, useAppSelector, useDataSearch, useDataSort} from '../../common/hooks';
import Stack from '@mui/material/Stack';
import {TableSearch} from './TableSearch/TableSearch';
import Checkbox from '@mui/material/Checkbox';

export const DataTable = () => {

    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.dataTable.data)
    const allChecked = useAppSelector(state => state.dataTable.allChecked)

    useEffect(() => {
        dispatch(getDocuments())
    }, [])

    const [order, setOrder] = useState<OrderType>('asc');
    const [orderBy, setOrderBy] = useState<keyof DataType>('deliveryDate');
    const [columnSearch, setColumnSearch] = useState<string>('name');
    const [searchValue, setSearchValue] = useState<string>('');

    const dataSort = useDataSort<DataType>(data, order, orderBy)
    const dataSearch = useDataSearch<DataType>(dataSort, columnSearch, searchValue)

    const cellsHeaders = data && Object.keys(data[0]).filter(el => el !== 'id' && el !== 'checked')

    const onChangeTableHeadHandler = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(setAllChecked({checked: e.currentTarget.checked}))

    return (
        <Stack>
            <TableSearch
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                columnSearch={columnSearch}
                setColumnSearch={setColumnSearch}
                cellsHeaders={cellsHeaders}
            />

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    checked={allChecked}
                                    onChange={onChangeTableHeadHandler}
                                />
                            </TableCell>
                            {cellsHeaders && cellsHeaders.map((el, index) => {
                                    const onClickHandler = () => {
                                        if (orderBy === el) setOrder(order === 'asc' ? 'desc' : 'asc')
                                        else {
                                            setOrder('asc')
                                            setOrderBy(el as keyof DataType)
                                        }
                                    };

                                    return (
                                        <TableCell
                                            key={index}
                                            sortDirection={orderBy === el ? order : false}
                                            className={styles.headerRow}
                                        >
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
                        {dataSearch && dataSearch.map((el) => <DataTableRow key={el.id} dataRow={el}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>

    )
}