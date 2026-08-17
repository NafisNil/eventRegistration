import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { FontSize } from '@/components/Admin/Extensions/FontSize';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


interface ProgramHighlightFormProps {
  initialData?: {
    title?: string;
    description?: string;
    logo?: string | null;
  };
  submitLabel?: string;
  processing?: boolean;
  onSubmit: (payload: FormData) => void;
}

const fontSizeOptions = ['12px', '14px', '16px', '18px', '20px', '24px', '32px'];

const hasRichTextContent = (value: string) => value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0;

export default function ProgramHighlightForm({
  initialData,
  submitLabel = 'Save Program Highlight',
  processing = false,
  onSubmit,
}: ProgramHighlightFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [logo, setLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.logo ?? null);

  const descriptionEditor = useEditor({
    extensions: [StarterKit, TextStyle, Color, FontSize],
    content: description || '<p></p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-emerald max-w-none min-h-36 w-full rounded-xl bg-emerald-50/40 p-3 text-sm text-slate-800 outline-none transition focus:outline-none focus:ring-2 focus:ring-emerald-200',
      },
    },
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });


  useEffect(() => {
    if (!descriptionEditor) return;

    const currentHtml = descriptionEditor.getHTML();

    if (currentHtml !== description) {
      descriptionEditor.commands.setContent(description || '<p></p>', { emitUpdate: false });
    }
  }, [description, descriptionEditor]);

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
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`rounded px-2 py-1 text-xs font-bold transition ${
              editor.isActive('heading', { level: 1 }) ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-100'
            }`}
          >
            H1
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

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`rounded px-2 py-1 text-xs font-bold transition ${
              editor.isActive('heading', { level: 3 }) ? 'bg-emerald-700 text-white' : 'hover:bg-emerald-100'
            }`}
          >
            H3
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
    formData.append('title', title.trim());
    formData.append('description', description);

    if (logo) {
      formData.append('logo', logo);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Program highlight title"
            required
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="block text-sm font-medium text-slate-700">
            Description
          </Label>
          {renderToolbar(descriptionEditor, 'description')}
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
                alt="Guest preview"
                className="h-80 w-60 rounded-lg object-cover"
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
