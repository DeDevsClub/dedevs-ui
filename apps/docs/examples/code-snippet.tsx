'use client';

import {
  CodeSnippet,
  CodeSnippetCopyButton,
  CodeSnippetHeader,
  CodeSnippetTabsContent,
  CodeSnippetTabsList,
  CodeSnippetTabsTrigger,
} from '@repo/code/snippet';
import { BoxIcon, Code2Icon } from 'lucide-react';
import { useState } from 'react';

const commands = [
  {
    label: 'dedevs-ui',
    icon: Code2Icon,
    code: 'npx dedevs-ui@latest add snippet',
  },
  {
    label: 'shadcn',
    icon: BoxIcon,
    code: 'npx shadcn@latest add https://ui.dedevs.com/r/snippet.json',
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
              <command.icon size={14} />
              <span>{command.label}</span>
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
