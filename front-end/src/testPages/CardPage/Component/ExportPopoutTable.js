import { Fragment, useState } from 'react';

import {
  Box,
  ListItemAvatar,
  ListItemText,
  Divider,
  List,
  Card,
  Button,
  Typography,
  Avatar,
  styled,
  ListItem,
  Badge,
  OutlinedInput,
  InputAdornment,
  FormControl,
  useTheme,
  Dialog,
  Grid,
  IconButton,
  Input,
  Tooltip,
} from '@mui/material';
import ExportTodoList from './ExportTodoList';
import Scrollbar from '../../../shared/components/Scrollbar';
import TempAvatar from '../../../shared/images/fake_avatar.png';
import InputField from '../../../shared/components/InputField';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Text from '../../../shared/components/Text';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import NotioinStatusDropDown from './NotionStatusDropDown';
import NotioinPriorityDropDown from './NotionPriorityDropDown copy';
import { getActions } from '../../../store/actions/card_actions';
import { connect } from 'react-redux';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotionIcon from '../../../shared/images/notion-icon.png';
import TrelloIcon from '../../../shared/images/trello-icon.png';
import * as api from '../../../api';
import Swal from 'sweetalert2';

const AvatarGradient = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.gradients.blue1};
        color: ${theme.colors.alpha.trueWhite[100]};
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

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};

      .MuiOutlinedInput-notchedOutline {
          border: 0;
      }
  `
);

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root:last-of-type + .MuiDivider-root {
          display: none;
      }
  `
);
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  // onOpen: (toast) => {
  //   toast.addEventListener('mouseenter', Swal.stopTimer);
  //   toast.addEventListener('mouseleave', Swal.resumeTimer);
  // },
});

