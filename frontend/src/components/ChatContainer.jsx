import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageSkeleton from './skeletons/MessageSkeleton'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'
import { useRef } from 'react'

function ChatContainer() {
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore()
    const { authUser } = useAuthStore()
    const messageEndRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id);

        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages])

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    if (isMessagesLoading) return <MessageSkeleton />

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <div className='flex-1 overflow-y-auto p4 space-y-4'>
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${message.senderId === selectedUser._id ? "chat-start" : "chat-end"}`}
                        ref={messageEndRef}
                    >
                        <div className='chat-image avatar'>
                            <div className='size-10 rounded-full border'>
                                <img
                                    src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                                    alt="profile pic"
                                />
                            </div>
                        </div>
                        <div className='chat-header mb-1'>
                            <time className='text-xs opacity-50 ml-1'>
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>
                        <div className='chat-bubble flex flex-col'>
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt='Attachment'
                                    className='sm:max-w-[200px] rounded-md mb-2'
                                />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <MessageInput />
        </div>
    )
}

export default ChatContainer