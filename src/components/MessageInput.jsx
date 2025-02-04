import React, { useState } from 'react';
import styled from 'styled-components';

const MessageInput = ({ sendMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim()) {
            sendMessage(inputValue);
            setInputValue('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputField
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="질문을 입력하세요"

            />
            <SendButton type="submit" onKeyDown={handleKeyDown}>전송</SendButton>
        </Form>
    );
};

export default MessageInput;


const Form = styled.form`
    display: flex;
    padding: 20px;
    border-top: 1px solid #444444;
    background-color: #1a1a1a;
    border-radius: 0 0 10px 10px;
`;

const InputField = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #444444;
    border-radius: 20px;
    margin-right: 10px;
    background-color: #333333;
    color: white;

    &:focus {
        outline: none;
        border-color: #9292ff;
        box-shadow: 0 0 10px #9292ff;
    }
`;

const SendButton = styled.button`
    font-weight: 500;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;
