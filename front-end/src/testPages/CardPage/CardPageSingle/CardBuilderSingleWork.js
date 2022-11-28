import {
  Box,
  Card,
  Typography,
  Link,
  Badge,
  List,
  ListItem,
  ListItemText,
  Avatar,
  alpha,
  IconButton,
  Button,
  Divider,
  LinearProgress,
  styled,
  useTheme,
  linearProgressClasses,
} from '@mui/material';

import CardPageBuilderMessageView from './CardPageBuilderMessageView';

import { getActions } from '../../../store/actions/card_actions';
import { connect } from 'react-redux';

import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';

const LinearProgressPrimary = styled(LinearProgress)(
  ({ theme }) => `
        height: 6px;
        border-radius: ${theme.general.borderRadiusLg};

        &.${linearProgressClasses.colorPrimary} {
            background-color: ${alpha(theme.colors.primary.main, 0.1)};
        }
        
        & .${linearProgressClasses.bar} {
            border-radius: ${theme.general.borderRadiusLg};
            background-color: ${theme.colors.primary.main};
        }
    `
);

const CardActions = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(1.5)};
    top: ${theme.spacing(1.5)};
    z-index: 7;
  `
);

function CardBuilderSingleWork({
  cardId,
  noteTime,
  from,
  category,
  title,
  notes,
  liked,
  transferred,
  deleted,
  messageRecords,
  selecteExportCards,
  isMessageViewOpen,
  setMessageView,
  setDeleteAlert,
  setMessagesArrayInQuickView,
}) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: 'relative',
        p: 3,
      }}
    >
      <Box mb={2} display="flex" alignItems="center">
        {/* 之後改成工作相關圖片 */}
        <Avatar
          variant="rounded"
          sx={{
            fontSize: `${theme.typography.pxToRem(16)}`,
            background: `${theme.colors.alpha.black[100]}`,
            color: `${theme.palette.getContrastText(
              theme.colors.alpha.black[100]
            )}`,
            borderRadius: `${theme.general.borderRadiusSm}`,
            width: 95,
            height: 95,
          }}
        >
          Work
        </Avatar>

        <Box
          sx={{
            width: '100%',
          }}
          ml={1.5}
        >
          <Link
            href="#"
            color="text.primary"
            underline="none"
            sx={{
              transition: `${theme.transitions.create(['color'])}`,
              fontSize: `${theme.typography.pxToRem(17)}`,

              '&:hover': {
                color: `${theme.colors.primary.main}`,
              },
            }}
            variant="h4"
          >
            {title}
          </Link>
          <Typography gutterBottom variant="subtitle2">
            {cardId}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            flex={1}
            sx={{
              width: '100%',
            }}
          >
            <Typography
              sx={{
                pl: 1,
              }}
              fontWeight="bold"
              variant="body1"
              textAlign="right"
            >
              {noteTime}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant="subtitle2">{notes}</Typography>
      <Divider
        sx={{
          mt: 3,
        }}
      />
      <List
        disablePadding
        sx={{
          my: 1.5,
        }}
      >
        <ListItem disableGutters>
          <ListItemText
            primaryTypographyProps={{
              variant: 'h5',
            }}
            primary={'From:'}
          />
          <Typography variant="subtitle1">{from}</Typography>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText
            primaryTypographyProps={{
              variant: 'h5',
            }}
            primary={'External Link (Trello/Notion):'}
          />
          <Typography variant="subtitle1">www.google.com</Typography>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText
            primaryTypographyProps={{
              variant: 'h5',
            }}
            primary={'Messages# :'}
          />
          <Typography variant="subtitle1">{messageRecords.length}</Typography>
        </ListItem>
      </List>
      <Divider
        sx={{
          mb: 3,
        }}
      />

      {/* import messages那邊進來 */}
      {messageRecords?.map((message) => {
        return (
          <CardPageBuilderMessageView
            sender={messageRecords.sender}
            body={messageRecords.body}
            date={messageRecords.date}
          />
        );
      })}
      <CardPageBuilderMessageView />
      {/* <Button
        fullWidth
        variant="text"
        color="primary"
        sx={{
          backgroundColor: `${theme.colors.primary.lighter}`,
          textTransform: 'uppercase',
          py: 1,
          '&:hover': {
            backgroundColor: `${theme.colors.primary.main}`,
            color: `${theme.palette.getContrastText(
              theme.colors.primary.dark
            )}`,
          },
        }}
      >
        {t('View complete profile')}
      </Button> */}
    </Card>
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
)(CardBuilderSingleWork);
