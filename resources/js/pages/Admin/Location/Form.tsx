import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { FontSize } from '@/components/Admin/Extensions/FontSize';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LocationFormProps {
  initialData?: {
    address?: string;
    phone?: string;
    email?: string;
    map?: string | null;
  };
  submitLabel?: string;
  processing?: boolean;
  onSubmit: (payload: FormData) => void;
}

const fontSizeOptions = ['12px', '14px', '16px', '18px', '20px', '24px', '32px'];

const hasRichTextContent = (value: string) => value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0;

export default function LocationForm({
  initialData,
  submitLabel = 'Save Location',
  processing = false,
  onSubmit,
}: LocationFormProps) {
  const [address, setAddress] = useState(initialData?.address ?? '');
  const [phone, setPhone] = useState(initialData?.phone ?? '');
  const [email, setEmail] = useState(initialData?.email ?? '');
  const [map, setMap] = useState(initialData?.map ?? '');

  const addressEditor = useEditor({
    extensions: [StarterKit, TextStyle, Color, FontSize],
    content: address || '<p></p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-emerald max-w-none min-h-36 w-full rounded-xl bg-emerald-50/40 p-3 text-sm text-slate-800 outline-none transition focus:outline-none focus:ring-2 focus:ring-emerald-200',
      },
    },
    onUpdate: ({ editor }) => {
      setAddress(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!addressEditor) return;

    const currentHtml = addressEditor.getHTML();

    if (currentHtml !== address) {
      addressEditor.commands.setContent(address || '<p></p>', { emitUpdate: false });
    }
  }, [address, addressEditor]);

  const renderToolbar = (editor: ReturnType<typeof useEditor> | null, fieldId: string) => {
    if (!editor) {
      return null;
    }

    return (
      <div className="rounded-t-xl border border-emerald-200 bg-emerald-50/60 p-2 text-slate-700">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`rounded px-2 py-1 text-xs font-bold transition ${
              editor.isActive('bold') ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-100'
            }`}
          >
            B
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`rounded px-2 py-1 text-xs font-semibold italic transition ${
              editor.isActive('italic') ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-100'
            }`}
          >
            I
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`rounded px-2 py-1 text-xs font-bold transition ${
              editor.isActive('heading', { level: 2 }) ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-100'
            }`}
          >
            H2
          </button>

          <div className="h-4 w-px bg-emerald-200" />

          <select
            value={editor.getAttributes('textStyle').fontSize || ''}
            onChange={(event) => {
              const value = event.target.value;

              if (!value) {
                editor.chain().focus().unsetFontSize().run();
                return;
              }

              editor.chain().focus().setFontSize(value).run();
            }}
            className="rounded border border-emerald-200 bg-white px-2 py-1 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-emerald-200"
            aria-label="Text size"
          >
            <option value="">Size</option>
            {fontSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <div className="flex items-center space-x-1">
            <label htmlFor={`textColor-${fieldId}`} className="text-xs font-medium text-slate-600">
              Color
            </label>
            <input
              id={`textColor-${fieldId}`}
              type="color"
              onInput={(event) => editor.chain().focus().setColor(event.currentTarget.value).run()}
              value={editor.getAttributes('textStyle').color || '#000000'}
              className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-b-xl border border-emerald-200 bg-white">
          <EditorContent editor={editor} />
        </div>
      </div>
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    if (hasRichTextContent(address)) {
      formData.append('address', address);
    }

    if (phone.trim()) {
      formData.append('phone', phone.trim());
    }

    if (email.trim()) {
      formData.append('email', email.trim());
    }

    if (map.trim()) {
      formData.append('map', map.trim());
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address" className="block text-sm font-medium text-slate-700">
            Address
          </Label>
          {renderToolbar(addressEditor, 'address')}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+1 (555) 123-4567"
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="contact@example.com"
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="map" className="block text-sm font-medium text-slate-700">
            Map URL
          </Label>
          <Input
            id="map"
            name="map"
            value={map}
            onChange={(event) => setMap(event.target.value)}
            placeholder="https://maps.google.com/..."
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
