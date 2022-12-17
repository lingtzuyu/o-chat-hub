import React, { useState } from 'react';
import {
  Box,
  Card,
  alpha,
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
  CardActionArea,
  Grid,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import NotionIcon from '../../shared/images/notion-icon.png';
import TrelloIcon from '../../shared/images/trello-icon.png';

import Text from '../../shared/components/Text';
import Label from '../../shared/components/Lable';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Swal from 'sweetalert2';

import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import ContactSupportTwoToneIcon from '@mui/icons-material/ContactSupportTwoTone';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import AddLinkTwoToneIcon from '@mui/icons-material/AddLinkTwoTone';
import LinkOffTwoToneIcon from '@mui/icons-material/LinkOffTwoTone';
import InsertLinkTwoToneIcon from '@mui/icons-material/InsertLinkTwoTone';
import AutorenewTwoToneIcon from '@mui/icons-material/AutorenewTwoTone';
import LinkIcon from '@mui/icons-material/Link';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/auth_actions';
import * as api from '../../api';
import { GiWindowBars } from 'react-icons/gi';

const CardActions = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(1.5)};
    top: ${theme.spacing(1.5)};
    z-index: 7;
  `,
);

const CardActionAreaWrapper = styled(Box)(
  ({ theme }) => `
        text-align: center;
        background: ${alpha(theme.colors.primary.main, 0.03)};

        .MuiTouchRipple-root {
          opacity: .2;
        }
  
        .MuiCardActionArea-focusHighlight {
          background: ${theme.colors.primary.main};
        }
  
        &:hover {
          .MuiCardActionArea-focusHighlight {
            opacity: .05;
          }
        }
  `,
);

const DotLegend = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`,
);

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

