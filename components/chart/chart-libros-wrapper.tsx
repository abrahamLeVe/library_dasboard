import { fetchLibrosPorMes, type LibrosPorMesItem } from "@/lib/data/dashboard";
import ChartAreaInteractive from "./chart-area-interactive";

export type ChartDataMonth = {
  label: string;
  total: number;
  date: string;
};

const MONTH_NAMES_SHORT = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

function getLast12MonthsTimeline() {
  const out: { mes: number; anio: number; label: string; date: string }[] = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    out.push({
      mes: d.getMonth() + 1,
      anio: d.getFullYear(),
      label: `${MONTH_NAMES_SHORT[d.getMonth()]} ${d.getFullYear()}`,
      date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-01`,
    });
  }
  return out;
}

export default async function LibrosChartWrapper() {
  const raw: LibrosPorMesItem[] = await fetchLibrosPorMes();

  const lookup = new Map<string, number>();
  raw.forEach((r) => {
    const key = `${r.anio}-${r.mes}`;
    lookup.set(key, r.total);
  });

  const monthsTimeline = getLast12MonthsTimeline();

  const chartData: ChartDataMonth[] = monthsTimeline.map((m) => {
    const key = `${m.anio}-${m.mes}`;
    return {
      label: m.label,
      total: lookup.get(key) ?? 0,
      date: m.date,
    };
  });

  return (
    <ChartAreaInteractive
      title="Libros añadidos (últimos 12 meses)"
      data={chartData}
      dataKey="total"
      areaName="Libros"
    />
  );
}
