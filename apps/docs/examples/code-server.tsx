'use client';

import { CodeBlockContent } from '@repo/code/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Server, Zap, Code, Palette } from 'lucide-react';

const Example = () => {
  const javascriptCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example usage
console.log(fibonacci(10)); // Output: 55`;

  const pythonCode = `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)

# Example usage
numbers = [3, 6, 8, 10, 1, 2, 1]
sorted_numbers = quicksort(numbers)
print(sorted_numbers)`;

  const typescriptCode = `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserService {
  private users: User[] = [];

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      id: Date.now(),
      ...userData
    };
    
    this.users.push(newUser);
    return newUser;
  }

  findUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}`;

  const cssCode = `.code-block {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.code-block::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
}

.syntax-highlight {
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}`;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Code Server Component
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Server-Side
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Code className="w-3 h-3" />
                Shiki Powered
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Server-side code highlighting with Shiki for optimal performance and zero client-side JavaScript.
          </p>
        </CardContent>
      </Card>

      {/* Language Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Multiple Language Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="javascript" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
            </TabsList>
            
            <TabsContent value="javascript" className="mt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">JavaScript</Badge>
                  <Badge variant="secondary">github-dark</Badge>
                </div>
                <CodeBlockContent
                  language="javascript"
                  themes={{ dark: 'github-dark', light: 'github-light' }}
                  className="rounded-lg"
                >
                  {javascriptCode}
                </CodeBlockContent>
              </div>
            </TabsContent>
            
            <TabsContent value="python" className="mt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="secondary">dracula</Badge>
                </div>
                <CodeBlockContent
                  language="python"
                  themes={{ dark: 'dracula', light: 'github-light' }}
                  className="rounded-lg"
                >
                  {pythonCode}
                </CodeBlockContent>
              </div>
            </TabsContent>
            
            <TabsContent value="typescript" className="mt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="secondary">monokai</Badge>
                </div>
                <CodeBlockContent
                  language="typescript"
                  themes={{ dark: 'monokai', light: 'github-light' }}
                  className="rounded-lg"
                >
                  {typescriptCode}
                </CodeBlockContent>
              </div>
            </TabsContent>
            
            <TabsContent value="css" className="mt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">CSS</Badge>
                  <Badge variant="secondary">github-light</Badge>
                </div>
                <CodeBlockContent
                  language="css"
                  themes={{ dark: 'github-dark', light: 'github-light' }}
                  className="rounded-lg"
                >
                  {cssCode}
                </CodeBlockContent>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Theme Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Theme Variations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">GitHub Dark</Badge>
              </div>
              <CodeBlockContent
                language="javascript"
                themes={{ dark: 'github-dark', light: 'github-light' }}
                className="rounded-lg"
              >
                {`const theme = "github-dark";
console.log("Dark theme example");`}
              </CodeBlockContent>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">GitHub Light</Badge>
              </div>
              <CodeBlockContent
                language="javascript"
                themes={{ dark: 'github-dark', light: 'github-light' }}
                className="rounded-lg"
              >
                {`const theme = "github-light";
console.log("Light theme example");`}
              </CodeBlockContent>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-4 h-4 text-blue-500" />
                <h4 className="font-semibold">Server-Side</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Code highlighting happens on the server for better performance and SEO.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <h4 className="font-semibold">Zero Client JS</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                No JavaScript required on the client side, reducing bundle size.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-green-500" />
                <h4 className="font-semibold">100+ Languages</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Support for all major programming languages and file formats.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">✓ Faster Initial Load</h4>
              <p className="text-sm text-green-700">
                Pre-rendered syntax highlighting eliminates client-side processing time.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">✓ Better SEO</h4>
              <p className="text-sm text-blue-700">
                Search engines can index and understand highlighted code content.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">✓ Reduced Bundle Size</h4>
              <p className="text-sm text-purple-700">
                No need for client-side highlighting libraries like Prism.js or highlight.js.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Example;
