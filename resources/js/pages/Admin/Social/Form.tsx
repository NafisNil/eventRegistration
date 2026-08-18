import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SocialMediaFormProps {
  initialData?: {
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
  };
  submitLabel?: string;
  processing?: boolean;
  onSubmit: (payload: FormData) => void;
}

export default function SocialMediaForm({
  initialData,
  submitLabel = 'Save Social Media',
  processing = false,
  onSubmit,
}: SocialMediaFormProps) {
  const [facebook, setFacebook] = useState(initialData?.facebook ?? '');
  const [linkedin, setLinkedin] = useState(initialData?.linkedin ?? '');
  const [youtube, setYoutube] = useState(initialData?.youtube ?? '');
  const [twitter, setTwitter] = useState(initialData?.twitter ?? '');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('facebook', facebook.trim());
    formData.append('linkedin', linkedin.trim());
    formData.append('youtube', youtube.trim());
    formData.append('twitter', twitter.trim());

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="facebook" className="block text-sm font-medium text-slate-700">
            Facebook
          </Label>
          <Input
            id="facebook"
            name="facebook"
            type="url"
            value={facebook}
            onChange={(event) => setFacebook(event.target.value)}
            placeholder="https://facebook.com/..."
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="linkedin" className="block text-sm font-medium text-slate-700">
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            name="linkedin"
            type="url"
            value={linkedin}
            onChange={(event) => setLinkedin(event.target.value)}
            placeholder="https://linkedin.com/in/..."
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="youtube" className="block text-sm font-medium text-slate-700">
            YouTube
          </Label>
          <Input
            id="youtube"
            name="youtube"
            type="url"
            value={youtube}
            onChange={(event) => setYoutube(event.target.value)}
            placeholder="https://youtube.com/..."
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="twitter" className="block text-sm font-medium text-slate-700">
            Twitter
          </Label>
          <Input
            id="twitter"
            name="twitter"
            type="url"
            value={twitter}
            onChange={(event) => setTwitter(event.target.value)}
            placeholder="https://x.com/..."
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
