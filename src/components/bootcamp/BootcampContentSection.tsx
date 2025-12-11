'use client';

import styles from './BootcampContentSection.module.css';

export default function BootcampContentSection() {
  const modules = [
    {
      module: 'INTRODUCCIÓN',
      title: 'Introducción al Sistema Fondeo Rápido',
      description: 'Conoce el sistema completo que te llevará de cero a tu primera cuenta fondeada.',
    },
    {
      module: 'MÓDULO A',
      title: 'Todo lo que tienen que saber antes del fondeo',
      description: 'Prepara tu mentalidad, herramientas y estrategia antes de comenzar con las evaluaciones.',
    },
    {
      module: 'MÓDULO B',
      title: 'Todo lo que deben de saber durante la etapa de fondeo',
      description: 'Ejecuta el sistema paso a paso con disciplina y confianza.',
    },
    {
      module: 'MÓDULO C',
      title: 'Todo lo que deben de saber después de fondearse',
      description: 'Gestiona tus cuentas fondeadas y escala a múltiples cuentas de forma sostenible.',
    },
  ];

  return (
    <section className={styles.section} id="programa">
      <div className={styles.container}>
        <div className={styles.twoColumnLayout}>
          {/* Contenedor izquierdo CON marco estilo Chrome */}
          <div className={styles.leftBox}>
            <h2 className={styles.mainTitle}>Master Funding Bootcamp</h2>
            <p className={styles.mainDescription}>
              Contenido completo en cuatro módulos que te llevan de cero a tu cuenta fondeada. Con un sistema paso a paso, acompañamiento, un modelo probado en datos y una estrategia sencilla y mecanizada, podrás obtener al menos una cuenta fondeada de hasta $50K USD en menos de un mes.
            </p>
          </div>

          {/* Lista derecha SIN marco estilo Chrome */}
          <div className={styles.rightList}>
            {modules.map((item, index) => (
              <div key={index} className={styles.listItem}>
                <div className={styles.itemDot}></div>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
