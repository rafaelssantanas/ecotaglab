"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Activity, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TagMonitor() {
  const [events, setEvents] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEvent = (e: any) => {
      setEvents(prev => [e.detail, ...prev].slice(0, 50));
    };

    window.addEventListener('app:tag-event' as any, handleEvent);
    return () => window.removeEventListener('app:tag-event' as any, handleEvent);
  }, []);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full shadow-2xl z-[100] h-12 w-12 p-0"
        variant="primary"
      >
        <Activity className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-96 shadow-2xl z-[100] border-primary/20 flex flex-col overflow-hidden">
      <CardHeader className="p-3 bg-primary text-primary-foreground flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-headline">Tag Event Monitor</CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 hover:bg-white/20 text-white" 
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-full p-3">
          {events.length === 0 ? (
            <div className="text-xs text-muted-foreground text-center py-10 italic">
              No events fired yet...
            </div>
          ) : (
            <div className="space-y-2">
              {events.map((ev, idx) => (
                <div key={idx} className="p-2 bg-muted rounded border text-[10px] font-mono whitespace-pre-wrap break-all relative group">
                  <Badge variant="outline" className="mb-1 text-[8px] h-4 px-1 border-primary/40 bg-white">
                    {ev.event}
                  </Badge>
                  <pre className="mt-1 leading-tight overflow-x-auto">
                    {JSON.stringify(ev.ecommerce || ev, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}