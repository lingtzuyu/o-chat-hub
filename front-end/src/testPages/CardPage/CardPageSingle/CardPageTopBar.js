import React, { useState, forwardRef } from 'react';
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

export default function CardPageTopBar() {
  const [filters, setFilters] = useState({
    status: null,
  });

  const [query, setQuery] = useState('');

  const statusOptions = [
    {
      id: 'all',
      name: 'Show all',
    },
    {
      id: 'pending',
      name: 'Pending Payment',
    },
    {
      id: 'completed',
      name: 'Completed',
    },
    {
      id: 'draft',
      name: 'Draft',
    },
    {
      id: 'progress',
      name: 'In Progress',
    },
  ];
  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

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
          {/* <Grid item xs={12} lg={7} md={6}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                m: 0,
              }}
              onChange={handleQueryChange}
              placeholder={'Search invoices by client name ...'}
              value={query}
              fullWidth
              variant="outlined"
            />
          </Grid> */}
          <Grid item xs={12} lg={4} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{'Category'}</InputLabel>
              <Select
                value={filters.status || 'all'}
                onChange={handleStatusChange}
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
              <InputLabel>{'Like'}</InputLabel>
              <Select
                value={filters.status || 'all'}
                onChange={handleStatusChange}
                label={'Like'}
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
              <InputLabel>{'Export'}</InputLabel>
              <Select
                value={filters.status || 'all'}
                onChange={handleStatusChange}
                label={'Export'}
              >
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
