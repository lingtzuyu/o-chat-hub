import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';

import { SingleMessageList } from './SingleMessageList';
import TempIMG from '../../shared/images/chatCover.jpg';

import { getActions } from '../../store/actions/card_actions';
import { connect } from 'react-redux';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const NoteCard = ({
  noteTime,
  from,
  category,
  notes,
  liked,
  transferred,
  deleted,
  messageRecords,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ marginTop: '10px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {from}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Checkbox {...label} />
          </IconButton>
        }
        title={from}
        subheader={noteTime}
      />
      <Typography variant="body2" color="text.secondary">
        {category}
      </Typography>
      <CardMedia component="img" height="194" image={TempIMG} alt="Test" />
      <CardContent>
        {messageRecords.map((message) => {
          return (
            <>
              <SingleMessageList
                key={message._id}
                id={message._id}
                sender={message.senderMail}
                content={message.body}
                date={message.date}
              />
            </>
          );
        })}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {/* TODO: 這邊拿來做一條一條的note */}
        <CardContent>
          <Typography paragraph>{notes}</Typography>
          <Typography>Buttom</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const mapStoreStateToPropse = ({ card }) => {
  return { ...card };
};

const mapActionsToProps = (dispatch) => {
  return { ...getActions(dispatch) };
};

export default connect(mapStoreStateToPropse, mapActionsToProps)(NoteCard);
