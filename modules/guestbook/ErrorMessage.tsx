type ErrorMessageProps = {
  title: string;
  subtitle: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  return (
    <div className="p-4">
      <p className="font-bold text-lg">{props.title}</p>
      <p>{props.subtitle}</p>
    </div>
  );
};

export default ErrorMessage;
