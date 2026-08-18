import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ScheduleFormProps {
  initialData?: {
    time?: string;
    badge?: string;
    title?: string;
    description?: string;
    location?: string;
    keynote_speaker?: string;
  };
  submitLabel?: string;
  processing?: boolean;
  onSubmit: (payload: FormData) => void;
}

export default function ScheduleForm({
  initialData,
  submitLabel = 'Save Schedule',
  processing = false,
  onSubmit,
}: ScheduleFormProps) {
  const [time, setTime] = useState(initialData?.time ?? '');
  const [badge, setBadge] = useState(initialData?.badge ?? '');
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [location, setLocation] = useState(initialData?.location ?? '');
  const [keynoteSpeaker, setKeynoteSpeaker] = useState(initialData?.keynote_speaker ?? '');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('time', time.trim());
    formData.append('badge', badge.trim());
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('location', location.trim());
    formData.append('keynote_speaker', keynoteSpeaker.trim());

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="time" className="block text-sm font-medium text-slate-700">
            Time
          </Label>
          <Input
            id="time"
            name="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            placeholder="e.g. 09:00 AM"
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="badge" className="block text-sm font-medium text-slate-700">
            Badge
          </Label>
          <Input
            id="badge"
            name="badge"
            value={badge}
            onChange={(event) => setBadge(event.target.value)}
            placeholder="e.g. Keynote"
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Schedule title"
            required
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

        <div className="space-y-2">
          <Label htmlFor="location" className="block text-sm font-medium text-slate-700">
            Location
          </Label>
          <Input
            id="location"
            name="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="e.g. Main Hall"
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keynote_speaker" className="block text-sm font-medium text-slate-700">
            Keynote Speaker
          </Label>
          <Input
            id="keynote_speaker"
            name="keynote_speaker"
            value={keynoteSpeaker}
            onChange={(event) => setKeynoteSpeaker(event.target.value)}
            placeholder="e.g. Jane Smith"
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
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
