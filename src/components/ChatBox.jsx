import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message';
import MessageInput from './MessageInput';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // 초기 환영 메시지
        appendMessage('bot', '안녕하세요! 무엇을 도와드릴까요?');
    }, []);

    const sendMessage = async (messageContent) => {
        if (messageContent.trim()) {
            appendMessage('user', messageContent);
            const botResponse = await getBotResponse(messageContent);
            appendMessage('bot', botResponse);
        }
    };

    const appendMessage = (sender, messageContent) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { content: messageContent, id: prevMessages.length, sender },
        ]);
    };

    const getBotResponse = async (userMessage) => {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: userMessage },
                ],
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content;
    };

    return (
        <ChatBoxContainer>
            <MessagesContainer>
                {messages.map((message) => (
                    <Message key={message.id} content={message.content} sender={message.sender} />
                ))}
                <div ref={messagesEndRef} />
            </MessagesContainer>
            <MessageInput sendMessage={sendMessage} />
        </ChatBoxContainer>
    );
};

export default ChatBox;

const ChatBoxContainer = styled.div`
    max-width: 600px;
    max-height: 400px;
    height: 100vh;
    margin: auto;
    background-color: #333333;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
`;

const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #1a1a1a;
    border-radius: 10px;
`;