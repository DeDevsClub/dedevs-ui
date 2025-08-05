'use client';

import { AIMessage, AIMessageAvatar, AIMessageContent } from '@repo/ai/message';

const messages: {
  from: 'user' | 'assistant';
  content: string;
  avatar: string;
  name: string;
}[] = [
  {
    from: 'user',
    content: 'Hello, how are you?',
    avatar: 'https://github.com/bunsdev.png',
    name: 'Val Alexander',
  },
  {
    from: 'assistant',
    content: 'I am fine, thank you!',
    avatar: 'https://github.com/openai.png',
    name: 'OpenAI',
  },
  {
    from: 'user',
    content: 'What is the weather in Houston?',
    avatar: 'https://github.com/bunsdev.png',
    name: 'Val Alexander',
  },
  {
    from: 'assistant',
    content:
      'We are DeSwarm. We are Legion. We do not forgive. We do not forget. Expect us.',
    avatar: 'https://github.com/fundventures.png',
    name: 'DeSwarm',
  },
];

const Example = () => (
  <>
    {messages.map(({ content, ...message }, index) => (
      <AIMessage from={message.from} key={index}>
        <AIMessageContent>{content}</AIMessageContent>
        <AIMessageAvatar name={message.name} src={message.avatar} />
      </AIMessage>
    ))}
  </>
);

export default Example;
