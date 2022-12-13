import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import {DataType, setAllChecked} from '../dataTable-reducer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import React, {ChangeEvent} from 'react';
import {OrderType, useAppDispatch, useAppSelector} from '../../../common/hooks';
import TableHead from '@mui/material/TableHead';

type DataTableHeaderPropsType = {
  cellsHeaders: string[] | null
  order: OrderType
  setOrder: (value: OrderType) => void
  orderBy: keyof DataType
  setOrderBy: (value: keyof DataType) => void
}

export const DataTableHeader = ({cellsHeaders, order, orderBy, setOrder, setOrderBy}: DataTableHeaderPropsType) => {

  const dispatch = useAppDispatch()
  const allChecked = useAppSelector(state => state.dataTable.allChecked)

  const onChangeTableHeadHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setAllChecked({checked: e.currentTarget.checked}))

  return (
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
                align={'right'}
                sortDirection={orderBy === el ? order : false}
                sx={{fontWeight: 600, fontSize: 18}}
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
  )
}
