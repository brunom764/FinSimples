const formatAnalysisText = (text: string): string => {
    let formattedText = text.replace(/#+\s/g, ""); 
  
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "$1"); 
  
    formattedText = formattedText.replace(/-\s/g, ""); 

    formattedText = formattedText.replace(/(Contexto sobre a empresa|Explicação do Resultado|Prós de Investir|Contras de Investir)(\n|$)/gi, "$1: ");
  
    formattedText = formattedText.trim(); 
  
    return formattedText;
  };
  
  export const FormatAnalysisToSections = ({ text }: { text: string }) => {
    const cleanedText = formatAnalysisText(text);
  
    const startIndex = cleanedText.toLowerCase().indexOf("Contexto sobre a empresa");
    const relevantText = startIndex !== -1 ? cleanedText.slice(startIndex) : cleanedText;
  
    const sections = relevantText.split(/(?=Contexto sobre a empresa|Explicação do Resultado|Prós de Investir|Contras de Investir)/i);
  
    return (
      <div className="space-y-4">
        {sections.map((section, index) => {
          const [title, ...content] = section.split(":");
          return (
            <div key={index}>
              <h5 className="font-semibold text-gray-900 mb-2">{title.trim()}</h5>
              <p className="text-sm text-gray-700 leading-relaxed">{content.join(":").trim()}</p>
            </div>
          );
        })}
      </div>
    );
  };