function ExportPopoutTable({
  closePopout,
  isPopoutOpen,
  setIsExportPopoutOpen,
  handleCloseExportPopout,
  isExportTableOpen,
  cardId,
  noteTime,
  from,
  category,
  title,
  notes,
  messageRecords,
  exportApp,
  notionStatus,
  notionPriority,
  setIsTransferred,
  setInitialExportLink,
  userInfoDetail,
  friends,
}) {
  const theme = useTheme();
  const accessToken = localStorage.getItem('accessToken');
  const [todoArray, setTodoArray] = useState(['this', 'us', 'them']);
  const [inputTodo, setInputTodo] = useState('');

  const notionExportData = {
    token: accessToken,
    title: title,
    category: category,
    status: notionStatus,
    priority: notionPriority,
    from: from,
    messages: JSON.stringify(messageRecords.toString()),
    notes: notes,
    cardId: cardId,
  };

  const exportToNotion = async () => {
    const result = await api.exportToNotion(notionExportData);

    if (result.status !== 200) {
      closePopout();
      handleCloseExportPopout();
      await Toast.fire({
        icon: 'warning',
        title: `Please check notion connectoin`,
      });
    } else {
      closePopout();
      handleCloseExportPopout();

      await setIsTransferred(true);
      await Toast.fire({
        icon: 'success',
        title: `Export to Notion!`,
      });
    }
  };

  const inputTodoChange = (e) => {
    setInputTodo(e.target.value);
    console.log(e.target.value);
  };

  const handleCancel = () => {
    setIsExportPopoutOpen(false);
  };

  const handleClosePopout = () => {
    closePopout();
  };

  const setFromPicture = (friendId) => {
    const target = friends.find((ele) => ele.id === friendId);
    if (target !== undefined || null) {
      return target.photo;
    } else {
      // 上方沒東西就是自己
      return userInfoDetail.photo;
    }
  };

  // 從friends find當前用戶的username
  const setCurrentUserName = (friendId) => {
    const target = friends.find((ele) => ele.id === friendId);
    if (target !== undefined || null) {
      return target.username;
    } else {
      // 上方沒東西就是自己
      return userInfoDetail.username;
    }
  };

  return (
    <Dialog open={isPopoutOpen} onClose={handleCloseExportPopout}>
      <Card>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={2}
        >
          <Box>
            <Typography
              variant="caption"
              fontWeight="bold"
              sx={{
                fontSize: `${theme.typography.pxToRem(12)}`,
              }}
            >
              {/* 改成Export to Notion 根據上一層變動 */}
              {'Export to Notion'}
            </Typography>
            {/* 改成Title */}
            <Typography variant="h4">#{cardId}</Typography>
            <Typography variant="subtitle2">Save at: {noteTime}</Typography>
          </Box>
          {/* TODO: 暫時做兩個component，到時候用if else判斷是notion還是trello */}
          <Box>
            <Avatar
              sx={{
                width: 38,
                height: 38,
              }}
              alt={exportApp}
              src={NotionIcon}
            />
            {/* <AvatarGradient>{NotionIcon}</AvatarGradient> */}
          </Box>
        </Box>
        <Divider />
        {/* 這個box拿來做Notes內容 */}
        <Box
          py={1}
          px={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            background: `${theme.colors.alpha.black[5]}`,
          }}
        >
          <ListItemText
            primary={<Typography variant="h4"> {title}</Typography>}
            secondary={
              <div
                dangerouslySetInnerHTML={{
                  __html: notes,
                }}
              />
            }
          />
          {/* <Box display="flex" flexDirection="column">
              <Typography
                variant="caption"
                fontWeight="bold"
                sx={{
                  fontSize: `${theme.typography.pxToRem(12)}`,
                }}
              >
                Chat with:
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {from}
              </Typography>
            </Box> */}
        </Box>
        <Divider />
        <Box
          py={1}
          px={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            background: `${theme.colors.alpha.black[2]}`,
          }}
        >
          <Box>
            <Typography variant="h4">Notion Properties</Typography>
          </Box>
          <Box display="flex" alignItems={'center'}>
            <NotioinStatusDropDown />
            <NotioinPriorityDropDown />
            {/* TODO: 之後再把todo list開起來 */}
            {/* <Box
                display="flex"
                width="200px"
                marginBottom="32px"
                marginLeft="30px"
              >
                <InputField
                  value={inputTodo}
                  onChange={inputTodoChange}
                  setValue={setInputTodo}
                  placeholder="Add to-do"
                ></InputField>
                <IconButton sx={{ marginTop: '30px' }}>
                  <AddCircleOutlineIcon></AddCircleOutlineIcon>
                </IconButton>
              </Box> */}
          </Box>

          {/* <Box>
              <ExportTodoList todoArray={todoArray}></ExportTodoList>
            </Box> */}
        </Box>
        <Divider />

        <Divider />
        <Box
          sx={{
            width: 600,
            height: 200,
          }}
        >
          <Box
            py={1}
            px={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h4">Messages</Typography>
          </Box>
          <Scrollbar>
            <ListWrapper disablePadding>
              {messageRecords.map((message) => (
                <Fragment key={message.id}>
                  <ListItem
                    sx={{
                      '&:hover': {
                        background: `${theme.colors.alpha.black[5]}`,
                      },
                    }}
                  >
                    <ListItemAvatar
                      sx={{
                        mr: 1,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 50,
                          height: 50,
                        }}
                        alt={message.sender}
                        src={setFromPicture(message.sender)}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        wordWrap: 'break-word',
                        flexGrow: 0,
                        maxWidth: '80%',
                        flexBasis: '80%',
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
                          {setCurrentUserName(message.sender)}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: `${theme.typography.pxToRem(11)}`,
                                lineHeight: 1.5,
                              }}
                              variant="body1"
                            >
                              <Text color="black">{message.body}</Text>
                            </Typography>
                          </Box>
                        </>
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
        <Box
          display="flex"
          justifyContent="center"
          sx={{
            background: `${theme.colors.alpha.black[5]}`,
            textAlign: 'center',
          }}
          p={2}
        >
          {/* <Box marginRight="10px">
              <Button
                size="small"
                color="primary"
                variant="contained"
                endIcon={<ArrowForwardTwoToneIcon />}
                onClick={handleCancel}
              >
                {'Cancel'}
              </Button>
            </Box> */}
          <Box marginLeft="10px" marginTop="20px">
            <Button
              size="small"
              color="primary"
              onClick={exportToNotion}
              variant="contained"
              endIcon={<ArrowForwardTwoToneIcon />}
            >
              {'Export'}
            </Button>
          </Box>
        </Box>
      </Card>
    </Dialog>
  );
}

const mapStoreStateToPropse = ({ card, auth, friends }) => {
  return { ...card, ...auth, ...friends };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStateToPropse,
  mapActionsToProps
)(ExportPopoutTable);
