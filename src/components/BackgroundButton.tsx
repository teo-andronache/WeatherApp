import React, { useState } from 'react';
import styled from 'styled-components';
import "./BackgroundButton.css"


type BackgroundButtonProps = {
  onClick: () => void;
};


const Button = styled.button`
  background-color: #0097e6;
  color: black;
  font-size: 8px;
  padding: 5px 5px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

const BackgroundButton: React.FC<BackgroundButtonProps> = ({ onClick }) => {
  return (
    <div className='theme-selector'>
      <Button onClick={onClick}>
        <p>Change</p>
        <p>Theme</p>
      </Button>


    </div>
  );
};

export default BackgroundButton;