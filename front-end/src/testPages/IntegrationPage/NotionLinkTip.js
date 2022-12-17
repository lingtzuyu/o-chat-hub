import React, { useState } from 'react';
import {
  Box,
  Card,
  alpha,
  Typography,
  Divider,
  Stack,
  IconButton,
  TextField,
  Avatar,
  styled,
  useTheme,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  CardActionArea,
  Grid,
  Button,
} from '@mui/material';

import StepNotion from '../../shared/images/step_notion.png';
import NotionTemplate from '../../shared/images/notion_template.png';
import MainLogo from '../../shared/images/LogoPureBlue.png';
import Text from '../../shared/components/Text';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import Swal from 'sweetalert2';
import * as api from '../../api';

const CardActionAreaWrapper = styled(Box)(
  ({ theme }) => `
        text-align: center;
        background: ${alpha(theme.colors.primary.main, 0.03)};

        .MuiTouchRipple-root {
          opacity: .2;
        }
  
        .MuiCardActionArea-focusHighlight {
          background: ${theme.colors.primary.main};
        }
  
        &:hover {
          .MuiCardActionArea-focusHighlight {
            opacity: .05;
          }
        }
  `,
);

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
});

const NotionLinkTip = () => {
  const theme = useTheme();
  const params = new URL(window.document.location).searchParams;
  const token = localStorage.getItem('accessToken');
  const code = params.get('code');
  const webRoute = process.env.REACT_APP_WEB_ROUTE;

  const handleSaveNotionToken = async () => {
    const result = await api.getNotionToken(code, token);

    if (result !== 200) {
      await Toast.fire({
        icon: 'warning',
        title:
          'Failed to link Notion, please try again (or you have already linked)!',
      });
      window.location.pathname = `/profile`;
    } else {
      await Toast.fire({
        icon: 'success',
        title: 'Notion linked',
      });
      window.location.pathname = `/profile`;
    }
  };

  const handleCancel = () => {
    Toast.fire({
      icon: 'warning',
      title: 'Cancel connection, Notion not connected yet!',
    });
    window.location.pathname = `/profile`;
  };

  return (
    <Card
      sx={{
        position: 'relative',
        textAlign: 'center',
        pt: 4,
        pb: 3,
        px: 3,
      }}
    >
      <Avatar
        sx={{
          mx: 'auto',
          mb: 1.5,
          width: 114,
          height: 114,

          boxShadow: `0 0 0 3px white`,
        }}
        // 若已經Transferred顏色就改成${theme.colors.error.main}`
        src={MainLogo}
        alt={'take-notes.chat'}
      />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{ alignItems: 'center', align: 'center' }}
      >
        <Typography gutterBottom variant="h3">
          {'Press confirm to connect your account with Notion'}
        </Typography>
      </Box>
      {/* <Divider
        sx={{
          mt: 3,
        }}
      /> */}
      <Stack
        sx={{
          mt: 2.5,
          textAlign: 'center',
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Box marginRight="30px">
          <Button
            startIcon={<CheckIcon />}
            onClick={handleSaveNotionToken}
            variant="contained"
          >
            {'Confirm'}
          </Button>
        </Box>
        <Box marginLeft="30px">
          <Button
            startIcon={<ClearIcon />}
            variant="contained"
            onClick={handleCancel}
          >
            {'Cancel'}
          </Button>
        </Box>
      </Stack>
      <Divider
        sx={{
          mt: 3,
        }}
      />
      <Box
        marginTop="20px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{ alignItems: 'center', align: 'center' }}
      >
        <Typography gutterBottom variant="h3" color="orange">
          {'Read below carefully before confirm'}
        </Typography>
        <Typography
          sx={{
            px: { xs: 4, md: 8 },
          }}
          variant="subtitle2"
        >
          {
            'Please make sure to choose the template provided by take-notes.chat in the last step'
          }
        </Typography>
        <Typography
          sx={{
            px: { xs: 4, md: 8 },
          }}
          variant="subtitle2"
        >
          {'see below: '}
        </Typography>
        <Box marginTop="20px">
          <img
            src={StepNotion}
            style={{ width: 600, borderRadius: 10 }}
            alt="take-notes.chat"
          />
        </Box>
        <Typography
          sx={{
            px: { xs: 4, md: 8 },
          }}
          variant="h5"
        >
          {'The template is like below: '}
        </Typography>
        <Typography
          sx={{
            px: { xs: 4, md: 8 },
          }}
          variant="subtitle2"
        >
          {`If you did not select template, please click link below to restart the integration `}
        </Typography>
        <Typography
          sx={{
            px: { xs: 4, md: 8 },
          }}
          variant="subtitle2"
        >
          <Link href={`/profile`}>{`Restart connection again`}</Link>
        </Typography>
        <Box marginTop="20px">
          <img
            src={NotionTemplate}
            style={{ width: 1000, borderRadius: 10 }}
            alt="take-notes.chat"
          />
        </Box>
      </Box>
    </Card>
  );
};

export default NotionLinkTip;
