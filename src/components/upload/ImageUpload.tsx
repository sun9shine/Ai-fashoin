'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Camera, X, Loader2 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/useTranslation';
import Image from 'next/image';

export default function ImageUpload() {
  const { t, isRTL } = useTranslation();
  const { uploadedImage, setUploadedImage, isProcessing, setIsProcessing } = useStore();
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setIsProcessing(true);
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          setPreview(result);
          // Simulate analysis delay
          setTimeout(() => {
            setUploadedImage(result);
            setIsProcessing(false);
          }, 2000);
        };
        reader.readAsDataURL(file);
      }
    },
    [setUploadedImage, setIsProcessing]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const clearImage = () => {
    setPreview(null);
    setUploadedImage(null);
  };

  if (uploadedImage || preview) {
    return (
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src={preview || uploadedImage || ''}
            alt="Uploaded photo"
            fill
            className="object-cover"
          />
          {isProcessing && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
              <p className="text-white font-medium">{t.upload.analyzing}</p>
            </div>
          )}
        </div>
        {!isProcessing && (
          <>
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <p className={`text-center mt-4 text-green-600 font-medium ${isRTL ? 'text-right' : ''}`}>
              ✓ {t.upload.ready}
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`w-full max-w-md mx-auto border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
        isDragActive
          ? 'border-purple-500 bg-purple-50 scale-105'
          : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/50'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
          {isDragActive ? (
            <Upload className="w-10 h-10 text-purple-600 animate-bounce" />
          ) : (
            <Camera className="w-10 h-10 text-purple-600" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{t.upload.title}</h3>
          <p className="text-gray-500 text-sm mt-1">{t.upload.subtitle}</p>
          <p className="text-gray-400 text-xs mt-2">{t.upload.supported}</p>
        </div>
      </div>
    </div>
  );
}
