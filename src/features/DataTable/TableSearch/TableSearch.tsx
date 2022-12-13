import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import React, {ChangeEvent} from 'react';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';

type TableSearchPropsType = {
  searchValue: string
  setSearchValue: (value: string) => void
  columnSearch: string
  cellsHeaders: string[] | null
  setColumnSearch: (value: string) => void
}

export const TableSearch = ({
                              cellsHeaders,
                              columnSearch,
                              setColumnSearch,
                              searchValue,
                              setSearchValue
                            }: TableSearchPropsType) => {

  const onChangeSelectHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setColumnSearch(event.target.value);

  const onChangeSearchValueHandler = (value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setSearchValue(value.target.value)

  return (
    <Box sx={{
      width: 500,
      margin: '30px auto',
      padding: '20px 25px 8px',
      backgroundColor: '#fff',
      borderRadius: '5px',
      boxShadow: '1px 1px 10px rgba(187, 187, 187, 0.35)'
    }}>
      <TextField
        sx={{width: 350}}
        label={'Search'}
        value={searchValue}
        onChange={onChangeSearchValueHandler}
        variant={'outlined'}
        InputProps={{endAdornment: <SearchIcon/>}}
      />
      <TextField
        sx={{width: 150}}
        select
        label="Table cell"
        value={columnSearch}
        onChange={onChangeSelectHandler}
        helperText="Table cell search"
      >
        {cellsHeaders && cellsHeaders.map((el, index) => (
          <MenuItem key={index} value={el}>
            {el}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}