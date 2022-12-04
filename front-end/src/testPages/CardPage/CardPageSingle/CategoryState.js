import {
  Typography,
  Box,
  Avatar,
  Card,
  Grid,
  useTheme,
  styled,
} from '@mui/material';

import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import SupportTwoToneIcon from '@mui/icons-material/SupportTwoTone';
import YardTwoToneIcon from '@mui/icons-material/YardTwoTone';
import SnowmobileTwoToneIcon from '@mui/icons-material/SnowmobileTwoTone';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import NightlifeOutlinedIcon from '@mui/icons-material/NightlifeOutlined';

import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';

import { getActions } from '../../../store/actions/card_actions';
import { connect } from 'react-redux';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
      color:  ${theme.colors.alpha.trueWhite[100]};
      width: ${theme.spacing(5.5)};
      height: ${theme.spacing(5.5)};
`
);

function CategoryState({ cards }) {
  const theme = useTheme();

  // filter 出未讀數量
  const unread = cards.filter((ele) => {
    return ele.Liked === false;
  });
  const unreadNumber = unread.length;

  // category Filter 數量
  const categoryCard = (cards, category) => {
    const categoryCardsArray = cards.filter((ele) => {
      return ele.Category === category;
    });
    return categoryCardsArray.length;
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} lg={3}>
        <Card
          sx={{
            px: 3,
            pb: 6,
            pt: 3,
          }}
        >
          <Box display="flex" alignItems="center">
            <AvatarWrapper
              sx={{
                background: `#FFCAC8`,
              }}
            >
              <EmailTwoToneIcon fontSize="small" />
            </AvatarWrapper>
            <Typography
              sx={{
                ml: 1.5,
                fontSize: `${theme.typography.pxToRem(15)}`,
                fontWeight: 'bold',
              }}
              variant="subtitle2"
              component="div"
            >
              {'Unread'}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: -2,
              pt: 2,
              pb: 1.5,
              justifyContent: 'center',
            }}
          >
            {/* <ArrowDownwardTwoToneIcon
              sx={{
                color: `${theme.colors.error.main}`,
              }}
            /> */}
            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(60)}`,
              }}
              variant="h1"
            >
              {unreadNumber}
            </Typography>
            <Typography
              color="text.secondary"
              variant="h4"
              sx={{
                pr: 2,
                display: 'inline-flex',
                fontSize: `${theme.typography.pxToRem(35)}`,
              }}
            >
              /{cards.length}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card
          sx={{
            px: 3,
            pb: 6,
            pt: 3,
          }}
        >
          <Box display="flex" alignItems="center">
            <AvatarWrapper
              sx={{
                background: `#9ed9d9`,
              }}
            >
              <WorkOutlineOutlinedIcon fontSize="small" />
            </AvatarWrapper>
            <Typography
              sx={{
                ml: 1.5,
                fontSize: `${theme.typography.pxToRem(15)}`,
                fontWeight: 'bold',
              }}
              variant="subtitle2"
              component="div"
            >
              {'Work'}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: -2,
              pt: 2,
              pb: 1.5,
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(60)}`,
              }}
              variant="h1"
            >
              {categoryCard(cards, 'work')}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card
          sx={{
            px: 3,
            pb: 6,
            pt: 3,
          }}
        >
          <Box display="flex" alignItems="center">
            <AvatarWrapper
              sx={{
                background: `#71ad9b`,
              }}
            >
              <SchoolOutlinedIcon fontSize="small" />
            </AvatarWrapper>
            <Typography
              sx={{
                ml: 1.5,
                fontSize: `${theme.typography.pxToRem(15)}`,
                fontWeight: 'bold',
              }}
              variant="subtitle2"
              component="div"
            >
              {'Knowledge'}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: -2,
              pt: 2,
              pb: 1.5,
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(60)}`,
              }}
              variant="h1"
            >
              {categoryCard(cards, 'knowledge')}
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card
          sx={{
            px: 3,
            pb: 6,
            pt: 3,
          }}
        >
          <Box display="flex" alignItems="center">
            <AvatarWrapper
              sx={{
                background: `#8ba8d6`,
              }}
            >
              <NightlifeOutlinedIcon fontSize="small" />
            </AvatarWrapper>
            <Typography
              sx={{
                ml: 1.5,
                fontSize: `${theme.typography.pxToRem(15)}`,
                fontWeight: 'bold',
              }}
              variant="subtitle2"
              component="div"
            >
              {'Life'}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: -2,
              pt: 2,
              pb: 1.5,
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                pl: 1,
                fontSize: `${theme.typography.pxToRem(60)}`,
              }}
              variant="h1"
            >
              {categoryCard(cards, 'life')}
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

const mapStoreStateToProps = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(CategoryState);
