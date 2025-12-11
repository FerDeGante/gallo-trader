'use client';

import { useState } from 'react';
import styles from './BootcampFAQSection.module.css';

export default function BootcampFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Cuándo empieza?',
      answer: 'La masterclass es el 11 de diciembre a las 7 pm (CDMX).\nLas inscripciones estarán abiertas el 11, 12 y 13 de diciembre.\nAl inscribirte te llegará toda la info a tu correo.',
    },
    {
      question: '¿Necesito experiencia previa?',
      answer: '¡Para nada!\nEste Bootcamp funciona si estás empezando o si ya tienes camino recorrido y quieres mejorar.',
    },
    {
      question: '¿Qué pasa después del Bootcamp?',
      answer: 'Seguirás con acceso al Telegram VIP, tendrás la comunidad de traders contigo y podrás ver el contenido de los módulos durante un año completo. ¡No te quedas sol@!',
    },
    {
      question: '¿Garantizan que pasaré mi cuenta?',
      answer: 'Te damos el sistema, el paso a paso y el acompañamiento. El resultado final depende de tu constancia y disciplina para aplicar lo aprendido.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section} id="preguntas">
      <div className={styles.container}>
        <h2 className={styles.title}>Preguntas frecuentes</h2>
        
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${openIndex === index ? styles.faqItemOpen : ''}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <span className={styles.faqIcon}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              <div 
                className={styles.faqAnswer}
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <div className={styles.answerContent}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
