import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateEmailContent = async (
  extractedText: string,
  _userName: string,
  _companyName: string,
  onChunkReceived: (chunk: string) => void
) => {
  try {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

    if (!apiKey) {
      throw new Error("API key not found. Please check your .env file.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analise o seguinte conteúdo de um site e identifique o tipo de negócio, possíveis oportunidades de implementação de IA e gere um email de vendas personalizado:
    Conteúdo do site: ${extractedText}
    Formato do email:
    Assunto: Como a IA pode impulsionar o seu negócio
    Corpo do email:
    [Texto persuasivo destacando oportunidades específicas de IA para o negócio, mencionando casos de uso relevantes.]
    Escreva o e-mail no mesmo idioma do conteúdo da página, no lugar de usar nomes para se apresentar utilize [seu nome aqui] e [sua empresa aqui]. Seja claro e objetivo, o e-mail não deve ficar muito longo. A sua resposta deve conter apenas o assunto e o corpo do e-mail.`;

    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      onChunkReceived(chunkText);
    }
  } catch (error) {
    console.error("Error generating email content:", error);
    throw error;
  }
};
