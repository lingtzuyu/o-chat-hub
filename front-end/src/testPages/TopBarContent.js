import { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  styled,
  useTheme,
} from '@mui/material';

import FakeProfilePic from '../shared/images/avatar.jpg';

import { formatDistance, subMinutes } from 'date-fns';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import VideoCameraFrontTwoToneIcon from '@mui/icons-material/VideoCameraFrontTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import InputIcon from '@mui/icons-material/Input';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import NotificationsOffTwoToneIcon from '@mui/icons-material/NotificationsOffTwoTone';
import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

import TransferMessageButton from './component/TransferMessageButton';
import SaveMessageButton from './component/SaveMessageButton';
import CancelTransferButton from './component/CancelTransferButton';

import { connect } from 'react-redux';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`
);

const ListItemIconWrapper = styled(ListItemIcon)(
  ({ theme }) => `
        min-width: 36px;
        color: ${theme.colors.primary.light};
`
);

const AccordionSummaryWrapper = styled(AccordionSummary)(
  ({ theme }) => `
        &.Mui-expanded {
          min-height: 48px;
        }

        .MuiAccordionSummary-content.Mui-expanded {
          margin: 12px 0;
        }

        .MuiSvgIcon-root {
          transition: ${theme.transitions.create(['color'])};
        }

        &.MuiButtonBase-root {

          margin-bottom: ${theme.spacing(0.5)};

          &:last-child {
            margin-bottom: 0;
          }

          &.Mui-expanded,
          &:hover {
            background: ${theme.colors.alpha.black[10]};

            .MuiSvgIcon-root {
              color: ${theme.colors.primary.main};
            }
          }
        }
`
);

function TopBarContent({ name }) {
  return (
    <>
      <RootWrapper>
        <Box display="flex" alignItems="center">
          <Avatar
            variant="rounded"
            sx={{
              width: 48,
              height: 48,
            }}
            alt={name}
            src={FakeProfilePic}
          />
          <Box ml={1}>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="subtitle1">
              {formatDistance(subMinutes(new Date(), 8), new Date(), {
                addSuffix: true,
              })}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
          }}
        >
          {/* TODO: 轉換成可動作按鈕 */}
          {/* <Tooltip placement="bottom" title={'Start saving Message'}>
            <IconButton color="primary">
              <SaveAltIcon />
            </IconButton>
          </Tooltip> */}
          <SaveMessageButton />
          <TransferMessageButton />
          {/* <Tooltip placement="bottom" title={'Transfer selected messages'}>
            <IconButton color="primary">
              <InputIcon />
            </IconButton>
          </Tooltip> */}
          {/* <Tooltip placement="bottom" title={'Cancel'}>
            <IconButton color="primary">
              <CancelPresentationIcon />
            </IconButton>
          </Tooltip> */}
          <CancelTransferButton />
        </Box>
      </RootWrapper>
    </>
  );
}

const mapActionsToProps = (state) => {
  return {
    name: state.chat.chosenChatDetails?.name,
  };
};
export default connect(mapActionsToProps)(TopBarContent);
