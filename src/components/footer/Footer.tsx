import logo from './footer-logo.svg';

const Footer: React.FC = () => {
    return (  
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <div className="footer-logo">
                        <a href="/" className="footer-logo__img"><img src={logo} alt="Логотип" className="footer-logo__img"/></a>
                    </div>
                    <div className="footer-info">
                        <address className="footer-address">
                            г. Москва, Цветной б-р, 40<br/>
                            <a href="#!" className="footer-address__link">+7 495 771 21 11</a><br/>
                            <a href="#!" className="footer-address__link">info@skan.ru</a>
                        </address>
                        <div className="footer-info__copyright">Copyright. 2022</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;