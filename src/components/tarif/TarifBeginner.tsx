import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

const TarifBeginner = () => {
    const {isAuth} = useAppSelector(state => state.acc);
    return ( 
        <div className='tarif-stat'>
            <div className='tarif-stat__name tarif-stat__name_beginner'>
                <h3 className='tarif-stat__name_title'>Beginner</h3>
                <p className='tarif-stat__name_desc'>Для небольшого исследования</p>
            </div>
            <div className='tarif-stat__desc'>
                {isAuth && 
                <div className='tarif-stat__now'>Текущий тариф</div>
                }
                <p className='tarif-stat__price'>
                    <span>799 ₽</span> <del>1 200 ₽</del><br/>
                    или 150 ₽/мес. при рассрочке на 24 мес.
                </p>
                <ul className='tarif-stat__list'>
                    В тариф входит:
                    <li className='tarif-stat__list_item'>Безлимитная история запросов</li>
                    <li className='tarif-stat__list_item'>Безопасная сделка</li>
                    <li className='tarif-stat__list_item'>Поддержка 24/7</li>
                </ul>
                {!isAuth && 
                <Link to='#!' className='tarif-stat__btn'>Подробнее</Link>
                }
                {isAuth &&
                <Link to='#!' className='tarif-stat__btn tarif-stat__btn_active'>Перейти в личный кабинет</Link>
                }
            </div>
        </div>
    );
}
 
export default TarifBeginner;