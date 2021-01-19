/*
Import custom packages
*/
const dataService = require('../../services/dataService');
const { HTTPError, handleHTTPError } = require('../../utils');

/*
Get all messages
*/
const getMessages = (req, res, next) => {

  try{
     //get messages from dataService
     const messages = dataService.getMessages();
     //Send responds
     res.status(200).json(messages);
  } catch (error) {
     handleHTTPError(new HTTPError('The action method is not yet implemented!', 501), next);
  }
 
};

/*
Get a specific message
*/
const getMessageById = (req, res, next) => {
  try{
    //get messageId parameter from the url
    const { messageId } = req.params;
    //get message from messageId
    const message = dataService.getMessageById(messageId);
    //send response
    res.status(200).json(message)
  } catch (error) {
    handleHTTPError(new HTTPError('The action method is not yet implemented!', 501), next);
  }
  
};

/*
Get messages from a specific user
*/
const getMessagesFromUserById = (req, res, next) => {
  try{
     //get userId parameter from the url
     const { userId } = req.params;
     //get messages from specific user
     const messages = dataService.getMessagesFromUserById(userId);
     //send response
     res.status(200).json(messages)
  } catch (error) {
    handleHTTPError(new HTTPError('The action method is not yet implemented!', 501), next);
  }
  
};

/*
Create a new message
*/
const createMessage = (req, res, next) => {
  handleHTTPError(new HTTPError('The action method is not yet implemented!', 501), next);
};

/*
Update a specific message
*/
const updateMessage = (req, res, next) => {
  handleHTTPError(new HTTPError('The action method is not yet implemented!', 501), next);
};

/*
Delete a specific message
*/
const deleteMessage = (req, res, next) => {
  handleHTTPError(new HTTPError('The action method is not yet implemented!', 501), next);
};

// Export the action methods = callbacks
module.exports = {
  createMessage,
  deleteMessage,
  getMessages,
  getMessageById,
  getMessagesFromUserById,
  updateMessage,
};
