import React from "react";
import { ClipboardIcon } from "./Icons";

interface EmailDisplayProps {
  emailSubject: string;
  emailBody: string;
}

const EmailDisplay: React.FC<EmailDisplayProps> = ({
  emailSubject,
  emailBody,
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copiado para a área de transferência!");
      })
      .catch((err) => {
        console.error("Erro ao copiar: ", err);
      });
  };

  return (
    <div className="email-container">
      <div className="email-header">
        <h2 className="email-title">E-mail Gerado</h2>
      </div>

      <div className="email-section">
        <div className="email-section-header">
          <h3 className="email-section-title">Assunto:</h3>
          <button
            onClick={() => copyToClipboard(emailSubject)}
            className="copy-button"
          >
            <ClipboardIcon /> Copiar
          </button>
        </div>
        <p className="email-content">{emailSubject}</p>
      </div>

      <div className="email-section">
        <div className="email-section-header">
          <h3 className="email-section-title">Corpo:</h3>
          <button
            onClick={() => copyToClipboard(emailBody)}
            className="copy-button"
          >
            <ClipboardIcon /> Copiar
          </button>
        </div>
        <div
          className="email-body"
          dangerouslySetInnerHTML={{ __html: emailBody }}
        />
      </div>
    </div>
  );
};

export default EmailDisplay;
