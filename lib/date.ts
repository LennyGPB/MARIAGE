import { format } from "date-fns"
import { fr } from "date-fns/locale"

export function formatFrenchDate(iso: string): string {
  const raw = format(new Date(iso), "EEEE dd MMMM yyyy", { locale: fr })
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}
