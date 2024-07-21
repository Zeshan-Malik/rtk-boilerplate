import { Navigate } from 'react-router-dom';
import TopBarLayOut from '../../Components/TopbarLayout.js';

const Private = ({Component, isAuthenticated}) => {
    return isAuthenticated ?<TopBarLayOut> <Component /></TopBarLayOut> : <Navigate to="/login" />
}
export default Private