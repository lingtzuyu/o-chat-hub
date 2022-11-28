import { Fragment } from 'react';

import {
  Box,
  ListItemAvatar,
  ListItemText,
  Divider,
  List,
  ListItem,
  Card,
  Typography,
  IconButton,
  Button,
  Avatar,
  styled,
  useTheme,
} from '@mui/material';

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

import Scrollbar from '../../../shared/components/Scrollbar';
import Text from '../../../shared/components/Text';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';

const CardActions = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(1.5)};
    top: ${theme.spacing(1.5)};
    z-index: 7;
  `
);

const ListWrapper = styled(List)(
  () => `
    .MuiDivider-root:first-of-type {
        display: none;
    }
  `
);

function ExportTodoList({ todoArray }) {
  const theme = useTheme();

  const items = [
    {
      id: 1,
      username: 'Shanelle Wynn',
      jobtitle: 'UI Engineer, Apple Inc.',
      avatar: '/static/images/avatars/1.jpg',
    },
    {
      id: 2,
      username: 'Akeem Griffith',
      jobtitle: 'Manager, Google Inc.',
      avatar: '/static/images/avatars/2.jpg',
    },
    {
      id: 3,
      username: 'Abigayle Hicks',
      jobtitle: 'Project Manager, Spotify',
      avatar: '/static/images/avatars/3.jpg',
    },
    {
      id: 4,
      username: 'Reece Corbett',
      jobtitle: 'Senior Designer, Amazon Inc.',
      avatar: '/static/images/avatars/4.jpg',
    },
    {
      id: 5,
      username: 'Zain Baptista',
      jobtitle: 'Senior Accountant, Microsoft',
      avatar: '/static/images/avatars/5.jpg',
    },
  ];

  return (
    <>
      <Box
        sx={{
          height: 150,
          width: 600,
        }}
      >
        <Scrollbar>
          <ListWrapper disablePadding>
            {todoArray.map((item, index) => (
              <Fragment key={index}>
                <Divider />
                <ListItem
                  sx={{
                    py: 2,
                    px: 2.5,
                  }}
                >
                  {/* <ListItemAvatar
                    sx={{
                      mr: 0,
                    }}
                  >
                    <Avatar alt={index} src={index} />
                  </ListItemAvatar> */}
                  <ListItemText
                    primary={<Text color="black">{item}</Text>}
                    primaryTypographyProps={{
                      variant: 'h5',
                      noWrap: true,
                    }}
                    // secondary={item.jobtitle}
                    // secondaryTypographyProps={{
                    //   variant: 'subtitle2',
                    //   noWrap: true,
                    // }}
                  />
                  <Button
                    variant="text"
                    color="secondary"
                    sx={{
                      backgroundColor: `${theme.colors.secondary.lighter}`,
                      '&:hover': {
                        backgroundColor: `${theme.colors.secondary.main}`,
                        color: `${theme.palette.getContrastText(
                          theme.colors.secondary.main
                        )}`,
                      },
                    }}
                  >
                    {'Remove'}
                  </Button>
                </ListItem>
              </Fragment>
            ))}
          </ListWrapper>
        </Scrollbar>
      </Box>
    </>
  );
}

export default ExportTodoList;
