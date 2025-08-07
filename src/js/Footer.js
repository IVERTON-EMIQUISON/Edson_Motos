import React from 'react';
import '../css/Footer.css'; // Crie um arquivo CSS para o rodapé

const Footer = () => {
    return (
        
        <div class="rodape">   
            <footer>
                <div class="container">
                    <div class="footer-col">
                        <h3>Contato</h3>
                        <p><i class="fas fa-map-marker-alt"></i> R.Dr. José Torquato de Figueiredo <strong>Pau dos Ferros - RN .</strong></p>
                        <p><i class="fas fa-phone"></i> (17) 3236-6187</p>
                        <p><i class="fas fa-envelope"></i> contato@edsonmotos.com.br</p>
                    </div>
                    <div class="footer-col social-icons">
                        <h3>Siga-nos</h3>
                        <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-whatsapp"></i></a>
                    </div>
                </div>
                <div class="copyright">
                    <p>© 2025 Iverton. Todos os direitos reservados.</p>
                </div>
            </footer>

            <div class="whatsapp-button">
                <a href="https://api.whatsapp.com/send?phone=8496493095" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>

        </div>
    );
};

export default Footer;