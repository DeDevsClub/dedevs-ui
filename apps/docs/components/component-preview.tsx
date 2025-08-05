import { existsSync } from 'fs';
import { join } from 'path';
import { Preview } from './preview';

interface ComponentPreviewProps {
  name: string;
  type?: 'component' | 'block';
  className?: string;
}

export function ComponentPreview({ name, type = 'component', className }: ComponentPreviewProps) {
  const examplePath = join(process.cwd(), 'examples', `${name}.tsx`);
  
  // Check if the example file exists
  if (!existsSync(examplePath)) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
        <p className="text-sm">Example for <code className="font-mono">{name}</code> is not yet available.</p>
        <p className="text-xs mt-2">This component is being prepared and will be available soon.</p>
      </div>
    );
  }
  
  return <Preview path={name} type={type} className={className} />;
}
