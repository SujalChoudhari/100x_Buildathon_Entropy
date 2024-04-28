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
        const response = await axios.get("https://one00x-buildathon-entropy.onrender.com/admin/analytics", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          }
        })
        toast.success("Analytics loaded from server")
        setAnalytics(response.data)

      }
      // cathc unauthorized error
      catch (error: any) {
        if (error?.response?.status === 401) {
          console.log("Unauthorized error")
          router.push('/login')
        }else {
          toast.error("Cannot fetch data")
        }
      }
    }

    loadAnalytics()
  }, [])

  const generateProposal = () => {
    // Create the Promise for the axios request
    const proposalPromise = axios.get("https://one00x-buildathon-entropy.onrender.com/admin/generate_proposal", {
      headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      }
    });

    // Use toast.promise to handle loading, success, and error cases
    toast.promise(
      proposalPromise,
      {
        loading: 'Generating proposal... This may take a while.',
        success: 'Proposal generated successfully!',
        error: 'Failed to generate proposal. Please try again.',
      }
    );

    // Return the Promise
    return proposalPromise;
  };

  // Example usage
  const promisedGeneration = () => {
    generateProposal()
      .then((res) => {
        console.log("Proposal generation response:", res.data);
      })
      .catch((error) => {
        console.error("Error generating proposal:", error);
      });
  }
  return (<>
    {analytics && (
      <div className="grid grid-cols-12 gap-7 w-full">
        <div className="col-span-12 my-6 flex justify-center flex-col">
          <button onClick={() => { promisedGeneration() }} className="mt-4 mx-auto text-xl text-center flex justify-center group relative rounded-lg border-2 border-white bg-black px-5 py-1 font-medium text-white duration-1000 hover:shadow-lg hover:shadow-blue-500/50">
            {/* <span className="absolute left-0 top-0 size-full rounded-md border border-dashed border-red-50 shadow-inner shadow-white/30 group-active:shadow-white/10"></span> */}
            {/* <span className="absolute left-0 top-0 size-full rotate-180 rounded-md border-red-50 shadow-inner shadow-black/30 group-active:shadow-black/10"></span> */}
            Generate New Proposal
          </button>
          <span className="text-center mt-6 text-zinc-300">The new proposal will be generated based on the existing data, chats and analytics.</span>
        </div>
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
