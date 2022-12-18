// Card分頁內的message呈現

import {
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';

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
