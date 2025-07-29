'use client';

import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';

export default function FileUploadPage() {
  const [basicFiles, setBasicFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);

  const handleBasicUpload = (files: File[]) => {
    console.log('Basic upload:', files);
    setBasicFiles(prev => [...prev, ...files]);
  };

  const handleImageUpload = (files: File[]) => {
    console.log('Image upload:', files);
    setImageFiles(prev => [...prev, ...files]);
  };

  const handleDocumentUpload = (files: File[]) => {
    console.log('Document upload:', files);
    setDocumentFiles(prev => [...prev, ...files]);
  };

  const handleFilesRemove = (fileIds: string[]) => {
    console.log('Files removed:', fileIds);
  };

  const handleUploadProgress = (fileId: string, progress: number) => {
    console.log(`File ${fileId} progress: ${progress}%`);
  };

  return (
    <div className="component-page">
      <div className="component-header">
        <h1>File Upload</h1>
        <p>
          File upload component with drag-and-drop support, progress indicators, 
          file type validation, and comprehensive preview functionality.
        </p>
      </div>

      <section className="component-section">
        <h2>Basic Usage</h2>
        <div className="component-demo">
          <FileUpload
            label="Upload file"
            description="Select a file to upload or drag and drop it here."
            onFilesSelect={handleBasicUpload}
            onFilesRemove={handleFilesRemove}
            onUploadProgress={handleUploadProgress}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Multiple Files</h2>
        <div className="component-demo">
          <FileUpload
            label="Upload multiple files"
            description="You can select multiple files at once or drag and drop them."
            multiple
            maxFiles={5}
            onFilesSelect={(files) => console.log('Multiple files:', files)}
            onFilesRemove={handleFilesRemove}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>File Type Restrictions</h2>
        <div className="component-demo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            <FileUpload
              label="Images only"
              description="Only image files (PNG, JPG, GIF, WebP) are accepted."
              accept="image/*"
              multiple
              maxFiles={3}
              onFilesSelect={handleImageUpload}
              onFilesRemove={handleFilesRemove}
            />
            
            <FileUpload
              label="Documents only"
              description="Only PDF and document files are accepted."
              accept=".pdf,.doc,.docx,.txt"
              multiple
              maxFiles={3}
              onFilesSelect={handleDocumentUpload}
              onFilesRemove={handleFilesRemove}
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Size Limitations</h2>
        <div className="component-demo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            <FileUpload
              label="Small files only (max 1MB)"
              description="Perfect for profile pictures or small documents."
              maxSize={1024 * 1024} // 1MB
              accept="image/*"
              onFilesSelect={(files) => console.log('Small files:', files)}
            />
            
            <FileUpload
              label="Large files allowed (max 50MB)"
              description="Suitable for videos, presentations, or large datasets."
              maxSize={50 * 1024 * 1024} // 50MB
              multiple
              maxFiles={2}
              onFilesSelect={(files) => console.log('Large files:', files)}
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Without Preview</h2>
        <div className="component-demo">
          <FileUpload
            label="Simple upload"
            description="This upload component doesn't show file previews."
            showPreview={false}
            multiple
            onFilesSelect={(files) => console.log('Files without preview:', files)}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>States</h2>
        <div className="component-demo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            <FileUpload
              label="Default state"
              description="Normal file upload component."
              onFilesSelect={(files) => console.log('Default:', files)}
            />
            
            <FileUpload
              label="Disabled state"
              description="This upload component is disabled."
              disabled
              onFilesSelect={(files) => console.log('Disabled:', files)}
            />
            
            <FileUpload
              label="Error state"
              description="There was an error with the file upload."
              error="Upload failed. Please try again or contact support."
              onFilesSelect={(files) => console.log('Error:', files)}
            />
          </div>
        </div>
      </section>

      <section className="component-section">
        <h2>Custom Configuration</h2>
        <div className="component-demo">
          <FileUpload
            label="Avatar upload"
            description="Upload your profile picture. Square images work best."
            accept="image/jpeg,image/png,image/webp"
            maxSize={2 * 1024 * 1024} // 2MB
            maxFiles={1}
            onFilesSelect={(files) => {
              console.log('Avatar upload:', files);
              // In a real app, you might show a crop interface here
            }}
            onFilesRemove={(fileIds) => {
              console.log('Avatar removed:', fileIds);
            }}
            onUploadProgress={(fileId, progress) => {
              console.log(`Avatar upload ${fileId}: ${progress}%`);
            }}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Bulk Upload Example</h2>
        <div className="component-demo">
          <FileUpload
            label="Bulk file upload"
            description="Upload up to 10 files at once. Perfect for batch processing or importing multiple documents."
            multiple
            maxFiles={10}
            maxSize={25 * 1024 * 1024} // 25MB per file
            accept="*/*"
            onFilesSelect={(files) => {
              console.log(`Bulk upload: ${files.length} files selected`);
              files.forEach(file => {
                console.log(`- ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
              });
            }}
            onFilesRemove={(fileIds) => {
              console.log(`Removed ${fileIds.length} files from bulk upload`);
            }}
            onUploadProgress={(fileId, progress) => {
              // In a real app, you might update a global progress indicator
              console.log(`Bulk upload progress - File ${fileId}: ${progress}%`);
            }}
          />
        </div>
      </section>

      <section className="component-section">
        <h2>Code Example</h2>
        <div className="code-block">
          <pre>
            <code>{`import { FileUpload } from '@/components/FileUpload';

// Basic usage
<FileUpload
  label="Upload file"
  description="Select or drag and drop a file"
  onFilesSelect={(files) => console.log(files)}
/>

// Multiple files with restrictions
<FileUpload
  label="Upload images"
  description="Select multiple image files"
  accept="image/*"
  multiple
  maxFiles={5}
  maxSize={10 * 1024 * 1024} // 10MB
  onFilesSelect={handleFiles}
  onFilesRemove={handleRemove}
  onUploadProgress={handleProgress}
/>

// Custom file types
<FileUpload
  label="Documents only"
  accept=".pdf,.doc,.docx,.txt"
  maxSize={5 * 1024 * 1024} // 5MB
  onFilesSelect={handleDocuments}
/>

// Without preview
<FileUpload
  label="Simple upload"
  showPreview={false}
  onFilesSelect={handleFiles}
/>

// Error state
<FileUpload
  label="Upload failed"
  error="Something went wrong. Please try again."
  onFilesSelect={handleFiles}
/>

// Disabled state
<FileUpload
  label="Disabled upload"
  disabled
  onFilesSelect={handleFiles}
/>`}</code>
          </pre>
        </div>
      </section>

      <style jsx>{`
        .component-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-8);
          font-family: var(--font-primary);
        }

        .component-header {
          margin-bottom: var(--space-12);
          text-align: center;
        }

        .component-header h1 {
          color: var(--text-primary);
          font-size: var(--font-4xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-4);
        }

        .component-header p {
          color: var(--text-secondary);
          font-size: var(--font-lg);
          max-width: 600px;
          margin: 0 auto;
          line-height: var(--line-height-relaxed);
        }

        .component-section {
          margin-bottom: var(--space-16);
        }

        .component-section h2 {
          color: var(--text-primary);
          font-size: var(--font-2xl);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--space-6);
          border-bottom: var(--border-thin) solid var(--border-secondary);
          padding-bottom: var(--space-3);
        }

        .component-demo {
          background: var(--bg-tertiary);
          border: var(--border-thin) solid var(--border-secondary);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
        }

        .code-block {
          background: var(--color-gray-950);
          border: var(--border-thin) solid var(--border-primary);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .code-block pre {
          margin: 0;
          padding: var(--space-6);
          overflow-x: auto;
        }

        .code-block code {
          font-family: var(--font-mono);
          font-size: var(--font-sm);
          line-height: var(--line-height-relaxed);
          color: var(--code-text);
        }

        @media (max-width: 768px) {
          .component-page {
            padding: var(--space-4);
          }
        }
      `}</style>
    </div>
  );
}