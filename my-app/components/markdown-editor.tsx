"use client"

import React, { useState } from "react"
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3, LinkIcon, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    setSelectionStart(target.selectionStart)
    setSelectionEnd(target.selectionEnd)
  }

  const insertMarkdown = (before: string, after = "", options?: { block?: boolean }) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    let start = selectionStart
    let end = selectionEnd
    let newValue = value

    // For block elements (headings, lists), insert at start of line
    if (options?.block) {
      // Find start of current line
      const lineStart = value.lastIndexOf("\n", start - 1) + 1
      // If not at start of line, move start to lineStart
      start = lineStart
      end = lineStart
      // For lists, ensure a blank line before
      if (before.trim().match(/^(-|\d+\.)/)) {
        if (lineStart > 0 && value[lineStart - 1] !== "\n") {
          before = "\n" + before
        }
      }
      newValue =
        value.substring(0, start) +
        before +
        value.substring(start, selectionEnd) +
        after +
        value.substring(selectionEnd)
    } else {
      newValue =
        value.substring(0, selectionStart) +
        before +
        value.substring(selectionStart, selectionEnd) +
        after +
        value.substring(selectionEnd)
    }

    onChange(newValue)

    // Focus back on textarea and set cursor position
    setTimeout(() => {
      textarea.focus()
      const newPosition = start + before.length
      textarea.setSelectionRange(newPosition, newPosition + (selectionEnd - selectionStart))
    }, 0)
  }

  const handleBold = () => insertMarkdown("**", "**")
  const handleItalic = () => insertMarkdown("*", "*")
  const handleUnorderedList = () => insertMarkdown("- ", "", { block: true })
  const handleOrderedList = () => insertMarkdown("1. ", "", { block: true })
  const handleH1 = () => insertMarkdown("# ", "", { block: true })
  const handleH2 = () => insertMarkdown("## ", "", { block: true })
  const handleH3 = () => insertMarkdown("### ", "", { block: true })
  const handleLink = () => insertMarkdown("[", "](url)")
  const handleImage = () => insertMarkdown("![alt text](", ")", { block: true })

  return (
    <div className="markdown-editor">
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b">
        <Button type="button" variant="ghost" size="sm" onClick={handleBold} title="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={handleItalic} title="Italic">
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={handleH1} title="Heading 1">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={handleH2} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={handleH3} title="Heading 3">
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={handleUnorderedList} title="Bullet List">
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={handleOrderedList} title="Numbered List">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={handleLink} title="Link">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={handleImage} title="Image">
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleTextareaSelect}
        placeholder={placeholder}
        className="min-h-[300px] rounded-none border-0 resize-y font-mono text-sm"
      />
    </div>
  )
}