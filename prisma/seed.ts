import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Usar conexión directa para seed (sin pooler)
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Crear programa premium de Gallo Trader
  const program = await prisma.program.upsert({
    where: { slug: 'gallo-trader-premium' },
    update: {},
    create: {
      slug: 'gallo-trader-premium',
      title: 'Gallo Trader Premium - Academia Completa de Trading',
      subtitle: 'De principiante a trader consistente con bases sólidas',
      description: `
El programa premium de Gallo Trader te enseña a operar los mercados financieros desde cero, con cabeza fría y estrategia sólida.

**¿Qué incluye?**
- Fundamentos del trading y análisis técnico
- Gestión de riesgo profesional
- Psicología del trader
- Estrategias probadas y backtesting
- Acceso de por vida
- Actualizaciones constantes
- Comunidad privada de traders

**Disclaimer**: Este es un programa educativo. Operar en mercados financieros implica riesgo de pérdida parcial o total del capital.
      `.trim(),
      priceUsd: 100000, // $1,000 USD en centavos
      priceMx: 1000000, // $10,000 MXN en centavos
      isActive: true,
      displayOrder: 1,
    },
  });

  console.log(`✅ Programa creado: ${program.title}`);

  // Crear módulos
  const modules = await Promise.all([
    prisma.module.upsert({
      where: { id: 'mod-1-fundamentos' },
      update: {},
      create: {
        id: 'mod-1-fundamentos',
        programId: program.id,
        title: 'Módulo 1: Fundamentos del Trading',
        description: 'Aprende los conceptos básicos antes de arriesgar tu capital',
        order: 1,
      },
    }),
    prisma.module.upsert({
      where: { id: 'mod-2-analisis' },
      update: {},
      create: {
        id: 'mod-2-analisis',
        programId: program.id,
        title: 'Módulo 2: Análisis Técnico',
        description: 'Domina las herramientas del análisis técnico profesional',
        order: 2,
      },
    }),
    prisma.module.upsert({
      where: { id: 'mod-3-riesgo' },
      update: {},
      create: {
        id: 'mod-3-riesgo',
        programId: program.id,
        title: 'Módulo 3: Gestión de Riesgo',
        description: 'La clave para no quebrar tu cuenta',
        order: 3,
      },
    }),
    prisma.module.upsert({
      where: { id: 'mod-4-psicologia' },
      update: {},
      create: {
        id: 'mod-4-psicologia',
        programId: program.id,
        title: 'Módulo 4: Psicología del Trader',
        description: 'Controla tus emociones y opera con disciplina',
        order: 4,
      },
    }),
    prisma.module.upsert({
      where: { id: 'mod-5-estrategias' },
      update: {},
      create: {
        id: 'mod-5-estrategias',
        programId: program.id,
        title: 'Módulo 5: Estrategias y Ejecución',
        description: 'Estrategias probadas y cómo ejecutarlas correctamente',
        order: 5,
      },
    }),
  ]);

  console.log(`✅ ${modules.length} módulos creados`);

  // Crear lecciones de ejemplo
  const lessons = [
    // Módulo 1
    {
      id: 'lesson-1-1',
      programId: program.id,
      moduleId: 'mod-1-fundamentos',
      title: 'Bienvenida al programa',
      slug: 'bienvenida-al-programa',
      summary: 'Qué esperar de este programa y cómo aprovecharlo al máximo',
      youtubeVideoId: 'DEMO_VIDEO_1', // Reemplazar con IDs reales
      durationSeconds: 600,
      order: 1,
      isFreePreview: true, // Esta lección es vista previa gratuita
      isActive: true,
    },
    {
      id: 'lesson-1-2',
      programId: program.id,
      moduleId: 'mod-1-fundamentos',
      title: '¿Qué es el trading y por qué la mayoría pierde?',
      slug: 'que-es-el-trading',
      summary: 'La cruda realidad del trading y por qué necesitas bases sólidas',
      youtubeVideoId: 'DEMO_VIDEO_2',
      durationSeconds: 1200,
      order: 2,
      isFreePreview: false,
      isActive: true,
    },
    {
      id: 'lesson-1-3',
      programId: program.id,
      moduleId: 'mod-1-fundamentos',
      title: 'Tipos de mercados y instrumentos',
      slug: 'tipos-de-mercados',
      summary: 'Forex, acciones, futuros, cripto: ¿cuál es mejor para empezar?',
      youtubeVideoId: 'DEMO_VIDEO_3',
      durationSeconds: 1800,
      order: 3,
      isFreePreview: false,
      isActive: true,
    },
    // Módulo 2
    {
      id: 'lesson-2-1',
      programId: program.id,
      moduleId: 'mod-2-analisis',
      title: 'Velas japonesas: el lenguaje del precio',
      slug: 'velas-japonesas',
      summary: 'Aprende a leer el mercado con velas japonesas',
      youtubeVideoId: 'DEMO_VIDEO_4',
      durationSeconds: 1500,
      order: 1,
      isFreePreview: false,
      isActive: true,
    },
    {
      id: 'lesson-2-2',
      programId: program.id,
      moduleId: 'mod-2-analisis',
      title: 'Soportes y resistencias',
      slug: 'soportes-resistencias',
      summary: 'Identifica zonas clave donde el precio reacciona',
      youtubeVideoId: 'DEMO_VIDEO_5',
      durationSeconds: 2100,
      order: 2,
      isFreePreview: false,
      isActive: true,
    },
    // Módulo 3
    {
      id: 'lesson-3-1',
      programId: program.id,
      moduleId: 'mod-3-riesgo',
      title: 'La regla del 1-2% por trade',
      slug: 'regla-1-2-porciento',
      summary: 'Por qué arriesgar más es suicidio financiero',
      youtubeVideoId: 'DEMO_VIDEO_6',
      durationSeconds: 1800,
      order: 1,
      isFreePreview: false,
      isActive: true,
    },
  ];

  let lessonCount = 0;
  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { id: lesson.id },
      update: {},
      create: lesson,
    });
    lessonCount++;
  }

  console.log(`✅ ${lessonCount} lecciones creadas`);
  console.log('\n🎉 Seed completado exitosamente!');
  console.log('\n📝 Recuerda:');
  console.log('- Reemplaza los youtubeVideoId con IDs reales de tus videos');
  console.log('- La lección "Bienvenida" está marcada como vista previa gratuita');
  console.log('- Puedes agregar más lecciones según tu contenido');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
