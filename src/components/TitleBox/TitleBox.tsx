import './TitleBox.css';

interface TitleBoxProps {
  text?: string;
}

const TitleBox = ({ text = "moja ljubavi" }: TitleBoxProps) => {
  return (
    <div className="title-box">
      <h1>{text}</h1>
    </div>
  );
};

export default TitleBox;
