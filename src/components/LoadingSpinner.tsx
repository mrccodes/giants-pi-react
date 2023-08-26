interface LoadingSpinnerProps {
    style?: React.CSSProperties;
}
const LoadingSpinner: React.FC = ({ style }: LoadingSpinnerProps) => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={style ?? { height: "100vh" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
