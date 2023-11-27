import SearchForm from '../components/searchForm/SearchForm';
import searchDecor from './../img/searchDecor.jpg';

const Search: React.FC = () => {
    return (  
        <section className="search">
            <div className="container">
                <h1 className="search__title">
                    Найдите необходимые<br/> данные в пару кликов.
                </h1>
                <p className="search__desc">
                    Задайте параметры поиска.<br/> Чем больше заполните, тем точнее поиск.
                </p>
                <div className='search__wrapper'>
                    <SearchForm/>
                    <div className="search__decor">
                        <img src={searchDecor} alt="Картинка" className="search__decor_img"/>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Search;