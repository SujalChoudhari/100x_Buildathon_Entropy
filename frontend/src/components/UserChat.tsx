import { User2Icon } from 'lucide-react'
import React from 'react'

export default function UserChat({message}:{message:string}) {
    return (
        <>
          <div>
                    <div className="group relative flex items-start md:-ml-12">
                        <div className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border shadow-sm"> {/* Seperator */}
                            <User2Icon size={18} />
                        </div>
                        <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
                            {message}
                        </div>
                    </div>
                    <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-4">
                    </div>
                </div>
        </>
    )
}