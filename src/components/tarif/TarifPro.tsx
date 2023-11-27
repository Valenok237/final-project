import { Link } from 'react-router-dom';

const TarifPro = () => {
    return ( 
        <div className='tarif-stat'>
            <div className='tarif-stat__name tarif-stat__name_pro'>
                <h3 className='tarif-stat__name_title'>Pro</h3>
                <p className='tarif-stat__name_desc'>Для HR и фрилансеров</p>
            </div>
            <div className='tarif-stat__desc'>
                <p className='tarif-stat__price'>
                    <span>1 299 ₽</span> <del>2 600 ₽</del><br/>
                    или 279 ₽/мес. при рассрочке на 24 мес.
                </p>
                <ul className='tarif-stat__list'>
                    В тариф входит:
                    <li className='tarif-stat__list_item'>Все пункты тарифа Beginner</li>
                    <li className='tarif-stat__list_item'>Экспорт истории</li>
                    <li className='tarif-stat__list_item'>Рекомендации по приоритетам</li>
                </ul>
                <Link to='#!' className='tarif-stat__btn'>Подробнее</Link>
            </div>
        </div>
    );
}
 
export default TarifPro;