import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { PreviewSource } from './source'

interface SourcePreviewProps {
  name: string
}

// Server component: loads the example source file and renders it using the client PreviewSource
export async function SourcePreview({ name }: SourcePreviewProps) {
  // Keep the path convention consistent with other preview utilities
  // e.g., ComponentPreview checks in `examples/<name>.tsx`
  const examplePath = join(process.cwd(), 'examples', `${name}.tsx`)

  if (!existsSync(examplePath)) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
        <p className="text-sm">
          Source for <code className="font-mono">{name}</code> is not yet available.
        </p>
        <p className="text-xs mt-2">This example is being prepared and will be available soon.</p>
      </div>
    )
  }

  const content = await readFile(examplePath, 'utf8')

  return (
    <PreviewSource
      source={[
        {
          name: `${name}.tsx`,
          source: content,
        },
      ]}
    />
  )
}

// TODO