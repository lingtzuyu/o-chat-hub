import React, { useState } from 'react';
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
} from '@mui/material';
import NotionIcon from '../../../shared/images/notion-icon.png';
import TrelloIcon from '../../../shared/images/trello-icon.png';
import Text from '../../../shared/components/Text';
import Label from '../../../shared/components/Lable';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import AddLinkTwoToneIcon from '@mui/icons-material/AddLinkTwoTone';
import LinkOffTwoToneIcon from '@mui/icons-material/LinkOffTwoTone';
import InsertLinkTwoToneIcon from '@mui/icons-material/InsertLinkTwoTone';
import AutorenewTwoToneIcon from '@mui/icons-material/AutorenewTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import ImportExportTwoToneIcon from '@mui/icons-material/ImportExportTwoTone';

// category icons
import WorkIcon from '../../../shared/images/Icons/work_icon.png';
import KnowledgeIcon from '../../../shared/images/Icons/bachelor_icon.png';
import LifeIcon from '../../../shared/images/Icons/bar_icon.png';
import LikeIcon from '../../../shared/images/Icons/like_icon.png';
import UnlikeIcon from '../../../shared/images/Icons/unlike_icon.png';
import IntegrationIcon from '../../../shared/images/Icons/integration_icon.png';
import APIIcon from '../../../shared/images/Icons/api_icon.png';
import SmsTwoToneIcon from '@mui/icons-material/SmsTwoTone';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

import EditIcon from '@mui/icons-material/Edit';

// mock
import Sundar from '../../../shared/images/mock/sundar_head.jpg';

// api
import * as api from '../../../api';

// alt
import AltHeadshot from '../../../shared/images/alt/alt_headshot.jpg';

// input table
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { getActions } from '../../../store/actions/card_actions';
import { connect } from 'react-redux';

const CardActions = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(1.5)};
    top: ${theme.spacing(1.5)};
    z-index: 7;
  `
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
`
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
  `
);

const DotLegend = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

// const cardFakeData = [
//   {
//     Category: 'knowledge',
//     Liked: true,
//     Transferred: true,
//     Photo: Sundar,
//     FROM: 'Sundar Pitchai',
//     Title: 'This is note title',
//     Notes:
//       '<ol><li>Testing first</li><li>testing 2nd</li><li>testing 3rd</li></ol>',
//     MessageRecords: [
//       { sender: 'Sundar Pithchai', body: 'hahaha' },
//       { sender: 'Sundar Pithchai', body: 'hahaha2' },
//       { sender: 'Sundar Pithchai', body: 'hahaha3' },
//       { sender: 'Sundar Pithchai', body: 'hahaha4' },
//     ],
//     NoteTime: '2022-11-30',
//     NoteId: '63872693fe48de094751344a',
//   },
// ];

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
}) {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [initialTitle, setInitialTitle] = useState(title);
  const [initialNotes, setInitialNotes] = useState(notes);

  const token = localStorage.getItem('accessToken');

  const altImageAvatar = () => {
    return { Sundar };
  };

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
      token
    );
    console.log('前端更改回應', result);
  };

  const handleCancelChange = () => {
    setIsEditing(false);
    setInitialNotes(notes);
    setInitialTitle(title);
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
        {isEditing ? (
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
                {category === 'work' ? (
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
                              <BorderColorTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardActionAreaWrapper>
                  </Card>
                ) : null}
                {category === 'life' ? (
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
                              <BorderColorTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardActionAreaWrapper>
                  </Card>
                ) : null}
                {category === 'knowledge' ? (
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
                              <BorderColorTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardActionAreaWrapper>
                  </Card>
                ) : null}
              </Grid>
              {/* 喜歡 */}
              <Grid item xs={12} sm={3}>
                {liked === true ? (
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
                            <IconButton color="primary" size="small">
                              <FavoriteBorderTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardActionAreaWrapper>
                  </Card>
                ) : (
                  <Card variant="outlined">
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

                      <Typography variant="h3">{'Not read yet'}</Typography>

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
                            <IconButton color="primary" size="small">
                              <FavoriteTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardActionAreaWrapper>
                  </Card>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                {transferred === true ? (
                  <Card variant="outlined" sx={{ backgroundColor: '#CEF1F5' }}>
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
                            <IconButton color="primary" size="small">
                              <InsertLinkTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardActionAreaWrapper>
                  </Card>
                ) : (
                  <Card variant="outlined" sx={{ backgroundColor: '#E7EBC1' }}>
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

                      <Typography variant="h3">{'Not expoted'}</Typography>
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
                            <IconButton color="primary" size="small">
                              <ImportExportTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
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
                        src={from}
                        onError={altImageAvatar}
                        alt={altImageAvatar}
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
                            <SmsTwoToneIcon />
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
                        <Avatar alt={message.sender} src={message.sender} />
                      </ListItemAvatar>
                      <ListItemText
                        // TODO: 改成吃username
                        primary={<Text color="black">{message.sender}</Text>}
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

const mapStoreStateToProps = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(CardDetail);
