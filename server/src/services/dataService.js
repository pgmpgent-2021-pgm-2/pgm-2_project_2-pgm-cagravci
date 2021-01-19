/*
Import packages
*/
const fs = require('fs');
const { Http2ServerRequest } = require('http2');
const path = require('path');
const {
    v4: uuidv4
} = require('uuid');

/*
Import custom packages
*/
const {
    HTTPError,
    convertArrayToPagedObject
} = require('../utils');

/*
File paths
*/
const filePathMessages = path.join(__dirname, '..', 'data', 'messages.json');
const filePathMatches = path.join(__dirname, '..', 'data', 'matches.json');
const filePathUsers = path.join(__dirname, '..', 'data', 'users.json');

/*
Write your methods from here
*/
//cca: read matches.json
//cca: read the matches.json data (step:1)
const readDataFromMatches = () => {
    const data = fs.readFileSync(filePathMatches, {
        encoding: 'utf-8',
        flag: 'r'
    });
    const matches = JSON.parse(data);
    return matches;
};

//cca: read users.json
//cca: read the users.json data (step:1)
const readDataFromUsers = () => {
    const data = fs.readFileSync(filePathUsers, {
        flag: 'r'
    });
    const users = JSON.parse(data);
    return users;
};

//cca: read messages.json
//cca: read the messages.json data (step:1)
const readDataFromMessages = () => {
    const data = fs.readFileSync(filePathMessages, {
        flag: 'r'
    });
    const messages = JSON.parse(data);
    return messages;
};

//cca: get all matches (step:2)
const getMatches = () => {
    try {
        const matches = readDataFromMatches();
        return matches;
    } catch (error) {
        throw new HTTPError('Cannot get matches!', 500);
    };
};

//cca: get all users (step:2)
const getUsers = () => {
    try {
        const users = readDataFromUsers();
        users.sort((a, b) => {
            if (a.username > b.username) {
                return 1;
            } else if (a.username < b.username) {
                return -1;
            }
            return 0;
        });
        return users;
    } catch (error) {
        throw new HTTPError('Cannot get users!', 500);
    };
};


//cca: get all the messages (step:2)
const getMessages = () => {
    try {
        const messages = readDataFromMessages();
        return messages;

    } catch (error) {
        throw new HTTPError('cannot get messages!', 500);
    }
};

//cca: get messages from a specific user
const getMessagesFromUserById = (userId) => {
    try {
        const messages = readDataFromMessages();
        //filter array where messageId equals userId
        const selectedMessages = messages.filter(m => m.senderId === userId || m.receiverId === userId)
        if(!selectedMessages) {
            throw new HTTPError(`cannot get messages of user with usersId: ${userId}!`, 500);
        }
        return selectedMessages;

    } catch (error) {
        throw new HTTPError('cannot get messages!', 500);
    }
};

//cca: get message from messageId
const getMessageById = (messageId) => {
    try {
        const messages = readDataFromMessages();
        //filter array where messageId equels messageid
        const selectedMessage = messages.filter(m => m.id === messageId)
        if(!selectedMessage){
            throw new HTTPError(`cannot get message with messageId: ${messageId}!`, 500);
        }
        return selectedMessage;
    } catch (error) {
        throw new HTTPError('cannot get message!', 500);
    }
}

//cca: get matches from userId
const getMatchesFromUserById = (userId) => {
    try {
        const matches = readDataFromMatches();
        //filter array where matches equals userid
        const selectedMatches = matches.filter(m => m.userId === userId)
        if(!selectedMatches){
            throw new HTTPError(`cannot get message with messageId: ${userId}!`, 500);
        }
        return selectedMatches;
    } catch (error) {
        throw new HTTPError('cannot get message!', 500);
    }
}


//cca: get user by id
const getUserById = (userId) => {
    try{
        const users = readDataFromUsers();
        const selectedUser = users.filter(user => user.id === userId)
        if(!selectedUser) {
            throw new HTTPError(`cannot get message with messageId: ${userId}!`, 500);
        }
        return selectedUser;
    } catch (error){
        throw new HTTPError('cannot get message!', 500);
    } 
}
// Export all the methods of the data service
module.exports = {
    getMatches,
    getUsers,
    getMessages,
    getMessagesFromUserById,
    getMessageById,
    getMatchesFromUserById,
    getUserById,
};