import {useForm, Controller} from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate, Link } from "react-router-dom";
import { ISubmitFields } from '../../types/interfaces';
import { fetchAcc } from '../../store/ActionCreators';
import { useEffect } from 'react';

const Form:React.FC = () => {
    const {register, formState: {errors, isValid}, handleSubmit, reset, control} = useForm<ISubmitFields>({mode:'onChange'});

    const {isAuth} = useAppSelector(state => state.acc);
    const dispatch = useAppDispatch();
    
    const navigate = useNavigate();
    useEffect(() => {
        if(isAuth) {
            navigate(-1);
        }
    },[isAuth]); 

    const onSubmit = handleSubmit((data) => {
        dispatch(fetchAcc(data.login, data.password));
        reset()
    });

    return (  
        <form onSubmit={onSubmit} className="autorisation-form">
            <div className="autorisation-entrance">
                <div className="autorisation-entrance__signIn">Войти</div>
                <div className="autorisation-entrance__signUp">Зарегистрироваться</div>
            </div>
            <label className="autorisation-form__label">Логин или номер телефона:
                <input style={errors.login && { borderColor: "red" }}  type="text" className="autorisation-form__input" 
                    {...register('login', {
                        required: 'Поле не заполнено',
                        pattern: {
                            value: /^[\d\+][\d\(\)\ -]{4,14}\d$|^[a-zA-Z0-9-_]{4,14}$/,
                            message: 'Введите корректные данные'
                        } 
                    })}
                />  
                {errors.login && <div style={{color: 'red', textAlign:'center'}}>{errors.login.message}</div>}
            </label>
            <label className="autorisation-form__label">Пароль:
                <input  style={errors.password && { borderColor: "red" }} type="password" className="autorisation-form__input"
                    {...register('password', {
                        required: 'Поле не заполнено'
                    })}
                />
                {errors.password && <div style={{color: 'red', textAlign:'center'}}>{errors.password.message}</div>}
            </label>
            <button type='submit' className="autorisation-form__btn" disabled={!isValid}>Войти</button>
            <Link to="#!" className="autorisation-form__restore">Восстановить пароль</Link>
            <label className="autorisation-form__label">Войти через:
                <ul className="autorisation-list">
                    <Link to="#!">
                        <li className="autorisation-list__item autorisation-list__item_google"></li>
                    </Link>
                    <Link to="#!">
                        <li className="autorisation-list__item autorisation-list__item_facebook"></li>
                    </Link>
                    <Link to="#!">
                        <li className="autorisation-list__item autorisation-list__item_yandex"></li>
                    </Link>
                </ul>
            </label>
        </form>
    );
}
 
export default Form;