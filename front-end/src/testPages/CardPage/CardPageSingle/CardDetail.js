import React, { useState, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  alpha,
  Typography,
  Divider,
  Stack,
  IconButton,
  Avatar,
  styled,
  useTheme,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid,
  Tooltip,
  TextField,
  Button,
  Popover,
  List,
} from '@mui/material';
import NotionIcon from '../../../shared/images/notion-icon.png';
import TrelloIcon from '../../../shared/images/trello-icon.png';
import Text from '../../../shared/components/Text';
import Label from '../../../shared/components/Lable';
import Scrollbar from '../../../shared/components/Scrollbar';
import ExportPopoutTable from '../Component/ExportPopoutTable';

import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import AddLinkTwoToneIcon from '@mui/icons-material/AddLinkTwoTone';
import LinkOffTwoToneIcon from '@mui/icons-material/LinkOffTwoTone';
import InsertLinkTwoToneIcon from '@mui/icons-material/InsertLinkTwoTone';
import AutorenewTwoToneIcon from '@mui/icons-material/AutorenewTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import ImportExportTwoToneIcon from '@mui/icons-material/ImportExportTwoTone';
import DraftsIcon from '@mui/icons-material/Drafts';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';

// category icons
import WorkIcon from '../../../shared/images/Icons/work_icon.png';
import KnowledgeIcon from '../../../shared/images/Icons/bachelor_icon.png';
import LifeIcon from '../../../shared/images/Icons/bar_icon.png';
import LikeIcon from '../../../shared/images/Icons/read_icon.png';
import UnlikeIcon from '../../../shared/images/Icons/notread_icon.png';
import IntegrationIcon from '../../../shared/images/Icons/integration_icon.png';
import APIIcon from '../../../shared/images/Icons/api_icon.png';

import SmsTwoToneIcon from '@mui/icons-material/SmsTwoTone';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';

// mock
import Sundar from '../../../shared/images/mock/sundar_head.jpg';

// api
import * as api from '../../../api';

// alt
import AltHeadshot from '../../../shared/images/alt/alt_headshot.jpg';

// alert
import Swal from 'sweetalert2';

// input table
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { getActions } from '../../../store/actions/card_actions';
import { setChosenChatDetails } from '../../../store/actions/chat_actions';
import { connect } from 'react-redux';

const CardActions = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(1.5)};
    top: ${theme.spacing(1.5)};
    z-index: 7;
  `,
);

const EditorWrapper = styled(Box)(
  ({ theme }) => `

    .ql-editor {
      min-height: 300px;
      width: 600px;
    }

    .ql-snow .ql-picker {
      color: ${theme.colors.alpha.black[100]};
    }

    .ql-snow .ql-stroke {
      stroke: ${theme.colors.alpha.black[100]};
    }

    .ql-toolbar.ql-snow {
      border-top-left-radius: ${theme.general.borderRadius};
      border-top-right-radius: ${theme.general.borderRadius};
    }

    .ql-toolbar.ql-snow,
    .ql-container.ql-snow {
      border-color: ${theme.colors.alpha.black[30]};
    }

    .ql-container.ql-snow {
      border-bottom-left-radius: ${theme.general.borderRadius};
      border-bottom-right-radius: ${theme.general.borderRadius};
    }

    &:hover {
      .ql-toolbar.ql-snow,
      .ql-container.ql-snow {
        border-color: ${theme.colors.alpha.black[50]};
      }
    }
`,
);

const ListWrapper = styled(List)(
  () => `
    .MuiListItem-root:last-of-type + .MuiDivider-root {
        display: none;
    }
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

