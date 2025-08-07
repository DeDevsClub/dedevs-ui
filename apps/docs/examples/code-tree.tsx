import { TreeProvider, Tree, TreeItem } from "@repo/code/tree";
import { Folder, FileText } from "lucide-react";

export const CodeTree = () => (
<TreeProvider className="w-full max-w-md">
    <Tree>
        <TreeItem nodeId="root" label="Project" icon={<Folder />} hasChildren>
            <TreeItem nodeId="src" label="src" icon={<Folder />} level={1} hasChildren>
                <TreeItem nodeId="components" label="components" icon={<Folder />} level={2} hasChildren>
                    <TreeItem nodeId="ui" label="ui" icon={<Folder />} level={3} hasChildren>
                        <TreeItem nodeId="button" label="button.tsx" icon={<FileText />} level={4} />
                        <TreeItem nodeId="tree" label="tree.tsx" icon={<FileText />} level={4} />
                    </TreeItem>
                </TreeItem>
            </TreeItem>
        </TreeItem>
    </Tree>
</TreeProvider>
);
