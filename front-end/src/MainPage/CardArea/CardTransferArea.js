import React from 'react';
import styled from '@emotion/styled';
import { ExportCardMenu } from './ExportCardMenu';

const CardTransferContainer = styled('div')({
  width: '90%',
  height: '8%',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'red',
  align: 'center',
});

export default function CardTransferArea() {
  return (
    <CardTransferContainer>
      <ExportCardMenu></ExportCardMenu>
    </CardTransferContainer>
  );
}
