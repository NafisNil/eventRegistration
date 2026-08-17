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

interface EventStatFormProps {
  initialData?: {
    event_name?: string;
    location?: string;
    event_date?: string;
    time?: string;
    registration_deadline?: string;
    target_participants?: string | null;
  };
  submitLabel?: string;
  processing?: boolean;
  onSubmit: (payload: FormData) => void;
}

export default function EventStatForm({
  initialData,
  submitLabel = 'Save Event Stat',
  processing = false,
  onSubmit,
}: EventStatFormProps) {
  const [eventName, setEventName] = useState(initialData?.event_name ?? '');
  const [location, setLocation] = useState(initialData?.location ?? '');
  const [eventDate, setEventDate] = useState(initialData?.event_date ?? '');
  const [time, setTime] = useState(initialData?.time ?? '');
  const [registrationDeadline, setRegistrationDeadline] = useState(initialData?.registration_deadline ?? '');
  const [targetParticipants, setTargetParticipants] = useState(initialData?.target_participants ?? '');

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, FontSize],
    content: location || '<p></p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-emerald max-w-none min-h-45 w-full rounded-xl bg-emerald-50/40 p-3 text-sm text-slate-800 outline-none transition focus:outline-none focus:ring-2 focus:ring-emerald-200',
      },
    },
    onUpdate: ({ editor }) => {
      setLocation(editor.getHTML());
    },
  });

  const fontSizeOptions = ['12px', '14px', '16px', '18px', '20px', '24px', '32px'];

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentHtml = editor.getHTML();

    if (currentHtml !== location) {
      editor.commands.setContent(location || '<p></p>', { emitUpdate: false });
    }
  }, [editor, location]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('event_name', eventName);
    formData.append('location', location);
    formData.append('event_date', eventDate);
    formData.append('time', time);
    formData.append('registration_deadline', registrationDeadline);

    if (targetParticipants.trim()) {
      formData.append('target_participants', targetParticipants);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="event_name" className="block text-sm font-medium text-slate-700">
            Event name
          </Label>
          <Input
            id="event_name"
            name="event_name"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
            placeholder="Enter event name"
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="location" className="block text-sm font-medium text-slate-700">
            Location
          </Label>

          {editor && (
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
                  <label htmlFor="textColor" className="text-xs font-medium text-slate-600">
                    Color
                  </label>
                  <input
                    id="textColor"
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
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="event_date" className="block text-sm font-medium text-slate-700">
            Event date
          </Label>
          <Input
            id="event_date"
            name="event_date"
            type="date"
            value={eventDate}
            onChange={(event) => setEventDate(event.target.value)}
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="block text-sm font-medium text-slate-700">
            Time
          </Label>
          <Input
            id="time"
            name="time"
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="registration_deadline" className="block text-sm font-medium text-slate-700">
            Registration deadline
          </Label>
          <Input
            id="registration_deadline"
            name="registration_deadline"
            type="date"
            value={registrationDeadline}
            onChange={(event) => setRegistrationDeadline(event.target.value)}
            className="border-emerald-200 text-black focus-visible:ring-emerald-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="target_participants" className="block text-sm font-medium text-slate-700">
            Target participants
          </Label>
          <textarea
            id="target_participants"
            name="target_participants"
            value={targetParticipants}
            onChange={(event) => setTargetParticipants(event.target.value)}
            placeholder="e.g. 500"
            className="w-full rounded-xl border border-emerald-200 bg-emerald-50/40 p-3 text-sm text-black outline-none transition focus:outline-none focus:ring-2 focus:ring-emerald-200"
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
