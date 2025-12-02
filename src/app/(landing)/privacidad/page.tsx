import styles from '../terminos/LegalPage.module.css';

export default function PrivacyPage() {
  return (
    <div className={styles.legalContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>Privacidad</span>
          <h1 className={styles.heroTitle}>Política de Privacidad</h1>
          <p className={styles.heroSubtitle}>
            Última actualización: Diciembre 2, 2025
          </p>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.contentWrapper}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Introducción</h2>
            <p className={styles.paragraph}>
              En Gallo Trader valoramos y respetamos tu privacidad. Esta política explica cómo recopilamos, 
              usamos y protegemos tu información personal.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Información que Recopilamos</h2>
            <p className={styles.paragraph}>
              Recopilamos la siguiente información:
            </p>
            <ul className={styles.list}>
              <li><strong>Información de Cuenta:</strong> Nombre, email, contraseña</li>
              <li><strong>Información de Pago:</strong> Procesada de forma segura por Stripe (no almacenamos datos de tarjeta)</li>
              <li><strong>Datos de Uso:</strong> Lecciones vistas, progreso, tiempo de uso</li>
              <li><strong>Información Técnica:</strong> Dirección IP, navegador, dispositivo</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Cómo Usamos tu Información</h2>
            <p className={styles.paragraph}>
              Utilizamos tu información para:
            </p>
            <ul className={styles.list}>
              <li>Proporcionar y mejorar nuestros servicios educativos</li>
              <li>Procesar pagos y enviar confirmaciones</li>
              <li>Comunicarnos contigo sobre tu cuenta y actualizaciones</li>
              <li>Personalizar tu experiencia de aprendizaje</li>
              <li>Analizar el uso de la plataforma para mejoras</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Compartir Información</h2>
            <div className={styles.infoBox}>
              <p className={styles.paragraph}>
                <strong>No vendemos tu información personal.</strong> Solo compartimos datos con:
              </p>
              <ul className={styles.list}>
                <li><strong>Stripe:</strong> Para procesar pagos de forma segura</li>
                <li><strong>Proveedores de hosting:</strong> Para mantener la plataforma funcionando (Vercel, Supabase)</li>
                <li><strong>Herramientas de análisis:</strong> Para mejorar el servicio (datos anónimos)</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Cookies y Tecnologías Similares</h2>
            <p className={styles.paragraph}>
              Utilizamos cookies para:
            </p>
            <ul className={styles.list}>
              <li>Mantener tu sesión activa</li>
              <li>Recordar tus preferencias</li>
              <li>Analizar el uso de la plataforma</li>
              <li>Mejorar la experiencia del usuario</li>
            </ul>
            <p className={styles.paragraph}>
              Puedes configurar tu navegador para rechazar cookies, pero esto puede afectar la funcionalidad del sitio.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Seguridad de Datos</h2>
            <p className={styles.paragraph}>
              Implementamos medidas de seguridad para proteger tu información:
            </p>
            <ul className={styles.list}>
              <li>Cifrado SSL/TLS para todas las comunicaciones</li>
              <li>Contraseñas hasheadas con bcrypt</li>
              <li>Acceso restringido a datos personales</li>
              <li>Backups regulares y encriptados</li>
              <li>Monitoreo de seguridad continuo</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Tus Derechos</h2>
            <p className={styles.paragraph}>
              Tienes derecho a:
            </p>
            <ul className={styles.list}>
              <li><strong>Acceso:</strong> Solicitar una copia de tus datos personales</li>
              <li><strong>Corrección:</strong> Actualizar información incorrecta</li>
              <li><strong>Eliminación:</strong> Solicitar la eliminación de tu cuenta y datos</li>
              <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
              <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
            </ul>
            <p className={styles.paragraph}>
              Para ejercer estos derechos, contáctanos en soporte@gallotrader.com
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Retención de Datos</h2>
            <p className={styles.paragraph}>
              Conservamos tu información mientras:
            </p>
            <ul className={styles.list}>
              <li>Mantengas una cuenta activa</li>
              <li>Sea necesario para proporcionar servicios</li>
              <li>Sea requerido por ley o regulación</li>
            </ul>
            <p className={styles.paragraph}>
              Al eliminar tu cuenta, se borran tus datos personales en un plazo de 30 días, excepto información 
              requerida legalmente.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Menores de Edad</h2>
            <div className={styles.warningBox}>
              <div className={styles.warningIcon}>⚠️</div>
              <div>
                <h3 className={styles.warningTitle}>Restricción de Edad</h3>
                <p className={styles.paragraph}>
                  Nuestro servicio está dirigido a mayores de 18 años. No recopilamos intencionalmente información 
                  de menores. Si eres padre/madre y descubres que tu hijo nos ha proporcionado datos, contáctanos 
                  inmediatamente.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>10. Cambios a esta Política</h2>
            <p className={styles.paragraph}>
              Podemos actualizar esta política ocasionalmente. Te notificaremos cambios significativos por email 
              o mediante aviso en la plataforma. El uso continuado del servicio después de cambios implica aceptación.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>11. Contacto</h2>
            <p className={styles.paragraph}>
              Para preguntas sobre esta política o tus datos personales:
            </p>
            <div className={styles.contactBox}>
              <p className={styles.paragraph}>
                📧 Email: <a href="mailto:soporte@gallotrader.com" className={styles.link}>soporte@gallotrader.com</a>
              </p>
              <p className={styles.paragraph}>
                💬 Instagram: <a href="https://instagram.com/gallo_trader" target="_blank" rel="noopener noreferrer" className={styles.link}>@gallo_trader</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
