import './styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Drive Now</h3>
          <p>Tu servicio de alquiler de vehículos online de confianza.</p>
        </div>
        <div className="footer-section">
          <h4>Enlaces rápidos</h4>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Vehículos</a></li>
            <li><a href="#">Reservas</a></li>
            <li><a href="#">Ofertas especiales</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Soporte</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política de privacidad</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Drive Now. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

