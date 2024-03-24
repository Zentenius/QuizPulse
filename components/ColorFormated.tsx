interface Props {
    text: string;
  }
  
  export default function ColorFormattedText({ text,}: Props) {
    const words = text.split(' ');
  
    return (
      <>
        {words.map((word, i) => (
          <span key={i} className="text-green">{word}</span>  
        ))}
      </>
    )
  }