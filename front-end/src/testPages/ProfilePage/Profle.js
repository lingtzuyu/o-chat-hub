import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Divider,
  Stack,
  IconButton,
  TextField,
  Avatar,
  styled,
  useTheme,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import NotionLogin from '../../integration/notion/notion_login';

import Text from '../../shared/components/Text';
import Label from '../../shared/components/Lable';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Swal from 'sweetalert2';

import { connect } from 'react-redux';
import { getActions } from '../../store/actions/auth_actions';
import * as api from '../../api';

const CardActions = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(1.5)};
    top: ${theme.spacing(1.5)};
    z-index: 7;
  `
);

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

function Profile({ user, userName, setNewUserNameInStore }) {
  const accessToken = localStorage.getItem('accessToken');
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  // const [newUserName, setNewUserName] = useState(user.username);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(false);

  const handleCancel = () => {
    // 將editing狀態改為false
    setIsEditing(false);
  };
  // TODO: 空值的機制
  const handleConfirm = async () => {
    if (userName !== null) {
      setNewUserNameInStore(userName);
      setIsEditing(false);
    } else {
      setNewUserNameInStore(user.userName);
    }
    // 打api更改姓名 (當前在store的)
    // 成功後就toast alert

    const response = await api.updateUserName(accessToken, userName);
    if (response !== 200) {
      await Toast.fire({
        icon: 'warning',
        title: `Something went wrong, please change your username again`,
      });
    } else if (response === 200) {
      await Toast.fire({
        icon: 'success',
        title: `Change name to "${userName}"`,
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const valueChangeHandler = (event) => {
    // setNewUserName(event.target.value);
    setNewUserNameInStore(event.target.value);
  };

  // 若為空值則無法按下confirm

  return (
    <Card
      sx={{
        position: 'relative',
        textAlign: 'center',
        pt: 4,
        pb: 3,
        px: 3,
      }}
    >
      {/* 分類的圖片 */}
      <Avatar
        sx={{
          mx: 'auto',
          mb: 1.5,
          width: 114,
          height: 114,
          border: `${theme.colors.alpha.white[100]} solid 4px`,
          boxShadow: `0 0 0 3px #223354`,
        }}
        // 若已經Transferred顏色就改成${theme.colors.error.main}`
        src={user.photo}
        alt={user.username}
      />
      {/* 標題 */}
      {/* <Typography gutterBottom variant="h3"> */}
      {isEditing ? (
        <Box
          display="flex"
          justifyContent="center"
          sx={{ alignItems: 'center', align: 'center' }}
        >
          <TextField
            sx={{
              mt: 2,
              mb: 1,
            }}
            size="small"
            // 這邊也要從store來
            defaultValue={userName}
            onChange={valueChangeHandler}
            autoFocus
            required
          />
          <Tooltip title="Username can not be null">
            <span>
              <IconButton onClick={handleConfirm} disabled={isConfirmDisabled}>
                <CheckIcon />
              </IconButton>
            </span>
          </Tooltip>
          <IconButton onClick={handleCancel}>
            <ClearIcon />
          </IconButton>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          sx={{ alignItems: 'center', align: 'center' }}
        >
          <Typography gutterBottom variant="h3">
            {userName}
          </Typography>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </Box>
      )}
      {/* // {user.username} */}
      {/* </Typography> */}
      {/* Tag生成，如果有需要要map出來 [tags] */}
      {/* <Box py={2}>
        <Label color="info">Web developer</Label>
        <Box component="span" px={1}>
          <Label color="warning">Javascript</Label>
        </Box>
        <Label color="error">Angular</Label>
      </Box> */}
      {/* 筆記內文 */}
      <Typography
        sx={{
          px: { xs: 4, md: 8 },
        }}
        variant="subtitle2"
      >
        {user.mail}
      </Typography>
      <Divider
        sx={{
          mt: 3,
        }}
      />
      <Box>
        <Typography gutterBottom variant="h4">
          {/* <Link href="#" variant="body2">
            Notion Authentication
          </Link> */}
          <NotionLogin />
        </Typography>
        <Typography variant="subtitle2">{'Connected'}</Typography>
      </Box>
      <>
        <React.Fragment key={123}>
          <Divider />
          <ListItem>
            <ListItemAvatar>
              {/* TODO: 目前沒有AVATAR */}
              <Avatar alt="User" src={''} />
            </ListItemAvatar>
            <ListItemText
              // TODO: 改成吃username
              primary={<Text color="black">{'Sundar'}</Text>}
              primaryTypographyProps={{
                variant: 'h5',
                // noWrap: true,
              }}
              secondary={
                'This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages '
              }
              secondaryTypographyProps={{
                variant: 'subtitle2',
                // noWrap: true,
              }}
            />
          </ListItem>
        </React.Fragment>
      </>
      {/* 這邊要放message from以及內文的itemList */}
      <Divider
        sx={{
          mt: 3,
        }}
      />
      <Stack
        sx={{
          mt: 2.5,
          textAlign: 'center',
        }}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      >
        <Box>
          <Typography gutterBottom variant="h4">
            2022-12-30
          </Typography>
          <Typography variant="subtitle2">{'新增時間'}</Typography>
        </Box>
        <Box>
          <Typography gutterBottom variant="h4">
            2022-12-30
          </Typography>
          <Typography variant="subtitle2">{'新增時間'}</Typography>
        </Box>
        <Box>
          <Typography gutterBottom variant="h4">
            Sundar Pichai
          </Typography>
          <Typography variant="subtitle2">{'From'}</Typography>
        </Box>
        <Box>
          <Typography gutterBottom variant="h4">
            <Link href="#" variant="body2">
              Notion Link
            </Link>
          </Typography>
          <Typography variant="subtitle2">{'Exported'}</Typography>
        </Box>
      </Stack>
    </Card>
  );
}

const mapStoreStateToProps = ({ auth }) => {
  return { ...auth };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Profile);
