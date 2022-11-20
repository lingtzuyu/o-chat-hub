import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getActions } from '../../../store/actions/card_actions';
import { connect } from 'react-redux';

const CategoryDropDown = ({
  cardCategories,
  setSelectedCategoryForNote,
  // fetchCardCategoryAction = () => {},
}) => {
  const [category, setCategory] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);

    setSelectedCategoryForNote(event.target.value);
    // TODO: 妥協作法
    localStorage.setItem('noteCategory', event.target.value);
    // pass the selected dropdown to state: https://stackoverflow.com/questions/65766376/in-react-how-to-pass-the-selected-dropdown-data-to-state
  };
  const handleClose = () => {
    // setSelectedCategoryForNote(category);
    setOpen(false);
  };

  const handleOpen = () => {
    // 每次按下SELECT就取得分類訊息並儲存在store中
    // fetchCardCategoryAction();
    setOpen(true);
  };

  // useEffect(() => {
  //   setSelectedCategoryForNote(category);
  // }, [category]);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="category-select-small">Category</InputLabel>
      <Select
        labelId="category-select-small"
        id="category-select-small"
        value={category}
        label="category"
        open={open}
        onChange={handleChange}
        onClose={handleClose}
        onOpen={handleOpen}
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

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(CategoryDropDown);
