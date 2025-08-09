"use client";

import { TreeProvider, Tree, TreeItem } from "@repo/code/tree";
import { Database, FileText, Folder, Image, Music, Users, Video } from "lucide-react";

const treeData = [
  {
    id: "documents",
    label: "Documents",
    icon: <Folder />,
    children: [
      {
        id: "projects",
        label: "Projects",
        icon: <Folder />,
        children: [
          {
            id: "project1",
            label: "Project 1",
            icon: <Folder />,
            children: [
              { id: "readme", label: "README.md", icon: <FileText /> },
              { id: "index", label: "index.tsx", icon: <FileText /> },
            ],
          },
        ],
      },
      {
        id: "images",
        label: "Images",
        icon: <Folder />,
        children: [
          { id: "logo", label: "logo.png", icon: <Image /> },
          { id: "banner", label: "banner.jpg", icon: <Image /> },
        ],
      },
    ],
  },
  {
    id: "media",
    label: "Media",
    icon: <Folder />,
    children: [
      {
        id: "videos",
        label: "Videos",
        icon: <Video />,
        children: [
          { id: "video1", label: "intro.mp4", icon: <Video /> },
          { id: "video2", label: "demo.mp4", icon: <Video /> },
        ],
      },
      {
        id: "audio",
        label: "Audio",
        icon: <Music />,
        children: [{ id: "audio1", label: "song.mp3", icon: <Music /> }],
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Users />,
    children: [
      {
        id: "database",
        label: "Database",
        icon: <Database />,
        children: [{ id: "config", label: "config.json", icon: <FileText /> }],
      },
    ],
  },
];

function buildTreeItems(nodes: any[], level = 0, parentPath: boolean[] = []) {
  return nodes.map((node, index) => {
    const isLast = index === nodes.length - 1;
    const hasChildren = (node.children?.length ?? 0) > 0;

    return (
      <TreeItem
        key={node.id}
        nodeId={node.id}
        label={node.label}
        icon={node.icon}
        level={level}
        isLast={isLast}
        parentPath={parentPath}
        hasChildren={hasChildren}
      >
        {hasChildren && buildTreeItems(node.children, level + 1, [...parentPath, isLast])}
      </TreeItem>
    );
  });
}

const CodeTreeExample = () => {
  return (
    <div className="w-full max-w-full h-full flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <TreeProvider>
        <Tree>{buildTreeItems(treeData)}</Tree>
      </TreeProvider>
    </div>
  );
};

export default CodeTreeExample;