function CardDetail({
  category,
  from,
  fromMail,
  title,
  messageRecords,
  notes,
  liked,
  transferred,
  fromId,
  noteDate,
  mapId,
  exportLink,
  userInfoDetail,
  setChosenChatDetails,
  forwardToTarget,
  friends,
}) {
  const theme = useTheme();
  const ref = useRef(null);
  const forwardTo = useNavigate();

  const items = [
    {
      id: 1,
      name: 'Notion',
      avatar: NotionIcon,
      connected: userInfoDetail?.notionConnect,
      buttonDisabled: userInfoDetail?.notionConnect === 1 ? false : true,
    },
    {
      id: 2,
      name: 'Trello',
      avatar: TrelloIcon,
      connected: userInfoDetail?.trelloConnect,
      buttonDisabled: userInfoDetail?.trelloConnect === 1 ? false : true,
    },
  ];

  const categoryData = [
    {
      id: 1,
      name: 'work',
      avatar: WorkIcon,
    },
    {
      id: 2,
      name: 'life',
      avatar: LifeIcon,
    },
    {
      id: 3,
      name: 'knowledge',
      avatar: KnowledgeIcon,
    },
  ];

  // notes & title
  const [isEditing, setIsEditing] = useState(false);
  // state
  const [isEditingState, setIsEditingState] = useState(true);

  const [initialTitle, setInitialTitle] = useState(title);
  const [initialNotes, setInitialNotes] = useState(notes);
  // 是否已閱讀，從liked來
  const [initailLiked, setInitailLiked] = useState(liked);
  // 此頁面的popover
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // export頁面
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);

  const [isTransferred, setIsTransferred] = useState(transferred);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [initialCategory, setInitialCategory] = useState(category);

  const token = localStorage.getItem('accessToken');
  const userId = userInfoDetail?.id;

  // edit 標題及內文
  const handleEditTitle = () => {
    setIsEditing(true);
  };

  // title value change
  const titleChangeHandler = (event) => {
    console.log(event.target.value);
    setInitialTitle(event.target.value);
  };

  const notesChangeHandler = (event) => {
    console.log(event);
    setInitialNotes(event);
  };

  // 確認後送出api及改變資料
  const handleSaveNotesChange = async () => {
    setIsEditing(false);
    // 帶著initialNotes，initialTitle，mapId打 API
    const result = await api.modifyCardTitleAndNotes(
      mapId,
      initialTitle,
      initialNotes,
      token,
    );
    if (result === 200) {
      Toast.fire({
        icon: 'success',
        title: 'Notes and title has been modified!',
      });
    } else {
      Toast.fire({
        icon: 'warning',
        title: 'Please try again!',
      });
    }
  };

  const handleCancelChange = () => {
    setIsEditing(false);
    setInitialNotes(notes);
    setInitialTitle(title);
    Toast.fire({
      icon: 'warning',
      title: 'Cancel modification!',
    });
  };

  const handleLockedNotes = () => {
    Swal.fire({
      icon: 'error',
      title: 'This notes has been exported',
      text: 'Single source of truth is important, please check the place where you exported this note, ex: Notion',
      footer: `<a href=${exportLink}>Exported Link</a>`,
    });
  };

  // 將已閱讀改為未閱讀
  const handleRemoveFromRead = async () => {
    setInitailLiked(false);
    const response = await api.dislikeCard({ token: token, cardId: mapId });
    if (response.status === 200) {
      Toast.fire({
        icon: 'success',
        title: 'Remove from read!',
      });
    } else {
      Toast.fire({
        icon: 'warning',
        title: 'Please try again!',
      });
    }
  };

  // 將未閱讀改為已閱讀
  const handleAddToRead = async () => {
    setInitailLiked(true);
    const response = await api.likeCard({ token: token, cardId: mapId });
    if (response.status === 200) {
      Toast.fire({
        icon: 'success',
        title: 'Add to read!',
      });
    } else {
      Toast.fire({
        icon: 'warning',
        title: 'Please try again!',
      });
    }
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  const handleExport = () => {
    handleClosePopover();
    setIsPopoutOpen(true);
  };

  const handleOpenPopover = () => {
    setIsPopoverOpen(true);
  };

  const handleCloseExportPopout = () => {
    setIsPopoutOpen(false);
  };

  const openCategoryChangePopout = () => {
    setIsCategoryOpen(true);
  };

  const handleCloseCategoryPopout = () => {
    setIsCategoryOpen(false);
  };

  const handleChangeCategory = async (e) => {
    const categoryChange = e.target.value;
    console.log(categoryChange);
    const response = await api.updateCategory(token, mapId, categoryChange);
    setIsCategoryOpen(false);
    console.log(response);
    if (response.status === 200) {
      Toast.fire({
        icon: 'success',
        title: `Change category to ${categoryChange}`,
      });
      setInitialCategory(categoryChange);
    } else {
      Toast.fire({
        icon: 'warning',
        title: 'Please try again',
      });
    }
  };

  const getFriendUserNameAndForward = async () => {
    const result = await api.getFriendUserName(fromId, userId, token);
    if (result.status !== 200) {
      Toast.fire({
        icon: 'warning',
        title: 'Please try again',
      });
    } else {
      // 設定target的id及username
      // TODO: 目前這邊無用，跳轉過去帶不了狀態
      const targetId = result.data.data.id;
      const targetUserName = result.data.data.username;
      const chatDetails = { id: targetId, name: targetUserName };
      await forwardToTarget(chatDetails, 'DIRECT', false);
      forwardTo('/homepage');
    }
  };

  const setFromPicture = (friendId) => {
    const target = friends.find((ele) => ele.id === friendId);
    if (target !== undefined || null) {
      return target?.photo;
    } else {
      // 上方沒東西就是自己
      return userInfoDetail?.photo;
    }
  };

  // 從friends find當前用戶的username
  const setCurrentUserName = (friendId) => {
    const target = friends.find((ele) => ele.id === friendId);
    if (target !== undefined || null) {
      return target?.username;
    } else {
      // 上方沒東西就是自己
      return userInfoDetail?.username;
    }
  };

  return (
    <Box marginTop={'30px'} padding={'10px'}>
      <Card
        sx={{
          position: 'relative',
          textAlign: 'center',
          pt: 4,
          pb: 3,
          px: 3,
        }}
      >
        {transferred ? (
          <>
            {/* 標題 */}
            <Box
              display="flex"
              justifyContent="center"
              sx={{ alignItems: 'center', align: 'center' }}
            >
              <Typography gutterBottom variant="h2">
                {initialTitle}
              </Typography>
              {/* Edit 用 */}
              <Tooltip title="The exported notes can't be modified, single source of truth is important! Please check the place you export this notes for further info!">
                <IconButton color="primary" onClick={handleLockedNotes}>
                  <LockIcon />
                </IconButton>
              </Tooltip>
            </Box>
            {/* 筆記內文 */}
            <Box
              display="flex"
              justifyContent="center"
              sx={{ alignItems: 'center', align: 'center' }}
            >
              <Typography
                sx={{
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  px: { xs: 4, md: 8 },
                  fontSize: 20,
                }}
                variant="inherit"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: initialNotes,
                  }}
                  style={{ textAlign: 'left' }}
                />
              </Typography>
            </Box>
          </>
        ) : isEditing ? (
          <>
            <Box
              display="flex"
              justifyContent="center"
              sx={{ alignItems: 'center', align: 'center' }}
            >
              <TextField
                sx={{
                  mt: 2,
                  mb: 1,
                  width: '600px',
                }}
                size="small"
                // 這邊也要從store來
                lable="title"
                defaultValue={initialTitle}
                placeholder="title"
                onChange={titleChangeHandler}
                autoFocus
                required
              />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              sx={{ alignItems: 'center', align: 'center' }}
            >
              <EditorWrapper>
                <ReactQuill
                  defaultValue={initialNotes}
                  onChange={notesChangeHandler}
                  placeholder={'Notes here...'}
                />
              </EditorWrapper>
            </Box>
            <Stack
              sx={{
                mt: 2.5,
                textAlign: 'center',
              }}
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Box marginRight="30px">
                <Button
                  startIcon={<CheckIcon />}
                  onClick={handleSaveNotesChange}
                  variant="contained"
                >
                  {'Confirm'}
                </Button>
              </Box>
              <Box marginLeft="30px">
                <Button
                  startIcon={<ClearIcon />}
                  variant="contained"
                  onClick={handleCancelChange}
                >
                  {'Cancel'}
                </Button>
              </Box>
            </Stack>
          </>
        ) : (
          <>
            {/* 標題 */}
            <Box
              display="flex"
              justifyContent="center"
              sx={{ alignItems: 'center', align: 'center' }}
            >
              <Typography gutterBottom variant="h2">
                {initialTitle}
              </Typography>
              {/* Edit 用 */}
              <Tooltip title="Change title or notes">
                <IconButton color="primary" onClick={handleEditTitle}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Box>
            {/* 筆記內文 */}
            <Box
              display="flex"
              justifyContent="center"
              sx={{ alignItems: 'center', align: 'center' }}
            >
              <Typography
                sx={{
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  px: { xs: 4, md: 8 },
                  fontSize: 20,
                }}
                variant="inherit"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: initialNotes,
                  }}
                  style={{ textAlign: 'left' }}
                />
              </Typography>
            </Box>
          </>
        )}

        {/* 狀態 1. 分類 2. notetime 3. Transferred 4. From */}
        <Box marginTop="15px">
          <Box p={2}>
            <Grid container spacing={4}>
              {/* 分類 */}
              <Grid item xs={12} sm={3}>
                {initialCategory === 'work' ? (
                  <Card variant="outlined" sx={{ backgroundColor: '#EAF6F6' }}>
                    <CardActionAreaWrapper
                      sx={{
                        p: 2,
                      }}
                    >
                      <Box>
                        <img
                          src={WorkIcon}
                          style={{ width: 60, borderRadius: 10 }}
                          alt="Work"
                        />
                      </Box>

                      <Typography variant="h3">{'Work'}</Typography>

                      {/* <Typography
                      sx={{
                        fontSize: `${theme.typography.pxToRem(11)}`,
                        lineHeight: 1,
                      }}
                      variant="subtitle2" */}

                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="#111145">Category</Text>
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        marginTop="10px"
                      >
                        <Box>
                          <Tooltip title="Change Category">
                            <IconButton color="primary" size="small">
                              <BorderColorTwoToneIcon
                                ref={ref}
                                onClick={openCategoryChangePopout}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Popover
                          disableScrollLock
                          anchorEl={ref.current}
                          open={isCategoryOpen}
                          onClose={handleCloseCategoryPopout}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                          <Box minWidth={360} maxWidth={360}>
                            {/* 最上方的Box */}

                            {/* 這邊未來可以做成串接用 */}
                            <Box
                              sx={{
                                height: 200,
                              }}
                            >
                              <Scrollbar>
                                <ListWrapper disablePadding>
                                  {categoryData.map((item) => (
                                    <Fragment key={item.id}>
                                      <ListItem
                                        sx={{
                                          py: 1.5,
                                          '&:hover': {
                                            background: `${theme.colors.alpha.black[5]}`,
                                          },
                                        }}
                                        secondaryAction={
                                          // TODO: 改成transferSwal彈出視窗
                                          <Button
                                            value={item.name}
                                            onClick={handleChangeCategory}
                                            size="small"
                                            variant="text"
                                            color="secondary"
                                            sx={{
                                              alignSelf: 'center',
                                              padding: `${theme.spacing(
                                                0.5,
                                                1.5,
                                              )}`,
                                              backgroundColor: `${theme.colors.secondary.lighter}`,
                                              textTransform: 'uppercase',
                                              fontSize: `${theme.typography.pxToRem(
                                                11,
                                              )}`,
                                              '&:hover': {
                                                backgroundColor: `${theme.colors.secondary.main}`,
                                                color: `${theme.palette.getContrastText(
                                                  theme.colors.secondary.main,
                                                )}`,
                                              },
                                            }}
                                          >
                                            {'Change'}
                                          </Button>
                                        }
                                      >
                                        {/* notion app icon */}
                                        <ListItemAvatar
                                          sx={{
                                            minWidth: 38,
                                            mr: 1,
                                          }}
                                        >
                                          <Avatar
                                            sx={{
                                              width: 38,
                                              height: 38,
                                            }}
                                            alt={item.name}
                                            src={item.avatar}
                                          />
                                        </ListItemAvatar>
                                        <ListItemText
                                          sx={{
                                            flexGrow: 0,
                                            maxWidth: '50%',
                                            flexBasis: '50%',
                                          }}
                                          disableTypography
                                          primary={
                                            <Typography
                                              sx={{
                                                pb: 0.6,
                                              }}
                                              color="text.primary"
                                              variant="h5"
                                            >
                                              {item.name}
                                            </Typography>
                                          }
                                        />
                                      </ListItem>
                                      <Divider />
                                    </Fragment>
                                  ))}
                                </ListWrapper>
                              </Scrollbar>
                            </Box>
                            <Divider />
                          </Box>
                        </Popover>
                      </Box>
                    </CardActionAreaWrapper>
                  </Card>
                ) : null}
                {initialCategory === 'life' ? (
                  <Card variant="outlined" sx={{ backgroundColor: '#C4DDFF' }}>
                    <CardActionAreaWrapper
                      sx={{
                        p: 2,
                      }}
                    >
                      <Box>
                        <img
                          src={LifeIcon}
                          style={{ width: 60, borderRadius: 10 }}
                          alt="Work"
                        />
                      </Box>

                      <Typography variant="h3">{'Life'}</Typography>

                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="#111145">Category</Text>
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        marginTop="10px"
                      >
                        <Box>
                          <Tooltip title="Change Category">
                            <IconButton color="primary" size="small">
                              <BorderColorTwoToneIcon
                                ref={ref}
                                onClick={openCategoryChangePopout}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Popover
                          disableScrollLock
                          anchorEl={ref.current}
                          open={isCategoryOpen}
                          onClose={handleCloseCategoryPopout}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                          <Box minWidth={360} maxWidth={360}>
                            {/* 最上方的Box */}

                            {/* 這邊未來可以做成串接用 */}
                            <Box
                              sx={{
                                height: 200,
                              }}
                            >
                              <Scrollbar>
                                <ListWrapper disablePadding>
                                  {categoryData.map((item) => (
                                    <Fragment key={item.id}>
                                      <ListItem
                                        sx={{
                                          py: 1.5,
                                          '&:hover': {
                                            background: `${theme.colors.alpha.black[5]}`,
                                          },
                                        }}
                                        secondaryAction={
                                          // TODO: 改成transferSwal彈出視窗
                                          <Button
                                            value={item.name}
                                            onClick={handleChangeCategory}
                                            size="small"
                                            variant="text"
                                            color="secondary"
                                            sx={{
                                              alignSelf: 'center',
                                              padding: `${theme.spacing(
                                                0.5,
                                                1.5,
                                              )}`,
                                              backgroundColor: `${theme.colors.secondary.lighter}`,
                                              textTransform: 'uppercase',
                                              fontSize: `${theme.typography.pxToRem(
                                                11,
                                              )}`,
                                              '&:hover': {
                                                backgroundColor: `${theme.colors.secondary.main}`,
                                                color: `${theme.palette.getContrastText(
                                                  theme.colors.secondary.main,
                                                )}`,
                                              },
                                            }}
                                          >
                                            {'Change'}
                                          </Button>
                                        }
                                      >
                                        {/* notion app icon */}
                                        <ListItemAvatar
                                          sx={{
                                            minWidth: 38,
                                            mr: 1,
                                          }}
                                        >
                                          <Avatar
                                            sx={{
                                              width: 38,
                                              height: 38,
                                            }}
                                            alt={item.name}
                                            src={item.avatar}
                                          />
                                        </ListItemAvatar>
                                        <ListItemText
                                          sx={{
                                            flexGrow: 0,
                                            maxWidth: '50%',
                                            flexBasis: '50%',
                                          }}
                                          disableTypography
                                          primary={
                                            <Typography
                                              sx={{
                                                pb: 0.6,
                                              }}
                                              color="text.primary"
                                              variant="h5"
                                            >
                                              {item.name}
                                            </Typography>
                                          }
                                        />
                                      </ListItem>
                                      <Divider />
                                    </Fragment>
                                  ))}
                                </ListWrapper>
                              </Scrollbar>
                            </Box>
                            <Divider />
                          </Box>
                        </Popover>
                      </Box>
                    </CardActionAreaWrapper>
                  </Card>
                ) : null}
                {initialCategory === 'knowledge' ? (
                  <Card variant="outlined" sx={{ backgroundColor: '#CFF5E7' }}>
                    <CardActionAreaWrapper
                      sx={{
                        p: 2,
                      }}
                    >
                      <Box>
                        <img
                          src={KnowledgeIcon}
                          style={{ width: 60, borderRadius: 10 }}
                          alt="Knowledge"
                        />
                      </Box>

                      <Typography variant="h3">{'Knowledge'}</Typography>

                      {/* <Typography
                      sx={{
                        fontSize: `${theme.typography.pxToRem(11)}`,
                        lineHeight: 1,
                      }}
                      variant="subtitle2" */}

                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="#111145">Category</Text>
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        marginTop="10px"
                      >
                        <Box>
                          <Tooltip title="Change Category">
                            <IconButton color="primary" size="small">
                              <BorderColorTwoToneIcon
                                ref={ref}
                                onClick={openCategoryChangePopout}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Popover
                          disableScrollLock
                          anchorEl={ref.current}
                          open={isCategoryOpen}
                          onClose={handleCloseCategoryPopout}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                          <Box minWidth={360} maxWidth={360}>
                            {/* 最上方的Box */}

                            {/* 這邊未來可以做成串接用 */}
                            <Box
                              sx={{
                                height: 200,
                              }}
                            >
                              <Scrollbar>
                                <ListWrapper disablePadding>
                                  {categoryData.map((item) => (
                                    <Fragment key={item.id}>
                                      <ListItem
                                        sx={{
                                          py: 1.5,
                                          '&:hover': {
                                            background: `${theme.colors.alpha.black[5]}`,
                                          },
                                        }}
                                        secondaryAction={
                                          // TODO: 改成transferSwal彈出視窗
                                          <Button
                                            value={item.name}
                                            onClick={handleChangeCategory}
                                            size="small"
                                            variant="text"
                                            color="secondary"
                                            sx={{
                                              alignSelf: 'center',
                                              padding: `${theme.spacing(
                                                0.5,
                                                1.5,
                                              )}`,
                                              backgroundColor: `${theme.colors.secondary.lighter}`,
                                              textTransform: 'uppercase',
                                              fontSize: `${theme.typography.pxToRem(
                                                11,
                                              )}`,
                                              '&:hover': {
                                                backgroundColor: `${theme.colors.secondary.main}`,
                                                color: `${theme.palette.getContrastText(
                                                  theme.colors.secondary.main,
                                                )}`,
                                              },
                                            }}
                                          >
                                            {'Change'}
                                          </Button>
                                        }
                                      >
                                        {/* notion app icon */}
                                        <ListItemAvatar
                                          sx={{
                                            minWidth: 38,
                                            mr: 1,
                                          }}
                                        >
                                          <Avatar
                                            sx={{
                                              width: 38,
                                              height: 38,
                                            }}
                                            alt={item.name}
                                            src={item.avatar}
                                          />
                                        </ListItemAvatar>
                                        <ListItemText
                                          sx={{
                                            flexGrow: 0,
                                            maxWidth: '50%',
                                            flexBasis: '50%',
                                          }}
                                          disableTypography
                                          primary={
                                            <Typography
                                              sx={{
                                                pb: 0.6,
                                              }}
                                              color="text.primary"
                                              variant="h5"
                                            >
                                              {item.name}
                                            </Typography>
                                          }
                                        />
                                      </ListItem>
                                      <Divider />
                                    </Fragment>
                                  ))}
                                </ListWrapper>
                              </Scrollbar>
                            </Box>
                            <Divider />
                          </Box>
                        </Popover>
                      </Box>
                    </CardActionAreaWrapper>
                  </Card>
                ) : null}
              </Grid>
              {/* 喜歡，改成已閱讀，true代表已閱讀 */}
              <Grid item xs={12} sm={3}>
                {initailLiked === true ? (
                  <Card variant="outlined">
                    <CardActionAreaWrapper
                      sx={{
                        p: 2,
                      }}
                    >
                      <Box>
                        <img
                          src={LikeIcon}
                          style={{ width: 60, borderRadius: 10 }}
                          alt="take-notes.chat"
                        />
                      </Box>

                      <Typography variant="h3">{'Read'}</Typography>

                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="#111145">Press to remove from read</Text>
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        marginTop="10px"
                      >
                        <Box>
                          <Tooltip title="Remove from read">
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={handleRemoveFromRead}
                            >
                              <EmailTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardActionAreaWrapper>
                  </Card>
                ) : (
                  <Card variant="outlined" sx={{ backgroundColor: '#FFCAC8' }}>
                    <CardActionAreaWrapper
                      sx={{
                        p: 2,
                      }}
                    >
                      <Box>
                        <img
                          src={UnlikeIcon}
                          style={{ width: 60, borderRadius: 10 }}
                          alt="take-notes.chat"
                        />
                      </Box>

                      <Typography variant="h3">{'Unread'}</Typography>

                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="#111145">Press to add to read</Text>
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        marginTop="10px"
                      >
                        <Box>
                          <Tooltip title="Add to read">
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={handleAddToRead}
                            >
                              <DraftsTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardActionAreaWrapper>
                  </Card>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                {isTransferred === true ? (
                  <Card variant="outlined">
                    <CardActionAreaWrapper
                      sx={{
                        p: 2,
                      }}
                    >
                      <Box>
                        <img
                          src={IntegrationIcon}
                          style={{ width: 60, height: 60, borderRadius: 10 }}
                          alt="take-notes.chat"
                        />
                      </Box>

                      <Typography variant="h3">{'Exported'}</Typography>
                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        {/* <DotLegend
                            style={{
                              background: `${theme.colors.success.main}`,
                            }}
                          /> */}
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="#111145">
                            Press to check external page
                          </Text>
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        marginTop="10px"
                      >
                        <Box>
                          <Tooltip title="Go to linked page">
                            <Link href={`${exportLink}`}>
                              <IconButton color="primary" size="small">
                                <InsertLinkTwoToneIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardActionAreaWrapper>
                  </Card>
                ) : (
                  <Card variant="outlined" sx={{ backgroundColor: '#FFCAC8' }}>
                    <CardActionAreaWrapper
                      sx={{
                        p: 2,
                      }}
                    >
                      <Box>
                        <img
                          src={APIIcon}
                          style={{ width: 60, height: 60, borderRadius: 10 }}
                          alt="take-notes.chat"
                        />
                      </Box>

                      <Typography variant="h3">{'Not exported'}</Typography>
                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        {/* <DotLegend
                            style={{
                              background: `${theme.colors.success.main}`,
                            }}
                          /> */}
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="#111145">Press to export</Text>
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        marginTop="10px"
                      >
                        <Box>
                          <Tooltip title="Press to export">
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={handleOpenPopover}
                              ref={ref}
                            >
                              <ImportExportTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        {/* 彈出視窗  */}
                        <Popover
                          disableScrollLock
                          anchorEl={ref.current}
                          onClose={handleClosePopover}
                          open={isPopoverOpen}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                          <Box minWidth={360} maxWidth={360}>
                            {/* 最上方的Box */}

                            {/* 這邊未來可以做成串接用 */}
                            <Box
                              sx={{
                                height: 130,
                              }}
                            >
                              <Scrollbar>
                                <ListWrapper disablePadding>
                                  {items.map((item) => (
                                    <Fragment key={item.id}>
                                      <ListItem
                                        sx={{
                                          py: 1.5,
                                          '&:hover': {
                                            background: `${theme.colors.alpha.black[5]}`,
                                          },
                                        }}
                                        secondaryAction={
                                          // TODO: 改成transferSwal彈出視窗
                                          <Button
                                            onClick={handleExport}
                                            size="small"
                                            variant="text"
                                            color="secondary"
                                            disabled={item.buttonDisabled}
                                            sx={{
                                              alignSelf: 'center',
                                              padding: `${theme.spacing(
                                                0.5,
                                                1.5,
                                              )}`,
                                              backgroundColor: `${theme.colors.secondary.lighter}`,
                                              textTransform: 'uppercase',
                                              fontSize: `${theme.typography.pxToRem(
                                                11,
                                              )}`,
                                              '&:hover': {
                                                backgroundColor: `${theme.colors.secondary.main}`,
                                                color: `${theme.palette.getContrastText(
                                                  theme.colors.secondary.main,
                                                )}`,
                                              },
                                            }}
                                          >
                                            {'Export'}
                                          </Button>
                                        }
                                      >
                                        {/* notion app icon */}
                                        <ListItemAvatar
                                          sx={{
                                            minWidth: 38,
                                            mr: 1,
                                          }}
                                        >
                                          <Avatar
                                            sx={{
                                              width: 38,
                                              height: 38,
                                            }}
                                            alt={item.name}
                                            src={item.avatar}
                                          />
                                        </ListItemAvatar>
                                        <ListItemText
                                          sx={{
                                            flexGrow: 0,
                                            maxWidth: '50%',
                                            flexBasis: '50%',
                                          }}
                                          disableTypography
                                          primary={
                                            <Typography
                                              sx={{
                                                pb: 0.6,
                                              }}
                                              color="text.primary"
                                              variant="h5"
                                            >
                                              {item.name}
                                            </Typography>
                                          }
                                          secondary={
                                            <Box
                                              display="flex"
                                              alignItems="flex-start"
                                            >
                                              {item.connected === 1 ? (
                                                <>
                                                  <DotLegend
                                                    style={{
                                                      background: `${theme.colors.success.main}`,
                                                    }}
                                                  />
                                                  <Typography
                                                    sx={{
                                                      fontSize: `${theme.typography.pxToRem(
                                                        11,
                                                      )}`,
                                                      lineHeight: 1,
                                                    }}
                                                    variant="body1"
                                                  >
                                                    <Text color="success">
                                                      {'Connected'}
                                                    </Text>
                                                  </Typography>
                                                </>
                                              ) : (
                                                <>
                                                  <DotLegend
                                                    style={{
                                                      background: `${theme.colors.warning.main}`,
                                                    }}
                                                  />
                                                  <Typography
                                                    sx={{
                                                      fontSize: `${theme.typography.pxToRem(
                                                        11,
                                                      )}`,
                                                      lineHeight: 1,
                                                    }}
                                                    variant="body1"
                                                  >
                                                    <Text color="warning">
                                                      {'Disconnected'}
                                                    </Text>
                                                  </Typography>
                                                </>
                                              )}
                                            </Box>
                                          }
                                        />
                                      </ListItem>
                                      <Divider />
                                    </Fragment>
                                  ))}
                                </ListWrapper>
                              </Scrollbar>
                            </Box>
                            <Divider />
                          </Box>
                        </Popover>
                        {/* Notino彈窗 */}
                        <ExportPopoutTable
                          setIsTransferred={setIsTransferred}
                          handleCloseExportPopout={handleCloseExportPopout}
                          isPopoutOpen={isPopoutOpen}
                          closePopout={handleCloseExportPopout}
                          cardId={mapId}
                          noteTime={noteDate}
                          from={from}
                          category={category}
                          title={title}
                          notes={notes}
                          messageRecords={messageRecords}
                          exportApp={items.name}
                        />
                      </Box>
                    </CardActionAreaWrapper>
                  </Card>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card variant="outlined">
                  <CardActionAreaWrapper
                    sx={{
                      p: 2,
                    }}
                  >
                    <Box>
                      <img
                        // TODO: 這邊待處理
                        src={setFromPicture(fromId)}
                        alt={fromId}
                        style={{ width: 60, height: 60, borderRadius: 10 }}
                      />
                    </Box>

                    <Typography variant="h3">{from}</Typography>

                    {/* <Typography
                      sx={{
                        fontSize: `${theme.typography.pxToRem(11)}`,
                        lineHeight: 1,
                      }}
                      variant="subtitle2" */}

                    {/* TODO: 待搬出去 */}

                    <Box
                      marginTop="10px"
                      display="flex"
                      alignItems="flex-start"
                      justifyContent={'center'}
                    >
                      <Typography
                        sx={{
                          fontSize: `${theme.typography.pxToRem(11)}`,
                          lineHeight: 1,
                        }}
                        variant="subtitle2"
                      >
                        <Text color="#111145">Inspired by chat with</Text>
                      </Typography>
                    </Box>
                    {/* // <Text color="success">{user.notionConnect}</Text> */}
                    {/* </Typography> */}
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      marginTop="10px"
                    >
                      <Box>
                        <Tooltip title="Chat">
                          <IconButton color="primary" size="small">
                            <SmsTwoToneIcon
                              onClick={getFriendUserNameAndForward}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </CardActionAreaWrapper>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Divider
          sx={{
            mt: 3,
          }}
        />
        <>
          <React.Fragment key={mapId}>
            <Divider />
            <Stack spacing={2} marginTop="15px">
              {messageRecords.map((message) => {
                return (
                  <>
                    <Box display="flex" textAlign={'left'} padding="10px">
                      <ListItemAvatar>
                        {/* TODO: 目前沒有AVATAR */}
                        <Avatar
                          alt={message.sender}
                          src={setFromPicture(message.sender)}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        // TODO: 改成吃username
                        primary={
                          <Text color="black">
                            {setCurrentUserName(message.sender)}
                          </Text>
                        }
                        primaryTypographyProps={{
                          variant: 'h5',
                          // noWrap: true,
                        }}
                        secondary={message.body}
                        secondaryTypographyProps={{
                          variant: 'subtitle2',
                          // noWrap: true,
                        }}
                      />
                    </Box>
                  </>
                );
              })}
              {/*  */}
            </Stack>
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
              {noteDate}
            </Typography>
            <Typography variant="subtitle2">{'Note Time'}</Typography>
          </Box>
          <Box>
            <Typography gutterBottom variant="h4">
              {mapId}
            </Typography>
            <Typography variant="subtitle2">{'Note ID'}</Typography>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}

const mapStoreStateToProps = ({ card, auth, friends }) => {
  return { ...card, ...auth, ...friends };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(CardDetail);
