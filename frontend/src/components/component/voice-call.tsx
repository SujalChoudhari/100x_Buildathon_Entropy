
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function VoiceCall() {
  return (
    <main className="flex flex-col items-center h-full mt-10  ">
      
      <div className="max-w-4xl w-full space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Mobile Number Tracker</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter mobile numbers and see the total count.</p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <Input className="w-full" placeholder="Enter mobile number" type="tel" />
            <button className="mt-4 mb-4 group relative rounded-lg border-2 border-white bg-black px-5 py-1 font-medium text-white duration-1000 hover:shadow-lg hover:shadow-blue-500/50">
                        <span className="absolute left-0 top-0 size-full rounded-md border border-dashed border-red-50 shadow-inner shadow-white/30 group-active:shadow-white/10"></span>
                        <span className="absolute left-0 top-0 size-full rotate-180 rounded-md border-red-50 shadow-inner shadow-black/30 group-active:shadow-black/10"></span>
                        Submit
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Total mobile numbers:
              <span className="font-medium">0</span>
            </span>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <Textarea className="w-full text-lg" placeholder="Enter prompt" rows={10} />
            
          </div>
          <button className="mt-4 mb-4 group relative rounded-lg border-2 border-white bg-black px-5 py-1 font-medium text-white duration-1000 hover:shadow-lg hover:shadow-blue-500/50">
                        <span className="absolute left-0 top-0 size-full rounded-md border border-dashed border-red-50 shadow-inner shadow-white/30 group-active:shadow-white/10"></span>
                        <span className="absolute left-0 top-0 size-full rotate-180 rounded-md border-red-50 shadow-inner shadow-black/30 group-active:shadow-black/10"></span>
                        Update
            </button>
        </div>
      </div>
    </main>
  )
}
