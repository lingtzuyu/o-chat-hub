// 廢棄
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import NoteCard from './NoteCard';
import { getActions } from '../../store/actions/card_actions';

import { connect } from 'react-redux';

const CardAreaMainContainer = styled('div')({
  width: '90%',
  height: '80%',
  padding: '10px',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'grey',
  align: 'center',
});

const TestContainer = styled('div')({
  height: '100%',
});

const CardArea = ({ fetchCardHistory, cards }) => {
  const accessToken = localStorage.getItem('accessToken');
  // 取得歷史紀錄並且存在store (這邊放cards會無窮迴圈)
  useEffect(() => {
    fetchCardHistory(accessToken);
  }, []);
  return (
    <CardAreaMainContainer>
      <TestContainer>
        {cards?.map((card) => {
          return (
            <>
              <NoteCard
                key={card._id}
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
            </>
          );
        })}
      </TestContainer>
    </CardAreaMainContainer>
  );
};

const mapStoreStateToProps = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(CardArea);
