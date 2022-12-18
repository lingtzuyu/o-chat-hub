import {
  Box,
  Avatar,
  AccordionSummary,
  Typography,
  ListItemIcon,
  styled,
} from '@mui/material';

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
`,
);

const ListItemIconWrapper = styled(ListItemIcon)(
  ({ theme }) => `
        min-width: 36px;
        color: ${theme.colors.primary.light};
`,
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
`,
);

function TopBarContent({ chosenChatDetails }) {
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
            alt={chosenChatDetails?.name}
            src={chosenChatDetails?.photo}
          />
          <Box ml={1}>
            <Typography variant="h4">{chosenChatDetails?.name}</Typography>
            <Typography variant="subtitle1">
              {chosenChatDetails?.organization}
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

const mapStoreStateToProps = ({ chat }) => {
  return { ...chat };
};

// const mapActionsToProps = (state) => {
//   return {
//     name: state.chat.chosenChatDetails?.name,
//   };
// };
export default connect(mapStoreStateToProps)(TopBarContent);
