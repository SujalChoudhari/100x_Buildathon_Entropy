"use client";
import React, { useEffect, useState } from 'react'
import PromptBox from '@/components/PromptBox';
import axios from 'axios';
import Chat from '@/components/chat';
import { Spotlight } from '@/components/ui/Spotlight';
import toast from 'react-hot-toast';


function ChatPage() {

  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [animatePrompt, setAnimatePrompt] = useState(false);
  const [timeMs, setTimeMs] = useState(null);

  const speak = async (text: string) => {
    const elevenLabsAPIKey = "dea5c8ae694beb960e7c16aac4eecb91"; // Store your API key securely
    toast.success("Text to Speech Synthesizing...");
    try {
      const response = await axios.post(
        'https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', // Replace YOUR_VOICE_ID with the ID of the voice you want to use
        { text },
        {
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': elevenLabsAPIKey,
          },
          responseType: 'arraybuffer', // Get raw audio data
        }
      );

      // Create a Blob from the audio data
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioURL = URL.createObjectURL(audioBlob);

      // Create an HTML5 audio element and play the audio
      const audio = new Audio(audioURL);
      toast.success("Text to Speech is Playing");
      audio.play();
    } catch (error) {
      console.error('Error synthesizing speech:', error);
      toast.error("Failed to synthesize speech.");
    }
  };


  // Example usage within onInputSent function
  const onInputSent = async (input: string) => {
    const userInput = input.trim();
    try {
      toast.success("Sending Input...");
      setChatMessages(prevMessages => [...prevMessages, userInput]);
      const response = await axios.post('http://localhost:8000/chat/response?query=' + encodeURIComponent(userInput));
      setChatMessages(prevMessages => [...prevMessages, response.data.response]);
      console.log(response.data);

      // Convert and speak the first 50 words of the response
      speak(response.data.response);
      // Check if response.data.time_ms exists and set it
      if (response.data.time_ms) {
        setTimeMs(response.data.time_ms);
      }
      toast.success(`Agent replied`)
    } catch (error) {
      console.error('Error sending input:', error);
      toast.error("Failed to send Input. Try Again")
    }
  };


  return (
    <>

      <div className="h-screen flex flex-col">
        <Spotlight

          fill="#0099ff"
        />
        <div className='flex justify-center py-4'>
          <h1 className='text-5xl leading-relaxed tracking-wider font-extrabold'>AI Chat</h1>
        </div>
        <Chat chatData={chatMessages.map((message, index) => ({ isUser: index % 2 === 0, message }))} />
        <PromptBox onSubmitPressed={onInputSent} animatePrompt={animatePrompt} setAnimatePrompt={setAnimatePrompt} timeMs={timeMs} />
      </div>

    </>
  )
}

export default ChatPage