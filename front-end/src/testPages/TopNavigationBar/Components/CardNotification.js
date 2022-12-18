import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  useTheme,
  Typography,
} from '@mui/material';

function CardNotification({ key, time, title, from, notes, Transferred }) {
  const theme = useTheme();

  return (
    <>
      <ListItem
        sx={{
          display: { xs: 'block', sm: 'flex' },
        }}
        button
        selected
      >
        {/* sender的avatar */}
        <ListItemAvatar
          sx={{
            mb: { xs: 1, sm: 0 },
          }}
        >
          <Avatar alt={from} src="" />
        </ListItemAvatar>
        <Box flex={1}>
          <Box
            display={{ xs: 'block', sm: 'flex' }}
            justifyContent="space-between"
          >
            {/* 筆記標題 */}
            <Typography
              sx={{
                fontWeight: 'bold',
              }}
            >
              {title}
            </Typography>
            {/* 筆記時間 */}
            <Typography
              variant="caption"
              sx={{
                textTransform: 'none',
              }}
            >
              {Transferred}
            </Typography>
          </Box>
          <Typography
            component="span"
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            {new Date(time).toDateString()}
          </Typography>
          {/* 筆記內文 */}
          <Typography component="span" variant="body2" color="text.secondary">
            {
              <div
                dangerouslySetInnerHTML={{
                  __html: notes,
                }}
              />
            }
          </Typography>
        </Box>
      </ListItem>
      <Divider
        variant="inset"
        sx={{
          my: 1,
          width: 250,
          align: 'center',
        }}
        component="li"
      />
    </>
  );
}

export default CardNotification;
