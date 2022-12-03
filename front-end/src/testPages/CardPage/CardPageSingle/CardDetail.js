import React from 'react';
import {
  Box,
  Card,
  alpha,
  Typography,
  Divider,
  Stack,
  IconButton,
  Avatar,
  styled,
  useTheme,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid,
  Tooltip,
} from '@mui/material';
import NotionIcon from '../../../shared/images/notion-icon.png';
import TrelloIcon from '../../../shared/images/trello-icon.png';
import Text from '../../../shared/components/Text';
import Label from '../../../shared/components/Lable';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import AddLinkTwoToneIcon from '@mui/icons-material/AddLinkTwoTone';
import LinkOffTwoToneIcon from '@mui/icons-material/LinkOffTwoTone';
import InsertLinkTwoToneIcon from '@mui/icons-material/InsertLinkTwoTone';
import AutorenewTwoToneIcon from '@mui/icons-material/AutorenewTwoTone';

const CardActions = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(1.5)};
    top: ${theme.spacing(1.5)};
    z-index: 7;
  `
);

const CardActionAreaWrapper = styled(Box)(
  ({ theme }) => `
        text-align: center;
        background: ${alpha(theme.colors.primary.main, 0.03)};

        .MuiTouchRipple-root {
          opacity: .2;
        }
  
        .MuiCardActionArea-focusHighlight {
          background: ${theme.colors.primary.main};
        }
  
        &:hover {
          .MuiCardActionArea-focusHighlight {
            opacity: .05;
          }
        }
  `
);

const DotLegend = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

const cardFakeData = [
  {
    category: 1,
  },
];

function CardDetail() {
  const theme = useTheme();

  return (
    <Box marginTop={'30px'} padding={'10px'}>
      <Card
        sx={{
          position: 'relative',
          textAlign: 'center',
          pt: 4,
          pb: 3,
          px: 3,
        }}
      >
        {/* 狀態 1. 分類 2. notetime 3. Transferred 4. From */}
        <Box>
          <Box p={2}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={3}>
                <Card variant="outlined" sx={{ backgroundColor: 'yellow' }}>
                  <CardActionAreaWrapper
                    sx={{
                      p: 2,
                    }}
                  >
                    <Box>
                      <img
                        src={NotionIcon}
                        style={{ width: 60, borderRadius: 10 }}
                        alt="take-notes.chat"
                      />
                    </Box>

                    <Typography variant="h4">{'Notion'}</Typography>

                    {/* <Typography
                      sx={{
                        fontSize: `${theme.typography.pxToRem(11)}`,
                        lineHeight: 1,
                      }}
                      variant="subtitle2" */}

                    {/* TODO: 待搬出去 */}

                    {cardFakeData.category === 1 ? (
                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        <DotLegend
                          style={{
                            background: `${theme.colors.success.main}`,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="success">connected</Text>
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        <DotLegend
                          style={{
                            background: `${theme.colors.warning.main}`,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="warning">disconnected</Text>
                        </Typography>
                      </Box>
                    )}
                    {/* // <Text color="success">{user.notionConnect}</Text> */}
                    {/* </Typography> */}
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      {cardFakeData.category === 1 ? (
                        <Box>
                          <Tooltip title="Go to linked notion">
                            <Link href={`https://www.google.com`}>
                              <IconButton>
                                <InsertLinkTwoToneIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <Tooltip title="disconnect to Notion">
                            <IconButton>
                              <LinkOffTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      ) : (
                        <Box>
                          <Tooltip title="Recover previous linked db">
                            <IconButton>
                              <AutorenewTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="connect to Notion (build a new linked Notion db)">
                            <Link href={`https://www.google.com`}>
                              <IconButton>
                                <AddLinkTwoToneIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                        </Box>
                      )}
                    </Box>
                  </CardActionAreaWrapper>
                </Card>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card variant="outlined">
                  <CardActionAreaWrapper
                    sx={{
                      p: 2,
                    }}
                  >
                    <Box>
                      <img
                        src={NotionIcon}
                        style={{ width: 60, borderRadius: 10 }}
                        alt="take-notes.chat"
                      />
                    </Box>

                    <Typography variant="h4">{'Notion'}</Typography>

                    {/* <Typography
                      sx={{
                        fontSize: `${theme.typography.pxToRem(11)}`,
                        lineHeight: 1,
                      }}
                      variant="subtitle2" */}

                    {/* TODO: 待搬出去 */}

                    {cardFakeData.category === 1 ? (
                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        <DotLegend
                          style={{
                            background: `${theme.colors.success.main}`,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="success">connected</Text>
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        <DotLegend
                          style={{
                            background: `${theme.colors.warning.main}`,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="warning">disconnected</Text>
                        </Typography>
                      </Box>
                    )}
                    {/* // <Text color="success">{user.notionConnect}</Text> */}
                    {/* </Typography> */}
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      {cardFakeData.category === 1 ? (
                        <Box>
                          <Tooltip title="Go to linked notion">
                            <Link href={`https://www.google.com`}>
                              <IconButton>
                                <InsertLinkTwoToneIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <Tooltip title="disconnect to Notion">
                            <IconButton>
                              <LinkOffTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      ) : (
                        <Box>
                          <Tooltip title="Recover previous linked db">
                            <IconButton>
                              <AutorenewTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="connect to Notion (build a new linked Notion db)">
                            <Link href={`https://www.google.com`}>
                              <IconButton>
                                <AddLinkTwoToneIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                        </Box>
                      )}
                    </Box>
                  </CardActionAreaWrapper>
                </Card>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card variant="outlined">
                  <CardActionAreaWrapper
                    sx={{
                      p: 2,
                    }}
                  >
                    <Box>
                      <img
                        src={NotionIcon}
                        style={{ width: 60, borderRadius: 10 }}
                        alt="take-notes.chat"
                      />
                    </Box>

                    <Typography variant="h4">{'Notion'}</Typography>

                    {/* <Typography
                      sx={{
                        fontSize: `${theme.typography.pxToRem(11)}`,
                        lineHeight: 1,
                      }}
                      variant="subtitle2" */}

                    {/* TODO: 待搬出去 */}

                    {cardFakeData.category === 1 ? (
                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        <DotLegend
                          style={{
                            background: `${theme.colors.success.main}`,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="success">connected</Text>
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        <DotLegend
                          style={{
                            background: `${theme.colors.warning.main}`,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="warning">disconnected</Text>
                        </Typography>
                      </Box>
                    )}
                    {/* // <Text color="success">{user.notionConnect}</Text> */}
                    {/* </Typography> */}
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      {cardFakeData.category === 1 ? (
                        <Box>
                          <Tooltip title="Go to linked notion">
                            <Link href={`https://www.google.com`}>
                              <IconButton>
                                <InsertLinkTwoToneIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <Tooltip title="disconnect to Notion">
                            <IconButton>
                              <LinkOffTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      ) : (
                        <Box>
                          <Tooltip title="Recover previous linked db">
                            <IconButton>
                              <AutorenewTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="connect to Notion (build a new linked Notion db)">
                            <Link href={`https://www.google.com`}>
                              <IconButton>
                                <AddLinkTwoToneIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                        </Box>
                      )}
                    </Box>
                  </CardActionAreaWrapper>
                </Card>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card variant="outlined">
                  <CardActionAreaWrapper
                    sx={{
                      p: 2,
                    }}
                  >
                    <Box>
                      <img
                        src={NotionIcon}
                        style={{ width: 60, borderRadius: 10 }}
                        alt="take-notes.chat"
                      />
                    </Box>

                    <Typography variant="h4">{'Notion'}</Typography>

                    {/* <Typography
                      sx={{
                        fontSize: `${theme.typography.pxToRem(11)}`,
                        lineHeight: 1,
                      }}
                      variant="subtitle2" */}

                    {/* TODO: 待搬出去 */}

                    {cardFakeData.category === 1 ? (
                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        <DotLegend
                          style={{
                            background: `${theme.colors.success.main}`,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="success">connected</Text>
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        marginTop="10px"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent={'center'}
                      >
                        <DotLegend
                          style={{
                            background: `${theme.colors.warning.main}`,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: `${theme.typography.pxToRem(11)}`,
                            lineHeight: 1,
                          }}
                          variant="subtitle2"
                        >
                          <Text color="warning">disconnected</Text>
                        </Typography>
                      </Box>
                    )}
                    {/* // <Text color="success">{user.notionConnect}</Text> */}
                    {/* </Typography> */}
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      {cardFakeData.category === 1 ? (
                        <Box>
                          <Tooltip title="Go to linked notion">
                            <Link href={`https://www.google.com`}>
                              <IconButton>
                                <InsertLinkTwoToneIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <Tooltip title="disconnect to Notion">
                            <IconButton>
                              <LinkOffTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      ) : (
                        <Box>
                          <Tooltip title="Recover previous linked db">
                            <IconButton>
                              <AutorenewTwoToneIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="connect to Notion (build a new linked Notion db)">
                            <Link href={`https://www.google.com`}>
                              <IconButton>
                                <AddLinkTwoToneIcon />
                              </IconButton>
                            </Link>
                          </Tooltip>
                        </Box>
                      )}
                    </Box>
                  </CardActionAreaWrapper>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* 標題 */}
        <Typography gutterBottom variant="h3">
          Alex Ling
        </Typography>
        {/* Tag生成，如果有需要要map出來 [tags] */}
        {/* <Box py={2}>
        <Label color="info">Web developer</Label>
        <Box component="span" px={1}>
          <Label color="warning">Javascript</Label>
        </Box>
        <Label color="error">Angular</Label>
      </Box> */}
        {/* 筆記內文 */}
        <Typography
          sx={{
            px: { xs: 4, md: 8 },
          }}
          variant="subtitle2"
        >
          {
            'BAGANONONONONONONONONONONONONO BAGANONONONONONONONONONONONONO BAGANONONONONONONONONONONONONO BAGANONONONONONONONONONONONONO BAGANONONONONONONONONONONONONO'
          }
          .
        </Typography>
        <Divider
          sx={{
            mt: 3,
          }}
        />
        <>
          <React.Fragment key={123}>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                {/* TODO: 目前沒有AVATAR */}
                <Avatar alt="User" src={''} />
              </ListItemAvatar>
              <ListItemText
                // TODO: 改成吃username
                primary={<Text color="black">{'Sundar'}</Text>}
                primaryTypographyProps={{
                  variant: 'h5',
                  // noWrap: true,
                }}
                secondary={
                  'This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages This is test messages '
                }
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  // noWrap: true,
                }}
              />
            </ListItem>
          </React.Fragment>
        </>
        {/* 這邊要放message from以及內文的itemList */}
        <Divider
          sx={{
            mt: 3,
          }}
        />
        <Stack
          sx={{
            mt: 2.5,
            textAlign: 'center',
          }}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <Box>
            <Typography gutterBottom variant="h4">
              2022-12-30
            </Typography>
            <Typography variant="subtitle2">{'新增時間'}</Typography>
          </Box>
          <Box>
            <Typography gutterBottom variant="h4">
              2022-12-30
            </Typography>
            <Typography variant="subtitle2">{'新增時間'}</Typography>
          </Box>
          <Box>
            <Typography gutterBottom variant="h4">
              Sundar Pichai
            </Typography>
            <Typography variant="subtitle2">{'From'}</Typography>
          </Box>
          <Box>
            <Typography gutterBottom variant="h4">
              <Link href="#" variant="body2">
                Notion Link
              </Link>
            </Typography>
            <Typography variant="subtitle2">{'Exported'}</Typography>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}

export default CardDetail;
