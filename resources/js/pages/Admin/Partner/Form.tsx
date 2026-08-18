import { useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PartnershipCategory {
  id: number;
  name: string;
}

interface PartnerFormProps {
  initialData?: {
    name?: string;
    partnership_category_id?: number | null;
    logo?: string | null;
  };
  categories?: PartnershipCategory[];
  submitLabel?: string;
  processing?: boolean;
  onSubmit: (payload: FormData) => void;
}

export default function PartnerForm({
  initialData,
  categories = [],
  submitLabel = 'Save Partner',
  processing = false,
  onSubmit,
}: PartnerFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [partnershipCategoryId, setPartnershipCategoryId] = useState<number | ''>(
    initialData?.partnership_category_id ?? '',
  );
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
    formData.append('partnership_category_id', String(partnershipCategoryId));

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
            placeholder="Partner name"
            required
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="partnership_category_id" className="block text-sm font-medium text-slate-700">
            Category
          </Label>
          <select
            id="partnership_category_id"
            name="partnership_category_id"
            value={partnershipCategoryId}
            onChange={(event) => setPartnershipCategoryId(event.target.value ? Number(event.target.value) : '')}
            required
            className="w-full rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:ring-2 focus:ring-emerald-200"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo" className="block text-sm font-medium text-slate-700">
            Logo image
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
                alt="Partner preview"
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
