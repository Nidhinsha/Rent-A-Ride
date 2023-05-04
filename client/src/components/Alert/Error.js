import Alert from 'react-bootstrap/Alert';

function ErrorMessage({variant = "error",children}) {
  
  return (
    <Alert variant={variant} >
     {children}
    </Alert>
  );
}

export default ErrorMessage;