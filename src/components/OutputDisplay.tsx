import React from "react";

interface OutputDisplayProps {
  outputs: string[];
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ outputs }) => {
  return (
    <div className="output-container">
      <h2 className="output-title">Saída em Tempo Real:</h2>
      {outputs.map((output, index) => (
        <div key={index} className="chunk">
          <p>{output}</p>
        </div>
      ))}
    </div>
  );
};

export default OutputDisplay;
