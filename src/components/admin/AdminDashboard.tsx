'use client';

import { useEffect, useMemo, useState, FormEvent } from 'react';
import styles from './AdminDashboard.module.css';

type EnrollmentStatus = 'PENDING' | 'ACTIVE' | 'REVOKED' | 'EXPIRED';

type OverviewData = {
  metrics: {
    revenueUsd: number;
    activeEnrollments: number;
    pendingEnrollments: number;
    totalUsers: number;
    totalPrograms: number;
  };
  salesByMonth: { label: string; totalUsd: number }[];
  recentPayments: {
    id: string;
    amountUsd: number;
    currency: string;
    status: string;
    provider: string;
    createdAt: string;
    user: { id: string; name: string | null; email: string | null };
    program: { id: string; title: string };
  }[];
  enrollments: {
    id: string;
    status: EnrollmentStatus;
    source: string;
    createdAt: string;
    endDate: string | null;
    user: { id: string; name: string | null; email: string | null };
    program: { id: string; title: string };
    notes?: string | null;
  }[];
  programs: { id: string; title: string; slug: string }[];
  topPrograms: { title: string; totalUsd: number; sales: number }[];
};

type NewEnrollment = {
  userId: string;
  programId: string;
  status: EnrollmentStatus;
  notes: string;
};

