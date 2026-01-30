"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function AdvancedDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>فتح نافذة متقدمة</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>نافذة متقدمة</DialogTitle>
        <div className="mt-4">
          <p>هذا مثال على نافذة حوارية متقدمة باستخدام Radix UI.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AdvancedDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">القائمة المنسدلة</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>الخيار 1</DropdownMenuItem>
        <DropdownMenuItem>الخيار 2</DropdownMenuItem>
        <DropdownMenuItem>الخيار 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AdvancedTabs() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">التبويب 1</TabsTrigger>
        <TabsTrigger value="tab2">التبويب 2</TabsTrigger>
        <TabsTrigger value="tab3">التبويب 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-2">محتوى التبويب الأول</h3>
          <p>محتوى تفاعلي للتبويب الأول.</p>
        </Card>
      </TabsContent>
      <TabsContent value="tab2">
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-2">محتوى التبويب الثاني</h3>
          <p>محتوى تفاعلي للتبويب الثاني.</p>
        </Card>
      </TabsContent>
      <TabsContent value="tab3">
        <Card className="p-4">
          <h3 className="text-lg font-bold mb-2">محتوى التبويب الثالث</h3>
          <p>محتوى تفاعلي للتبويب الثالث.</p>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
