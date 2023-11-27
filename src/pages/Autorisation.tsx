import Form from '../components/form/Form';
import autorisationDecor from './../img/autorisationDecor.jpg';

const Autorisation: React.FC = () => {
    return (  
        <section className="autorisation">
            <div className="container">
                <div className="autorisation__wrapper">
                    <h1 className="autorisation__title">
                        Для оформления подписки<br/>
                        на тариф, необходимо<br/>
                        авторизоваться.
                    </h1>
                    <div className="autorisation-decor">
                        <img src={autorisationDecor} alt="Картинка" className="autorisation-decor__img"/>
                    </div>
                    <Form/>
                </div>
            </div>
        </section>
    );
}
 
export default Autorisation;