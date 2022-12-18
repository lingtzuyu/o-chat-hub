import { useEffect, useState } from 'react';
import { Box, styled, Tabs, Tab } from '@mui/material';
import { getActions } from '../../store/actions/card_actions';
import { useSearchParams, useLocation } from 'react-router-dom';
import * as api from '../../api';

import { connect } from 'react-redux';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`,
);

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }

        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: ${theme.spacing(3)};
                font-size: ${theme.typography.pxToRem(16)};
                color: ${theme.colors.alpha.black[50]};

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: ${theme.colors.alpha.black[100]};
            }
        }
  `,
);

const roles = [
  { label: 'All', value: 'all' },
  { label: 'Work', value: 'work' },
  { label: 'Knowledge', value: 'knowledge' },
  { label: 'Life', value: 'life' },
];

function CardTopBar({
  setCardsListByCategory,
  setCurrentCategory,
  currentCategoryParams,
  chosenChatDetails,
}) {
  const token = localStorage.getItem('accessToken');
  const [currentTab, setCurrentTab] = useState(currentCategoryParams);
  const fromId = chosenChatDetails?.id;

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
    // 將?category= 設為該value，可以設很多種，例如keyword

    searchParams.set('category', value);
    // 改變url
    setSearchParams(searchParams);
    setCurrentCategory(value);
  };

  const fetchCardByCategory = async () => {
    const category = searchParams.get('category');
    // 帶著category打api

    const response = await api.fetchCardByCategory(category, token, fromId);

    setCardsListByCategory(response.data);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // location改變的時候同時也fetch api (card category)
  useEffect(() => {
    fetchCardByCategory();
  }, [location]);

  const tabs = [
    { value: 'all', label: 'All' },
    { value: 'work', label: 'Work' },
    { value: 'knowledge', label: 'Knowledge' },
    { value: 'life', label: 'Life' },
    { value: 'fromCurrent', label: 'From Current User' },
  ];

  return (
    <>
      <RootWrapper>
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
          }}
        >
          <TabsContainerWrapper>
            <Tabs
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
              sx={{ marginTop: '15px', marginLeft: '10px' }}
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </TabsContainerWrapper>
          {/* <TextField
            sx={{
              mt: 2,
              mb: 1,
            }}
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              ),
            }}
            placeholder={'Search...'}
          /> */}
        </Box>
      </RootWrapper>
    </>
  );
}

const mapStoreStateToPropse = ({ card, friends, chat }) => {
  return { ...card, ...friends, ...chat };
};
const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};
export default connect(mapStoreStateToPropse, mapActionsToProps)(CardTopBar);
