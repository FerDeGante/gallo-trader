import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/server/db';
import { errorResponse, successResponse } from '@/server/utils/response';

export async function GET(_request: NextRequest) {
  try {
    await requireAdmin();

    const since = new Date();
    since.setMonth(since.getMonth() - 5);
    since.setDate(1);

    const [
      activeEnrollments,
      pendingEnrollments,
      totalUsers,
      totalPrograms,
      recentEnrollments,
      recentPayments,
      paymentsSince,
      programs,
    ] = await Promise.all([
      prisma.enrollment.count({ where: { status: 'ACTIVE' } }),
      prisma.enrollment.count({ where: { status: 'PENDING' } }),
      prisma.user.count(),
      prisma.program.count(),
      prisma.enrollment.findMany({
        include: {
          user: { select: { id: true, name: true, email: true } },
          program: { select: { id: true, title: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
      prisma.payment.findMany({
        include: {
          user: { select: { id: true, name: true, email: true } },
          program: { select: { id: true, title: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 15,
      }),
      prisma.payment.findMany({
        where: {
          status: 'SUCCEEDED',
          createdAt: { gte: since },
        },
        include: {
          program: { select: { id: true, title: true } },
        },
      }),
      prisma.program.findMany({
        where: { isActive: true },
        select: { id: true, title: true, slug: true },
        orderBy: { title: 'asc' },
      }),
    ]);

    const revenueUsd = paymentsSince
      .filter((p) => p.currency === 'USD')
      .reduce((sum, p) => sum + p.amount, 0) / 100;

    const salesByMonthMap = new Map<string, { totalUsd: number; order: number; label: string }>();
    paymentsSince.forEach((payment) => {
      const date = new Date(payment.createdAt);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const current = salesByMonthMap.get(key) || {
        totalUsd: 0,
        order: date.getFullYear() * 12 + date.getMonth(),
        label: date.toLocaleString('es', { month: 'short' }),
      };
      current.totalUsd += payment.amount / 100;
      salesByMonthMap.set(key, current);
    });

    const salesByMonth = Array.from(salesByMonthMap.values())
      .sort((a, b) => a.order - b.order)
      .map(({ label, totalUsd }) => ({ label, totalUsd }));

    const topProgramsMap = new Map<string, { title: string; totalUsd: number; sales: number }>();
    paymentsSince.forEach((payment) => {
      const key = payment.programId;
      const existing = topProgramsMap.get(key) || { title: payment.program.title, totalUsd: 0, sales: 0 };
      existing.totalUsd += payment.amount / 100;
      existing.sales += 1;
      topProgramsMap.set(key, existing);
    });

    const topPrograms = Array.from(topProgramsMap.values()).sort((a, b) => b.totalUsd - a.totalUsd);

    return successResponse({
      metrics: {
        revenueUsd: Number(revenueUsd.toFixed(2)),
        activeEnrollments,
        pendingEnrollments,
        totalUsers,
        totalPrograms,
      },
      salesByMonth,
      recentPayments: recentPayments.map((p) => ({
        ...p,
        amountUsd: p.amount / 100,
      })),
      enrollments: recentEnrollments,
      programs,
      topPrograms,
    });
  } catch (error) {
    return errorResponse(error as Error);
  }
}
