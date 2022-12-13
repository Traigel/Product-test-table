import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import {DataTableBody} from './DataTableBody/DataTableBody';
import {getDocuments} from './dataTable-actions';
import {DataType} from './dataTable-reducer';
import {OrderType, useAppDispatch, useAppSelector, useDataSearch, useDataSort} from '../../common/hooks';
import Stack from '@mui/material/Stack';
import {TableSearch} from './TableSearch/TableSearch';
import Typography from '@mui/material/Typography';
import {DataTableHeader} from './DataTableHeader/DataTableHeader';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import BackspaceIcon from '@mui/icons-material/Backspace';
import Dialog from '@mui/material/Dialog';
import {CancelItemModal} from './CancelItemModal/CancelItemModal';

export const DataTable = () => {

  const dispatch = useAppDispatch()
  const data = useAppSelector(state => state.dataTable.data)

  useEffect(() => {
    dispatch(getDocuments())
  }, [])

  const [order, setOrder] = useState<OrderType>('asc');
  const [orderBy, setOrderBy] = useState<keyof DataType>('deliveryDate');
  const [columnSearch, setColumnSearch] = useState<string>('name');
  const [searchValue, setSearchValue] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);

  const handleModalClose = () => setOpenModal(false);
  const handleModalOpen = () => setOpenModal(true);

  const dataSort = useDataSort<DataType>(data, order, orderBy)
  const dataSearch = useDataSearch<DataType>(dataSort, columnSearch, searchValue)

  const cellsHeaders = data && Object.keys(data[0]).filter(el => el !== 'id' && el !== 'checked')

  const overallVolume = dataSearch && dataSearch.reduce((acc, cur) => acc + cur.volume, 0)
  const total = dataSearch && dataSearch.reduce((acc, cur) => acc + cur.total, 0)

  const checkedItem = data && data.filter(el => el.checked).reduce((acc: string[], cur) => ([...acc, cur.name]), [])

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
        <Table sx={{minWidth: 650}}>

          <DataTableHeader
            cellsHeaders={cellsHeaders}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />

          {dataSearch && dataSearch.map((el) => <DataTableBody key={el.id} dataRow={el}/>)}

        </Table>
      </TableContainer>

      <Stack margin={2} direction={'row'} justifyContent={'space-between'}>
        <Box>
          <Typography>Overall volume: {overallVolume}</Typography>
          <Typography>Total: {total}</Typography>
        </Box>

        <Button
          onClick={handleModalOpen}
          sx={{width: 150}}
          variant="contained"
        >
          <BackspaceIcon sx={{marginRight: 1}}/> Cancel
        </Button>
      </Stack>

      <Dialog open={openModal} onClose={handleModalClose}>
        <CancelItemModal checkedItem={checkedItem} onClose={handleModalClose}/>
      </Dialog>
    </Stack>
  )
}