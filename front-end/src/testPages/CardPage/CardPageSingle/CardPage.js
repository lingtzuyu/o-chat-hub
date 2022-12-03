import React, { useState, useEffect } from 'react';

import PageTitleWrapper from '../../TopNavigationBar/PageTitleWrapper';

import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CardDetail from './CardDetail';

import Scrollbar from '../../../shared/components/Scrollbar';
import CardPageTopBar from './CardPageTopBar';

import {
  Box,
  styled,
  Divider,
  Drawer,
  IconButton,
  useTheme,
} from '@mui/material';

import { getActions } from '../../../store/actions/card_actions';
import { connect } from 'react-redux';

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
        border-right: ${theme.colors.alpha.black[10]} 1px;
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
        border-bottom: ${theme.colors.alpha.black[10]}  1px;
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

export function CardPage({ cards }) {
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
              <CardPageTopBar />
            </ChatTopBar>
            <Box
              alignItems={'center'}
              flex={1}
              sx={{
                display: { xs: 'flex', lg: 'inline-block' },
              }}
            >
              <Scrollbar>
                {cards.map((card) => {
                  const localNoteTime = new Date(card.NoteTime);
                  const localDate = localNoteTime.toDateString();
                  return (
                    <CardDetail
                      category={card.Category}
                      from={card.FROM}
                      fromMail={card.FromMail}
                      title={card.Title}
                      messageRecords={card.MessageRecords}
                      notes={card.Notes}
                      liked={card.Liked}
                      transferred={card.Transferred}
                      fromId={card.FromId}
                      noteDate={localDate}
                      mapId={card._id}
                    />
                  );
                })}
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

const mapStoreStateToProps = ({ auth, card }) => {
  return { ...auth, ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(CardPage);
