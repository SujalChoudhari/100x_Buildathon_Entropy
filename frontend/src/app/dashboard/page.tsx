"use client";
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
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const [analytics, setAnalytics] = useState<any>(undefined);
  const router = useRouter()

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await axios.get("http://localhost:8000/admin/analytics", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          }
        })
        toast.success("Analytics loaded from server")
        setAnalytics(response.data)

      }
      // cathc unauthorized error
      catch (error: any) {
        if (error.response.status === 401) {
          console.log("Unauthorized error")
          router.push('/login')
        }
      }




    }

    loadAnalytics()
  }, [])
  return (<>
    {analytics && (
      <div className="grid grid-cols-12 gap-7 w-full">
        <AveragePositions analytics={analytics.averagePos} className="col-span-12 lg:col-span-4" />
        <Analytics analytics={analytics.analytics} className="col-span-12 lg:col-span-8" />

        <Visitor analytics={analytics.visitors} className="col-span-12 lg:col-span-8" />
        <SessionBrowser analytics={analytics.sessionBrowser} className="col-span-12 lg:col-span-4" />

        <div className="col-span-12 lg:col-span-4">
          <CompletedGoals analytics={analytics.sales} className="h-full max-h-[200px] overflow-hidden" />
          <CompletedRates analytics={analytics.sales} className="h-full max-h-[200px] overflow-hidden mt-7" />
        </div>
        <SalesCountry analytics={analytics.sales} className="col-span-12 lg:col-span-8" />

        <RecentLeads analytics={analytics.users} className="col-span-12 lg:col-span-8" />
        <ToDoList className="col-span-12 lg:col-span-4" />

        <TopPerforming className="col-span-12 lg:col-span-6" />
        <TopQueries analytics={analytics.queries} className="col-span-12 lg:col-span-6" />
      </div>
    )}
  </>
  );
};

export default Page;
