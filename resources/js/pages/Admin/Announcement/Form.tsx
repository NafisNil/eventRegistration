import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AnnouncementFormProps {
  initialData?: {
    title?: string;

    description?: string;

  };
  submitLabel?: string;
  processing?: boolean;
  onSubmit: (payload: FormData) => void;
}

export default function AnnouncementForm({
  initialData,
  submitLabel = 'Save Announcement',
  processing = false,
  onSubmit,
}: AnnouncementFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');

  const [description, setDescription] = useState(initialData?.description ?? '');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('title', title.trim());
    formData.append('description', description.trim());

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Announcement title"
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>





        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description" className="block text-sm font-medium text-slate-700">
            Description
          </Label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe this session"
            rows={4}
            className="w-full rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-emerald-200"
          />
        </div>

      </div>

      <div className="flex items-center justify-end">
        <Button type="submit" disabled={processing} className="bg-emerald-700 text-white hover:bg-emerald-800">
          {processing ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
