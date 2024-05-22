// import React, { useEffect, useState } from "react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// interface CodeHighlighterProps {
//   code: string;
// }

// const CodeHighlighter: React.FC<CodeHighlighterProps> = ({ code }) => {
//   const [detectedLanguage, setDetectedLanguage] = useState<string | undefined>(
//     undefined
//   );

//   useEffect(() => {
//     const language = hljs.highlightAuto(code).language;
//     setDetectedLanguage(language);
//   }, [code]);

//   return (
//     <div>
//       {/* <h2>Detected Language: {detectedLanguage}</h2> */}
//       {detectedLanguage && (
//         <SyntaxHighlighter language={detectedLanguage} style={vscDarkPlus}>
//           {code}
//         </SyntaxHighlighter>
//       )}
//     </div>
//   );
// };

// export default CodeHighlighter;
