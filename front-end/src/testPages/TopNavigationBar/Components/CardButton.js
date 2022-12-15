import {
  alpha,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  Popover,
  useTheme,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import { useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import Link from '@mui/material/Link';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import { formatDistance, subHours, subSeconds, subDays } from 'date-fns';
import { getActions } from '../../../store/actions/card_actions';
import { connect } from 'react-redux';
import CardNotification from './CardNotification';

const AnimatedBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        box-shadow: 0 0 0 2px ${theme.palette.background.paper};
        background-color: #44b700;
        color: #44b700;
        
        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            animation: ripple 1.2s infinite ease-in-out;
            border: 1px solid currentColor;
            content: "";
        }
    }
`,
);

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${theme.palette.error.main};
        color: ${theme.palette.error.contrastText};
        min-width: 18px; 
        height: 18px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`,
);

const IconButtonPrimary = styled(IconButton)(
  ({ theme }) => `
    margin-left: ${theme.spacing(1)};
    background: ${theme.colors.alpha.trueWhite[10]};
    color: ${theme.colors.alpha.trueWhite[70]};
    padding: 0;
    width: 42px;
    height: 42px;
    border-radius: 100%;
    transition: ${theme.transitions.create(['background', 'color'])};

    &.active,
    &:active,
    &:hover {
      background: ${alpha(theme.colors.alpha.trueWhite[30], 0.2)};
      color: ${theme.colors.alpha.trueWhite[100]};
    }
`,
);

function CardButton({ cards }) {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const theme = useTheme();

  // slice: 淺拷貝
  const lastFive = cards?.slice(0, 5);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title={'Last Five Notes'}>
        <IconButtonPrimary color="primary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={0}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButtonPrimary>
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
        <Box
          sx={{
            p: 2,
          }}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h5">{'Last Five Notes'}</Typography>
          {/* <Link
            href="/card"
            variant="caption"
            sx={{
              textTransform: 'none',
            }}
          >
            {'Go check detail'}
          </Link> */}
        </Box>
        <Divider />
        <List
          sx={{
            p: 2,
          }}
        >
          {lastFive?.map((message, index) => {
            return (
              <CardNotification
                key={message._id}
                time={message.NoteTime}
                title={message.Title}
                from={message.FROM}
                notes={message.Notes}
                Transferred={message.Transferred}
              ></CardNotification>
            );
          })}
        </List>
        <Divider />
        <Box m={1}>
          <Link
            href="/card"
            variant="caption"
            sx={{
              textTransform: 'none',
            }}
          >
            <Button color="secondary" fullWidth>
              {'View all notes'}
            </Button>
          </Link>
        </Box>
      </Popover>
    </>
  );
}

const mapStoreStateToPropse = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(mapStoreStateToPropse, mapActionsToProps)(CardButton);
