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
import Scrollbar from '../../../shared/components/Scrollbar';
import TempAvatar from '../../../shared/images/fake_avatar.png';
import ExportTodo from './ExportTodoList';
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

function ExportPopoutTable({
  closePopout,
  isPopoutOpen,
  setIsExportPopoutOpen,
  isExportTableOpen,
  cardId,
  noteTime,
  from,
  category,
  title,
  notes,
  messageRecords,
  exportApp,
}) {
  const theme = useTheme();

  const handleCancel = () => {
    setIsExportPopoutOpen(false);
  };

  const handleClosePopout = () => {
    closePopout();
  };

  return (
    <Box p={3}>
      <Dialog open={isPopoutOpen} onClose={handleClosePopout}>
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
              <Typography variant="h4">
                Please choose status and priority
              </Typography>
            </Box>
            <Box display="flex">
              <NotioinStatusDropDown />
              <NotioinPriorityDropDown />
            </Box>
          </Box>
          <Divider />

          {/* 這個box刪除或是移到下方呈現check checkbox要打什麼 */}
          {/* Status及priority的下拉選單 */}

          <Divider />
          <Box
            sx={{
              width: 600,
              height: 250,
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
                          src={TempAvatar}
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
                            {message.sender}
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
            <Box marginRight="10px">
              <Button
                size="small"
                color="primary"
                variant="contained"
                endIcon={<ArrowForwardTwoToneIcon />}
                onClick={handleCancel}
              >
                {'Cancel'}
              </Button>
            </Box>
            <Box marginLeft="10px">
              <Button
                size="small"
                color="primary"
                variant="contained"
                endIcon={<ArrowForwardTwoToneIcon />}
              >
                {'Export'}
              </Button>
            </Box>
          </Box>
        </Card>
      </Dialog>
    </Box>
  );
}

const mapStoreStateToPropse = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStateToPropse,
  mapActionsToProps
)(ExportPopoutTable);
