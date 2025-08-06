'use client';

import {
  CodeSnippet,
  CodeSnippetCopyButton,
  CodeSnippetHeader,
  CodeSnippetTabsContent,
  CodeSnippetTabsList,
  CodeSnippetTabsTrigger,
} from '@repo/code';
import { track } from '@vercel/analytics/react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import dedevs from '../public/dedevs.svg';
import shadcn from '../public/shadcn.svg';

type InstallerProps = {
  packageName: string;
};

export const Installer = ({ packageName }: InstallerProps) => {
  const [value, setValue] = useState('dedevs');

  const commands = {
    'dedevs': {
      image: dedevs,
      code: `npx dedevs-ui@latest add ${packageName}`,
    },
    shadcn: {
      image: shadcn,
      code: `npx shadcn@latest add https://ui.dedevs.com/r/${packageName}.json`,
    },
  };

  return (
    <CodeSnippet
      className="not-prose shiki shiki-themes github-light github-dark"
      onValueChange={setValue}
      value={value}
    >
      <CodeSnippetHeader>
        <CodeSnippetTabsList>
          {Object.entries(commands).map(([key, command]) => (
            <CodeSnippetTabsTrigger key={key} value={key}>
              <Image
                alt=""
                className="dark:invert"
                height={14}
                src={command.image}
                width={14}
              />
              {key}
            </CodeSnippetTabsTrigger>
          ))}
        </CodeSnippetTabsList>
        <CodeSnippetCopyButton
          onCopy={() => {
            toast.success('Copied to clipboard');
            track('Copy installer code', {
              cli: value,
              package: packageName,
            });
          }}
          onError={() => toast.error('Failed to copy to clipboard')}
          value={commands[value as keyof typeof commands].code}
        />
      </CodeSnippetHeader>
      {Object.entries(commands).map(([key, command]) => (
        <CodeSnippetTabsContent key={key} value={key}>
          {command.code}
        </CodeSnippetTabsContent>
      ))}
    </CodeSnippet>
  );
};
