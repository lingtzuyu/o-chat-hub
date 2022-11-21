import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';

import { connect } from 'react-redux';
import { getActions } from '../../store/actions/card_actions';
import store from '../../store/store';
import * as api from '../../api';

export const ExportCardMenu = ({ cardsToBeExporting, exportToNotion }) => {
  // TODO: redux 改
  const exportCard = store.getState().card.cardsToBeExporting;
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };
  const handleExport = () => {
    const exportedInfo = {
      notionTitle: inputValue,
      notionStatus: status,
      cardsToBeExporting: exportCard,
    };
    console.log(exportedInfo);
    api.exportToNotionAPI(exportedInfo);
    // exportToNotion(exportedInfo);
    setOpen(false);
    console.log(1);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>EXPORT TO NOTION</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        {/* <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="demo-customized-textbox">
            Notion Title
          </InputLabel>
          <BootstrapInput id="demo-customized-textbox" />
        </FormControl> */}
        <TextField
          required
          id="outlined-required"
          label="Notion Title"
          onChange={handleInput}
          defaultValue={inputValue}
        />
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Status</InputLabel>
              <Select
                native
                value={status}
                onChange={handleChange}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={10}>Backlog</option>
                <option value={20}>To Do</option>
                <option value={20}>In Progress</option>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleExport}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStoreStateToPropse = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStateToPropse,
  mapActionsToProps
)(ExportCardMenu);
