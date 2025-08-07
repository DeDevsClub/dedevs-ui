'use client';

import { AIResponse } from '@repo/ai/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Zap, Globe } from 'lucide-react';

const Example = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Server Component Demo */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Server-Side AI Response
            </CardTitle>
            <div className="flex items-center gap-1">
              <Badge variant="secondary">SSR Optimized</Badge>
              <Zap className="w-3 h-3 text-yellow-500" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6 bg-gray-50 ai-response-demo">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Welcome to AI Server Component
              </h3>
              <p className="text-gray-700 leading-relaxed">
                This AI Response component is optimized for server-side rendering, 
                providing better performance and SEO benefits. It renders content 
                on the server before sending it to the client.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-white rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-2">Performance Benefits</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Faster initial page load</li>
                    <li>• Reduced client bundle size</li>
                    <li>• Better Core Web Vitals</li>
                  </ul>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-2">SEO Advantages</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Search engine crawlable</li>
                    <li>• Social media previews</li>
                    <li>• Better indexing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Common Use Cases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Static AI Content</h4>
              <p className="text-sm text-gray-600">
                Pre-generated AI responses for documentation, FAQs, and help content.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">SEO Pages</h4>
              <p className="text-sm text-gray-600">
                AI-powered landing pages and marketing content that needs to be crawled.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Blog Posts</h4>
              <p className="text-sm text-gray-600">
                AI-assisted content creation for blogs and articles with proper SEO.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Example */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Example</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 p-6 rounded-lg ai-response-demo">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Server Component</Badge>
                <span className="text-sm text-gray-600">Rendered on server</span>
              </div>
              <div className="prose prose-sm max-w-none">
                <h4>AI-Generated Content Example</h4>
                <p>
                  This content represents what an AI might generate for a user query. 
                  Since it's rendered on the server, it's immediately available when 
                  the page loads, improving perceived performance and enabling search 
                  engines to index the content.
                </p>
                <blockquote className="border-l-4 border-blue-500 pl-4 italic">
                  "Server-side rendering ensures that AI-generated content is 
                  immediately visible to users and search engines alike."
                </blockquote>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Example;
