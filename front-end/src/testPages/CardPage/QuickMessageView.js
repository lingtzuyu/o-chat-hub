import React, { useState, useEffect, useRef } from 'react';

import {
  Box,
  ListItemAvatar,
  ListItemText,
  Divider,
  List,
  ListItem,
  Card,
  Typography,
  IconButton,
  Button,
  Avatar,
  styled,
  useTheme,
  Dialog,
} from '@mui/material';

import { getActions } from '../../store/actions/card_actions';
import { connect } from 'react-redux';

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

import Scrollbar from '../../../src/shared/components/Scrollbar';
import Text from '../../shared/components/Text';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';

const ListWrapper = styled(List)(
  () => `
    .MuiDivider-root:first-of-type {
        display: none;
    }
  `
);

function QuickMessageView({
  messageRecords,
  isMessageViewOpen,
  setMessageView,
  messagesInQuickView,
}) {
  // console.log('最底層', messageRecords);

  const theme = useTheme();

  const handleCloseThisDialog = () => {
    setMessageView(false);
  };

  return (
    <Dialog open={isMessageViewOpen} onClose={handleCloseThisDialog}>
      <Card
        sx={{
          position: 'relative',
        }}
      >
        {/* 標題 */}
        <Box pt={3} px={3}>
          <Typography variant="h3">{'Saved Messages'}</Typography>
          <Typography variant="subtitle2">
            {'Take some inspiring notes from them!'}.
          </Typography>
        </Box>

        <Box
          sx={{
            height: 300,
          }}
        >
          <Scrollbar>
            <ListWrapper disablePadding>
              {messagesInQuickView.map((ele) => {
                return (
                  <>
                    <React.Fragment key={ele._id}>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          {/* TODO: 目前沒有AVATAR */}
                          <Avatar alt="User R" src={''} />
                        </ListItemAvatar>
                        <ListItemText
                          // TODO: 改成吃username
                          primary={<Text color="black">{ele.sender}</Text>}
                          primaryTypographyProps={{
                            variant: 'h5',
                            // noWrap: true,
                          }}
                          secondary={ele.body}
                          secondaryTypographyProps={{
                            variant: 'subtitle2',
                            // noWrap: true,
                          }}
                        />
                      </ListItem>
                    </React.Fragment>
                  </>
                );
              })}
            </ListWrapper>
          </Scrollbar>
        </Box>
        <Divider />
        <Box
          p={3}
          sx={{
            textAlign: 'center',
          }}
        >
          <Button
            variant="contained"
            endIcon={<ArrowForwardTwoToneIcon />}
            size="small"
            onClick={handleCloseThisDialog}
          >
            {'Close'}
          </Button>
        </Box>
      </Card>
    </Dialog>
  );
}

const mapStoreStateToProps = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(QuickMessageView);
