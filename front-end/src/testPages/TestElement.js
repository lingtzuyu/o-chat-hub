import React, { useState, useEffect } from 'react';

// import { Helmet } from 'react-helmet-async';

import TopBarContent from './TopBarContent';
import BottomBarContent from './BottomBarContent';
import SidebarContent from './SideBarContent';
import ChatContent from './ChatContent';
import MessengerContent from './MessengerContent';
import TopNavigationBar from './TopNavigationBar/TopNavigationBar';
import PageTitleWrapper from './TopNavigationBar/PageTitleWrapper';

import SignInSide from '../authPages/LoginPage/SignInSIde';

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

function TestElement() {
  return (
    <>
      <RootWrapper className="Mui-FixedWrapper">
        <SignInSide />
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

export default connect(mapStoreStateToProps, mapActionsToProps)(TestElement);
