"use client";
import { useEffect, useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold, Italic, Strikethrough, Link2, Link2Off,
  List, ListOrdered, Undo2, Redo2,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  rows?: number;
}

function isEmpty(html: string): boolean {
  return !html || /^<p>(\s|<br\s*\/?>)*<\/p>$/.test(html.trim()) || html.trim() === "";
}

export default function RichTextEditor({ value, onChange, placeholder = "Start writing…", rows = 4 }: Props) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading:         { levels: [2, 3] },
        codeBlock:       false,
        blockquote:      false,
        horizontalRule:  false,
        code:            false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "focus:outline-none text-[13px] text-ink-800 leading-relaxed",
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange(isEmpty(html) ? "" : html);
    },
  });

  // Sync external value changes into the editor
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const incoming = value || "";
    if (current !== incoming) {
      editor.commands.setContent(incoming);
    }
  }, [value, editor]);

  const minHeight = `${rows * 1.75}rem`;

  const applyLink = useCallback(() => {
    if (!editor) return;
    const url = linkUrl.trim();
    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
    setShowLinkInput(false);
    setLinkUrl("");
  }, [editor, linkUrl]);

  const openLinkInput = useCallback(() => {
    if (!editor) return;
    const existing = editor.getAttributes("link").href as string | undefined;
    setLinkUrl(existing ?? "");
    setShowLinkInput(true);
  }, [editor]);

  if (!editor) return null;

  const btnBase = "flex items-center justify-center w-7 h-7 rounded-md transition-colors cursor-pointer text-ink-500";
  const btnActive = "bg-ink-100 text-ink-900";
  const btnHover = "hover:bg-ink-100 hover:text-ink-800";
  const divider = <div className="w-px h-4 bg-ink-200 mx-0.5" />;

  return (
    <div className="rounded-xl border border-ink-200 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-brand-400 focus-within:border-transparent transition-shadow">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-ink-150 bg-ink-50 flex-wrap">
        {/* History */}
        <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().undo().run(); }}
          disabled={!editor.can().undo()} title="Undo"
          className={`${btnBase} ${btnHover} disabled:opacity-30 disabled:cursor-not-allowed`}>
          <Undo2 size={13} />
        </button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().redo().run(); }}
          disabled={!editor.can().redo()} title="Redo"
          className={`${btnBase} ${btnHover} disabled:opacity-30 disabled:cursor-not-allowed`}>
          <Redo2 size={13} />
        </button>

        {divider}

        {/* Inline marks */}
        <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }}
          title="Bold (⌘B)" className={`${btnBase} ${btnHover} ${editor.isActive("bold") ? btnActive : ""}`}>
          <Bold size={13} />
        </button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }}
          title="Italic (⌘I)" className={`${btnBase} ${btnHover} ${editor.isActive("italic") ? btnActive : ""}`}>
          <Italic size={13} />
        </button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleStrike().run(); }}
          title="Strikethrough" className={`${btnBase} ${btnHover} ${editor.isActive("strike") ? btnActive : ""}`}>
          <Strikethrough size={13} />
        </button>

        {divider}

        {/* Link */}
        <button type="button" onMouseDown={(e) => { e.preventDefault(); openLinkInput(); }}
          title="Insert link" className={`${btnBase} ${btnHover} ${editor.isActive("link") ? btnActive : ""}`}>
          <Link2 size={13} />
        </button>
        {editor.isActive("link") && (
          <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().unsetLink().run(); }}
            title="Remove link" className={`${btnBase} ${btnHover}`}>
            <Link2Off size={13} />
          </button>
        )}

        {divider}

        {/* Lists */}
        <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }}
          title="Bullet list" className={`${btnBase} ${btnHover} ${editor.isActive("bulletList") ? btnActive : ""}`}>
          <List size={13} />
        </button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }}
          title="Numbered list" className={`${btnBase} ${btnHover} ${editor.isActive("orderedList") ? btnActive : ""}`}>
          <ListOrdered size={13} />
        </button>
      </div>

      {/* Link input popover */}
      {showLinkInput && (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-ink-150 bg-brand-50">
          <Link2 size={12} className="text-brand-500 shrink-0" />
          <input
            autoFocus
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyLink(); } if (e.key === "Escape") { setShowLinkInput(false); setLinkUrl(""); } }}
            placeholder="https://..."
            className="flex-1 text-[13px] bg-transparent focus:outline-none text-ink-800 placeholder-ink-300"
          />
          <button type="button" onClick={applyLink}
            className="px-2.5 py-1 rounded-md bg-brand-500 text-white text-[11px] font-medium hover:bg-brand-600 cursor-pointer">
            {linkUrl ? "Apply" : "Remove"}
          </button>
          <button type="button" onClick={() => { setShowLinkInput(false); setLinkUrl(""); }}
            className="px-2 py-1 rounded-md text-ink-500 text-[11px] hover:bg-ink-100 cursor-pointer">
            Cancel
          </button>
        </div>
      )}

      {/* Editor content */}
      <EditorContent
        editor={editor}
        style={{ minHeight }}
        className="px-3 py-2.5 overflow-y-auto prose prose-sm max-w-none
          [&_.ProseMirror]:outline-none
          [&_.ProseMirror]:min-h-full
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-ink-300
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
          [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0
          [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5
          [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5
          [&_.ProseMirror_li]:mb-0.5
          [&_.ProseMirror_a]:text-brand-600 [&_.ProseMirror_a]:underline
          [&_.ProseMirror_strong]:font-semibold
          [&_.ProseMirror_em]:italic
          [&_.ProseMirror_s]:line-through"
      />
    </div>
  );
}
