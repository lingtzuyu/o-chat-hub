import { Fragment, useRef, useState } from 'react';

import {
  IconButton,
  Box,
  List,
  ListItem,
  Badge,
  ListItemAvatar,
  Button,
  Divider,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Typography,
  ListItemText,
  alpha,
  Popover,
  Tooltip,
  Avatar,
  styled,
  useTheme,
} from '@mui/material';
import Text from '../../../shared/components/Text';
import { getActions } from '../../../store/actions/card_actions';
import { connect } from 'react-redux';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import Scrollbar from '../../../shared/components/Scrollbar';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import MarkChatReadTwoToneIcon from '@mui/icons-material/MarkChatReadTwoTone';
import IosShareTwoToneIcon from '@mui/icons-material/IosShareTwoTone';

import NotionIcon from '../../../shared/images/notion-icon.png';
import TrelloIcon from '../../../shared/images/trello-icon.png';
import ExportPopoutTable from './ExportPopoutTable';

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

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `

  width: ${theme.spacing(3)};
  height: ${theme.spacing(3)};
  border-radius: ${theme.general.borderRadiusLg};
`
);

function ExportIconList({
  cardId,
  noteTime,
  from,
  category,
  title,
  notes,
  messageRecords,
  setIsExportPopoutOpen,
  isExportTableOpen,
  userInfoDetail,
}) {
  const theme = useTheme();

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);

  const handleExport = () => {
    console.log('handle export button');
    // 打開ExportPopout
    handleClose();
    setIsPopoutOpen(true);
  };
  const handleCloseExportPopout = () => {
    setIsPopoutOpen(false);
  };

  // export那個按鈕的open以及close
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const items = [
    {
      id: 1,
      name: 'Notion',
      avatar: NotionIcon,
      connected: userInfoDetail.notionConnect,
      buttonDisabled: userInfoDetail.notionConnect === 1 ? false : true,
    },
    {
      id: 2,
      name: 'Trello',
      avatar: TrelloIcon,
      connected: userInfoDetail.trelloConnect,
      buttonDisabled: userInfoDetail.trelloConnect === 1 ? false : true,
    },
  ];

  return (
    <>
      <Tooltip arrow title={'Export'}>
        <IconButtonWrapper
          color="warning"
          ref={ref}
          onClick={handleOpen}
          sx={{
            background: '',
            transition: `${theme.transitions.create(['background'])}`,
            color: '#223354',

            '&:hover': {
              background: alpha(theme.colors.warning.main, 0.2),
            },
          }}
        >
          <IosShareTwoToneIcon fontSize="medium" />
        </IconButtonWrapper>
      </Tooltip>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
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
                            padding: `${theme.spacing(0.5, 1.5)}`,
                            backgroundColor: `${theme.colors.secondary.lighter}`,
                            textTransform: 'uppercase',
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            '&:hover': {
                              backgroundColor: `${theme.colors.secondary.main}`,
                              color: `${theme.palette.getContrastText(
                                theme.colors.secondary.main
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
                          <Box display="flex" alignItems="flex-start">
                            {item.connected === 1 ? (
                              <>
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
                                  variant="body1"
                                >
                                  <Text color="success">{'Connected'}</Text>
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
                                    fontSize: `${theme.typography.pxToRem(11)}`,
                                    lineHeight: 1,
                                  }}
                                  variant="body1"
                                >
                                  <Text color="warning">{'Disconnected'}</Text>
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
          {/* <Box
            sx={{
              background: `${theme.colors.alpha.black[5]}`,
              textAlign: 'center',
            }}
            p={2}
          >
            <Button
              size="small"
              color="primary"
              variant="contained"
              endIcon={<ArrowForwardTwoToneIcon />}
            >
              {'View all participants'}
            </Button>
          </Box> */}
        </Box>
      </Popover>
      <ExportPopoutTable
        handleCloseExportPopout={handleCloseExportPopout}
        isPopoutOpen={isPopoutOpen}
        closePopout={handleCloseExportPopout}
        cardId={cardId}
        noteTime={noteTime}
        from={from}
        category={category}
        title={title}
        notes={notes}
        messageRecords={messageRecords}
        exportApp={items.name}
      />
    </>
  );
}
const mapStoreStateToPropse = ({ card, auth }) => {
  return { ...card, ...auth };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStateToPropse,
  mapActionsToProps
)(ExportIconList);
