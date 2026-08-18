import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PartnershipCategoryFormProps {
  initialData?: {
    name?: string;

  };
  submitLabel?: string;
  processing?: boolean;
  onSubmit: (payload: FormData) => void;
}

export default function PartnershipCategoryForm({
  initialData,
  submitLabel = 'Save Partnership Category',
  processing = false,
  onSubmit,
}: PartnershipCategoryFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name.trim());

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Partnership Name"
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
