import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logoutAcc,} from '../../store/ActionCreators';
import logo from './logo.svg';
import AccountLogin from './AccountLogin';
import AccountLogout from './AccountLogout';

const Header: React.FC = () => {
    const {isAuth} = useAppSelector(state => state.acc);

    const dispatch = useAppDispatch();
    useEffect(() =>{
        if(isAuth) {
            let expire = localStorage.getItem('expire');
            let date = new Date(expire!);
            let expireDate = date.getTime();
            if (expireDate < Date.now()) {
                dispatch(logoutAcc);
                alert('Необходимо снова войти в аккаунт!');
            }  
        }
    },[isAuth]);

    return (  
        <header className="header">
            <div className="container">
                <div className='header__wrapper'>
                    <div className="header-logo">
                        <Link to='/' className="header-logo__link">
                            <img src={logo} alt="Логотип" className="header-logo__img"/>
                        </Link>
                    </div>
                    <nav className="header-nav">
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
                    </nav>
                    <div className="header-account">
                        <AccountLogin/>
                        <AccountLogout/>
                    </div>
                </div>        
            </div>
        </header>
    );
}
 
export default Header;