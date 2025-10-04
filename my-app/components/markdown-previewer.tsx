'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'

interface MarkdownPreviewerProps {
  content: string
  className?: string
}

export function MarkdownPreviewer({
  content,
  className = '',
}: MarkdownPreviewerProps) {
  if (!content) return null

  return (
    <div className={`prose max-w-none ${className}`}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}