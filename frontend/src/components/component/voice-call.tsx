"use client";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

// User can add mo no, which will be called by the agent.
export function VoiceCall() {

  const mobileRef = useRef<HTMLInputElement>(null);
  const templateRef = useRef<HTMLTextAreaElement>(null);
  const [summary, setSummary] = useState<any>(undefined);
  const callUser = async () => {
    const template = templateRef.current?.value;
    const mobile = mobileRef.current?.value;
    toast.loading("Calling...");
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/call",
        {
          mobile: mobile,
          template: template,
        },
        {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      toast.success("Call Initiated");
      console.log('API call successful:', response);
    } catch (error) {
      console.error('API call failed:', error);
      toast.error("Call Failed. Try Again later");
    }
  }

  const getSummary = async () => {
    const toastId = toast.loading("Fetching Summary...");
    const res = await axios.get("http://localhost:8000/admin/get_last_summary", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      }
    })
    toast.dismiss(toastId);
    toast.success("Summary Fetched");
    setSummary(res.data);
  }

  return (
    <main className="flex flex-col items-center h-full mt-10  ">

      <div className="max-w-4xl w-full space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Voice Call</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter mobile number to give a agent voice call.</p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <Input ref={mobileRef} className="w-full" placeholder="+919876543210" type="tel" />

          </div>
          <div className="flex items-center justify-between">

          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <Textarea ref={templateRef} className="w-full text-lg" placeholder="Enter prompt" rows={10}>

              You are a sales assistant whose primary purpose is to try to increase the company sales using proposals provided to you.
              If the user has any query or needs help you are also going to solve that query based upon the information you have and try to pitch a sales proposal that has been provided to you. Your primary objective is to help the users and increase the company sales as much as possible.
              Always response in 2-3 lines , don not respond any more than that.
              You are to behave as you are on a live call , so your responses should be natural and use words like hmmm, I understand, etc. to keep it natural when you don't understand anything.
            </Textarea>

          </div>
          <button onClick={() => { callUser() }} className="mt-4 mb-4 group relative rounded-lg border-2 border-white bg-black px-5 py-1 font-medium text-white duration-1000 hover:shadow-lg hover:shadow-blue-500/50">
            Give a call
          </button>
        </div>

        <div className="mt-16 space-y-2">
          <h1 className="text-3xl mt-32 font-bold text-gray-900 dark:text-gray-100">Latest Call Summary</h1>
          <p className="text-gray-500 dark:text-gray-400">Last call summary will be shown here. (Read only)</p>
        </div>
        {!summary && <>
          <button onClick={() => { getSummary() }} className="mt-4 mb-4 group relative rounded-lg border-2 border-white bg-black px-5 py-1 font-medium text-white duration-1000 hover:shadow-lg hover:shadow-blue-500/50">
            Get Last Call Details
          </button></>}

        {summary && <>
          <h1 className="text-2xl mt-8 font-bold text-gray-900 dark:text-gray-100">Customer:  {summary?.customer?.name} - {summary?.customer?.number}</h1>
          <button onClick={() => { getSummary() }} className="mt-4 mb-4 group relative rounded-lg border-2 border-white bg-black px-5 py-1 font-medium text-white duration-1000 hover:shadow-lg hover:shadow-blue-500/50">
            <Link href={summary?.recordingUrl || ""}>
              Download the recording of the call
            </Link>
          </button>
          <h1 className="text-2xl mt-16 font-bold text-gray-900 dark:text-gray-100">Summary</h1>
          <Textarea readOnly className="text-lg " placeholder="Enter prompt" rows={10} value={summary?.summary}></Textarea>
          <h1 className="text-2xl mt-16 font-bold text-gray-900 dark:text-gray-100">Transcript</h1>
          <Textarea readOnly className="text-lg " placeholder="Enter prompt" rows={10} value={summary?.transcript}></Textarea>
        </>}
      </div>

    </main>
  )
}
