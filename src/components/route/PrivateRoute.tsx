import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

const PrivateRoute = () => {
    const {isAuth} = useAppSelector(state => state.acc);

    return ( 
        isAuth ? <Outlet /> : <Navigate to='/autorisation' />
    ); 
}
 
export default PrivateRoute;