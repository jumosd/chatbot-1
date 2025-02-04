import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message';
import MessageInput from './MessageInput';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // 초기 환영 메시지
        appendMessage('bot', '허허..또 무슨 범죄를 저질렀냐?');
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
                    { role: 'system', content: '변호사이며 법률조언 전문가이다 대한민국 헌법을 잘알고있으며 답변을 잘한다 자신감넘치는 말투 거칠게 말한다 반말을 사용하며 가끔욕을 섞는다 ' },
                    { role: 'user', content: userMessage },
                ],
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content;
    };

    return (
        <ChatBoxContainer>
            <Title>씨발놈아 형량어때?</Title>
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


const Title = styled.div`
    padding: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    background-color: #222222;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 1px solid #333333;
    text-align: center;
`

const ChatBoxContainer = styled.div`
    max-width: 500px;
    width: 100%;
    height: 800px;
    background-color: #333333;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        height: 100vh;
    }
`;

const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #1a1a1a;
    border-radius: 10px;
`;