import {
  Box,
  Card,
  Typography,
  IconButton,
  ListItemText,
  ListItem,
  Avatar,
  List,
  Button,
  ListItemAvatar,
  Divider,
  alpha,
  styled,
  useTheme,
} from '@mui/material';

import Scrollbar from '../../../shared/components/Scrollbar';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import AutoAwesomeMosaicTwoToneIcon from '@mui/icons-material/AutoAwesomeMosaicTwoTone';
import ContactPhoneTwoToneIcon from '@mui/icons-material/ContactPhoneTwoTone';
import EvStationTwoToneIcon from '@mui/icons-material/EvStationTwoTone';
import KeyboardArrowRightTwoToneIcon from '@mui/icons-material/KeyboardArrowRightTwoTone';
import OndemandVideoTwoToneIcon from '@mui/icons-material/OndemandVideoTwoTone';

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
    border-radius: 100px;
    width: ${theme.spacing(6)};
    height: ${theme.spacing(6)};

    .MuiSvgIcon-root {
        transform-origin: center;
        transform: scale(1);
        transition: ${theme.transitions.create(['transform'])};
    }

    &:hover {
        .MuiSvgIcon-root {
            transform: scale(1.4);
        }
    }
  `
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(10)};
    font-weight: bold;
    text-transform: uppercase;
    border-radius: ${theme.general.borderRadiusSm};
    padding: ${theme.spacing(0.5, 1)};
  `
);

function ExportTodo() {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="caption"
        fontWeight="bold"
        sx={{
          fontSize: `${theme.typography.pxToRem(12)}`,
        }}
      >
        {/* 改成Export to Notion 根據上一層變動 */}
        {'To do list'}
      </Typography>
      {/* 改成Title */}
      <Box>
        <Typography variant="h4">#{'Todo 1'}</Typography>
        <Typography variant="subtitle2">{'TODO 2'}</Typography>
      </Box>
    </Box>
  );
}

export default ExportTodo;
