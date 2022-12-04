import React, { useState, useEffect } from 'react';
import Footer from '../component/Footer';
import {
  Box,
  styled,
  Divider,
  Drawer,
  IconButton,
  useTheme,
} from '@mui/material';

import PageTitleWrapper from '../TopNavigationBar/PageTitleWrapper';
import * as api from '../../api';

import Scrollbar from '../../shared/components/Scrollbar';
import NotionLinkTip from './NotionLinkTip';
import { acceptInvite } from '../../api';

import { getActions } from '../../store/actions/auth_actions';
import { connect } from 'react-redux';

const RootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`
);
// border-right: ${theme.colors.alpha.black[10]} solid 1px;
const Sidebar = styled(Box)(
  ({ theme }) => `
        width: 300px;
        background: ${theme.colors.alpha.white[100]};      
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

function NotionConfirmPage() {
  const theme = useTheme();
  const accessToken = localStorage.getItem('accessToken');

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (!accessToken) {
      window.location.pathname = '/login';
    }
  }, []);

  useEffect(() => {
    const params = new URL(window.document.location).searchParams;
    const code = params.get('code');
    // 如果param沒有帶code就返回
    if (!code) {
      window.location.pathname = '/homepage';
    }
  });

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
          <Scrollbar></Scrollbar>
        </DrawerWrapperMobile>

        <WorkSpaceWrapper>
          <Sidebar
            sx={{
              display: { xs: 'none', lg: 'inline-block' },
            }}
          ></Sidebar>

          <ChatWindow>
            <ChatTopBar
              sx={{
                display: { xs: 'flex', lg: 'inline-block' },
              }}
            ></ChatTopBar>
            <Box
              alignItems={'center'}
              flex={1}
              sx={{
                display: { xs: 'flex', lg: 'inline-block' },
              }}
            >
              <Scrollbar>
                <Box
                  marginTop="5%"
                  marginRight="5%"
                  marginLeft="5%"
                  marginBottom="5%"
                >
                  <NotionLinkTip />
                </Box>
              </Scrollbar>
            </Box>
          </ChatWindow>
          <Sidebar
            sx={{
              display: { xs: 'none', lg: 'inline-block' },
            }}
          ></Sidebar>
        </WorkSpaceWrapper>
      </RootWrapper>
    </>
  );
}

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(null, mapActionsToProps)(NotionConfirmPage);
