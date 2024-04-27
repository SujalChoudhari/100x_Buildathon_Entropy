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
            <div id='inputs' className="mx-auto w-full sm:max-w-2xl sm:px-4">
                <div className="bg-background  space-y-4 flex flex-row items-center gap-2  border-t px-4  shadow-lg sm:rounded-xl sm:border md:py-4 ">
                    <div className="rounded-lg border shadow-md mt-4">
                        <input ref={inputRef} placeholder="Input Prompt." />
                    </div>


                    {/* ALL THE BUTTONS */}


                    <div id='voice_login'  className='  space-y-4 items-center justify-center flex flex-col'>
                        <div className='flex flex-row gap-4'>
                            <button onClick={onSubmitClicked} className="group h-8 select-none rounded-lg bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-600 px-3 text-sm leading-8 text-zinc-50 shadow-[0_-1px_0_1px_rgba(0,0,0,0.8)_inset,0_0_0_1px_rgb(9_9_11)_inset,0_0.5px_0_1.5px_#71717a_inset] hover:bg-gradient-to-b hover:from-zinc-900 hover:via-zinc-900 hover:to-zinc-700 active:shadow-[0_3px_0_0_rgba(0,0,0)_inset]">
                                <span className="block group-active:[transform:translate3d(0,1px,0)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="white " className="size-4 text-white">
                                        <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z" />
                                    </svg>
                                </span>
                            </button>
                            <button onClick={() => { setIsListening(!isListening); /*toast.success("Start Speaking") */}} className="group h-8 select-none rounded-lg bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-600 px-3 text-sm leading-8 text-zinc-50 shadow-[0_-1px_0_1px_rgba(0,0,0,0.8)_inset,0_0_0_1px_rgb(9_9_11)_inset,0_0.5px_0_1.5px_#71717a_inset] hover:bg-gradient-to-b hover:from-zinc-900 hover:via-zinc-900 hover:to-zinc-700 active:shadow-[0_3px_0_0_rgba(0,0,0)_inset]">
                                <span className="block group-active:[transform:translate3d(0,1px,0)]">

                                    <Mic size={15} />
                                </span>
                            </button>
                        </div>

                        <button className="group block h-12 select-none rounded-lg bg-white px-3 text-sm  text-zinc-950 shadow-[0_-1px_0_0px_#d4d4d8_inset,0_0_0_1px_#f4f4f5_inset,0_0.5px_0_1.5px_#fff_inset] hover:bg-zinc-50 hover:via-zinc-900 hover:to-zinc-800 active:shadow-[-1px_0px_1px_0px_#e4e4e7_inset,1px_0px_1px_0px_#e4e4e7_inset,0px_0.125rem_1px_0px_#d4d4d8_inset]"><span className="group-active:[transform:translate3d(0,1px,0)] text-sm flex flex-row items-center"> <Timer />Response Time: {timeMs ? `${(timeMs / 1000).toFixed(2)} sec` : 'N/A'}</span></button>
                    </div>



                </div>
            </div>
        </motion.div>
    );
}

export default PromptBox;