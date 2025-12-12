import {
  AcademicCapIcon,
  BookmarkIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  RectangleStackIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { IconTrendingUp } from "@tabler/icons-react";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchCardData } from "@/lib/data/dashboard";

const iconMap = {
  libros: BookOpenIcon,
  facultades: BuildingLibraryIcon,
  carreras: AcademicCapIcon,
  especialidades: RectangleStackIcon,
  autores: UserGroupIcon,
  usuarios: TagIcon,
  librosAsignados: BookmarkIcon,
};

interface DashboardCard {
  title: string;
  value: number | string;
  type: keyof typeof iconMap;
  // Puedes añadir más propiedades aquí si `fetchCardData` retorna información de tendencia
  // trend?: number;
  // trendDescription?: string;
}

function StatCard({ title, value, type }: DashboardCard) {
  const Icon = iconMap[type];

  const TrendIcon = IconTrendingUp;

  const footerText = `Total de ${title.toLowerCase()} en el sistema.`;

  return (
    <Card className="@container/card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col gap-1">
          <CardDescription className="flex items-center gap-2">
            {Icon ? <Icon className="h-5 w-5 text-muted-foreground" /> : null}
            {title}
          </CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value}
          </CardTitle>
        </div>

        <CardAction>
          <Badge variant="outline" className="text-xs">
            <TrendIcon className="size-4" />
            Nuevo
          </Badge>
        </CardAction>
      </CardHeader>

      <CardFooter className="pt-2 text-sm text-muted-foreground">
        {footerText}
      </CardFooter>
    </Card>
  );
}

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

  const validCards = cardData.filter(
    (card) => card.value !== null && card.value !== undefined
  );

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {validCards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
