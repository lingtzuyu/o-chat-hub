import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const notionPriority = ['Low', 'Medium', 'High'];

const NotioinPriorityDropDown = () => {
  const [priority, setPriority] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setPriority(event.target.value);

    // setSelectedCategoryForNote(event.target.value);
    // TODO: 妥協作法
    // localStorage.setItem('noteCategory', event.target.value);
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
    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium" fullWidth>
      <InputLabel id="priority-select-small">Priority</InputLabel>
      <Select
        labelId="priority-select-small"
        id="priority-select-small"
        value={priority}
        label="priority"
        open={open}
        onChange={handleChange}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        {notionPriority?.map((priority) => {
          return (
            <MenuItem value={priority} key={priority}>
              {priority}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default NotioinPriorityDropDown;
