import React, { useEffect, useRef, useState } from 'react';
import {
    Calculator,
    Calendar,
    Cross,
    Mic,
    Target,
    Timer,
    User2Icon,
    Voicemail,
    X
} from 'lucide-react';

import { ScrollArea } from './ui/scroll-area';
import { motion } from 'framer-motion';

import { Button } from './ui/button';
// import toast from 'react-hot-toast';
import axios from 'axios';
import { Input } from './ui/input';

function PromptBox({ onSubmitPressed, animatePrompt, setAnimatePrompt, timeMs }: { onSubmitPressed: any, animatePrompt: boolean, setAnimatePrompt: any, timeMs: any }) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isListening, setIsListening] = useState<boolean>(false);

    useEffect(() => {

        if (isListening) {
            // @ts-ignore
            const recognition = new window.webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = false;

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                if (transcript && inputRef.current) {
                    inputRef.current.value = transcript;
                    onSubmitClicked();
                }
                // toast.success("Voice Recognized")
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                // toast.error(`Error: ${event.error}. Try moving to a quite place.`)
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();

            return () => {
                recognition.abort();
            };
        }
    }, [isListening]);

    const onSubmitClicked = async () => {
        const curr = inputRef.current;
        if (curr && curr.value) {
            onSubmitPressed(curr.value ?? '');
            // toast.success("Quering API")
            curr.value = '';
        }
    };


    return (
        <motion.div
            animate={{
                y: animatePrompt ? [-70, 20, 0] : 1
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <div id='inputs' className="mx-auto pt-6 w-full sm:max-w-2xl sm:px-4">
                <div className="bg-background space-y-4 flex flex-row items-center gap-2  justify-center border-t px-4  shadow-lg sm:rounded-xl sm:border md:py-4 ">

                    <div className='flex items-center gap-4 flex-col'>
                       
                        <button onClick={() => { setIsListening(!isListening); /*toast.success("Start Speaking") */ }} className='inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'>
                        <Mic size={15} />
                        </button>



                        <div className='flex items-center gap-4'>
                            <Input ref={inputRef} className="flex-grow  border-gray-400 rounded-xl " placeholder="Ask you query" />
                            <div id='voice_login' className='flex justify-center items-center'>
                                <div className='flex flex-row gap-4 h-max'>

                                    <button onClick={onSubmitClicked} className="mt-4 mb-4 group relative rounded-lg border-2 border-white bg-black px-5 py-2 font-medium text-white duration-1000 hover:shadow-lg hover:shadow-blue-500/50">
                                        <span className="absolute left-0 top-0 size-full rounded-md border border-dashed border-red-50 shadow-inner shadow-white/30 group-active:shadow-white/10"></span>
                                        <span className="absolute left-0 top-0 size-full rotate-180 rounded-md border-red-50 shadow-inner shadow-black/30 group-active:shadow-black/10"></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="white " className="size-4 text-white">
                                            <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z" />
                                        </svg>
                                    </button>


                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </motion.div>
    );
}

export default PromptBox;