import React from 'react';
import styled from 'styled-components';

const Message = ({ content, sender }) => {
    return (
        <MessageWrapper sender={sender}>
            <MessageContainer sender={sender}>
                {content}
            </MessageContainer>
        </MessageWrapper>
    );
};

export default Message;
const MessageWrapper = styled.div`
    display: flex;
    align-self: ${({ sender }) => (sender === 'bot' ? 'flex-start' : 'flex-end')};
    justify-content: ${({ sender }) => (sender === 'bot' ? 'flex-start' : 'flex-end')};
    margin: 10px 0;
`;

const MessageContainer = styled.div`

    padding: 10px 15px;
    border-radius: 20px;
    max-width: 70%;
    background-color: ${({ sender }) => (sender === 'bot' ? '#666' : '#444444')};
    color: #ffffff;
    border: 1px solid ${({ sender }) => (sender === 'bot' ? '#666' : '#555555')};
`;