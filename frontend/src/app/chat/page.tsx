"use client";
import React, { useEffect, useState } from 'react';
import PromptBox from '@/components/PromptBox';
import axios from 'axios';
import Chat from '@/components/chat';
import { Spotlight } from '@/components/ui/Spotlight';
import toast from 'react-hot-toast';
import { Speaker, Volume } from 'lucide-react';
import { FaVolumeMute } from 'react-icons/fa';
import { FaVolumeHigh } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

function ChatPage() {
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [animatePrompt, setAnimatePrompt] = useState(false);
  const [timeMs, setTimeMs] = useState(null);
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useState(false); // New toggle state variable
  const router = useRouter();

  const toggleTextToSpeech = () => {
    setTextToSpeechEnabled(!textToSpeechEnabled);
  };

  const speak = (text: string) => {

    const t1 = toast.loading("Text to Speech is Playing...");

    try {
      const synth = window.speechSynthesis;

      // Check if speech synthesis is supported
      if (!synth) {
        throw new Error("Speech synthesis is not supported in this browser.");
      }

      const utterance = new SpeechSynthesisUtterance(text);

      // Optionally, you can set properties like voice, pitch, rate, etc.
      utterance.rate = 1; // Normal speed
      utterance.pitch = 1; // Normal pitch

      utterance.onend = () => {
        toast.dismiss(t1);
      };

      utterance.onerror = (e) => {
        console.error("Error with speech synthesis:", e);
        toast.error("Failed to play text to speech.");
      };

      synth.speak(utterance);

    } catch (error) {
      console.error("Error with text-to-speech:", error);
      toast.dismiss(t1);
      toast.error("Failed to synthesize speech.");
    }
  };


  const onInputSent = async (input: string) => {
    // check login or not
    try {
      const res = await axios.get('https://one00x-buildathon-entropy.onrender.com/me',
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      console.log("Login successful. Proceeding...",res);

    }
    catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error("Login needed. Redirecting...");
        router.push('/login');
      }
      return;
    }
    const userInput = input.trim();
    if (userInput.length === 0) {
      toast.error("Input cannot be empty");
    }
    const t2 = toast.loading("Agent Thinking. Beep! Boop!");
    try {
      setChatMessages(prevMessages => [...prevMessages, userInput]);
      const response = await axios.post(
        'https://one00x-buildathon-entropy.onrender.com/chat/response?query=' + encodeURIComponent(userInput)
      );

      setChatMessages(prevMessages => [...prevMessages, response.data.response]);
      speak(response.data.response); // Speech synthesis

      if (response.data.time_ms) {
        setTimeMs(response.data.time_ms);
      }

      toast.dismiss(t2);
      toast.success("Agent replied");
    } catch (error: any) {
      // capture unauthorized error
      if (error.response && error.response.status === 401) {
        toast.dismiss(t2);
        toast.error("Login needed. Redirecting...");
        router.push('/login');
      }
      toast.dismiss(t2);
      console.error('Error sending input:', error);
      toast.error("Failed to send Input. Try Again");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Spotlight fill="#0099ff" />
      <div className='flex justify-center py-4'>
        <h1 className='text-5xl leading-relaxed tracking-wider font-extrabold'>AI Chat</h1>
      </div>


      <Chat chatData={chatMessages.map((message, index) => ({ isUser: index % 2 === 0, message }))} />
      <div className='flex justify-center items-center'>
        <div className='flex w-[30lvw] justify-end items-center ' title='replaces https://elevenlabs.io/ by browswe API'>
          <h1 className='px-4 text-gray-400'>Speak Output</h1>
          <button
            onClick={toggleTextToSpeech} // Toggles the state
            className={`px-4 py-2 rounded-lg text-white border-2 border-gray-400/50 ${textToSpeechEnabled ? 'bg-blue-900/50' : 'bg-blue-950/50'
              } rounded transition duration-200`}
          >
            {textToSpeechEnabled ? <FaVolumeHigh /> : <FaVolumeMute />}
          </button></div>
      </div>
      <PromptBox onSubmitPressed={onInputSent} animatePrompt={animatePrompt} setAnimatePrompt={setAnimatePrompt} timeMs={timeMs} />
    </div>
  );
}

export default ChatPage;
