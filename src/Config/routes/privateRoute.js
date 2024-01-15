import { Navigate } from 'react-router-dom';

const Private = ({Component, isAuthenticated}) => {
    return isAuthenticated ? <Component /> : <Navigate to="/login" />
}
export default Private