import * as React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import AddIcon from '@mui/icons-material/Add';
import styled from '@emotion/styled';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const LeftTopIconTabsContainer = styled('div')({
  width: '96%',
  height: '10%',
  align: 'center',
  marginLeft: '36px',
  marginTop: '16px',
});

export default function MessgaeTopIcon() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <LeftTopIconTabsContainer>
      <Tabs
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
    </LeftTopIconTabsContainer>
  );
}
