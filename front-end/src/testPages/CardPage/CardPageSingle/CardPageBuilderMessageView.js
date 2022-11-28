// Card分頁內的message呈現

import {
  CardHeader,
  Card,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Typography,
  Divider,
  useTheme,
  Box,
} from '@mui/material';

import AutoAwesomeMosaicTwoToneIcon from '@mui/icons-material/AutoAwesomeMosaicTwoTone';
import ContactPhoneTwoToneIcon from '@mui/icons-material/ContactPhoneTwoTone';
import EvStationTwoToneIcon from '@mui/icons-material/EvStationTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { secondsInQuarter } from 'date-fns';

function CardPageBuilderMessageView({ sender, body, date }) {
  const theme = useTheme();

  return (
    <>
      <List disablePadding>
        <ListItem
          sx={{
            p: 2,
          }}
        >
          <ListItemAvatar
            sx={{
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              minWidth: 0,
            }}
          >
            <Avatar
              variant="rounded"
              sx={{
                background: `${theme.colors.alpha.black[10]}`,
                color: `${theme.colors.primary.main}`,
                width: 64,
                height: 64,
              }}
            >
              {/* 這邊改為大頭貼 */}
              {sender}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography gutterBottom variant="h4">
                {date}
              </Typography>
            }
            secondary={<Typography variant="subtitle2">{body}.</Typography>}
          />
        </ListItem>
        <Divider />
      </List>
    </>
  );
}

export default CardPageBuilderMessageView;
