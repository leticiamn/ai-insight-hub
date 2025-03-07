export const extractPageContent = (callback: (text: string) => void) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    if (!tab || tab.id === undefined) {
      callback("Erro: Não foi possível acessar a aba atual.");
      return;
    }

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => {
          const pageText = document.body.innerText;
          return pageText;
        },
      },
      (results) => {
        if (chrome.runtime.lastError) {
          callback(
            "Erro ao acessar a página: " + chrome.runtime.lastError.message
          );
          return;
        }

        if (results && results[0] && results[0].result) {
          callback(results[0].result);
        } else {
          callback("Erro: Não foi possível extrair o conteúdo da página.");
        }
      }
    );
  });
};
