function ErrorMessage({ message }) {
  return (
    <div className="status-box error-box" role="alert">
      {message}
    </div>
  );
}

export default ErrorMessage;
