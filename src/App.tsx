import { useState, useEffect } from "react";
import { extractPageContent } from "./services/pageExtractor";
import { generateEmailContent } from "./services/emailGenerator";
import EmailDisplay from "./components/EmailDisplay";
import Loading from "./components/Loading";
import UserInfoForm from "./components/UserInfoForm";
import OutputDisplay from "./components/OutputDisplay";

import "./styles/global.css";
import "./styles/animations.css";

function App() {
  const [outputs, setOutputs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailGenerated, setEmailGenerated] = useState(false);
  const [completeResponse, setCompleteResponse] = useState("");

  useEffect(() => {
    if (outputs.length > 0 && completeResponse) {
      const fullContent = completeResponse;

      const subjectMatch =
        fullContent.match(/Assunto:.*?([^\n]+)/) ||
        fullContent.match(/<h1.*?>(.*?)<\/h1>/s);

      if (subjectMatch && subjectMatch[1]) {
        let subject = subjectMatch[1].trim();

        subject = subject
          .replace(/\[seu nome aqui\]/g, userName)
          .replace(/\[sua empresa aqui\]/g, companyName);
        setEmailSubject(subject);
      }

      let body = "";
      const bodyStartRegex = /Corpo do e-mail:|Assunto:.*?\n/;
      const bodyMatch = fullContent.match(bodyStartRegex);

      if (bodyMatch && bodyMatch.index !== undefined) {
        const startIndex = bodyMatch.index + bodyMatch[0].length;
        body = fullContent.substring(startIndex).trim();
      } else if (fullContent.indexOf("</h1>") !== -1) {
        body = fullContent.substring(fullContent.indexOf("</h1>") + 5).trim();
      } else {
        body = fullContent;
      }

      body = body
        .replace(/Corpo do e-mail:|Corpo do email:/g, "")
        .replace(/\[seu nome aqui\]/g, userName)
        .replace(/\[sua empresa aqui\]/g, companyName);

      setEmailBody(body);
      setEmailGenerated(true);
    }
  }, [completeResponse, userName, companyName]);

  const handleSubmit = () => {
    if (!userName || !companyName) {
      alert(
        "Por favor, preencha seu nome e o nome da sua empresa antes de continuar."
      );
      return;
    }

    setLoading(true);
    setOutputs([]);
    setEmailGenerated(false);
    setCompleteResponse("");

    extractPageContent(handleTextExtracted);
  };

  const handleTextExtracted = async (extractedText: string) => {
    try {
      const tempOutputs: string[] = [];

      const onChunkReceived = (chunkText: string) => {
        tempOutputs.push(chunkText);
        setOutputs([...tempOutputs]);
      };

      await generateEmailContent(
        extractedText,
        userName,
        companyName,
        onChunkReceived
      );

      setCompleteResponse(tempOutputs.join(""));
    } catch (error) {
      console.error("Erro ao gerar conteúdo:", error);
      setOutputs(["Erro ao processar a solicitação."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo-title">
          <img src="icons/ai.png" alt="AI Insight Hub Logo" className="logo" />
          <h1 className="app-title">AI Insight Hub</h1>
        </div>
        <p className="subtitle">
          Analise sites comerciais e gere e-mails personalizados
        </p>
      </div>

      <UserInfoForm
        userName={userName}
        companyName={companyName}
        setUserName={setUserName}
        setCompanyName={setCompanyName}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {loading && <Loading />}

      {emailGenerated && (
        <EmailDisplay emailSubject={emailSubject} emailBody={emailBody} />
      )}

      {outputs.length > 0 && !emailGenerated && (
        <OutputDisplay outputs={outputs} />
      )}
    </div>
  );
}

export default App;
