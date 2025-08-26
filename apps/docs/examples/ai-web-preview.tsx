"use client";

import { ChevronLeft, ChevronRight, RotateCcw, Terminal } from "lucide-react";
import {
  AIWebPreview,
  AIWebPreviewBody,
  AIWebPreviewConsole,
  AIWebPreviewNavigation,
  AIWebPreviewNavigationButton,
  AIWebPreviewUrl,
} from "@repo/ai/web-preview";

export default function Example() {
  return (
    <AIWebPreview defaultUrl="https://example.com">
      <AIWebPreviewNavigation>
        <AIWebPreviewNavigationButton tooltip="Back" disabled>
          <ChevronLeft className="h-4 w-4" />
        </AIWebPreviewNavigationButton>
        <AIWebPreviewNavigationButton tooltip="Forward" disabled>
          <ChevronRight className="h-4 w-4" />
        </AIWebPreviewNavigationButton>
        <AIWebPreviewNavigationButton tooltip="Reload" onClick={() => location.reload()}>
          <RotateCcw className="h-4 w-4" />
        </AIWebPreviewNavigationButton>
        <div className="mx-2 flex-1">
          <AIWebPreviewUrl />
        </div>
        <AIWebPreviewNavigationButton tooltip="Console" onClick={() => {}}>
          <Terminal className="h-4 w-4" />
        </AIWebPreviewNavigationButton>
      </AIWebPreviewNavigation>
      <AIWebPreviewBody />
      <AIWebPreviewConsole />
    </AIWebPreview>
  );
}
