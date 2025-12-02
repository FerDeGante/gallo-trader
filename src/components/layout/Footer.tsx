import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.backgroundGlow} aria-hidden="true">
        <div className={styles.orbOne} />
        <div className={styles.orbTwo} />
      </div>

      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.brand}>
            <div className={styles.logo}>🐓</div>
            <div>
              <p className={styles.kicker}>Gallo Trader</p>
              <p className={styles.title}>Mentoría de trading institucional</p>
            </div>
          </div>
          <div className={styles.ctaGroup}>
            <div className={styles.statusPill}>
              <span className={styles.statusDot} />
              Inscripciones abiertas
            </div>
            <a href="/#precios" className={styles.primaryCta}>
              Aplicar ahora
            </a>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.about}>
            <p className={styles.description}>
              Academia de trading profesional enfocada en consistencia matemática y disciplina emocional.
              Formamos traders que toman decisiones con datos, no con impulsos.
            </p>

            <div className={styles.statsGrid}>
              {[
                { label: 'Miembros activos', value: '+200' },
                { label: 'Sesiones en vivo', value: '16 / cohorte' },
                { label: 'Acceso', value: 'De por vida' },
              ].map((item) => (
                <div key={item.label} className={styles.statCard}>
                  <p className={styles.statLabel}>{item.label}</p>
                  <p className={styles.statValue}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className={styles.socials}>
              <a 
                href="https://x.com/jlcastillovar" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialIcon} 
                aria-label="Twitter/X"
                title="Síguenos en X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://instagram.com/gallo_trader/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialIcon} 
                aria-label="Instagram"
                title="Síguenos en Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://youtube.com/@gallotrader77" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialIcon} 
                aria-label="YouTube"
                title="Síguenos en YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.linksGrid}>
            <div>
              <h4 className={styles.linksTitle}>Explora</h4>
              <ul className={styles.linkList}>
                <li><a href="/#programa">Programa</a></li>
                <li><a href="/#mentoria">Mentoría en vivo</a></li>
                <li><a href="/#precios">Planes y precios</a></li>
              </ul>
            </div>
            <div>
              <h4 className={styles.linksTitle}>Recursos</h4>
              <ul className={styles.linkList}>
                <li><a href="/login">Mi Aula</a></li>
                <li><a href="mailto:contacto@gallotrader.com">Contacto</a></li>
                <li><a href="/#programa">Calendario de sesiones</a></li>
              </ul>
            </div>
            <div>
              <h4 className={styles.linksTitle}>Legal</h4>
              <ul className={styles.linkList}>
                <li><a href="/terminos">Términos y Condiciones</a></li>
                <li><a href="/privacidad">Política de Privacidad</a></li>
                <li><a href="/aviso-riesgo">Aviso de riesgo</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© {currentYear} Gallo Trader. Todos los derechos reservados.</p>
          <p className={styles.risk}>
            ⚠️ Advertencia de riesgo: El trading conlleva riesgos significativos. Este es un programa educativo, no asesoría de inversión.
          </p>
        </div>
      </div>
    </footer>
  );
}
