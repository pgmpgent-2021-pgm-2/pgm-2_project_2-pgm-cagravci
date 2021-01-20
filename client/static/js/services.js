const TINDER_BASE_PATH = 'http://localhost:8080/api';

function TinderApi() {
  this.getUsers = async () => {
    try {
      const response = await fetch(`${TINDER_BASE_PATH}/users`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('error occured!', error);
    }
  };

  this.getReceivedMessagesFromUser = async (userId) => {
    try {
      const response = await fetch(`${TINDER_BASE_PATH}/users/${userId}/messages`)
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('error occured!', error)
    }
  };

  this.getSentMessagesFromUser = async (userId) => {};

  this.getConversationBetweenUsers = async (userId, friendId) => {
    try {
      //take the userID and comapre with friendID, to have messages between these two users: conversation
      let userMessages = await this.getReceivedMessagesFromUser(userId);
      let selectedUserMessages = await userMessages.filter(m => {
        return (m.senderId === friendId || m.receiverId === friendId)
      })

      return selectedUserMessages;
    } catch (error) {
      console.error('error occured', error)
    }

  };

  this.addMessageBetweenUsers = async (obj) => {
    try{
      const messageToAdd = {
        "senderId": obj.userId,
        "receiverId": obj.friendId,
        "message": obj.message
      }
      const response = await fetch(`${TINDER_BASE_PATH}/messages`, {
        "method": "POST",
        "mode": "cors",
        "headers": {
          'Content-Type': 'application/json'
        },
        "body": JSON.stringify(messageToAdd)
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  this.getMatchesForUser = async (userId) => {
    try {
      const response = await fetch(`${TINDER_BASE_PATH}/users/${userId}/matches`)
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error)
    }

  };
  this.getUserById = async (userId) => {
    try{
      const response = await fetch(`${TINDER_BASE_PATH}/users/${userId}`)
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error)
    }
  }

  this.getMatches = async () => {
    try {
      const response = await fetch(`${TINDER_BASE_PATH}/matches`)
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error)
    }
  }
 
  this.addMatch = async (userId, friendId, rating) => {};
}