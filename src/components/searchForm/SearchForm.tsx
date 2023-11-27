import {Controller, useForm} from 'react-hook-form';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from 'react';
import { ISearchForm, IOptions } from '../../types/interfaces';
import { isValidDate, isValidINN } from './validation';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { docBegin, fetchDoc } from '../../store/ActionCreators';

const SearchForm = () => {

    const {register, formState: {errors, isValid}, handleSubmit, reset, control} = useForm<ISearchForm>({mode:'onChange'});

    const {search} = useAppSelector(state => state.doc);
    const navigate = useNavigate();
    useEffect(()=>{
        if(search){
            navigate('/result');
        }
    },[search]);
    
    const dispatch = useAppDispatch();
    const onSubmit = handleSubmit(async(data) => {
        await dispatch(fetchDoc(data));
        dispatch(docBegin);
        reset(); 
    });

    const options:IOptions[] = [
        {
            label: 'Любая',
            value: 'any'
        },
        {
            label: 'Позитивная',
            value: 'positive'
        },
        {
            label: 'Негативная',
            value: 'negative'
        }
    ]

    const getValue = (value:string) => value ? options.find((option) => option.value === value) : '';

    return ( 
        <form onSubmit={onSubmit} className="search-form">
            <div className="search-inputs">
                <label className="search-inputs__label">ИНН компании*
                    <input style={errors.inn && { borderColor: "red", boxShadow: "0px 0px 20px 0px rgba(255, 89, 89, 0.20)", color: "red"}} className="search-inputs__item" type="text" placeholder="10 цифр"
                        {...register('inn', {
                            required: 'Поле не заполнено',
                            validate: (validValue) => {
                                if(!isValidINN(validValue)){
                                    return 'Введите корректные данные'
                                }
                            }
                        })}
                    />
                    {errors.inn && <div style={{color: 'red', textAlign:'center'}}>{errors.inn.message}</div>}
                </label>
                <label className="search-inputs__label">Тональность
                    <Controller control={control}
                        name='tonality'
                        rules={{
                            required: 'Поле не выбрано'
                        }}
                        render={({ field: {onChange, value} }) => (
                        <>    
                            <Select
                            className='search-inputs__select'
                            placeholder='Выберете тональность'
                            options={options}
                            value={getValue(value)}
                            onChange={newValue => onChange((newValue as IOptions).value)}
                            />
                        </>
                    )} /> 
                </label>
                <label className="search-inputs__label">Количество документов в выдаче*
                    <input style={errors.limit && {borderColor: "red", boxShadow: "0px 0px 20px 0px rgba(255, 89, 89, 0.20)", color: "red"}} className="search-inputs__item" type='text' placeholder="От 1 до 1000"
                        {...register('limit', {
                            required: 'Поле не заполнено',
                            validate: (validValue) => {
                                if (+validValue < 1 || +validValue > 1000 || isNaN(+validValue)) {
                                    return 'Введите корректные данные'
                                }
                            }
                        })}
                    />
                    {errors.limit && <div style={{color: 'red', textAlign:'center'}}>{errors.limit.message}</div>}
                </label>
                <label className="search-inputs__label">Диапазон поиска*
                    <div className="search-inputs__wrapper">
                        <div>
                            <input style={errors.dateStart && { borderColor: "red", boxShadow: "0px 0px 20px 0px rgba(255, 89, 89, 0.20)", color: "red" }} className="search-inputs__item search-inputs__item_range" type="text" placeholder="Дата начала"
                                {...register('dateStart', {
                                    required: 'Поле не заполнено',
                                    validate: (validValue) => {
                                        if(!isValidDate(validValue)){
                                            return 'Введите корректные данные';
                                        }
                                    }
                                })}
                            />
                            {errors.dateStart && <div className='search-inputs__item_range_start'>{errors.dateStart.message}</div>}
                        </div>
                        <div>
                            <input style={errors.dateEnd && { borderColor: "red", boxShadow: "0px 0px 20px 0px rgba(255, 89, 89, 0.20)", color: "red"}} className="search-inputs__item search-inputs__item_range" type="text" placeholder="Дата конца"
                                {...register('dateEnd', {
                                    required: 'Поле не заполнено',
                                    validate: (validValue) => {
                                        if(!isValidDate(validValue)){
                                            return 'Введите корректные данные';
                                        }
                                    }
                                })}
                            />
                            {errors.dateEnd && <div className='search-inputs__item_range_end'>{errors.dateEnd.message}</div>}
                        </div> 
                    </div>
                </label>
            </div>
            <div className="search-form__wrapper">
                <ul className="search-checkboxes">
                    <li className="search-checkboxes__item">
                        <input className="search-checkboxes__input" type="checkbox" 
                            {...register('maxFullness')}
                        />
                        <label className="search-checkboxes__label">Признак максимальной полноты</label>
                    </li>
                    <li className="search-checkboxes__item">
                        <input className="search-checkboxes__input" type="checkbox" 
                            {...register('businessNews')}
                        />
                        <label className="search-checkboxes__label">Упоминания в бизнес-контексте</label>
                    </li>
                    <li className="search-checkboxes__item">
                        <input className="search-checkboxes__input" type="checkbox" 
                            {...register('mainRole')}
                        />
                        <label className="search-checkboxes__label">Главная роль в публикации</label>
                    </li>
                    <li className="search-checkboxes__item">
                        <input className="search-checkboxes__input" type="checkbox"
                            {...register('riskFactors')}   
                        />
                        <label className="search-checkboxes__label">Публикации только с риск-факторами</label>
                    </li>
                    <li className="search-checkboxes__item">
                        <input className="search-checkboxes__input" type="checkbox" 
                           {...register('techNews')} 
                        />
                        <label className="search-checkboxes__label">Включать технические новости рынков</label>
                    </li>
                    <li className="search-checkboxes__item">
                        <input className="search-checkboxes__input" type="checkbox" 
                            {...register('announcements')} 
                        />
                        <label className="search-checkboxes__label">Включать анонсы и календари</label>
                    </li>
                    <li className="search-checkboxes__item">
                        <input className="search-checkboxes__input" type="checkbox" 
                            {...register('digests')}
                        />
                        <label className="search-checkboxes__label">Включать сводки новостей</label>
                    </li>
                </ul>
                <button className="search-form__btn" disabled={!isValid}>Поиск</button>
                <div className="search-form__mark">* Обязательные к заполнению поля</div>
            </div>
        </form>
    );
}
 
export default SearchForm;