export default function AdminDashboard() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newEnrollment, setNewEnrollment] = useState<NewEnrollment>({
    userId: '',
    programId: '',
    status: 'ACTIVE',
    notes: '',
  });
  const [savingEnrollment, setSavingEnrollment] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/v1/admin/overview');
      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error?.message || 'No se pudieron cargar los datos');
      }
      setData(json.data);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const maxMonthly = useMemo(() => {
    if (!data?.salesByMonth.length) return 0;
    return Math.max(...data.salesByMonth.map((m) => m.totalUsd));
  }, [data]);

  const handleStatusChange = async (id: string, status: EnrollmentStatus) => {
    try {
      const res = await fetch(`/api/v1/admin/enrollments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error?.message || 'No se pudo actualizar la membresía');
      }
      await loadData();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const createEnrollment = async (e: FormEvent) => {
    e.preventDefault();
    if (!newEnrollment.userId || !newEnrollment.programId) return;
    setSavingEnrollment(true);
    try {
      const res = await fetch('/api/v1/admin/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newEnrollment,
          source: 'ADMIN',
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error?.message || 'No se pudo crear la membresía');
      }
      setNewEnrollment({ userId: '', programId: '', status: 'ACTIVE', notes: '' });
      await loadData();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSavingEnrollment(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>Panel Administrativo</p>
          <h1 className={styles.title}>Ventas y Membresías</h1>
          <p className={styles.subtitle}>Controla tus cohortes, pagos y accesos desde un solo lugar.</p>
        </div>
        <div className={styles.headerBadge}>Admin</div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {loading ? (
        <div className={styles.loading}>Cargando panel...</div>
      ) : (
        <>
          <div className={styles.statsGrid}>
            <StatCard label="Ingresos últimos meses" value={`$${(data?.metrics.revenueUsd ?? 0).toLocaleString('es-MX')}`} accent="blue" />
            <StatCard label="Membresías activas" value={data?.metrics.activeEnrollments ?? 0} accent="green" />
            <StatCard label="Pendientes" value={data?.metrics.pendingEnrollments ?? 0} accent="amber" />
            <StatCard label="Usuarios / Programas" value={`${data?.metrics.totalUsers ?? 0} / ${data?.metrics.totalPrograms ?? 0}`} accent="purple" />
          </div>

          <div className={styles.chartsRow}>
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div>
                  <p className={styles.cardKicker}>Evolución de ingresos</p>
                  <h3 className={styles.cardTitle}>Ventas por mes</h3>
                </div>
                <span className={styles.lightBadge}>USD</span>
              </div>
              <div className={styles.barChart}>
                {data?.salesByMonth.map((month) => (
                  <div key={month.label} className={styles.barItem}>
                    <div
                      className={styles.bar}
                      style={{ height: maxMonthly ? `${(month.totalUsd / maxMonthly) * 100}%` : '0%' }}
                    >
                      <span className={styles.barValue}>${Math.round(month.totalUsd)}</span>
                    </div>
                    <span className={styles.barLabel}>{month.label}</span>
                  </div>
                ))}
                {!data?.salesByMonth.length && <p className={styles.muted}>Sin datos de pagos aún.</p>}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div>
                  <p className={styles.cardKicker}>Top productos</p>
                  <h3 className={styles.cardTitle}>Programas con más ventas</h3>
                </div>
              </div>
              <div className={styles.topPrograms}>
                {data?.topPrograms.length ? (
                  data.topPrograms.map((prog) => (
                    <div key={prog.title} className={styles.topProgram}>
                      <div>
                        <p className={styles.progTitle}>{prog.title}</p>
                        <p className={styles.muted}>{prog.sales} ventas</p>
                      </div>
                      <span className={styles.progValue}>${Math.round(prog.totalUsd).toLocaleString('es-MX')}</span>
                    </div>
                  ))
                ) : (
                  <p className={styles.muted}>No hay ventas registradas.</p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.twoCol}>
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div>
                  <p className={styles.cardKicker}>Membresías</p>
                  <h3 className={styles.cardTitle}>Control de accesos</h3>
                </div>
              </div>
              <div className={styles.table}>
                <div className={styles.tableHead}>
                  <span>Usuario</span>
                  <span>Programa</span>
                  <span>Estado</span>
                  <span>Fecha</span>
                </div>
                <div className={styles.tableBody}>
                  {data?.enrollments.map((enr) => (
                    <div key={enr.id} className={styles.tableRow}>
                      <div>
                        <p className={styles.bold}>{enr.user.name || 'Sin nombre'}</p>
                        <p className={styles.muted}>{enr.user.email}</p>
                      </div>
                      <p className={styles.progTitle}>{enr.program.title}</p>
                      <select
                        value={enr.status}
                        className={styles.select}
                        onChange={(e) => handleStatusChange(enr.id, e.target.value as EnrollmentStatus)}
                      >
                        <option value="ACTIVE">Activa</option>
                        <option value="PENDING">Pendiente</option>
                        <option value="REVOKED">Revocada</option>
                        <option value="EXPIRED">Expirada</option>
                      </select>
                      <div>
                        <p className={styles.muted}>{new Date(enr.createdAt).toLocaleDateString('es-MX')}</p>
                        {enr.notes && <p className={styles.note}>{enr.notes}</p>}
                      </div>
                    </div>
                  ))}
                  {!data?.enrollments.length && <p className={styles.muted}>No hay membresías registradas.</p>}
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div>
                  <p className={styles.cardKicker}>Crear acceso manual</p>
                  <h3 className={styles.cardTitle}>Becas / cortesías</h3>
                </div>
              </div>
              <form className={styles.form} onSubmit={createEnrollment}>
                <label className={styles.field}>
                  <span>ID de usuario</span>
                  <input
                    value={newEnrollment.userId}
                    onChange={(e) => setNewEnrollment((prev) => ({ ...prev, userId: e.target.value }))}
                    placeholder="uuid del usuario"
                  />
                </label>
                <label className={styles.field}>
                  <span>Programa</span>
                  <select
                    value={newEnrollment.programId}
                    onChange={(e) => setNewEnrollment((prev) => ({ ...prev, programId: e.target.value }))}
                  >
                    <option value="">Selecciona un programa</option>
                    {data?.programs.map((p) => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </label>
                <label className={styles.field}>
                  <span>Estado</span>
                  <select
                    value={newEnrollment.status}
                    onChange={(e) => setNewEnrollment((prev) => ({ ...prev, status: e.target.value as EnrollmentStatus }))}
                  >
                    <option value="ACTIVE">Activa</option>
                    <option value="PENDING">Pendiente</option>
                    <option value="REVOKED">Revocada</option>
                    <option value="EXPIRED">Expirada</option>
                  </select>
                </label>
                <label className={styles.field}>
                  <span>Notas</span>
                  <textarea
                    value={newEnrollment.notes}
                    onChange={(e) => setNewEnrollment((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Contexto, beca, etc."
                    rows={3}
                  />
                </label>
                <button className={styles.primaryBtn} disabled={savingEnrollment}>
                  {savingEnrollment ? 'Guardando...' : 'Crear acceso'}
                </button>
              </form>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}>
              <div>
                <p className={styles.cardKicker}>Pagos recientes</p>
                <h3 className={styles.cardTitle}>Liquidaciones y proveedor</h3>
              </div>
            </div>
            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Usuario</span>
                <span>Monto</span>
                <span>Programa</span>
                <span>Estado</span>
                <span>Fecha</span>
              </div>
              <div className={styles.tableBody}>
                {data?.recentPayments.map((p) => (
                  <div key={p.id} className={styles.tableRow}>
                    <div>
                      <p className={styles.bold}>{p.user.name || 'Sin nombre'}</p>
                      <p className={styles.muted}>{p.user.email}</p>
                    </div>
                    <p className={styles.progValue}>${p.amountUsd.toLocaleString('es-MX')} {p.currency}</p>
                    <p className={styles.progTitle}>{p.program.title}</p>
                    <span className={styles.badge}>{p.status}</span>
                    <p className={styles.muted}>{new Date(p.createdAt).toLocaleDateString('es-MX')}</p>
                  </div>
                ))}
                {!data?.recentPayments.length && <p className={styles.muted}>No hay pagos registrados.</p>}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string | number; accent: 'blue' | 'green' | 'amber' | 'purple' }) {
  return (
    <div className={`${styles.statCard} ${styles[accent]}`}>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
    </div>
  );
}
