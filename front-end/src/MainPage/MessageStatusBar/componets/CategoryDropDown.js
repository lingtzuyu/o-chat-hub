import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { connect } from 'react-redux';

const CategoryDropDown = ({ cardCategories }) => {
  const [category, setCardCategory] = useState('');

  const handleChange = (event) => {
    setCardCategory(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="category-select-small">Category</InputLabel>
      <Select
        labelId="category-select-small"
        id="category-select-small"
        value={category}
        label="category"
        onChange={handleChange}
      >
        {cardCategories?.map((category) => {
          return (
            <MenuItem value={category} key={category}>
              {category}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const mapStoreStateToProps = ({ card }) => {
  return { ...card };
};

export default connect(mapStoreStateToProps)(CategoryDropDown);
