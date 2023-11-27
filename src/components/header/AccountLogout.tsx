import { useNavigate} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logoutAcc } from '../../store/ActionCreators';
import Loader from '../Loader';
import profilePic from './profilePic.jpg';

const AccountLogout = () => {
    const {isAuth,user, isLoading} = useAppSelector(state => state.acc);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutAcc);
        navigate('/');
    };

    return ( 
        <>
        {(isAuth || isLoading) && 
            <div className="account-logout">
                <div className="account-logout__stats">
                    {isLoading ? 
                    <Loader />
                    :
                    <>
                    <div className="account-logout__stat">Использовано компаний<span>{user.eventFiltersInfo.usedCompanyCount}</span></div>
                    <div className="account-logout__stat">Лимит по компаниям<span>{user.eventFiltersInfo.companyLimit}</span></div>
                    </>
                    }
                </div>
                <div className="account-profile">
                    {!isLoading &&
                    <>
                    <div className="account-profile__wrapper">
                        <div className="account-profile__name">Алексей А.</div>
                        <button onClick={logout} className="account-profile__logout">Выйти</button>
                    </div>
                    <div className="account-profile__img">
                        <img className="account-profile__img_pic" src={profilePic} alt="Аватарка" />
                    </div>
                    </>
                    }
                </div>    
            </div> 
        }
        </>    
    );
}
 
export default AccountLogout;