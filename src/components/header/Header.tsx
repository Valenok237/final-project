import {Link, useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logoutAcc,} from '../../store/ActionCreators';
import logo from './logo.svg';
import logoWhite from '../footer/white-logo.svg'
import AccountLogin from './AccountLogin';
import AccountLogout from './AccountLogout';

const Header: React.FC = () => {
    const {isAuth} = useAppSelector(state => state.acc);
    const [menuActive, setMenuActive] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() =>{
        if(isAuth) {
            let expire = localStorage.getItem('expire');
            let date = new Date(expire!);
            let expireDate = date.getTime();
            if (expireDate < Date.now()) {
                dispatch(logoutAcc);
                navigate('/');
                //alert('Необходимо снова войти в аккаунт!');
                toast.warn('Необходимо снова войти в аккаунт!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }  
        }
    },[isAuth]);

    return (  
        <header className="header">
            <ToastContainer/>
            <div className="container">
                <div className='header__wrapper'>
                    <div className="header-logo">
                        <Link to='/' className="header-logo__link">
                            <img src={logo} alt="Логотип" className="header-logo__img"/>
                        </Link>
                    </div>
                    <nav className={menuActive ? 'header-nav active' : 'header-nav'}>
                        <ul className="header-nav__list">
                            <li className="header-nav__item">
                                <Link to="/" className="header-nav__item_link">Главная</Link>
                            </li>
                            <li className="header-nav__item">
                                <Link to="#tarifs" className="header-nav__item_link">Тарифы</Link >
                            </li>
                            <li className="header-nav__item">
                                <Link to="#!" className="header-nav__item_link">FAQ</Link >
                            </li>
                        </ul>
                        <div className="header-nav__account">
                            <AccountLogin/>
                            <AccountLogout/>
                        </div>
                        <div onClick={() => setMenuActive(!menuActive)} className="header-nav__close">
                            <span className="header-nav__close_line"></span>
                            <span className="header-nav__close_line"></span>
                        </div>
                    </nav>
                    <div onClick={() => setMenuActive(!menuActive)} className="header-burger burger">
                        <span className="burger__line burger__line_first"></span>
                        <span className="burger__line burger__line_second"></span>
                        <span className="burger__line burger__line_third"></span>
                    </div>
                </div>        
            </div>
        </header>
    );
}
 
export default Header;