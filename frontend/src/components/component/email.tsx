"use client";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

// User can add mailid, which will be sent email to.
export function EmailPage() {

  const emailRef = useRef<HTMLInputElement>(null);
  const templateRef = useRef<HTMLTextAreaElement>(null);
  const [summary, setSummary] = useState<any>({});
  const sendBulkMail = async () => {
    const template = templateRef.current?.value;
    const email = emailRef.current?.value;

    try {
      // curl -X 'POST' \
      //   'http://localhost:8000/admin/send_bulk_email?template=HI' \
      //   -H 'accept: application/json' \
      //   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImV4cCI6MTcxNDMwMjI4N30.e1EA9To-yZ0MU7980VN15NCUFbujjxOzMZiuXOjKMqQ' \
      //   -H 'Content-Type: application/json' \
      //   -d '[
      // ]'

      const toasid = toast.loading("Sending Email...");
      const res = await axios.post(
        "http://localhost:8000/admin/send_bulk_email"
        + `?template=${encodeURIComponent(template || "")}`,
        email?.split(","), {
        headers: {
          "accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        }
      })
      toast.dismiss(toasid);
      toast.success("Email(s) Sent");
      console.log('API call successful:', res);
    } catch (error) {
      console.error('API call failed:', error);
    }
  }

  const template = `
  
  Hi {name},

We hope this message finds you well. We have something special that we think you'll really enjoy!

Our latest offering is designed to make your life easier and more enjoyable. It's packed with features that can help you achieve more in less time, all while having fun.

Here are just a few reasons why you'll find it useful:
- It's simple and easy to use.
- It saves you time on daily tasks.
- It provides a great user experience.

We'd love for you to check it out and see what you think! Click the link below to learn more and get started:

http://localhost:3000/chat?id={id}

If you have any questions or need assistance, feel free to reply to this email, and we'll be glad to help.

Thanks for your time, and we look forward to hearing from you!

Best regards,
Your Team
  `
  const name = `{name}`
  const id = `{id}`
  return (
    <main className="flex flex-col items-center h-full mt-10  text-white">

      <div className="max-w-4xl w-full space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Cold Mail Clients</h1>
          <p className="text-gray-500 dark:text-gray-400"> Enter email addresses, seperate by comma,
            This will send email to selected clients, Use {name} to insert name of client, and use {id} to insert unique id for chat</p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <Input ref={emailRef} className="w-full" placeholder="Enter email addresses, seperate by comma" type="text" />

          </div>
          <div className="flex items-center justify-between">

          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <Textarea ref={templateRef} className="w-full text-lg" placeholder="Enter prompt" rows={30} value={template}>
            </Textarea>

          </div>
          <button onClick={() => { sendBulkMail() }} className="mt-4 mb-4 group relative rounded-lg border-2 border-white bg-black px-5 py-1 font-medium text-white duration-1000 hover:shadow-lg hover:shadow-blue-500/50">
            Send Bulk Mail
          </button>
        </div>
      </div>
    </main>
  )
}
