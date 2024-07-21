import { Navigate } from 'react-router-dom';

const Public = ({Component}) => {
    const autisAuthenticatedh = false; //your logic

    return !autisAuthenticatedh ?  <Component /> : <Navigate to="/user" />
}
export default Public