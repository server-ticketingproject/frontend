import { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import ProfileCircle from '../../components/ProfileCircle';

const users = ['User 1', 'User 2', 'User 3'];

export default function ChatApp() {
  const [selectedUser, setSelectedUser] = useState('User 1');
  const [chatMap, setChatMap] = useState<{ [key: string]: { text: string; from: string }[] }>({
    'User 1': [],
    'User 2': [],
    'User 3': [],
  });
  const [unreadMap, setUnreadMap] = useState<{ [key: string]: number }>({
    'User 1': 0,
    'User 2': 0,
    'User 3': 0,
  });
  const [message, setMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [chatMap[selectedUser]]);

  const handleSend = () => {
    if (!message.trim()) return;

    const updatedChat = [...(chatMap[selectedUser] || []), { text: message, from: 'me' }];
    setChatMap(prev => ({ ...prev, [selectedUser]: updatedChat }));
    setMessage('');
  };

  const handleSelectUser = (user: string) => {
    setSelectedUser(user);
    setUnreadMap(prev => ({ ...prev, [user]: 0 }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>

      <div className={styles.chatContainer}>
        <div className={styles.userList}>
          {/* ...existing code... */}
          {users.map(user => {
            const messages = chatMap[user];
            const lastMsg = messages?.[messages.length - 1]?.text || '';
            const unread = unreadMap[user];
            return (
              <div
                key={user}
                className={
                  `${styles.userItem} ${styles.clickableUserItem}` +
                  (selectedUser === user ? ` ${styles.selectedUserItem}` : "")
                }
                onClick={() => handleSelectUser(user)}
              >
                <ProfileCircle />
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{user}</span>
                  <span className={styles.lastMessage}>{lastMsg}</span>
                </div>
                {unread > 0 && (
                  <span className={styles.badge}>{unread}</span>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.userChat}>
          <div className={styles.chatHeader}>
            <ProfileCircle />
            <span>Chat with {selectedUser}</span>
          </div>

          <div className={styles.chatMessages} ref={messageEndRef}>
            <div className={styles.messageList}>
              {(chatMap[selectedUser] || []).map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.chatBubble} ${msg.from === 'me' ? styles.fromMe : styles.fromOther}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chatInput}>
            <input
              className={styles.chatInputField}
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSend();
              }}
            />
            <button className={styles.sendButton} onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
