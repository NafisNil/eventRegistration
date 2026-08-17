import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { FontSize } from '@/components/Admin/Extensions/FontSize';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface AboutFormProps {
  initialData?: {
    description?: string;
    reason_to_attend?: string | null;
    objectives?: string | null;
    eligibility?: string | null;
  };
  submitLabel?: string;
  processing?: boolean;
  onSubmit: (payload: FormData) => void;
}

const fontSizeOptions = ['12px', '14px', '16px', '18px', '20px', '24px', '32px'];

const hasRichTextContent = (value: string) => value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0;

export default function AboutForm({
  initialData,
  submitLabel = 'Save About',
  processing = false,
  onSubmit,
}: AboutFormProps) {
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [reasonToAttend, setReasonToAttend] = useState(initialData?.reason_to_attend ?? '');
  const [objectives, setObjectives] = useState(initialData?.objectives ?? '');
  const [eligibility, setEligibility] = useState(initialData?.eligibility ?? '');

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

  const reasonToAttendEditor = useEditor({
    extensions: [StarterKit, TextStyle, Color, FontSize],
    content: reasonToAttend || '<p></p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-emerald max-w-none min-h-28 w-full rounded-xl bg-emerald-50/40 p-3 text-sm text-slate-800 outline-none transition focus:outline-none focus:ring-2 focus:ring-emerald-200',
      },
    },
    onUpdate: ({ editor }) => {
      setReasonToAttend(editor.getHTML());
    },
  });

  const objectivesEditor = useEditor({
    extensions: [StarterKit, TextStyle, Color, FontSize],
    content: objectives || '<p></p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-emerald max-w-none min-h-28 w-full rounded-xl bg-emerald-50/40 p-3 text-sm text-slate-800 outline-none transition focus:outline-none focus:ring-2 focus:ring-emerald-200',
      },
    },
    onUpdate: ({ editor }) => {
      setObjectives(editor.getHTML());
    },
  });

  const eligibilityEditor = useEditor({
    extensions: [StarterKit, TextStyle, Color, FontSize],
    content: eligibility || '<p></p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-emerald max-w-none min-h-28 w-full rounded-xl bg-emerald-50/40 p-3 text-sm text-slate-800 outline-none transition focus:outline-none focus:ring-2 focus:ring-emerald-200',
      },
    },
    onUpdate: ({ editor }) => {
      setEligibility(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!descriptionEditor) return;

    const currentHtml = descriptionEditor.getHTML();

    if (currentHtml !== description) {
      descriptionEditor.commands.setContent(description || '<p></p>', { emitUpdate: false });
    }
  }, [description, descriptionEditor]);

  useEffect(() => {
    if (!reasonToAttendEditor) return;

    const currentHtml = reasonToAttendEditor.getHTML();

    if (currentHtml !== reasonToAttend) {
      reasonToAttendEditor.commands.setContent(reasonToAttend || '<p></p>', { emitUpdate: false });
    }
  }, [reasonToAttend, reasonToAttendEditor]);

  useEffect(() => {
    if (!objectivesEditor) return;

    const currentHtml = objectivesEditor.getHTML();

    if (currentHtml !== objectives) {
      objectivesEditor.commands.setContent(objectives || '<p></p>', { emitUpdate: false });
    }
  }, [objectives, objectivesEditor]);

  useEffect(() => {
    if (!eligibilityEditor) return;

    const currentHtml = eligibilityEditor.getHTML();

    if (currentHtml !== eligibility) {
      eligibilityEditor.commands.setContent(eligibility || '<p></p>', { emitUpdate: false });
    }
  }, [eligibility, eligibilityEditor]);

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

    if (!hasRichTextContent(description)) {
      return;
    }

    const formData = new FormData();
    formData.append('description', description);

    if (hasRichTextContent(reasonToAttend)) {
      formData.append('reason_to_attend', reasonToAttend);
    }

    if (hasRichTextContent(objectives)) {
      formData.append('objectives', objectives);
    }

    if (hasRichTextContent(eligibility)) {
      formData.append('eligibility', eligibility);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="description" className="block text-sm font-medium text-slate-700">
            Description
          </Label>
          {renderToolbar(descriptionEditor, 'description')}
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason_to_attend" className="block text-sm font-medium text-slate-700">
            Reason to attend
          </Label>
          {renderToolbar(reasonToAttendEditor, 'reason_to_attend')}
        </div>

        <div className="space-y-2">
          <Label htmlFor="objectives" className="block text-sm font-medium text-slate-700">
            Objectives
          </Label>
          {renderToolbar(objectivesEditor, 'objectives')}
        </div>

        <div className="space-y-2">
          <Label htmlFor="eligibility" className="block text-sm font-medium text-slate-700">
            Eligibility
          </Label>
          {renderToolbar(eligibilityEditor, 'eligibility')}
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
