import Alert from 'react-bootstrap/Alert';

function ErrorMessage({variant = "info",children}) {
  
  return (
    <Alert variant={variant} >
     {children}
    </Alert>
  );
}

export default ErrorMessage;