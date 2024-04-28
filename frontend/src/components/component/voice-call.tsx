"use client";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// User can add mo no, which will be called by the agent.
export function VoiceCall() {

  const mobileRef = useRef<HTMLInputElement>(null);
  const templateRef = useRef<HTMLTextAreaElement>(null);
  const [summary, setSummary] = useState<any>({});
  const callUser = async () => {
    const template = templateRef.current?.value;
    const mobile = mobileRef.current?.value;

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

      console.log('API call successful:', response);
    } catch (error) {
      console.error('API call failed:', error);
    }
  }

  const getSummary = async () => {
    const res = await axios.get("http://localhost:8000/admin/get_last_summary", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      }
    })

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
            {/* <span className="text-gray-500 dark:text-gray-400">
              Total mobile numbers:
              <span className="font-medium">0</span>
            </span> */}
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
            <span className="absolute left-0 top-0 size-full rounded-md border border-dashed border-red-50 shadow-inner shadow-white/30 group-active:shadow-white/10"></span>
            <span className="absolute left-0 top-0 size-full rotate-180 rounded-md border-red-50 shadow-inner shadow-black/30 group-active:shadow-black/10"></span>
            Give a call
          </button>
        </div>

        <div className="mt-8 space-y-2">
          <h1 className="text-3xl mt-8 font-bold text-gray-900 dark:text-gray-100">Latest Call Summary</h1>
          <p className="text-gray-500 dark:text-gray-400">Last call summary will be shown here. (Read only)</p>
        </div>
        <button onClick={() => { getSummary() }} className="mt-4 mb-4 group relative rounded-lg border-2 border-white bg-black px-5 py-1 font-medium text-white duration-1000 hover:shadow-lg hover:shadow-blue-500/50">
          Get Last Call Details 
        </button>
        
        <h1 className="text-2xl mt-8 font-bold text-gray-900 dark:text-gray-100">Customer:  {summary?.customer?.name} - {summary?.customer?.number}</h1>
        <button onClick={() => { getSummary() }} className="mt-4 mb-4 group relative rounded-lg border-2 border-white bg-black px-5 py-1 font-medium text-white duration-1000 hover:shadow-lg hover:shadow-blue-500/50">
          <Link href={summary?.recordingUrl || ""}>
            Download the recording of the call
          </Link>
        </button>
        <Textarea readOnly className="text-lg " placeholder="Enter prompt" rows={10} value={summary?.summary}></Textarea>
        <Textarea readOnly className="text-lg " placeholder="Enter prompt" rows={10} value={summary?.transcript}></Textarea>
      </div>

    </main>
  )
}
