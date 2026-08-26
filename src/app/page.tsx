import MenuApp from "@/components/MenuApp";
import type { HoursData, MenuData, QuickStopsData } from "@/lib/types";
import menuData from "../../data/menu.json";
import hoursData from "../../data/hours.json";
import quickStopsData from "../../data/quickStops.json";

export default function Home() {
  return (
    <MenuApp
      data={menuData as MenuData}
      hoursData={hoursData as HoursData}
      quickStopsData={quickStopsData as QuickStopsData}
    />
  );
}
