"use client"
import React, { useEffect, useState } from 'react'
import { Skeleton } from './skeleton'
import { motion } from 'framer-motion'
import { GitGraph } from 'lucide-react';
import Markdown from 'react-markdown'

function ChatbotResponse({ message }: { message: string }) {

    const [chatbotResponse, setChatbotResponse] = useState<string | null>(null);

    useEffect(() => {
        // Simulate fetching the chatbot response from the backend
        const fetchResponse = () => {
            setTimeout(() => {
                setChatbotResponse(message);
            }, 100); // Simulate a 2-second delay
        };

        fetchResponse();

    }, []); // Empty dependency array means this effect runs once on component mount
    return (
        <div>
            <div className="group relative flex items-start md:-ml-12">
                <div className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border shadow-sm"> {/* Seperator */}
                    <GitGraph size={18} />
                </div>
                <div id="mkd" className="ml-4 flex-1 space-y-2 overflow-hidden pl-2 ">

                    {chatbotResponse ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7 }} // Adjust duration as needed
                        >
                            <Markdown>
                                {chatbotResponse}
                            </Markdown>
                        </motion.div>
                    ) : (
                        <>
                            <Skeleton className="w-full h-[20px] rounded-full" />
                            <Skeleton className="w-full h-[20px] rounded-full" />
                            <Skeleton className="w-full h-[20px] rounded-full" />
                        </>
                    )}
                </div>
            </div>
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-4">
            </div>
        </div>
    )
}

export default ChatbotResponse