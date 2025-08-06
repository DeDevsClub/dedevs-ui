'use client';

import {
  CodeSnippet,
  CodeSnippetCopyButton,
  CodeSnippetHeader,
  CodeSnippetTabsContent,
  CodeSnippetTabsList,
  CodeSnippetTabsTrigger,
} from '@repo/code';
import { useState } from 'react';

const commands = [
  {
    label: 'npm',
    code: 'npx next-forge@latest init',
  },
  {
    label: 'yarn',
    code: 'yarn dlx next-forge@latest init',
  },
  {
    label: 'pnpm',
    code: 'pnpx next-forge@latest init',
  },
  {
    label: 'bun',
    code: 'bunx next-forge@latest init',
  },
];

const Example = () => {
  const [value, setValue] = useState(commands[0].label);
  const activeCommand = commands.find((command) => command.label === value);

  return (
    <CodeSnippet onValueChange={setValue} value={value}>
      <CodeSnippetHeader>
        <CodeSnippetTabsList>
          {commands.map((command) => (
            <CodeSnippetTabsTrigger key={command.label} value={command.label}>
              {command.label}
            </CodeSnippetTabsTrigger>
          ))}
        </CodeSnippetTabsList>
        {activeCommand && (
          <CodeSnippetCopyButton
            onCopy={() =>
              console.log(`Copied "${activeCommand.code}" to clipboard`)
            }
            onError={() =>
              console.error(
                `Failed to copy "${activeCommand.code}" to clipboard`
              )
            }
            value={activeCommand.code}
          />
        )}
      </CodeSnippetHeader>
      {commands.map((command) => (
        <CodeSnippetTabsContent key={command.label} value={command.label}>
          {command.code}
        </CodeSnippetTabsContent>
      ))}
    </CodeSnippet>
  );
};

export default Example;
