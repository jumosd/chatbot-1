import React from 'react';
import styled from 'styled-components';

const Message = ({ content, sender }) => {
    return (
        <MessageWrapper sender={sender}>
            {sender === 'bot' && 
            <ProfileImage src="https://image.xportsnews.com/contents/images/upload/article/2022/1128/mb_1669621507974521.jpg" alt="profile" />
            }
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

const ProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
`;

const MessageContainer = styled.div`
   
    padding: 10px 15px;
    border-radius: 20px;
    max-width: 70%;
    background-color: ${({ sender }) => (sender === 'bot' ? '#666' : '#444444')};
    color: #ffffff;
    border: 1px solid ${({ sender }) => (sender === 'bot' ? '#666' : '#555555')};
`;