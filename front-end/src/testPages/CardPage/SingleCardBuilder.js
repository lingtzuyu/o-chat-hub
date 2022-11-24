import {
  Box,
  Card,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Avatar,
  alpha,
  IconButton,
  Button,
  LinearProgress,
  styled,
  useTheme,
  linearProgressClasses,
} from '@mui/material';

import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import { connect } from 'react-redux';

const LinearProgressSuccess = styled(LinearProgress)(
  ({ theme }) => `
        height: 8px;
        border-radius: ${theme.general.borderRadiusLg};

        &.${linearProgressClasses.colorPrimary} {
            background-color: ${alpha(theme.colors.success.main, 0.1)};
        }
        
        & .${linearProgressClasses.bar} {
            border-radius: ${theme.general.borderRadiusLg};
            background-color: ${theme.colors.success.main};
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

function SingleCardBuilder({
  NoteTime,
  From,
  Transferred,
  Title,
  Notes,
  Category,
}) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: 'relative',
        p: 3,
      }}
    >
      <CardActions>
        <IconButton color="primary">
          <MoreHorizTwoToneIcon />
        </IconButton>
      </CardActions>
      <Box mb={2} display="flex" alignItems="center">
        <Avatar
          variant="rounded"
          sx={{
            width: 95,
            height: 95,
          }}
          src="/static/images/avatars/3.jpg"
        />
        <Box
          sx={{
            width: '100%',
          }}
          ml={1.5}
        >
          {/* 點擊回去首頁Messenger葉面 */}
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
            {From}
          </Link>
          {/* job title或是綽號 */}
          <Typography gutterBottom variant="subtitle2">
            Freelance Designer, Mutual Inc.
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            flex={1}
            sx={{
              width: '100%',
            }}
          >
            {/* 進度條，幾天前新增，用date資料 */}
            <LinearProgressSuccess
              sx={{
                minWidth: 65,
                width: '100%',
              }}
              variant="determinate"
              value={63}
            />
            {/* 進度條文字 */}
            <Typography
              sx={{
                pl: 1,
              }}
              fontWeight="bold"
              variant="body1"
              textAlign="right"
            >
              +63%
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant="h5">{Title}</Typography>
      <Typography variant="subtitle2">{Notes}</Typography>
      {/* 卡片資訊或是對話 */}
      <Card
        elevation={0}
        sx={{
          mt: 2,
          mb: 3,
          background: `${alpha(theme.colors.alpha.black[100], 0.05)}`,
        }}
      >
        <List dense>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{
                variant: 'h5',
              }}
              primary={'Created Time: '}
            />
            <Typography variant="subtitle1">{NoteTime}</Typography>
          </ListItem>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{
                variant: 'h5',
              }}
              primary={'Category: '}
            />
            <Typography variant="subtitle1">{Category}</Typography>
          </ListItem>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{
                variant: 'h5',
              }}
              primary={'Transferred: '}
            />
            <Typography variant="subtitle1">{Transferred}</Typography>
          </ListItem>
        </List>
      </Card>
      {/* 缺少category, status(已轉換就不能改), Edit  */}
      <Button
        fullWidth
        variant="text"
        color="success"
        sx={{
          backgroundColor: `${theme.colors.success.lighter}`,
          textTransform: 'uppercase',
          py: 1.5,
          '&:hover': {
            backgroundColor: `${theme.colors.success.main}`,
            color: `${theme.palette.getContrastText(
              theme.colors.success.dark
            )}`,
          },
        }}
      >
        {'MessageRecords'}
      </Button>
    </Card>
  );
}

export default SingleCardBuilder;
