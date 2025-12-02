import styles from '../terminos/LegalPage.module.css';

export default function RiskDisclosurePage() {
  return (
    <div className={styles.legalContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>Advertencia</span>
          <h1 className={styles.heroTitle}>Aviso de Riesgo</h1>
          <p className={styles.heroSubtitle}>
            Información importante sobre los riesgos del trading
          </p>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.contentWrapper}>
          <div className={styles.warningBox} style={{ marginBottom: '3rem' }}>
            <div className={styles.warningIcon}>⚠️</div>
            <div>
              <h3 className={styles.warningTitle}>Advertencia Importante</h3>
              <p className={styles.paragraph}>
                El trading de instrumentos financieros conlleva un alto nivel de riesgo y puede no ser adecuado 
                para todos los inversores. Antes de participar en el trading, debes considerar cuidadosamente 
                tus objetivos de inversión, nivel de experiencia y apetito de riesgo.
              </p>
            </div>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Naturaleza del Programa</h2>
            <p className={styles.paragraph}>
              Gallo Trader es un <strong>programa educativo</strong> diseñado para enseñar conceptos, estrategias 
              y metodologías de trading. No somos:
            </p>
            <ul className={styles.list}>
              <li>Asesores financieros registrados</li>
              <li>Corredores de bolsa</li>
              <li>Gestores de inversiones</li>
              <li>Proveedores de señales de trading</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Riesgos del Trading</h2>
            <div className={styles.infoBox}>
              <p className={styles.paragraph}>
                <strong>El trading puede resultar en pérdidas significativas de capital:</strong>
              </p>
              <ul className={styles.list}>
                <li><strong>Pérdida Total:</strong> Puedes perder la totalidad de tu inversión inicial</li>
                <li><strong>Volatilidad:</strong> Los mercados pueden moverse rápida e impredeciblemente</li>
                <li><strong>Apalancamiento:</strong> Amplifica tanto ganancias como pérdidas</li>
                <li><strong>Gaps de Mercado:</strong> Los precios pueden saltar sin warning</li>
                <li><strong>Riesgo de Liquidez:</strong> No siempre puedes cerrar posiciones al precio deseado</li>
                <li><strong>Factores Externos:</strong> Eventos geopolíticos, económicos o naturales pueden afectar los mercados</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. No Garantizamos Resultados</h2>
            <p className={styles.paragraph}>
              <strong>Importante:</strong> No garantizamos ni prometemos:
            </p>
            <ul className={styles.list}>
              <li>Ganancias específicas o rangos de ganancia</li>
              <li>Retornos de inversión garantizados</li>
              <li>Éxito en el trading</li>
              <li>Que recuperarás el costo del programa</li>
              <li>Que ganarás dinero aplicando las estrategias enseñadas</li>
            </ul>
            <p className={styles.paragraph}>
              Los testimonios o ejemplos mostrados son casos individuales y no representan resultados típicos. 
              <strong> Los resultados pasados no garantizan resultados futuros.</strong>
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Responsabilidad Personal</h2>
            <div className={styles.warningBox}>
              <div className={styles.warningIcon}>📋</div>
              <div>
                <h3 className={styles.warningTitle}>Tu Responsabilidad</h3>
                <p className={styles.paragraph}>
                  Tú eres totalmente responsable de:
                </p>
                <ul className={styles.list}>
                  <li>Todas las decisiones de trading que tomes</li>
                  <li>La gestión de tu propio capital y riesgo</li>
                  <li>Verificar la legalidad del trading en tu jurisdicción</li>
                  <li>Cumplir con las regulaciones fiscales aplicables</li>
                  <li>Elegir brokers regulados y confiables</li>
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Capital de Riesgo</h2>
            <p className={styles.paragraph}>
              Solo debes hacer trading con <strong>"capital de riesgo"</strong> - dinero que puedas permitirte perder 
              sin afectar tu estilo de vida o bienestar financiero.
            </p>
            <p className={styles.paragraph}>
              <strong>NO operes con:</strong>
            </p>
            <ul className={styles.list}>
              <li>Dinero para necesidades básicas (renta, comida, servicios)</li>
              <li>Fondos de emergencia</li>
              <li>Dinero prestado o de tarjetas de crédito</li>
              <li>Ahorros para educación o retiro</li>
              <li>Dinero que no puedas permitirte perder</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Contenido Educativo</h2>
            <p className={styles.paragraph}>
              El contenido proporcionado en Gallo Trader:
            </p>
            <ul className={styles.list}>
              <li>Es solo para fines educativos e informativos</li>
              <li>No constituye asesoramiento financiero personalizado</li>
              <li>No es una recomendación de compra o venta</li>
              <li>Puede contener opiniones personales del instructor</li>
              <li>Debe ser complementado con tu propia investigación</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Trading Demo vs Real</h2>
            <p className={styles.paragraph}>
              Recomendamos encarecidamente:
            </p>
            <ul className={styles.list}>
              <li>Practicar en cuentas demo antes de operar con dinero real</li>
              <li>Comenzar con cantidades pequeñas al pasar a cuenta real</li>
              <li>No apresurarse - el aprendizaje lleva tiempo</li>
              <li>Documentar y analizar tus operaciones</li>
              <li>Desarrollar disciplina emocional antes de aumentar capital</li>
            </ul>
            <div className={styles.infoBox}>
              <p className={styles.paragraph}>
                <strong>Nota:</strong> Los resultados en cuentas demo pueden diferir significativamente de cuentas reales 
                debido a factores emocionales, slippage y condiciones de mercado.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Riesgos Psicológicos</h2>
            <p className={styles.paragraph}>
              El trading puede tener impacto psicológico:
            </p>
            <ul className={styles.list}>
              <li>Estrés y ansiedad por pérdidas</li>
              <li>Tentación de "recuperar" pérdidas (revenge trading)</li>
              <li>Sobreconfianza después de rachas ganadoras</li>
              <li>Adicción al trading o comportamiento compulsivo</li>
            </ul>
            <p className={styles.paragraph}>
              Si experimentas angustia emocional relacionada con el trading, considera pausar y buscar apoyo profesional.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Consulta Profesional</h2>
            <p className={styles.paragraph}>
              Antes de invertir capital significativo, considera consultar con:
            </p>
            <ul className={styles.list}>
              <li>Un asesor financiero certificado</li>
              <li>Un contador para implicaciones fiscales</li>
              <li>Un abogado para cuestiones legales</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>10. Aceptación de Riesgos</h2>
            <div className={styles.warningBox}>
              <div className={styles.warningIcon}>✍️</div>
              <div>
                <h3 className={styles.warningTitle}>Declaración de Aceptación</h3>
                <p className={styles.paragraph}>
                  Al usar el servicio de Gallo Trader, declaras que:
                </p>
                <ul className={styles.list}>
                  <li>Has leído y comprendido este aviso de riesgo</li>
                  <li>Entiendes que puedes perder dinero en el trading</li>
                  <li>Asumes total responsabilidad por tus decisiones de trading</li>
                  <li>No responsabilizarás a Gallo Trader por pérdidas</li>
                  <li>Solo operarás con capital que puedas permitirte perder</li>
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>11. Contacto</h2>
            <p className={styles.paragraph}>
              Si tienes preguntas sobre este aviso de riesgo:
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
