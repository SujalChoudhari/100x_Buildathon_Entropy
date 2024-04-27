import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatbotResponse from './ui/ChatbotResponse';
import UserChat from './UserChat';
interface ChatMessage {
    isUser: boolean;
    message: string;
}

interface ChatProps {
    chatData: ChatMessage[];
}

export default function Chat({ chatData }: ChatProps) {
    return (
        <ScrollArea className="mt-6 min-h-max h-[620px]">
            <div className="mx-auto max-w-2xl px-4">
                {chatData && chatData.map((chat: any, index: number) => (
                    <React.Fragment key={index}>
                        {chat.isUser ? <UserChat message={chat.message} /> : <ChatbotResponse message={chat.message} />}
                    </React.Fragment>
                ))}
            </div>
        </ScrollArea>
    );
}