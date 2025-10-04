"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { X, Plus } from "lucide-react"

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
}

export function ImageUpload({ images, onChange, maxImages = 5 }: ImageUploadProps) {
  const [newImageUrl, setNewImageUrl] = useState("")

  const addImage = () => {
    if (newImageUrl && !images.includes(newImageUrl) && images.length < maxImages) {
      onChange([...images, newImageUrl])
      setNewImageUrl("")
    }
  }

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Enter image URL"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
          />
        </div>
        <Button type="button" onClick={addImage} disabled={!newImageUrl || images.length >= maxImages}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((url, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-2">
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/image-placeholder.jpg"
                    }}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeImage(index)}
                  className="w-full"
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        {images.length}/{maxImages} images added
      </p>
    </div>
  )
}
