'use client';

import { SimpleAI } from '@repo/ai/simple';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Code } from 'lucide-react';

const Example = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Basic Usage */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Basic AI Simple Component
            </CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Lightweight
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <SimpleAI />
        </CardContent>
      </Card>

      {/* With Custom Content */}
      <Card>
        <CardHeader>
          <CardTitle>With Custom Content</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleAI>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                This AI component has been customized with additional content 
                to demonstrate its flexibility.
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => console.log("Custom action")}>
                  Custom Action
                </Button>
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </SimpleAI>
        </CardContent>
      </Card>

      {/* Multiple Instances */}
      <Card>
        <CardHeader>
          <CardTitle>Multiple AI Instances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SimpleAI>
              <div className="text-center">
                <h4 className="font-semibold mb-2">AI Assistant #1</h4>
                <p className="text-sm text-muted-foreground">
                  Specialized for coding tasks
                </p>
                <Code className="w-8 h-8 mx-auto mt-2 text-blue-500" />
              </div>
            </SimpleAI>
            <SimpleAI>
              <div className="text-center">
                <h4 className="font-semibold mb-2">AI Assistant #2</h4>
                <p className="text-sm text-muted-foreground">
                  Specialized for writing tasks
                </p>
                <Sparkles className="w-8 h-8 mx-auto mt-2 text-purple-500" />
              </div>
            </SimpleAI>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Common Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Code className="w-4 h-4" />
                Prototyping
              </h4>
              <SimpleAI>
                <p className="text-xs text-muted-foreground">
                  Quick mockup for AI interface
                </p>
              </SimpleAI>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Education
              </h4>
              <SimpleAI>
                <p className="text-xs text-muted-foreground">
                  Teaching AI concepts
                </p>
              </SimpleAI>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Demos
              </h4>
              <SimpleAI>
                <p className="text-xs text-muted-foreground">
                  Simple presentations
                </p>
              </SimpleAI>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customization Example */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Customization</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleAI>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <h4 className="font-semibold">Enhanced AI Interface</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                This example shows how the Simple AI component can be enhanced 
                with custom styling, icons, and interactive elements while 
                maintaining its lightweight nature.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Lightweight</Badge>
                <Badge variant="outline">Customizable</Badge>
                <Badge variant="outline">Accessible</Badge>
              </div>
              <div className="pt-2 border-t">
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => console.log("Enhanced AI action")}
                >
                  Enhanced AI Action
                </Button>
              </div>
            </div>
          </SimpleAI>
        </CardContent>
      </Card>
    </div>
  );
};

export default Example;
