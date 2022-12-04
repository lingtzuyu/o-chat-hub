import React, { useState, forwardRef, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Grid,
  Slide,
  Divider,
  Tooltip,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  TextField,
  Button,
  Typography,
  Dialog,
  FormControl,
  Select,
  InputLabel,
  Zoom,
  InputAdornment,
  styled,
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { connect } from 'react-redux';
import { getActions } from '../../../store/actions/card_actions';

// https://stackoverflow.com/questions/64048890/react-apply-multiple-filters-to-array
const CardPageTopBar = ({ cards, setFilteredCards }) => {
  const [categoryMenu, setCategoryMenu] = useState();
  const [readMenu, setReadMenu] = useState();
  const [exportMenu, setExportMenu] = useState();

  const statusOptions = [
    {
      id: 'all',
      name: 'Show all',
    },
    {
      id: 'work',
      name: 'Work',
    },
    {
      id: 'knowledge',
      name: 'Knowledge',
    },
    {
      id: 'life',
      name: 'Life',
    },
  ];

  const readOptions = [
    {
      id: 'all',
      name: 'Show all',
    },
    {
      id: 'read',
      name: 'Read',
    },
    {
      id: 'unread',
      name: 'Unread',
    },
  ];

  const exportOptions = [
    {
      id: 'all',
      name: 'Show all',
    },
    {
      id: 'exported',
      name: 'Exported',
    },
    {
      id: 'unExported',
      name: 'Not yet export',
    },
  ];

  const handleCategoryChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setCategoryMenu(value);
    console.log(value);
  };

  const handleReadChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setReadMenu(value);
    console.log('read', value);
  };

  const handleExportChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setExportMenu(value);
    console.log(value);
  };

  const filterCategory = (array) => {
    if (categoryMenu) {
      const categoryFilterData = array.filter((item) => {
        return item.Category === categoryMenu;
      });
      return categoryFilterData;
    } else {
      return array;
    }
  };

  const filterRead = (array) => {
    if (readMenu) {
      if (readMenu === 'read') {
        const readFilterData = array.filter((item) => {
          return item.Liked === true;
        });
        return readFilterData;
      } else if (readMenu === 'unread') {
        const readFilterData = array.filter((item) => {
          return item.Liked === false;
        });
        return readFilterData;
      } else if (readMenu === 'all') {
        return array;
      }
    } else {
      return array;
    }
  };

  const filterExport = (array) => {
    if (exportMenu) {
      if (exportMenu === 'exported') {
        const exportFilterData = array.filter((item) => {
          return item.Transferred === true;
        });
        return exportFilterData;
      } else if (exportMenu === 'unExported') {
        const exportFilterData = array.filter((item) => {
          return item.Transferred === false;
        });
        return exportFilterData;
      } else if (exportMenu === 'all') {
        return array;
      }
    } else {
      return array;
    }
  };

  useEffect(() => {
    // 每次都從store拿出來重跑一次
    let filterCards = cards;
    filterCards = filterCategory(filterCards);
    filterCards = filterRead(filterCards);
    filterCards = filterExport(filterCards);
    console.log(filterCards);
    setFilteredCards(filterCards);
  }, [categoryMenu, readMenu, exportMenu]);

  return (
    <>
      <Card
        sx={{
          p: 2,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Grid alignItems="center" container spacing={3}>
          <Grid item xs={12} lg={4} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{'Category'}</InputLabel>
              <Select
                value={categoryMenu || 'all'}
                onChange={handleCategoryChange}
                label={'Category'}
              >
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={4} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{'Read'}</InputLabel>
              <Select
                value={readMenu || 'all'}
                onChange={handleReadChange}
                label={'Read'}
              >
                {readOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={4} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{'Export'}</InputLabel>
              <Select
                value={exportMenu || 'all'}
                onChange={handleExportChange}
                label={'Export'}
              >
                {exportOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

const mapStoreStateToProps = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(CardPageTopBar);
