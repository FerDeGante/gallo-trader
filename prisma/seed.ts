import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

// Usar conexión directa para seed (sin pooler)
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Limpiar datos existentes (opcional)
  console.log('🧹 Limpiando datos existentes...');
  await prisma.lessonProgress.deleteMany();
  await prisma.lessonAccessToken.deleteMany();
  await prisma.adminAuditLog.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.program.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // ========== USUARIOS ==========
  console.log('👥 Creando usuarios...');
  
  // Hash de contraseña por defecto
  const defaultPassword = await bcrypt.hash('Password123!', 10);

  // 2 Administradores
  const admin1 = await prisma.user.create({
    data: {
      email: 'ferdegante.22@gmail.com',
      name: 'Fernando De Gante',
      role: 'ADMIN',
      passwordHash: defaultPassword,
      emailVerified: new Date(),
    },
  });

  const admin2 = await prisma.user.create({
    data: {
      email: 'gallo@gallotrader.com',
      name: 'Juan Luis',
      role: 'ADMIN',
      passwordHash: defaultPassword,
      emailVerified: new Date(),
    },
  });

  console.log(`✅ Admins creados: ${admin1.email}, ${admin2.email}`);

  // 5 Estudiantes/Clientes
  const students = await Promise.all([
    prisma.user.create({
      data: {
        email: 'cliente1@example.com',
        name: 'Carlos Pérez',
        role: 'STUDENT',
        passwordHash: defaultPassword,
        emailVerified: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        email: 'cliente2@example.com',
        name: 'María González',
        role: 'STUDENT',
        passwordHash: defaultPassword,
        emailVerified: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        email: 'cliente3@example.com',
        name: 'Roberto Martínez',
        role: 'STUDENT',
        passwordHash: defaultPassword,
        emailVerified: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        email: 'cliente4@example.com',
        name: 'Ana López',
        role: 'STUDENT',
        passwordHash: defaultPassword,
        emailVerified: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        email: 'cliente5@example.com',
        name: 'Diego Ramírez',
        role: 'STUDENT',
        passwordHash: defaultPassword,
        emailVerified: new Date(),
      },
    }),
  ]);

  console.log(`✅ ${students.length} estudiantes creados`);

  // ========== PROGRAMA ==========
  console.log('📚 Creando programa...');
  
  const program = await prisma.program.create({
    data: {
      slug: 'curso-trading-completo',
      title: 'Curso Completo de Trading - Gallo Trader',
      subtitle: 'Aprende a operar los mercados desde cero',
      description: `
Programa completo que te llevará desde los fundamentos hasta estrategias avanzadas de trading.

**Incluye:**
- Videos didácticos paso a paso
- Análisis de mercados en tiempo real
- Estrategias probadas
- Gestión de riesgo profesional
- Soporte continuo

**Nota**: Este programa es solo educativo. El trading implica riesgos.
      `.trim(),
      priceUsd: 100000, // $1,000 USD
      priceMx: 1800000, // $18,000 MXN
      isActive: true,
      displayOrder: 1,
    },
  });

  console.log(`✅ Programa creado: ${program.title}`);

  // ========== MÓDULO ==========
  console.log('📖 Creando módulo...');
  
  const courseModule = await prisma.module.create({
    data: {
      programId: program.id,
      title: 'Introducción al Trading',
      description: 'Fundamentos esenciales para comenzar',
      order: 1,
    },
  });

  console.log(`✅ Módulo creado: ${courseModule.title}`);

  // ========== LECCIÓN CON VIDEO ==========
  console.log('🎥 Creando lección con video...');
  
  const lesson = await prisma.lesson.create({
    data: {
      programId: program.id,
      moduleId: courseModule.id,
      title: 'Bienvenida al Curso de Trading',
      slug: 'bienvenida-trading',
      summary: 'Introducción al mundo del trading y qué aprenderás en este curso',
      youtubeVideoId: 'dQw4w9WgXcQ', // Video de ejemplo (puedes cambiarlo)
      durationSeconds: 900, // 15 minutos
      order: 1,
      isFreePreview: true, // Visible para todos
      isActive: true,
    },
  });

  console.log(`✅ Lección creada: ${lesson.title}`);

  // ========== PAGOS Y ENROLLMENTS ==========
  console.log('💳 Creando pagos y enrollments...');

  // Enrollar a 3 de los 5 estudiantes (con pago exitoso)
  for (let i = 0; i < 3; i++) {
    const student = students[i];
    
    // Crear pago exitoso
    const payment = await prisma.payment.create({
      data: {
        userId: student.id,
        programId: program.id,
        amount: program.priceUsd,
        currency: 'USD',
        status: 'SUCCEEDED',
        provider: 'STRIPE',
        providerPaymentId: `pi_test_${Date.now()}_${i}`,
        providerCustomerId: `cus_test_${student.id}`,
        rawProviderPayload: {
          test: true,
          customerEmail: student.email,
        },
      },
    });

    // Crear enrollment activo
    await prisma.enrollment.create({
      data: {
        userId: student.id,
        programId: program.id,
        status: 'ACTIVE',
        source: 'PAYMENT',
        paymentId: payment.id,
        startDate: new Date(),
      },
    });

    console.log(`  ✅ ${student.name} enrollado (pago exitoso)`);
  }

  // Crear un pago pendiente para el 4to estudiante
  await prisma.payment.create({
    data: {
      userId: students[3].id,
      programId: program.id,
      amount: program.priceUsd,
      currency: 'USD',
      status: 'PENDING',
      provider: 'STRIPE',
      providerPaymentId: `pi_pending_${Date.now()}`,
      rawProviderPayload: {
        test: true,
        customerEmail: students[3].email,
      },
    },
  });
  console.log(`  ⏳ ${students[3].name} tiene pago pendiente`);

  // El 5to estudiante no tiene pagos (para probar el flujo de checkout)
  console.log(`  ⚪ ${students[4].name} sin pagos (puede probar checkout)`);

  // ========== PROGRESO DE LECCIONES ==========
  console.log('📊 Creando progreso de lecciones...');

  // Progreso para los estudiantes enrollados
  await prisma.lessonProgress.create({
    data: {
      userId: students[0].id,
      lessonId: lesson.id,
      status: 'COMPLETED',
      lastPositionSeconds: lesson.durationSeconds,
      completedAt: new Date(),
    },
  });
  console.log(`  ✅ ${students[0].name} completó la lección`);

  await prisma.lessonProgress.create({
    data: {
      userId: students[1].id,
      lessonId: lesson.id,
      status: 'IN_PROGRESS',
      lastPositionSeconds: 450, // Vio la mitad
    },
  });
  console.log(`  ⏸️  ${students[1].name} vio 50% de la lección`);

  // ========== AUDIT LOGS ==========
  console.log('📝 Creando logs de auditoría...');

  await prisma.adminAuditLog.createMany({
    data: [
      {
        userId: admin1.id,
        action: 'CREATE_PROGRAM',
        targetType: 'Program',
        targetId: program.id,
        metadata: { programTitle: program.title },
      },
      {
        userId: admin2.id,
        action: 'CREATE_LESSON',
        targetType: 'Lesson',
        targetId: lesson.id,
        metadata: { lessonTitle: lesson.title },
      },
      {
        userId: admin1.id,
        action: 'GRANT_ACCESS',
        targetType: 'Enrollment',
        targetId: students[0].id,
        metadata: { userEmail: students[0].email, reason: 'payment_succeeded' },
      },
    ],
  });

  console.log('✅ 3 logs de auditoría creados');

  // ========== RESUMEN ==========
  console.log('\n🎉 Seed completado exitosamente!\n');
  console.log('📊 RESUMEN:');
  console.log('═══════════════════════════════════════');
  console.log(`👤 Admins: 2`);
  console.log(`   - ${admin1.email} (Fernando De Gante)`);
  console.log(`   - ${admin2.email} (Juan Luis)`);
  console.log(`\n👥 Estudiantes: 5`);
  students.forEach((s, i) => {
    const status = i < 3 ? '✅ Enrollado' : i === 3 ? '⏳ Pago pendiente' : '⚪ Sin pago';
    console.log(`   - ${s.email} (${s.name}) - ${status}`);
  });
  console.log(`\n📚 Programas: 1`);
  console.log(`   - ${program.title}`);
  console.log(`\n📖 Módulos: 1`);
  console.log(`   - ${courseModule.title}`);
  console.log(`\n🎥 Lecciones: 1`);
  console.log(`   - ${lesson.title} (Video ID: ${lesson.youtubeVideoId})`);
  console.log(`\n💳 Pagos:`);
  console.log(`   - 3 exitosos (SUCCEEDED)`);
  console.log(`   - 1 pendiente (PENDING)`);
  console.log(`\n📝 Enrollments: 3 activos`);
  console.log(`📊 Progreso: 2 estudiantes con progreso`);
  console.log(`📋 Audit Logs: 3 registros`);
  console.log('═══════════════════════════════════════');
  console.log('\n🔑 Credenciales de acceso:');
  console.log('   Usuario: cualquier email de arriba');
  console.log('   Contraseña: Password123!');
  console.log('\n💡 Puedes cambiar el youtubeVideoId en el código si quieres otro video');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
