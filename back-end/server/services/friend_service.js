require('dotenv').config();
const FriendModel = require('../models/friend_model');
const { APIException } = require('./exceptions/api_exception');
const { Exception } = require('./exceptions/exception');

const checkUserExistService = async (mail) => {
  const presentFunctionName = 'checkUserExistService';

  const result = await FriendModel.checkUserExist(mail);

  if (result === undefined) {
    throw new APIException(
      `Target user ${mail} not exist`,
      'User type in wrong mail',
      400,
      presentFunctionName,
    );
  }
  return result;
};

const checkTargetIsNotMyself = (myId, targetId) => {
  const presentFunctionName = 'checkTargetIsNotMyself';

  if (targetId === myId) {
    throw new APIException(
      'You are not allowed to add yourself',
      'User type in their own mail',
      400,
      presentFunctionName,
    );
  }
};

const checkAlreadyFriends = async (myId, targetId) => {
  const presentFunctionName = 'checkAlreadyFriends';

  const result = await FriendModel.getTargetFriendFromDB(myId, targetId);
  if (result[0]) {
    throw new APIException(
      `Target user ${targetId} is already your friend`,
      'User type in their friends',
      400,
      presentFunctionName,
    );
  }
};

const checkInvitationIsPending = async (myId, targetId) => {
  const presentFunctionName = 'checkInvitationIsPending';

  const result = await FriendModel.checkPendingInvitation(myId, targetId);
  if (result[0]) {
    const sentTime = result[0]?.sendtime;
    throw new APIException(
      `You have already sent the invitation at ${sentTime}`,
      'Duplicated invitation',
      400,
      presentFunctionName,
    );
  }
};

module.exports = {
  checkUserExistService,
  checkTargetIsNotMyself,
  checkAlreadyFriends,
  checkInvitationIsPending,
};
