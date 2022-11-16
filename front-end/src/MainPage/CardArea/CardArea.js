import React from 'react';
import styled from '@emotion/styled';
import NoteCard from './NoteCard';

const CardAreaMainContainer = styled('div')({
  width: '90%',
  height: '80%',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'grey',
  align: 'center',
});

export default function CardArea() {
  return (
    <CardAreaMainContainer>
      <NoteCard />
    </CardAreaMainContainer>
  );
}
