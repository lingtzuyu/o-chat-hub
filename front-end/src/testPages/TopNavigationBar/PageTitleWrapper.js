import { Box, styled, Card, IconButton, alpha, Link } from '@mui/material';
import TopButtonGroup from './TopbuttonGroup';
import UserIcon from './Components/UserIcon';
import MainLogo from '../../shared/images/TopBar-Logo.png';
import BannerLogo from '../../shared/images/Logo-Banner.png';

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(1)};
      
`,
);

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
    height: ${theme.header.height};
    color: ${theme.header.textColor};
    padding: ${theme.spacing(0, 2)};
    right: 0;
    z-index: 6;
    background-color: ${alpha(theme.colors.primary.main, 0.95)};
    backdrop-filter: blur(3px);
    position: fixed;
    justify-content: space-between;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 0;
`,
);

const IconButtonPrimary = styled(IconButton)(
  ({ theme }) => `
    background: ${theme.colors.alpha.trueWhite[10]};
    color: ${theme.colors.alpha.trueWhite[70]};
    padding: 0;
    width: 42px;
    height: 42px;
    border-radius: 100%;
    margin-left: ${theme.spacing(2)};

    &.active,
    &:active,
    &:hover {
      background: ${alpha(theme.colors.alpha.trueWhite[30], 0.2)};
      color: ${theme.colors.alpha.trueWhite[100]};
    }
`,
);

const BoxLogoWrapper = styled(Box)(
  ({ theme }) => `
  margin-right: ${theme.spacing(2)};

  @media (min-width: ${theme.breakpoints.values.lg}px) {
    width: calc(${theme.sidebar.width} - ${theme.spacing(4)});
  }
    
`,
);

// 把上方header空間撐開
const PageTitleWrapper = () => {
  return (
    <Box sx={{ backgroundColor: '#5c71ff' }}>
      <PageTitle>
        <Box display="flex" justifyContent="space-between">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Link href="https://take-notes.chat">
                <img
                  src={MainLogo}
                  style={{ width: 60, borderRadius: 60 }}
                  alt="take-notes.chat"
                />
              </Link>
            </Box>
            <Box>
              <Link href="https://take-notes.chat">
                <img
                  src={BannerLogo}
                  style={{ width: 180, borderRadius: 60 }}
                  alt="take-notes.chat"
                />
              </Link>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* fetch the last five card */}
            <TopButtonGroup />
            <UserIcon />
          </Box>
        </Box>
      </PageTitle>
    </Box>
  );
};

export default PageTitleWrapper;
