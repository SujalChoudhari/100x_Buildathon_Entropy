"use client";  
import React, { useEffect, useState } from 'react'
import ChatArea from '@/components/chat';
import PromptBox from '@/components/PromptBox';
import axios from 'axios';
import Chat from '@/components/chat';

function page() {

  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [animatePrompt, setAnimatePrompt] = useState(false);
  const [browserURL, setBrowserURL] = useState("");
  const [timeMs, setTimeMs] = useState(null);


  const speak = async (text: string, wordsToConvert: number = 50) => {
    // Split the text into words
    const words = text.split(' ');
    // Take the first N words
    const wordsToSpeak = words.slice(0, wordsToConvert).join(' ');

    // Check if the SpeechSynthesis API is available
    if ('speechSynthesis' in window) {
      // Create a new SpeechSynthesisUtterance instance
      const utterance = new SpeechSynthesisUtterance(wordsToSpeak);

      // Set the voice and language
      // Note: You might need to select a voice that matches the language of your text
      // This is just an example, you might want to set it dynamically based on your application's needs
      utterance.lang = 'en-US';

      // Speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('SpeechSynthesis API is not supported in this browser.');
    }
  };

  // Example usage within onInputSent function
  const onInputSent = async (input: string) => {
    const command = input.trim();
    try {
      const response = await axios.get(`http://127.0.0.1:80/chat/chat?message=${encodeURIComponent(command)}`);
      setChatMessages(prevMessages => [...prevMessages, command, response.data.response]);
      console.log(response.data);

      // Convert and speak the first 50 words of the response
      speak(response.data.response, 50);

      if (response.data.browser_url) {
        setBrowserURL(response.data.browser_url);
      }
      // Check if response.data.time_ms exists and set it
      if (response.data.time_ms) {
        setTimeMs(response.data.time_ms);
      }
      //   toast.success(`Successful interaction: ${timeMs}ms`)
    } catch (error) {
      //   console.error('Error sending input:', error);
      //   toast.error("Failed to send Input. Try Again")
    }
  };


  useEffect(() => {
    const resetChat = async () => {
      try {
        await axios.get("http://127.0.0.1:80/chat/init");
      } catch (error) {
        console.error('Error resetting chat:', error);
        // Handle error (if required)
      }
    };
    resetChat();

  }, []);


  return (
    <div>
      <Chat chatData={chatMessages.map((message, index) => ({ isUser: index % 2 === 0, message }))} />
      <PromptBox onSubmitPressed={onInputSent} animatePrompt={animatePrompt} setAnimatePrompt={setAnimatePrompt} timeMs={timeMs} />


    </div>
  )
}

export default Chat