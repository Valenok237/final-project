import { useAppSelector } from "../../hooks/redux";

const AccountLogin = () => {
    const {isAuth, isLoading} = useAppSelector(state => state.acc);
    return ( 
        <>
        {(!isAuth && !isLoading)&&  
            <div className="account-login">
                <a href="#!" className="account-login__signup">Зарегистрироваться</a>
                <span>|</span>
                <a href='/autorisation' className="account-login__signin">Войти</a>
            </div> 
        }
        </>
    );
}
 
export default AccountLogin;