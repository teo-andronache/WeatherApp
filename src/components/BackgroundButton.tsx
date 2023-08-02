import React, { useState } from 'react';

type BackgroundButtonProps = {
  onClick: () => void;
};

const BackgroundButton: React.FC<BackgroundButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      Change Background Color
    </button>
  );
};

export default BackgroundButton;
