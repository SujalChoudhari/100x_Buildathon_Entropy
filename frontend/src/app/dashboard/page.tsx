import Visitor from "@/components/analytics/visitor";
import Analytics from "@/components/analytics/analytics";
import CompletedGoals from "@/components/analytics/completed-goals";
import AveragePositions from "@/components/analytics/average-positions";
import CompletedRates from "@/components/analytics/completed-rates";
import SessionBrowser from "@/components/analytics/session-browser";
import TopPerforming from "@/components/analytics/top-performing";
import SalesCountry from "@/components/analytics/sales-country";
import TopQueries from "@/components/analytics/top-queries";
import RecentLeads from "@/components/analytics/recent-leads";
import DealStatus from "@/components/analytics/deal-status";
import ToDoList from "@/components/analytics/to-do-list";

const Page = () => {
  return (
    
    <div className="grid grid-cols-12 gap-7 w-full">
      <AveragePositions className="col-span-12 lg:col-span-4" />
      <Analytics className="col-span-12 lg:col-span-8" />

      <Visitor className="col-span-12 lg:col-span-8" />
      <SessionBrowser className="col-span-12 lg:col-span-4" />

      <div className="col-span-12 lg:col-span-4">
        <CompletedGoals className="h-full max-h-[200px] overflow-hidden" />
        <CompletedRates className="h-full max-h-[200px] overflow-hidden mt-7" />
      </div>
      <SalesCountry className="col-span-12 lg:col-span-8" />

      <RecentLeads className="col-span-12 lg:col-span-8" />
      <ToDoList className="col-span-12 lg:col-span-4" />
      
      <TopPerforming className="col-span-12 lg:col-span-6" />
      <TopQueries className="col-span-12 lg:col-span-6" />
    </div>
  );
};

export default Page;
