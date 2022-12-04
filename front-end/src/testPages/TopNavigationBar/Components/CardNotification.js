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
import * as api from '../../../api';
import { useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import Link from '@mui/material/Link';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import { formatDistance, subHours, subSeconds, subDays } from 'date-fns';

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
`
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
`
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
`
);

function CardNotification({ key, time, title, from, notes, Transferred }) {
  const theme = useTheme();

  return (
    <>
      <ListItem
        sx={{
          display: { xs: 'block', sm: 'flex' },
        }}
        button
        selected
      >
        {/* sender的avatar */}
        <ListItemAvatar
          sx={{
            mb: { xs: 1, sm: 0 },
          }}
        >
          <Avatar alt={from} src="" />
        </ListItemAvatar>
        <Box flex={1}>
          <Box
            display={{ xs: 'block', sm: 'flex' }}
            justifyContent="space-between"
          >
            {/* 筆記標題 */}
            <Typography
              sx={{
                fontWeight: 'bold',
              }}
            >
              {title}
            </Typography>
            {/* 筆記時間 */}
            <Typography
              variant="caption"
              sx={{
                textTransform: 'none',
              }}
            >
              {Transferred}
            </Typography>
          </Box>
          <Typography
            component="span"
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            {new Date(time).toDateString()}
          </Typography>
          {/* 筆記內文 */}
          <Typography component="span" variant="body2" color="text.secondary">
            {
              <div
                dangerouslySetInnerHTML={{
                  __html: notes,
                }}
              />
            }
          </Typography>
        </Box>
      </ListItem>
      <Divider
        variant="inset"
        sx={{
          my: 1,
          width: 250,
          align: 'center',
        }}
        component="li"
      />
    </>
  );
}

export default CardNotification;
