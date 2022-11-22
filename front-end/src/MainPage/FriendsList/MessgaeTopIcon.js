import * as React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const LeftTopIconTabsContainer = styled('div')({
  width: '100%',
  height: '10%',
  justifyContent: 'center',
  alignItems: 'center',
  dispaly: 'flex',
  backgroundColor: 'grey',
});

const TestContainer = styled('div')({
  width: '100%',
  height: '100%',
  marginTop: '10px',
  justifyContent: 'center',
  alignItems: 'center',
  dispaly: 'flex',
});

export default function MessgaeTopIcon() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <LeftTopIconTabsContainer>
      <TestContainer>
        <Tabs
          centered="true"
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
        >
          <Tab
            icon={<InsertCommentIcon sx={{ color: '#1363DF' }} />}
            iconPosition="top"
            label="MyChat"
          />
          <Tab
            icon={<WhatsAppIcon sx={{ color: '#1363DF' }} />}
            iconPosition="top"
            label="WhatsApp"
          />
          <Tab
            icon={<AddIcon sx={{ color: '#1363DF' }} />}
            iconPosition="top"
            label="Add more"
          />
        </Tabs>
      </TestContainer>
    </LeftTopIconTabsContainer>
  );
}
