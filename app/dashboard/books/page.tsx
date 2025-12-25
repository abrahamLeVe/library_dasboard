import { DataTable } from "@/components/data-table";
import { fetchFilteredBooks, fetchBooksPages } from "@/lib/data/books";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    limit?: string; // 1. Agregamos limit opcional
  }>;
}) {
  const params = await searchParams;
  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;
  const itemsPerPage = Number(params?.limit) || 10;

  const totalPages = await fetchBooksPages(query, itemsPerPage);
  const books = await fetchFilteredBooks(query, currentPage, itemsPerPage);

  const formattedData = books.map((book) => ({
    id: book.id,
    header: book.titulo,
    especialidad: book.especialidad || "General",
    idioma: book.idioma,
    año: book.anio?.toString(),
    páginas: book.paginas?.toString(),
    autor: book.autores.split(",")[0] || "Autor desconocido",
    originalData: book,
  }));

  return (
    <>
      <DataTable
        data={formattedData}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}
