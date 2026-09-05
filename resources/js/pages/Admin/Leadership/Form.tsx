import { useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LeadershipFormProps {
  initialData?: {
    name?: string;
    role?: string | null;
    ministry?: string | null;
    logo?: string | null;
  };
  submitLabel?: string;
  processing?: boolean;
  onSubmit: (payload: FormData) => void;
}

export default function LeadershipForm({
  initialData,
  submitLabel = 'Save Leadership',
  processing = false,
  onSubmit,
}: LeadershipFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [role, setRole] = useState(initialData?.role ?? '');
  const [ministry, setMinistry] = useState(initialData?.ministry ?? '');
  const [logo, setLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.logo ?? null);

  const currentPreview = useMemo(() => {
    if (logo) {
      return URL.createObjectURL(logo);
    }

    return previewUrl;
  }, [logo, previewUrl]);

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setLogo(file);

    if (!file) {
      setPreviewUrl(initialData?.logo ?? null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('role', role.trim());
    formData.append('ministry', ministry.trim());

    if (logo) {
      formData.append('logo', logo);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Leadership name"
            required
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="block text-sm font-medium text-slate-700">
            Role
          </Label>
          <Input
            id="role"
            name="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            placeholder="e.g. Honourable Minister"
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ministry" className="block text-sm font-medium text-slate-700">
            Ministry
          </Label>
          <textarea
            id="ministry"
            name="ministry"
            value={ministry}
            onChange={(event) => setMinistry(event.target.value)}
            rows={4}
            placeholder="Ministry details"
            className="w-full rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo" className="block text-sm font-medium text-slate-700">
            Photo
          </Label>

          <Input
            id="logo"
            name="logo"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="cursor-pointer border-emerald-200 text-black focus-visible:ring-emerald-200"
          />

          {currentPreview && (
            <div className="mt-3 overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
              <img
                src={currentPreview.startsWith('blob:') ? currentPreview : `/storage/${currentPreview}`}
                alt="Leadership preview"
                className="h-40 w-40 rounded-lg object-cover"
              />
            </div>
          )}
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