function Profile({
  user,
  userName,
  userInfoDetail,
  setNewUserNameInStore,
  organizationInStore,
  setNewOrganizationInStore,
}) {
  console.log(user.notiondblink);
  const notionOauthClient = process.env.REACT_APP_NOTION_OAUTHID;
  console.log(notionOauthClient);
  const accessToken = localStorage.getItem('accessToken');
  const userId = userInfoDetail?.id;
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  // const [newUserName, setNewUserName] = useState(user.username);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(false);

  const handleCancel = () => {
    // 將editing狀態改為false
    setIsEditing(false);
    setNewUserNameInStore(user.username);
  };
  // TODO: 空值的機制
  const handleConfirm = async () => {
    if (userName !== null || '' || undefined) {
      setNewUserNameInStore(userName);
      setIsEditing(false);
    } else {
      setNewUserNameInStore(user.username);
    }
    // 打api更改姓名 (當前在store的)
    // 成功後就toast alert

    const response = await api.updateUserName(
      accessToken,
      userName,
      organizationInStore,
    );
    if (response !== 200) {
      await Toast.fire({
        icon: 'warning',
        title: `Something went wrong, plase try again`,
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

  const organizationChangeHandler = (event) => {
    console.log(event.target.value);
    setNewOrganizationInStore(event.target.value);
  };

  // Notion Connect
  const handleNotionConnect = async () => {
    // TODO: 待刪除，已經用直連代替了
    Swal.fire({
      title: 'Are you sure?',
      html: `<p>This will removed the original linked notion (if exists)and build a new one, your current linked notion page is<a href = ${user?.notiondblink} >${user?.notiondblink}</a></p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:
        'Remove the current one (if exists) and build a new linked notion',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await api.clearNotionLinkForever(accessToken);
        console.log(result);
        if (result.status === 200) {
          console.log('ready to link new notion');
          window.location.href = `https://api.notion.com/v1/oauth/authorize?client_id=${notionOauthClient}&response_type=code&owner=user`;
        }
      }
    });
  };

  // TODO: 待改，不能從local拿，不安全
  const handleNotionDisconnect = async () => {
    // 改 user 狀態 以及 notionaccess狀態
    Swal.fire({
      title: 'Are you sure?',
      html: `<p>The following Notion will be disconnected from your account!<p><b>Notion Link:</b> <a href = ${user.notiondblink} >${user.notiondblink}</a></p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remove',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const responseCode = await api.setNotionDisconnect(userId, accessToken);
        if (responseCode !== 200) {
          Toast.fire({
            icon: 'warning',
            title: `Something went wrong, please try again`,
          });
        }
        Toast.fire({
          icon: 'success',
          title: `${user.notiondblink} has been disconnected`,
        });
        window.location.pathname = '/profile';
      }
    });
  };

  const handleRecover = () => {
    // 拿userId及token去回復
    Swal.fire({
      title: 'Recover the previous notion DB',
      html: `<p>The previous Notion will be recovered and linked to your account again!<p><b>Notion Link:</b> <a href = ${user.notiondblink} >${user.notiondblink}</a></p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Recover',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const responseCode = await api.recoverPreviousNotionConnect(
          userId,
          accessToken,
        );
        console.log(responseCode);
        if (responseCode !== 200) {
          Toast.fire({
            icon: 'warning',
            title: `Something went wrong, please try again`,
          });
        }
        Toast.fire({
          icon: 'success',
          title: `${user.notiondblink} has been reconnected`,
        });
        window.location.pathname = '/profile';
      }
    });
  };

  const lastLoginLocalDate = new Date(user.lastlogin).toDateString();
  const lastLoginLocalTime = new Date(user.lastlogin);
  const lastLoginLocalClock = `${lastLoginLocalTime
    .getHours()
    .toString()
    .padStart(2, '0')}:${lastLoginLocalTime
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
  const joinTime = new Date(user.createddate).toDateString();

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
            label="usernae"
            variant="filled"
            size="small"
            // 這邊也要從store來
            defaultValue={userName}
            onChange={valueChangeHandler}
            autoFocus
            required
          />

          {/* 改公司名稱 */}
          <TextField
            sx={{
              mt: 2,
              mb: 1,
              marginLeft: '10px',
            }}
            label="company"
            variant="filled"
            size="small"
            // 這邊也要從store來
            defaultValue={organizationInStore}
            onChange={organizationChangeHandler}
            autoFocus
            required
          />
          <Box marginLeft="10px">
            <Tooltip title="Username can not be null">
              <span>
                <IconButton
                  onClick={handleConfirm}
                  disabled={isConfirmDisabled}
                >
                  <CheckIcon />
                </IconButton>
              </span>
            </Tooltip>
            <IconButton onClick={handleCancel}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          sx={{ alignItems: 'center', align: 'center' }}
        >
          <Box
            display="flex"
            justifyContent="center"
            sx={{ alignItems: 'center', align: 'center' }}
          >
            <Typography gutterBottom variant="h3">
              {userName}
            </Typography>
            <Tooltip title="Change display username">
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography
            sx={{
              px: { xs: 4, md: 8 },
            }}
            variant="subtitle2"
          >
            {organizationInStore}
          </Typography>
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
      {/* <Typography
        sx={{
          px: { xs: 4, md: 8 },
        }}
        variant="subtitle2"
      >
        {user.organization}
      </Typography> */}
      <Divider
        sx={{
          mt: 3,
        }}
      />
      <Box>
        <Box p={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardActionAreaWrapper
                  sx={{
                    p: 2,
                  }}
                >
                  <Box>
                    <img
                      src={NotionIcon}
                      style={{ width: 60, borderRadius: 10 }}
                      alt="take-notes.chat"
                    />
                  </Box>

                  <Typography variant="h4">{'Notion'}</Typography>

                  {/* <Typography
                      sx={{
                        fontSize: `${theme.typography.pxToRem(11)}`,
                        lineHeight: 1,
                      }}
                      variant="subtitle2" */}

                  {/* TODO: 待搬出去 */}

                  {user.notionConnect === 1 ? (
                    <Box
                      marginTop="10px"
                      display="flex"
                      alignItems="flex-start"
                      justifyContent={'center'}
                    >
                      <DotLegend
                        style={{
                          background: `${theme.colors.success.main}`,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: `${theme.typography.pxToRem(11)}`,
                          lineHeight: 1,
                        }}
                        variant="subtitle2"
                      >
                        <Text color="success">connected</Text>
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      marginTop="10px"
                      display="flex"
                      alignItems="flex-start"
                      justifyContent={'center'}
                    >
                      <DotLegend
                        style={{
                          background: `${theme.colors.warning.main}`,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: `${theme.typography.pxToRem(11)}`,
                          lineHeight: 1,
                        }}
                        variant="subtitle2"
                      >
                        <Text color="warning">disconnected</Text>
                      </Typography>
                    </Box>
                  )}
                  {/* // <Text color="success">{user.notionConnect}</Text> */}
                  {/* </Typography> */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    {user.notionConnect === 1 ? (
                      <Box>
                        <Tooltip title="Go to linked notion">
                          <Link href={`${user.notiondblink}`}>
                            <IconButton>
                              <InsertLinkTwoToneIcon />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        <Tooltip title="disconnect to Notion">
                          <IconButton onClick={handleNotionDisconnect}>
                            <LinkOffTwoToneIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ) : (
                      <Box>
                        <Tooltip title="Recover previous linked db">
                          <IconButton onClick={handleRecover}>
                            <AutorenewTwoToneIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="remove the current linked notion (if exists) and build a new linked Notion db">
                          {/* <Link
                      href={`https://api.notion.com/v1/oauth/authorize?client_id=${notionOauthClient}&response_type=code&owner=user`}
                    > */}
                          <IconButton onClick={handleNotionConnect}>
                            <AddLinkTwoToneIcon color="action" />
                          </IconButton>
                          {/* </Link> */}
                        </Tooltip>
                      </Box>
                    )}
                  </Box>
                </CardActionAreaWrapper>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardActionAreaWrapper
                  sx={{
                    p: 2,
                  }}
                >
                  <Box>
                    <img
                      src={TrelloIcon}
                      style={{ width: 60, borderRadius: 10 }}
                      alt="take-notes.chat"
                    />
                  </Box>

                  <Typography variant="h4">{'Trello'}</Typography>

                  {/* <Typography
                      sx={{
                        fontSize: `${theme.typography.pxToRem(11)}`,
                        lineHeight: 1,
                      }}
                      variant="subtitle2" */}

                  {/* TODO: 待搬出去 */}

                  {user.trelloConnect === 1 ? (
                    <Box
                      marginTop="10px"
                      display="flex"
                      alignItems="flex-start"
                      justifyContent={'center'}
                    >
                      <DotLegend
                        style={{
                          background: `${theme.colors.success.main}`,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: `${theme.typography.pxToRem(11)}`,
                          lineHeight: 1,
                        }}
                        variant="subtitle2"
                      >
                        <Text color="success">connected</Text>
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      marginTop="10px"
                      display="flex"
                      alignItems="flex-start"
                      justifyContent={'center'}
                    >
                      <DotLegend
                        style={{
                          background: `${theme.colors.warning.main}`,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: `${theme.typography.pxToRem(11)}`,
                          lineHeight: 1,
                        }}
                        variant="subtitle2"
                      >
                        <Text color="warning">disconnected</Text>
                      </Typography>
                    </Box>
                  )}
                  {/* // <Text color="success">{user.notionConnect}</Text> */}
                  {/* </Typography> */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    {user.trelloConnect === 1 ? (
                      <Box>
                        <Tooltip title="Go to linked trello">
                          {/* TODO: 待改，先用# */}
                          <Link href={`#`}>
                            <IconButton>
                              <InsertLinkTwoToneIcon />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        <Tooltip title="disconnect to Trello">
                          {/* TODO: 待改，先移除onClick */}
                          <IconButton>
                            <LinkOffTwoToneIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ) : (
                      <Box>
                        <Tooltip title="Recover previous linked trello">
                          {/* TODO: 待改，先移除onClick */}
                          <IconButton>
                            <AutorenewTwoToneIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="connect to Trello (build a new linked Trello account)">
                          {/* TODO: 待改，先移除onClick */}
                          <Link href={`#`}>
                            <IconButton>
                              <AddLinkTwoToneIcon />
                            </IconButton>
                          </Link>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>
                </CardActionAreaWrapper>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>

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
            {lastLoginLocalDate} {lastLoginLocalClock}
          </Typography>
          <Typography variant="subtitle2">{'Last Login'}</Typography>
        </Box>
        <Box>
          <Typography gutterBottom variant="h4">
            {joinTime}
          </Typography>
          <Typography variant="subtitle2">{'Join Time'}</Typography>
        </Box>
        <Box>
          <Typography gutterBottom variant="h4">
            {user.mail}
          </Typography>
          <Typography variant="subtitle2">{'Register Email'}</Typography>
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
