import PageNotFound from "@/app/components/PageNotFound";
import { routing } from "@/i18n/routing";

export default function RootNotFound() {
  return <PageNotFound homeHref={`/${routing.defaultLocale}`} />;
}
