import resultDecor from './../img/resulrDecor.jpg';
import Table from '../components/table/Table';
import Publications from '../components/publications/Publications';
import { useAppSelector } from '../hooks/redux';


const Result: React.FC = () => {
    const {histogram} = useAppSelector(state => state.doc);

    const dataHistogram = histogram.map(obj => obj.data);
    const dataTotal = dataHistogram[0];
    const dataVariants = dataTotal.reduce((total, current) => total + current.value, 0);

    return (  
        <section className="result">
            <div className="container">
                <div className="result__wrapper">
                    <div className="result-desc">
                        <h1 className="result-desc__title">Ищем. Скоро будут результаты</h1>
                        <p className="result-desc__mark">
                            Поиск может занять некоторое время, просим сохранять терпение.
                        </p>
                    </div>
                    <div className="result-decor">
                        <img src={resultDecor} alt="" className="result-decor__img" />
                    </div>
                </div>
                <div className="result-table">
                    <h2 className="result-table__title">Общая сводка</h2>
                    <div className="result-table__mark">Найдено {dataVariants} вариантов</div>
                    <Table/>
                </div>
                <div className='result-publications'>
                    <h2 className='result-publications__title'>Список документов</h2>
                    <Publications/>
                </div>
            </div>
        </section>
    );
}
 
export default Result;