// 用CardBuilder map卡片資料組成
import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import {
  Box,
  CardHeader,
  Card,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  useTheme,
  styled,
  Link,
} from '@mui/material';

import CardBuilder from './CardBuilder';
import CardBuilderKnowledge from './CardBuilderKnowledge';
import CardBuilderLife from './CardBuilderLife';

import Text from '../../shared/components/Text';

import AutoAwesomeMosaicTwoToneIcon from '@mui/icons-material/AutoAwesomeMosaicTwoTone';
import CardTravelTwoToneIcon from '@mui/icons-material/CardTravelTwoTone';
import ContactPhoneTwoToneIcon from '@mui/icons-material/ContactPhoneTwoTone';
import EvStationTwoToneIcon from '@mui/icons-material/EvStationTwoTone';

import * as api from '../../api';
import { getActions } from '../../store/actions/card_actions';

import { connect } from 'react-redux';

const CardWrapper = styled(Box)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(18)};
    padding: ${theme.spacing(1)};
    width: 95%;
`
);

function CardList({
  fetchCardHistory,
  cards,
  addOrDeleteCardChange,
  setCardsListByCategory,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const accessToken = localStorage.getItem('accessToken');

  const fetchCardByCategory = async () => {
    const category = searchParams.get('category');

    const categoryParam = category ? category : 'all';

    // 帶著category打api
    const response = await api.fetchCardByCategory(categoryParam, accessToken);
    console.log('api', response);
    setCardsListByCategory(response.data);
  };

  // 取得歷史紀錄並且存在store (這邊放cards會無窮迴圈)

  useEffect(() => {
    fetchCardHistory(accessToken);
  }, []);

  useEffect(() => {
    fetchCardByCategory();
  }, [addOrDeleteCardChange]);

  const theme = useTheme();

  return (
    <CardWrapper>
      <Card variant="outlined">
        <CardHeader
          sx={{
            p: 3,
          }}
          disableTypography
          title={
            <Link color="#223354" href="/card">
              <Typography
                variant="h4"
                sx={{
                  fontSize: `${theme.typography.pxToRem(16)}`,
                }}
              >
                {'Note Cards'}
              </Typography>
            </Link>
          }
        />
        <Divider />
        <List
          sx={{
            py: 0,
          }}
        >
          {cards.map((card) => {
            if (card.Category === 'work') {
              console.log('card', card);
              return (
                <CardBuilder
                  cardId={card._id}
                  key={card._id}
                  title={card.Title}
                  noteTime={card.NoteTime}
                  from={card.FROM}
                  category={card.Category}
                  notes={card.Notes}
                  liked={card.Liked}
                  transferred={card.Transferred}
                  deleted={card.DELETED}
                  // messageRecords到下層還要再展一次
                  messageRecords={card.MessageRecords}
                />
              );
            } else if (card.Category === 'knowledge') {
              return (
                <CardBuilderKnowledge
                  cardId={card._id}
                  key={card._id}
                  title={card.Title}
                  noteTime={card.NoteTime}
                  from={card.FROM}
                  category={card.Category}
                  notes={card.Notes}
                  liked={card.Liked}
                  transferred={card.Transferred}
                  deleted={card.DELETED}
                  // messageRecords到下層還要再展一次
                  messageRecords={card.MessageRecords}
                />
              );
            } else if (card.Category === 'life') {
              return (
                <CardBuilderLife
                  cardId={card._id}
                  key={card._id}
                  title={card.Title}
                  noteTime={card.NoteTime}
                  from={card.FROM}
                  category={card.Category}
                  notes={card.Notes}
                  liked={card.Liked}
                  transferred={card.Transferred}
                  deleted={card.DELETED}
                  // messageRecords到下層還要再展一次
                  messageRecords={card.MessageRecords}
                />
              );
            }
          })}
        </List>
      </Card>
    </CardWrapper>
  );
}

const mapStoreStateToProps = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(CardList);
