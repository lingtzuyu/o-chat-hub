import { useRef, useState } from 'react';

import {
  IconButton,
  Box,
  List,
  alpha,
  ListItem,
  Divider,
  Typography,
  ListItemText,
  Popover,
  Tooltip,
  styled,
} from '@mui/material';
import Text from '../../../shared/components/Text';

import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';

const SectionHeading = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
        padding: ${theme.spacing(2, 2, 0)};
`
);

const IconButtonPrimary = styled(IconButton)(
  ({ theme }) => `
    margin-left: ${theme.spacing(1)};
    background: ${theme.colors.alpha.trueWhite[10]};
    color: ${theme.colors.alpha.trueWhite[70]};
    padding: 0;
    width: 42px;
    height: 42px;
    border-radius: 100%;
    transition: ${theme.transitions.create(['background', 'color'])};

    svg {
      width: 26px;
    }

    &.active,
    &:active,
    &:hover {
      background: ${alpha(theme.colors.alpha.trueWhite[30], 0.2)};
      color: ${theme.colors.alpha.trueWhite[100]};
    }
`
);

function MessageButton() {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box
          sx={{
            maxWidth: 240,
          }}
        >
          <SectionHeading variant="body2" color="text.primary">
            {'Language Switcher'}
          </SectionHeading>

          <Divider />
          <Text color="warning">
            <Box
              p={2}
              sx={{
                maxWidth: 340,
              }}
            >
              <WarningTwoToneIcon fontSize="small" />
              <Typography variant="body1">
                {
                  'We only translated a small part of the template, for demonstration purposes'
                }
                !
              </Typography>
            </Box>
          </Text>
        </Box>
      </Popover>
    </>
  );
}

export default MessageButton;
