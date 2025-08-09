import { notFound } from 'next/navigation'
import React from 'react'

type PageProps = {
  params: { name: string }
}

async function loadExample(name: string) {
  try {
    // Dynamically import example component from apps/docs/examples/<name>.tsx
    const mod = await import(`@/examples/${name}`)
    return mod?.default as React.ComponentType | undefined
  } catch (err) {
    return undefined
  }
}

export default async function Page({ params }: PageProps) {
  const { name } = params
  const Example = await loadExample(name)

  if (!Example) {
    notFound()
  }

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Render the standalone example full-screen */}
      <Example />
    </div>
  )
}