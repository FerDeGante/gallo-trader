import styles from './LegalPage.module.css';

export default function TermsPage() {
  return (
    <div className={styles.legalContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>Legal</span>
          <h1 className={styles.heroTitle}>Términos y Condiciones</h1>
          <p className={styles.heroSubtitle}>
            Última actualización: Diciembre 2, 2025
          </p>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.contentWrapper}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Aceptación de Términos</h2>
            <p className={styles.paragraph}>
              Al acceder y utilizar la plataforma Gallo Trader ("el Servicio"), aceptas estar sujeto a estos Términos y Condiciones. 
              Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestro servicio.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Descripción del Servicio</h2>
            <p className={styles.paragraph}>
              Gallo Trader es un programa educativo de trading que ofrece:
            </p>
            <ul className={styles.list}>
              <li>Contenido educativo sobre trading y mercados financieros</li>
              <li>Sesiones de mentoría en vivo</li>
              <li>Acceso a comunidad privada de estudiantes</li>
              <li>Material didáctico y herramientas de aprendizaje</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Naturaleza Educativa</h2>
            <div className={styles.warningBox}>
              <div className={styles.warningIcon}>⚠️</div>
              <div>
                <h3 className={styles.warningTitle}>Importante</h3>
                <p className={styles.paragraph}>
                  Este programa es únicamente educativo. No somos asesores de inversión ni ofrecemos recomendaciones 
                  específicas de compra o venta. Todo el contenido es con fines informativos y formativos.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Riesgos del Trading</h2>
            <p className={styles.paragraph}>
              Reconoces y aceptas que:
            </p>
            <ul className={styles.list}>
              <li>El trading conlleva riesgos significativos de pérdida de capital</li>
              <li>Los resultados pasados no garantizan resultados futuros</li>
              <li>Puedes perder la totalidad de tu inversión</li>
              <li>Solo debes operar con capital que puedas permitirte perder</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Acceso y Uso de la Plataforma</h2>
            <p className={styles.paragraph}>
              Al registrarte, te comprometes a:
            </p>
            <ul className={styles.list}>
              <li>Proporcionar información veraz y actualizada</li>
              <li>Mantener la confidencialidad de tus credenciales</li>
              <li>No compartir tu acceso con terceros</li>
              <li>Usar el contenido solo para tu aprendizaje personal</li>
              <li>No reproducir, distribuir o comercializar el contenido</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Propiedad Intelectual</h2>
            <p className={styles.paragraph}>
              Todo el contenido (videos, textos, imágenes, materiales) es propiedad exclusiva de Gallo Trader 
              y está protegido por derechos de autor. Está prohibido:
            </p>
            <ul className={styles.list}>
              <li>Copiar, descargar o distribuir el contenido</li>
              <li>Crear obras derivadas del material</li>
              <li>Usar el contenido con fines comerciales</li>
              <li>Compartir grabaciones de sesiones en vivo</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Pagos y Reembolsos</h2>
            <p className={styles.paragraph}>
              <strong>Política de Pagos:</strong>
            </p>
            <ul className={styles.list}>
              <li>Los pagos se procesan de forma segura a través de Stripe</li>
              <li>El acceso se otorga inmediatamente después del pago confirmado</li>
              <li>Los precios están sujetos a cambio sin previo aviso</li>
            </ul>
            <p className={styles.paragraph}>
              <strong>Política de Reembolsos:</strong>
            </p>
            <ul className={styles.list}>
              <li>Ofrecemos garantía de 7 días desde la compra</li>
              <li>Después de 7 días, no se procesan reembolsos</li>
              <li>Para solicitar reembolso, contacta a soporte con tu número de transacción</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Limitación de Responsabilidad</h2>
            <div className={styles.infoBox}>
              <p className={styles.paragraph}>
                <strong>Gallo Trader no se hace responsable de:</strong>
              </p>
              <ul className={styles.list}>
                <li>Pérdidas financieras derivadas de tus operaciones</li>
                <li>Decisiones de trading que tomes basadas en el contenido</li>
                <li>Interrupciones temporales del servicio</li>
                <li>Errores u omisiones en el contenido educativo</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Modificaciones del Servicio</h2>
            <p className={styles.paragraph}>
              Nos reservamos el derecho de:
            </p>
            <ul className={styles.list}>
              <li>Modificar, suspender o descontinuar cualquier parte del servicio</li>
              <li>Actualizar el contenido y los materiales</li>
              <li>Cambiar estos términos en cualquier momento</li>
              <li>Terminar tu acceso si violas estos términos</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>10. Ley Aplicable</h2>
            <p className={styles.paragraph}>
              Estos términos se rigen por las leyes de México. Cualquier disputa se resolverá en los tribunales competentes.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>11. Contacto</h2>
            <p className={styles.paragraph}>
              Para preguntas sobre estos términos, contáctanos en:
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
