'use client';

import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre 
        className="p-4 rounded-lg text-sm overflow-x-auto font-mono"
        style={{
          background: 'var(--code-bg)',
          color: 'var(--code-text)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <code>{children}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 px-2 py-1 text-xs rounded"
        style={{
          background: 'var(--bg-elevated)',
          color: 'var(--text-secondary)',
          border: `var(--border-thin) solid var(--border-secondary)`,
          borderRadius: 'var(--radius-sm)'
        }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Example({ title, description, children, code }: { 
  title: string; 
  description?: string; 
  children: React.ReactNode; 
  code: string; 
}) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      {description && (
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      )}
      
      {/* Preview */}
      <div 
        className="p-6 rounded-lg border mb-4"
        style={{
          background: 'var(--card-bg)',
          border: `var(--border-thin) solid var(--card-border)`,
          borderRadius: 'var(--card-border-radius)'
        }}
      >
        <div className="flex flex-col gap-4">
          {children}
        </div>
      </div>
      
      {/* Code */}
      <CodeBlock>{code}</CodeBlock>
    </div>
  );
}

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
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          File Upload
        </h1>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          File upload component with drag-and-drop support, progress indicators, 
          file type validation, and comprehensive preview functionality.
        </p>
        
        {/* Props table */}
        <div 
          className="rounded-lg border overflow-hidden"
          style={{
            background: 'var(--card-bg)',
            border: `var(--border-thin) solid var(--card-border)`,
            borderRadius: 'var(--card-border-radius)'
          }}
        >
          <div 
            className="px-6 py-3 border-b"
            style={{
              background: 'var(--bg-elevated)',
              borderBottom: `var(--border-thin) solid var(--border-secondary)`
            }}
          >
            <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Props</h4>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>Prop</div>
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>Type</div>
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>Default</div>
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>Description</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>label</div>
                <div style={{ color: 'var(--text-secondary)' }}>string</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Upload area label</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>accept</div>
                <div style={{ color: 'var(--text-secondary)' }}>string</div>
                <div style={{ color: 'var(--text-secondary)' }}>&apos;*/*&apos;</div>
                <div style={{ color: 'var(--text-secondary)' }}>Accepted file types</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>multiple</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Allow multiple files</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>maxFiles</div>
                <div style={{ color: 'var(--text-secondary)' }}>number</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Maximum number of files</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>maxSize</div>
                <div style={{ color: 'var(--text-secondary)' }}>number</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Maximum file size in bytes</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>showPreview</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>true</div>
                <div style={{ color: 'var(--text-secondary)' }}>Show file previews</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>disabled</div>
                <div style={{ color: 'var(--text-secondary)' }}>boolean</div>
                <div style={{ color: 'var(--text-secondary)' }}>false</div>
                <div style={{ color: 'var(--text-secondary)' }}>Disable file upload</div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>error</div>
                <div style={{ color: 'var(--text-secondary)' }}>string</div>
                <div style={{ color: 'var(--text-secondary)' }}>-</div>
                <div style={{ color: 'var(--text-secondary)' }}>Error message to display</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section title="Basic Usage">
        <Example
          title="Simple File Upload"
          description="A basic file upload component with drag-and-drop support. Click to select files or drag them into the area."
          code={`<FileUpload
  label="Upload file"
  description="Select a file to upload or drag and drop it here."
  onFilesSelect={handleUpload}
  onFilesRemove={handleRemove}
  onUploadProgress={handleProgress}
/>`}
        >
          <FileUpload
            label="Upload file"
            description="Select a file to upload or drag and drop it here."
            onFilesSelect={handleBasicUpload}
            onFilesRemove={handleFilesRemove}
            onUploadProgress={handleUploadProgress}
          />
        </Example>
      </Section>

      <Section title="Multiple Files">
        <Example
          title="Multi-File Upload"
          description="Enable multiple file selection with configurable limits on the number of files."
          code={`<FileUpload
  label="Upload multiple files"
  description="You can select multiple files at once or drag and drop them."
  multiple
  maxFiles={5}
  onFilesSelect={handleMultipleFiles}
  onFilesRemove={handleRemove}
/>`}
        >
          <FileUpload
            label="Upload multiple files"
            description="You can select multiple files at once or drag and drop them."
            multiple
            maxFiles={5}
            onFilesSelect={(files) => console.log('Multiple files:', files)}
            onFilesRemove={handleFilesRemove}
          />
        </Example>
      </Section>

      <Section title="File Type Restrictions">
        <Example
          title="Accepted File Types"
          description="Restrict uploads to specific file types using the accept prop. Users will only be able to select matching files."
          code={`// Images only
<FileUpload
  label="Images only"
  description="Only image files (PNG, JPG, GIF, WebP) are accepted."
  accept="image/*"
  multiple
  maxFiles={3}
  onFilesSelect={handleImages}
/>

// Documents only
<FileUpload
  label="Documents only"
  description="Only PDF and document files are accepted."
  accept=".pdf,.doc,.docx,.txt"
  multiple
  maxFiles={3}
  onFilesSelect={handleDocuments}
/>`}
        >
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
        </Example>
      </Section>

      <Section title="Size Limitations">
        <Example
          title="File Size Limits"
          description="Set maximum file sizes to prevent users from uploading files that are too large for your application."
          code={`// Small files only (max 1MB)
<FileUpload
  label="Small files only (max 1MB)"
  description="Perfect for profile pictures or small documents."
  maxSize={1024 * 1024} // 1MB
  accept="image/*"
  onFilesSelect={handleSmallFiles}
/>

// Large files allowed (max 50MB)
<FileUpload
  label="Large files allowed (max 50MB)"
  description="Suitable for videos, presentations, or large datasets."
  maxSize={50 * 1024 * 1024} // 50MB
  multiple
  maxFiles={2}
  onFilesSelect={handleLargeFiles}
/>`}
        >
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
        </Example>
      </Section>

      <Section title="Without Preview">
        <Example
          title="No File Preview"
          description="Disable file previews for a simpler interface or when dealing with sensitive files."
          code={`<FileUpload
  label="Simple upload"
  description="This upload component doesn't show file previews."
  showPreview={false}
  multiple
  onFilesSelect={handleFiles}
/>`}
        >
          <FileUpload
            label="Simple upload"
            description="This upload component doesn't show file previews."
            showPreview={false}
            multiple
            onFilesSelect={(files) => console.log('Files without preview:', files)}
          />
        </Example>
      </Section>

      <Section title="States">
        <Example
          title="Upload States"
          description="Different states including default, disabled, and error conditions."
          code={`<FileUpload label="Default state" onFilesSelect={handleFiles} />
<FileUpload label="Disabled state" disabled onFilesSelect={handleFiles} />
<FileUpload 
  label="Error state" 
  error="Upload failed. Please try again or contact support."
  onFilesSelect={handleFiles} 
/>`}
        >
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
        </Example>
      </Section>

      <Section title="Avatar Upload Example">
        <Example
          title="Profile Picture Upload"
          description="A specialized example for avatar uploads with specific constraints and handling."
          code={`<FileUpload
  label="Avatar upload"
  description="Upload your profile picture. Square images work best."
  accept="image/jpeg,image/png,image/webp"
  maxSize={2 * 1024 * 1024} // 2MB
  maxFiles={1}
  onFilesSelect={(files) => {
    console.log('Avatar upload:', files);
    // In a real app, you might show a crop interface here
  }}
  onFilesRemove={handleAvatarRemove}
  onUploadProgress={handleAvatarProgress}
/>`}
        >
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
        </Example>
      </Section>

      <Section title="Bulk Upload Example">
        <Example
          title="Batch File Processing"
          description="Handle large numbers of files with progress tracking and detailed logging."
          code={`<FileUpload
  label="Bulk file upload"
  description="Upload up to 10 files at once. Perfect for batch processing."
  multiple
  maxFiles={10}
  maxSize={25 * 1024 * 1024} // 25MB per file
  accept="*/*"
  onFilesSelect={(files) => {
    console.log(\`Bulk upload: \${files.length} files selected\`);
    files.forEach(file => {
      console.log(\`- \${file.name} (\${(file.size / 1024 / 1024).toFixed(2)} MB)\`);
    });
  }}
  onFilesRemove={(fileIds) => {
    console.log(\`Removed \${fileIds.length} files from bulk upload\`);
  }}
  onUploadProgress={(fileId, progress) => {
    console.log(\`Bulk upload progress - File \${fileId}: \${progress}%\`);
  }}
/>`}
        >
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
        </Example>
      </Section>

      <Section title="Design Token Usage">
        <div 
          className="p-6 rounded-lg border"
          style={{
            background: 'var(--card-bg)',
            border: `var(--border-thin) solid var(--card-border)`,
            borderRadius: 'var(--card-border-radius)'
          }}
        >
          <p className="mb-4" style={{ color: 'var(--text-primary)' }}>
            The FileUpload component uses the following design tokens:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Colors</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--color-purple-500 (drag active)</li>
                <li>--color-purple-100 (drag background)</li>
                <li>--border-secondary (default border)</li>
                <li>--border-focus (drag hover)</li>
                <li>--text-error (error state)</li>
                <li>--bg-success-subtle (success state)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Spacing & Sizing</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--space-6, --space-8, --space-12 (padding)</li>
                <li>--space-3, --space-4 (gaps)</li>
                <li>--radius-lg (upload area)</li>
                <li>--radius-md (file previews)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Typography</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--font-primary</li>
                <li>--font-base (label, file names)</li>
                <li>--font-sm (description, size)</li>
                <li>--font-weight-medium</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-brand-primary)' }}>Effects</h4>
              <ul className="space-y-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                <li>--transition-fast</li>
                <li>--shadow-sm (file previews)</li>
                <li>Drag & drop interactions</li>
                <li>Progress bar animations</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}