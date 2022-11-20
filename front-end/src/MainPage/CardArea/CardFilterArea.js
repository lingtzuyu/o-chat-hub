import React from 'react';
import styled from '@emotion/styled';
import NotionLogin from '../../integration/notion/notion_login';

const CardFilterMainContainer = styled('div')({
  width: '90%',
  height: '8%',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'green',
  align: 'center',
});

export default function CardFilterArea() {
  return (
    <CardFilterMainContainer>
      <NotionLogin />
    </CardFilterMainContainer>
  );
}
