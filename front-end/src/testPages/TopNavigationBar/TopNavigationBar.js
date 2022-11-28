import { useContext } from 'react';

import { Box, Card, IconButton, Tooltip, alpha, styled } from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from './Components/SideBarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import TopButtonGroup from './TopbuttonGroup';
import UserIcon from './Components/UserIcon';

import MainLogo from './Components/MainLogo';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
    height: ${theme.header.height};
    color: ${theme.header.textColor};
    padding: ${theme.spacing(0, 2)};
    right: 0;
    z-index: 6;
    background-color: ${alpha(theme.colors.primary.main, 0.95)};
    backdrop-filter: blur(3px);
    position: fixed;
    justify-content: space-between;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 0;
`
);

const IconButtonPrimary = styled(IconButton)(
  ({ theme }) => `
    background: ${theme.colors.alpha.trueWhite[10]};
    color: ${theme.colors.alpha.trueWhite[70]};
    padding: 0;
    width: 42px;
    height: 42px;
    border-radius: 100%;
    margin-left: ${theme.spacing(2)};

    &.active,
    &:active,
    &:hover {
      background: ${alpha(theme.colors.alpha.trueWhite[30], 0.2)};
      color: ${theme.colors.alpha.trueWhite[100]};
    }
`
);

const BoxLogoWrapper = styled(Box)(
  ({ theme }) => `
  margin-right: ${theme.spacing(2)};

  @media (min-width: ${theme.breakpoints.values.lg}px) {
    width: calc(${theme.sidebar.width} - ${theme.spacing(4)});
  }
    
`
);

function TopNavigationBar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

  return (
    <HeaderWrapper>
      <Box display="flex" alignItems="center">
        <BoxLogoWrapper>
          <MainLogo />
        </BoxLogoWrapper>
        <Box
          component="span"
          sx={{
            display: { xs: 'none', sm: 'inline-block' },
          }}
        >
          {'test'}
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <TopButtonGroup />
        <UserIcon />
        <Box
          component="span"
          sx={{
            display: { lg: 'none', xs: 'inline-block' },
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            {/* 打開user控制選單 */}
            <IconButtonPrimary color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
            </IconButtonPrimary>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default TopNavigationBar;
