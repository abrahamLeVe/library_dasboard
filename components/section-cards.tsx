// components/card-wrapper.tsx (o donde lo almacenes)
import {
  AcademicCapIcon,
  BookmarkIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  RectangleStackIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
// Importaciones del nuevo diseño
import { IconTrendingUp } from "@tabler/icons-react"; // Solo usamos TrendingUp como ejemplo

import {
  Card,
  CardAction, // Necesario para el Badge (opcional)
  CardDescription,
  CardFooter, // Opcional, pero da espacio
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchCardData } from "@/lib/data/dashboard";

// 1. Mapeo de iconos (manteniendo tu lógica)
const iconMap = {
  libros: BookOpenIcon,
  facultades: BuildingLibraryIcon,
  carreras: AcademicCapIcon,
  especialidades: RectangleStackIcon,
  autores: UserGroupIcon,
  usuarios: TagIcon,
  librosAsignados: BookmarkIcon,
};

// 2. Definición de los tipos de las tarjetas de datos
interface DashboardCard {
  title: string;
  value: number | string;
  type: keyof typeof iconMap;
  // Puedes añadir más propiedades aquí si `fetchCardData` retorna información de tendencia
  // trend?: number;
  // trendDescription?: string;
}

// 3. Componente que recibe los datos y los renderiza
function StatCard({ title, value, type }: DashboardCard) {
  const Icon = iconMap[type];

  // Como no tenemos datos de tendencia, usamos IconTrendingUp como un marcador de posición
  const TrendIcon = IconTrendingUp;

  // Puedes personalizar los detalles del CardFooter según el tipo de dato si es necesario
  const footerText = `Total de ${title.toLowerCase()} en el sistema.`;

  return (
    <Card className="@container/card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col gap-1">
          {/* Título de la tarjeta, usando CardDescription para el texto pequeño */}
          <CardDescription className="flex items-center gap-2">
            {Icon ? <Icon className="h-5 w-5 text-muted-foreground" /> : null}
            {title}
          </CardDescription>
          {/* Valor de la tarjeta, usando CardTitle para el número grande */}
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value}
          </CardTitle>
        </div>

        {/* Usamos CardAction para añadir un Badge (Opcional, si no tienes datos de tendencia, puedes quitar CardAction y Badge) */}
        <CardAction>
          <Badge variant="outline" className="text-xs">
            {/* Si tu fetchCardData tiene tendencias, usa TrendIcon y el valor */}
            <TrendIcon className="size-4" />
            Nuevo
          </Badge>
        </CardAction>
      </CardHeader>

      {/* Footer para detalles adicionales */}
      <CardFooter className="pt-2 text-sm text-muted-foreground">
        {footerText}
      </CardFooter>
    </Card>
  );
}

// 4. El componente principal que obtiene los datos
export default async function CardWrapper() {
  const {
    totalLibros,
    totalFacultades,
    totalCarreras,
    totalEspecialidades,
    totalAutores,
    totalUsuarios,
    totalLibrosAsignados,
  } = await fetchCardData();

  // Array de datos para mapear
  const cardData: DashboardCard[] = [
    { title: "Total Libros", value: totalLibros, type: "libros" },
    { title: "Facultades", value: totalFacultades, type: "facultades" },
    { title: "Carreras", value: totalCarreras, type: "carreras" },
    {
      title: "Especialidades",
      value: totalEspecialidades,
      type: "especialidades",
    },
    { title: "Autores", value: totalAutores, type: "autores" },
    { title: "Usuarios", value: totalUsuarios, type: "usuarios" },
    {
      title: "Libros Asignados",
      value: totalLibrosAsignados,
      type: "librosAsignados",
    },
  ];

  // Filtramos las tarjetas que puedan tener un valor nulo o indefinido antes de renderizar (opcional)
  const validCards = cardData.filter(
    (card) => card.value !== null && card.value !== undefined
  );

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Usamos map para iterar sobre los datos y crear las tarjetas */}
      {validCards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
