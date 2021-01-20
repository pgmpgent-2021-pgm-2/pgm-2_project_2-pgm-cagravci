(() => {
    const app = {
        initialize() {
            this.tinderApi = new TinderApi();
            this.fetchUsers();
            

            this.registerListeners();
        },
        async fetchUsers() {
            this.users = await this.tinderApi.getUsers();
            this.myUser = await this.users[0];
            this.generateUIForUsers(this.users)
            this.fetchMatchesFromUser(this.myUser);
        },
        generateUIForUsers(users) {
            //populate users data
            document.querySelector('.users__list').innerHTML = users.map(user => {
                return `
                <li>
                    <a href="#" data-id="${user.id}">
                        <img src="${user.picture.thumbnail}" />
                        <h3>${user.username}</h3>
                    </a>
                </li>`
            }).join('')

            //add some eventlisteners
            let $usersList = document.querySelectorAll('.users__list a')
            $usersList.forEach($user => {
                $user.addEventListener('click', event => {
                    this.fetchMessagesFromUser($user.dataset.id);
                })
            })

        },
        async fetchMessagesFromUser(userId) {
            //get the messages of the user
            this.messages = await this.tinderApi.getReceivedMessagesFromUser(userId);

            let receivedMessages = this.messages.filter(m => m.receiverId === userId)
            document.querySelector('.inbox__list').innerHTML = receivedMessages.map(m => {
                return `
                <li>
                    <a href="#" data-senderid="${m.senderId}" data-receiverid="${m.receiverId}">
                        <p> ${m.message}</p>
                    </a>
                </li>`
            }).join('')

            //add event listeners
            let $messageListInbox = document.querySelectorAll('.inbox__list li a')
            if ($messageListInbox) {
                $messageListInbox.forEach($message => {
                    $message.addEventListener('click', e => {
                        this.fetchConversationFromUser($message.dataset.receiverid, $message.dataset.senderid) //first the receiver (INBOX) then compare with who send it
                    })
                })
            }

            
            let sendMessages = this.messages.filter(m => m.senderId === userId)
            document.querySelector('.outbox__list').innerHTML = sendMessages.map(m => {
                return `
                <li>
                    <a href="#" data-senderid="${m.senderId}" data-receiverid="${m.receiverId}">
                        <p> ${m.message}</p>
                    </a>
                </li>`
            }).join('')

            //add event listerners
            //add event listeners
            let $messageListOutbox = document.querySelectorAll('.outbox__list li a')
            if ($messageListOutbox) {
                $messageListOutbox.forEach($message => {
                    $message.addEventListener('click', e => {
                        this.fetchConversationFromUser($message.dataset.senderid, $message.dataset.receiverid) //first the sender (OUTBOX) then compare with who received it
                    })
                })
            }

        },
        async fetchConversationFromUser(userId, friendId) {
            //get the conversation from the user
            this.conversation = await this.tinderApi.getConversationBetweenUsers(userId, friendId);
            document.querySelector('.conversation__list').innerHTML = this.conversation.map(convo => {
                return `
                <li>
                <p>${convo.message}</p>
                </li>`
            }).join('') + ` <form action="#" method="POST" id="message-send" data-senderId="${userId}" data-receiverId="${friendId}">
                                <input id="message" name="message" type="text" placeholder="Write a message">
                                <button type="submit">Send message!</button>
                            </form>`

            //add events for the form
            let $sendMessageForm = document.querySelector('#message-send')
            $sendMessageForm.addEventListener('submit', async e => {
                e.preventDefault();
                const messageToAdd = {
                    "userId": $sendMessageForm.dataset.senderid,
                    "friendId":  $sendMessageForm.dataset.receiverid,
                    "message": $sendMessageForm[0].value
                }
                await this.tinderApi.addMessageBetweenUsers(messageToAdd)
            })
        },
        async fetchMatchesFromUser(userId) {
            //get the matches for main user
            this.matches = await this.tinderApi.getMatchesForUser(userId.id)

            let userInfoOfMatches = []
            this.matches.forEach(m => {
                this.users.forEach(mm => {
                    if(m.friendId === mm.id) {
                        userInfoOfMatches.push(mm);
                    }
                })
            })

            document.querySelector('.matches__list').innerHTML = userInfoOfMatches.map(match=> {
                return `
                <li>
                    <a href="#">
                        <img src="${match.picture.thumbnail}" />
                        <h3>${match.username}</h3>
                    </a>
                </li>`
            }).join('')

            this.noMatches = await this.tinderApi.getMatches();
            let selectedMatches = this.noMatches.filter(m => { return m.userId !== userId.id || m.friendId !== userId.id}) //not matched with user
            let userInfoOfNoMatches = []
            selectedMatches.forEach(m => {
                this.users.forEach(mm => {
                    if(m.userId === mm.id && userInfoOfNoMatches.indexOf(mm) === -1 ) {
                        userInfoOfNoMatches.push(mm)
                    }
                })
            })

            document.querySelector('.no-matches__list').innerHTML = userInfoOfNoMatches.map(match=> {
                return `
                <li>
                    <a href="#">
                        <img src="${match.picture.thumbnail}" />
                        <h3>${match.username}</h3>
                    </a>
                </li>`
            }).join('')
            
        },
        registerListeners() {

        }
    }
    app.initialize();
})();