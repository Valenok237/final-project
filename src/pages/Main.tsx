import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import mainDecor from './../img/mainDecor.svg';
import aboutDecor from './../img/aboutDecor.jpg'
import { useEffect, useState } from 'react';
import TarifBeginner from '../components/tarif/TarifBeginner';
import TarifPro from '../components/tarif/TarifPro';
import TarifBusiness from '../components/tarif/TarifBusiness';
import time from '../img/time.svg';
import search from '../img/search.svg';
import shield from '../img/shield.svg';


const Main: React.FC = () => {

    return (  
        <>
            <section className="main">
                <div className="container">
                    <div className="main__wrapper">
                        <div className="main-desc">
                            <h1 className="main-desc__title">
                                Сервис по поиску<br/>
                                публикаций<br/>
                                о компании<br/>
                                по его ИНН
                            </h1>
                            <p className="main-desc__text">
                                Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                            </p>
                            <Link to='/search' className="main-desc__btn">Запросить данные</Link>
                        </div>
                        <div className="main-decor"> 
                            <img src={mainDecor} alt="Картинка" className="main-decor__img" />
                        </div>
                    </div>
                </div>
            </section>

            <section className='about'>
                <div className='container'>
                    <h2 className='about__title'>Почему именно мы</h2>
                    <div className='about-achievements'>
                        <div className='about-achievement'>
                            <img src={time} alt='Иконка'  className='about-achievement__icon'/>
                            <p className='about-achievement__text'>
                                Высокая и оперативная скорость обработки заявки
                            </p>
                        </div>
                        <div className='about-achievement'>
                            <img src={search} alt='Иконка'  className='about-achievement__icon'/>
                            <p className='about-achievement__text'>
                                Огромная комплексная база данных, обеспечивающая объективный ответ на запрос
                            </p>
                        </div>
                        <div className='about-achievement'>
                            <img src={shield} alt='Иконка'  className='about-achievement__icon'/>
                            <p className='about-achievement__text'>
                                Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству   
                            </p>
                        </div>
                    </div>
                    <div className='about-decor'>
                        <img src={aboutDecor} alt='Картинка' className='about-decor__img'/>
                    </div>
                </div>
            </section>

            <section id='tarifs' className='tarifs'>
                <div className='container'>
                    <h2 className='tarifs__title'>Наши тарифы</h2>
                    <div className='tarifs__stats'>
                        <TarifBeginner/>
                        <TarifPro/>
                        <TarifBusiness/>
                    </div>
                </div>
            </section>
        </>
    );
}
 
export default Main;