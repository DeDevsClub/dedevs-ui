'use client';

import { AIMessage, AIMessageAvatar, AIMessageContent } from '@repo/ai/message';
import { AIResponse } from '@repo/ai/response';
import { useEffect, useState } from 'react';

const assistantMessageTokens = [
  'To',
  ' get',
  ' the',
  ' **',
  'weather',
  ' in',
  ' Tokyo',
  '**',
  ' using',
  ' an',
  ' API',
  ' call',
  ',',
  ' you',
  ' can',
  ' use',
  ' the',
  ' [',
  'OpenWeatherMap',
  '](',
  'https://openweathermap.org/api',
  ')',
  ' API',
  '.',
  ' After',
  ' signing',
  ' up',
  ',',
  ' you',
  ' can',
  ' make',
  ' a',
  ' request',
  ' to',
  ' their',
  ' API',
  ':',
  '\n\n',
  '```',
  'bash',
  '\n',
  'curl',
  ' -X',
  ' GET',
  ' "https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=YOUR_API_KEY"',
  ' \\',
  '\n',
  '  --header',
  ' "Content-Type:',
  ' application/json"',
  ' \\',
  '\n',
  '  --header',
  ' "Accept:',
  ' application/json"',
  '\n',
  '```',
  '\n\n',
  'This',
  ' will',
  ' return',
  ' a',
  ' JSON',
  ' object',
  ' with',
  ' the',
  ' weather',
  ' data',
  ' for',
  ' Tokyo',
  '.',
];

const Example = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    let currentContent = '';
    let index = 0;

    const interval = setInterval(() => {
      if (index < assistantMessageTokens.length) {
        currentContent += assistantMessageTokens[index];
        setContent(currentContent);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AIMessage from="user">
        <AIMessageContent>
          <AIResponse>What is the weather in Houston?</AIResponse>
        </AIMessageContent>
        <AIMessageAvatar
          name="Val Alexander"
          src="https://github.com/bunsdev.png"
        />
      </AIMessage>
      <AIMessage from="assistant">
        <AIMessageContent>
          <AIResponse>{content}</AIResponse>
        </AIMessageContent>
        <AIMessageAvatar
          name="DeSwarm"
          src="https://github.com/fundventures.png"
        />
      </AIMessage>
    </>
  );
};

export default Example;
