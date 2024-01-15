import { Navigate } from 'react-router-dom';

const Public = ({Component}) => {
    const autisAuthenticatedh = true; //your logic

    return !autisAuthenticatedh ?  <Component /> : <Navigate to="/user" />
}
export default Public