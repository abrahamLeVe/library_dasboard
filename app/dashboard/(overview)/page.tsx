import { DataTable } from "@/components/data-table";
import LibrosChartWrapper from "@/components/libros-chart-wrapper";
import CardWrapper from "@/components/section-cards";
import { Metadata } from "next";
import data from "../data.json";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <>
      <CardWrapper />
      <div className="px-4 lg:px-6">
        <LibrosChartWrapper />
      </div>
      <DataTable data={data} />
    </>
  );
}
