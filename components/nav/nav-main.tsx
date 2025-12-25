"use client";

import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";
import { usePathname } from "next/navigation"; // 1. Importar el hook

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Usamos cn para combinar clases limpiamente

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname(); // 2. Obtener la ruta actual

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            // 3. Lógica para saber si está activo
            // Si la URL es la raíz ("/dashboard"), debe ser exacta.
            // Si es una sub-ruta ("/dashboard/books"), usamos startsWith para que se mantenga activo en subpáginas.
            const isActive =
              item.url === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.url);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive} // Le dice al sidebar que está activo (accesibilidad)
                  className={cn(
                    // 4. Clases condicionales:
                    // Si isActive es true, aplicamos los estilos del botón azul (primary)
                    isActive &&
                      "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground font-medium"
                  )}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {/* El Link cubre el botón para la navegación */}
                  <Link href={item.url} className="absolute inset-0" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
