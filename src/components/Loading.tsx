import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Analisando a página, aguarde...</p>
    </div>
  );
};

export default Loading;
