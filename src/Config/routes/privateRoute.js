import { Navigate } from 'react-router-dom';
import MainLayout from '../../Components/Layout';

const Private = ({Component, isAuthenticated}) => {
    return isAuthenticated ? <MainLayout> <Component /></MainLayout>  : <Navigate to="/login" />
}
export default Private