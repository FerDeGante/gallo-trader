'use client';

import styles from './BootcampCalendarSection.module.css';

export default function BootcampCalendarSection() {
  const calendars = [
    {
      month: 'DICIEMBRE 2025',
      year: 2025,
      startDay: 1, // Lunes
      days: 31,
      events: [
        { day: 8, type: 'cumple', label: 'Cumple de Alberto' },
        { day: 11, type: 'masterclass', label: 'MASTER CLASS' },
        { day: 12, type: 'inscripcion', label: 'INSCRIPCIÓN $' },
        { day: 15, type: 'session', label: 'SESIÓN DE BIENVENIDA' },
        { day: 24, type: 'holiday', label: 'NOCHE BUENA' },
        { day: 25, type: 'holiday', label: 'NAVIDAD' },
      ],
    },
    {
      month: 'ENERO 2026',
      year: 2026,
      startDay: 4, // Jueves
      days: 31,
      events: [],
    },
    {
      month: 'FEBRERO 2026',
      year: 2026,
      startDay: 0, // Domingo
      days: 28,
      events: [
        { day: 9, type: 'cumple', label: 'Cumple de Gallo' },
        { day: 23, type: 'cumple', label: 'Cumple de JL' },
      ],
    },
    {
      month: 'MARZO 2026',
      year: 2026,
      startDay: 0, // Domingo
      days: 31,
      events: [],
    },
    {
      month: 'ABRIL 2026',
      year: 2026,
      startDay: 3, // Miércoles
      days: 30,
      events: [],
    },
  ];

  const weekDays = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];

  const getEventForDay = (calendarEvents: any[], day: number) => {
    return calendarEvents.find(event => event.day === day);
  };

  const getEventClass = (type: string) => {
    switch (type) {
      case 'cumple':
        return styles.eventCumple;
      case 'masterclass':
        return styles.eventMasterclass;
      case 'inscripcion':
        return styles.eventInscripcion;
      case 'session':
        return styles.eventSession;
      case 'holiday':
        return styles.eventHoliday;
      default:
        return '';
    }
  };

  return (
    <section className={styles.section} id="calendario">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Calendario 2025-2026</span>
          <h2 className={styles.title}>
            Fechas importantes del <span className={styles.highlight}>Master Funding Bootcamp</span>
          </h2>
          <p className={styles.subtitle}>
            Solo necesitas ganas, práctica y disciplina
          </p>
        </div>

        <div className={styles.calendarsGrid}>
          {calendars.map((calendar, calIndex) => (
            <div key={calIndex} className={styles.calendarCard}>
              <div className={styles.calendarHeader}>
                <h3 className={styles.calendarMonth}>{calendar.month}</h3>
              </div>
              
              <div className={styles.calendarGrid}>
                {weekDays.map((day, index) => (
                  <div key={index} className={styles.weekDay}>
                    {day}
                  </div>
                ))}
                
                {/* Empty cells before month starts */}
                {Array.from({ length: calendar.startDay }).map((_, index) => (
                  <div key={`empty-${index}`} className={styles.emptyDay}></div>
                ))}
                
                {/* Days of the month */}
                {Array.from({ length: calendar.days }).map((_, index) => {
                  const day = index + 1;
                  const event = getEventForDay(calendar.events, day);
                  
                  return (
                    <div 
                      key={day} 
                      className={`${styles.day} ${event ? getEventClass(event.type) : ''}`}
                    >
                      <span className={styles.dayNumber}>{day}</span>
                      {event && (
                        <span className={styles.eventLabel}>{event.label}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={styles.timeSlot}>
                7:00 - 8:00 PM
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
