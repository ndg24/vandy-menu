import MenuApp from "@/components/MenuApp";
import type { MenuData } from "@/lib/types";
import menuData from "../../data/menu.json";

export default function Home() {
  return <MenuApp data={menuData as MenuData} />;
}
