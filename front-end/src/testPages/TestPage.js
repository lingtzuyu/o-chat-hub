import React, { useState, useEffect } from 'react';

// import { Helmet } from 'react-helmet-async';

import TopBarContent from './TopBarContent';
import BottomBarContent from './BottomBarContent';
import SidebarContent from './SideBarContent';
import ChatContent from './ChatContent';
import MessengerContent from './MessengerContent';
import TopNavigationBar from './TopNavigationBar/TopNavigationBar';
import PageTitleWrapper from './TopNavigationBar/PageTitleWrapper';

import CardList from './CardPage/CardList';

import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

import { MeesageIfNoChosenContact } from './component/MessageIfNoChosenContact';

import Scrollbar from '../shared/components/Scrollbar';

import {
  Box,
  styled,
  Divider,
  Drawer,
  IconButton,
  useTheme,
} from '@mui/material';

// userDetail資料從這邊拿的
import { connectSocketBackend } from '../chat/socketConnectionClient';

import { connect } from 'react-redux';
import { getActions } from '../store/actions/auth_actions';
import { setChosenChatDetails } from '../store/actions/chat_actions';
import CardTopBar from './CardPage/CardTopBar';

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
        width: 64%;
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

// setUserDetails目前只有token
function ApplicationsMessenger({
  setUserDetails,
  chosenChatDetails,
  getUserInfoDetail,
}) {
  const accessToken = localStorage.getItem('accessToken');
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    // const accessToken = localStorage.getItem('accessToken');
    // const userMail = localStorage.getItem('userMail');
    if (!accessToken) {
      // TODO: logout
      window.location.pathname = '/login';
    } else {
      // store state，從authactions這邊派發，之後userEmail可以從這邊解
      setUserDetails(accessToken);
      // TODO: 透過socket.id與mail (唯一值) 的綁定廣播來讓別人知道某人上線，改寫
      connectSocketBackend(accessToken);
      getUserInfoDetail(accessToken);
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
          <Scrollbar>
            <SidebarContent />
          </Scrollbar>
        </DrawerWrapperMobile>

        <WorkSpaceWrapper>
          <Sidebar
            sx={{
              display: { xs: 'none', lg: 'inline-block' },
            }}
          >
            <Scrollbar>
              <SidebarContent />
            </Scrollbar>
          </Sidebar>

          <ChatWindow>
            <ChatTopBar
              sx={{
                display: { xs: 'flex', lg: 'inline-block' },
              }}
            >
              <IconButtonToggle
                sx={{
                  display: { lg: 'none', xs: 'flex' },
                  mr: 2,
                }}
                color="primary"
                onClick={handleDrawerToggle}
                size="small"
              >
                <MenuTwoToneIcon />
              </IconButtonToggle>

              <TopBarContent />
            </ChatTopBar>
            <Box flex={1}>
              <Scrollbar>
                <MessengerContent />
              </Scrollbar>
            </Box>
            <Divider />
            <BottomBarContent />
          </ChatWindow>
          <CardWindow>
            <ChatTopBarContainer
              sx={{
                display: { xs: 'flex', lg: 'inline-block' },
              }}
            >
              <IconButtonToggle
                sx={{
                  display: { lg: 'none', xs: 'flex' },
                  mr: 2,
                }}
                color="primary"
                onClick={handleDrawerToggle}
                size="small"
              >
                <MenuTwoToneIcon />
              </IconButtonToggle>

              {/* 之後去改這個TopBarContent */}
              <CardTopBar />
            </ChatTopBarContainer>
            <Box flex={1}>
              <Scrollbar>
                {/* 改成卡片內容 */}
                <CardList />
              </Scrollbar>
            </Box>
            {/* <Divider /> */}
            {/* 改成轉換按鈕 */}
            {/* <BottomBarContent /> */}
          </CardWindow>
        </WorkSpaceWrapper>
      </RootWrapper>
    </>
  );
}
const mapStoreStateToProps = ({ chat }) => {
  return { ...chat };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(ApplicationsMessenger);
