import { Box } from '@mui/material';
import MessageButton from './Components/MessageButton';
import CardButton from './Components/CardButton';

function TopButtonGroup() {
  return (
    <Box
      sx={{
        mr: 1,
      }}
    >
      <MessageButton />
      <CardButton />
    </Box>
  );
}

export default TopButtonGroup;
