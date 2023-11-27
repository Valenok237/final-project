import { Link } from 'react-router-dom';

const TarifBusiness = () => {
    return ( 
        <div className='tarif-stat'>
            <div className='tarif-stat__name tarif-stat__name_business'>
                <h3 className='tarif-stat__name_title'>Business</h3>
                <p className='tarif-stat__name_desc'>Для корпоративных клиентов</p>
            </div>
            <div className='tarif-stat__desc'>
                <p className='tarif-stat__price tarif-stat__price_business'>
                    <span>2 379 ₽</span> <del>3 700 ₽</del>
                </p>
                <ul className='tarif-stat__list'>
                    В тариф входит:
                    <li className='tarif-stat__list_item'>Все пункты тарифа Pro</li>
                    <li className='tarif-stat__list_item'>Безлимитное количество запросов</li>
                    <li className='tarif-stat__list_item'>Приоритетная поддержка</li>
                </ul>
                <Link to='#!' className='tarif-stat__btn'>Подробнее</Link>
            </div>
        </div>
    );
}
 
export default TarifBusiness;