import {
  Card,
  Box,
  Typography,
  Avatar,
  LinearProgress,
  styled,
} from '@mui/material';

import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import { getActions } from '../../../store/actions/card_actions';
import { connect } from 'react-redux';

const AvatarWrapperError = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
      border-radius: ${theme.general.borderRadius};
      background-color: ${theme.colors.error.lighter};
      color:  ${theme.colors.error.main};
      margin-bottom: ${theme.spacing(3)};
`
);

function UnreadStatic({ cards }) {
  // filter 出未讀數量

  const unread = cards.filter((ele) => {
    return ele.Liked === false;
  });
  const unreadNumber = unread.length;

  // leanear Percentage 0-100
  const unreadPercentage = (unreadNumber / cards.length) * 100;

  return (
    <Card
      sx={{
        p: 3,
      }}
    >
      <AvatarWrapperError>
        <EmailTwoToneIcon />
      </AvatarWrapperError>
      <Typography
        variant="h3"
        sx={{
          pb: 1,
        }}
      >
        {'Unread'}
      </Typography>
      <Typography
        color="text.primary"
        variant="h1"
        sx={{
          pr: 0.5,
          display: 'inline-flex',
        }}
      >
        {unreadNumber}
      </Typography>
      <Typography
        color="text.secondary"
        variant="h4"
        sx={{
          pr: 2,
          display: 'inline-flex',
        }}
      >
        /{cards.length}
      </Typography>
      <Box pt={3}>
        <LinearProgress
          value={unreadPercentage}
          color="primary"
          variant="determinate"
        />
      </Box>
    </Card>
  );
}

const mapStoreStateToProps = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(UnreadStatic);
