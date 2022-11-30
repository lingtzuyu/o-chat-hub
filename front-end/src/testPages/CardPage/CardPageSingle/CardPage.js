import React, { useState, useEffect } from 'react';

import PageTitleWrapper from '../../TopNavigationBar/PageTitleWrapper';

import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CardDetail from './CardDetail';

import Scrollbar from '../../../shared/components/Scrollbar';

import {
  Box,
  styled,
  Divider,
  Drawer,
  IconButton,
  useTheme,
} from '@mui/material';

const RootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`
);

const Sidebar = styled(Box)(
  ({ theme }) => `
        width: 300px;
        background: ${theme.colors.alpha.white[100]};
        border-right: ${theme.colors.alpha.black[10]} solid 1px;
`
);

const WorkSpaceWrapper = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        
`
);

const ChatWindow = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        
`
);

const CardWindow = styled(Box)(
  () => `
        width: 36%;
        height: 100%;
        display: flex;
        flex-direction: column;
        
`
);

const ChatTopBar = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.white[100]};
        border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
        padding: ${theme.spacing(2)};
        align-items: center;
`
);

const ChatTopBarContainer = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.white[100]};
        padding: ${theme.spacing(2)};
        align-items: center;
`
);

const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  background: ${theme.colors.alpha.white[100]};
`
);

const DrawerWrapperMobile = styled(Drawer)(
  () => `
    width: 340px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 340px;
        z-index: 3;
  }
`
);

export function CardPage() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      window.location.pathname = '/login';
    }
  }, []);

  return (
    <>
      {/* <Helmet>
        <title>Messenger - Applications</title>
      </Helmet> */}
      <PageTitleWrapper></PageTitleWrapper>
      <RootWrapper className="Mui-FixedWrapper">
        <DrawerWrapperMobile
          sx={{
            display: { lg: 'none', xs: 'inline-block' },
          }}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <Scrollbar>Test</Scrollbar>
        </DrawerWrapperMobile>

        <WorkSpaceWrapper>
          <Sidebar
            sx={{
              display: { xs: 'none', lg: 'inline-block' },
            }}
          >
            Side
          </Sidebar>

          <ChatWindow>
            <ChatTopBar
              sx={{
                display: { xs: 'flex', lg: 'inline-block' },
              }}
            >
              TopBar，這邊放20%
            </ChatTopBar>
            <Box
              alignItems={'center'}
              flex={1}
              sx={{
                display: { xs: 'flex', lg: 'inline-block' },
              }}
            >
              <Scrollbar>
                <CardDetail></CardDetail>
                <CardDetail></CardDetail>
                <CardDetail></CardDetail>
                <CardDetail></CardDetail>
                <CardDetail></CardDetail>
                <CardDetail></CardDetail>
              </Scrollbar>
            </Box>
          </ChatWindow>
          <Sidebar
            sx={{
              display: { xs: 'none', lg: 'inline-block' },
            }}
          >
            Side
          </Sidebar>
        </WorkSpaceWrapper>
      </RootWrapper>
    </>
  );
}

export default CardPage;
