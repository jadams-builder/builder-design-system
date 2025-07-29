'use client';

import React, { useState, useRef, useCallback } from 'react';
import { IconUpload, IconX, IconFile, IconPhoto, IconFileText, IconMusic, IconVideo, IconArchive } from '@tabler/icons-react';

interface FileWithProgress {
  file: File;
  progress: number;
  id: string;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  showPreview?: boolean;
  onFilesSelect?: (files: File[]) => void;
  onFilesRemove?: (fileIds: string[]) => void;
  onUploadProgress?: (fileId: string, progress: number) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = '*/*',
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = multiple ? 10 : 1,
  label,
  description,
  error,
  disabled = false,
  showPreview = true,
  onFilesSelect,
  onFilesRemove,
  onUploadProgress,
  className = ''
}) => {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateId = () => Math.random().toString(36).substring(2);

  const formatFileSize = useCallback((bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  const getFileIcon = useCallback((file: File) => {
    const type = file.type;
    const iconProps = { size: 'var(--icon-base)', style: { color: 'var(--color-purple-400)' } };

    if (type.startsWith('image/')) return <IconPhoto {...iconProps} />;
    if (type.startsWith('video/')) return <IconVideo {...iconProps} />;
    if (type.startsWith('audio/')) return <IconMusic {...iconProps} />;
    if (type.includes('text') || type.includes('document')) return <IconFileText {...iconProps} />;
    if (type.includes('zip') || type.includes('tar') || type.includes('archive')) return <IconArchive {...iconProps} />;
    return <IconFile {...iconProps} />;
  }, []);

  const validateFile = useCallback((file: File): string | null => {
    if (file.size > maxSize) {
      return `File size exceeds ${formatFileSize(maxSize)} limit`;
    }
    
    if (accept !== '*/*') {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        return file.type.match(new RegExp(type.replace('*', '.*')));
      });
      
      if (!isAccepted) {
        return `File type not accepted. Accepted types: ${accept}`;
      }
    }
    
    return null;
  }, [accept, maxSize, formatFileSize]);

  const processFiles = useCallback((newFiles: File[]) => {
    if (disabled) return;
    
    const remainingSlots = maxFiles - files.length;
    const filesToProcess = newFiles.slice(0, remainingSlots);
    
    const processedFiles: FileWithProgress[] = filesToProcess.map(file => {
      const error = validateFile(file);
      return {
        file,
        progress: 0,
        id: generateId(),
        status: error ? 'error' : 'uploading',
        error
      };
    });
    
    setFiles(prev => [...prev, ...processedFiles]);
    
    if (onFilesSelect) {
      onFilesSelect(processedFiles.filter(f => !f.error).map(f => f.file));
    }
    
    // Simulate upload progress for files without errors
    processedFiles.forEach(fileWithProgress => {
      if (!fileWithProgress.error) {
        simulateUpload(fileWithProgress.id);
      }
    });
  }, [disabled, maxFiles, files.length, validateFile, onFilesSelect]);

  const simulateUpload = useCallback((fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress: 100, status: 'completed' } : f
        ));
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ));
        if (onUploadProgress) {
          onUploadProgress(fileId, progress);
        }
      }
    }, 200);
  }, [onUploadProgress]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [processFiles]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, [processFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (onFilesRemove) {
      onFilesRemove([fileId]);
    }
  }, [onFilesRemove]);

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const canAddMoreFiles = files.length < maxFiles;

  return (
    <div className={`file-upload-wrapper ${className}`}>
      {label && (
        <label
          className="file-upload-label"
          style={{
            display: 'block',
            color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)',
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-sm)',
            fontWeight: 'var(--font-weight-medium)',
            marginBottom: 'var(--space-1_5)'
          }}
        >
          {label}
        </label>
      )}

      {description && (
        <div
          className="file-upload-description"
          style={{
            color: disabled ? 'var(--text-disabled)' : 'var(--text-secondary)',
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-sm)',
            marginBottom: 'var(--space-3)',
            lineHeight: 'var(--line-height-normal)'
          }}
        >
          {description}
        </div>
      )}

      <div
        className={`file-upload-dropzone ${isDragOver ? 'drag-over' : ''} ${disabled ? 'disabled' : ''}`}
        style={{
          border: '2px dashed',
          borderColor: error
            ? 'var(--border-error)'
            : isDragOver
              ? 'var(--color-purple-400)'
              : isHovered
                ? 'var(--border-primary)'
                : 'var(--border-secondary)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          textAlign: 'center' as const,
          background: disabled
            ? 'var(--bg-secondary)'
            : isDragOver
              ? 'var(--color-purple-500)10'
              : isHovered
                ? 'var(--bg-elevated)'
                : 'var(--bg-tertiary)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'var(--transition-fast)',
          position: 'relative' as const
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={canAddMoreFiles ? openFileDialog : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple && canAddMoreFiles}
          onChange={handleFileSelect}
          disabled={disabled}
          style={{ display: 'none' }}
        />

        <div className="upload-content">
          <IconUpload
            size="var(--icon-3xl)"
            style={{
              color: disabled
                ? 'var(--text-disabled)'
                : isDragOver
                  ? 'var(--color-purple-400)'
                  : 'var(--text-tertiary)',
              marginBottom: 'var(--space-4)'
            }}
          />

          <div
            style={{
              fontSize: 'var(--font-lg)',
              fontWeight: 'var(--font-weight-medium)',
              color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)',
              marginBottom: 'var(--space-2)'
            }}
          >
            {isDragOver ? 'Drop files here' : canAddMoreFiles ? 'Click to upload or drag and drop' : 'Maximum files reached'}
          </div>

          <div
            style={{
              fontSize: 'var(--font-sm)',
              color: disabled ? 'var(--text-disabled)' : 'var(--text-secondary)',
              marginBottom: 'var(--space-4)'
            }}
          >
            {canAddMoreFiles && (
              <>
                {accept !== '*/*' && `Accepted files: ${accept}`}
                {accept !== '*/*' && ' • '}
                Max size: {formatFileSize(maxSize)}
                {multiple && ` • Max files: ${maxFiles}`}
              </>
            )}
          </div>

          {files.length > 0 && (
            <div
              style={{
                fontSize: 'var(--font-xs)',
                color: 'var(--text-tertiary)'
              }}
            >
              {files.length} of {maxFiles} files selected
            </div>
          )}
        </div>
      </div>

      {showPreview && files.length > 0 && (
        <div
          className="file-preview-list"
          style={{
            marginTop: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)'
          }}
        >
          {files.map(fileWithProgress => (
            <div
              key={fileWithProgress.id}
              className="file-preview-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-3)',
                background: 'var(--bg-elevated)',
                border: 'var(--border-thin) solid var(--border-secondary)',
                borderRadius: 'var(--radius-lg)',
                transition: 'var(--transition-fast)'
              }}
            >
              <div className="file-icon" style={{ flexShrink: 0 }}>
                {getFileIcon(fileWithProgress.file)}
              </div>

              <div className="file-info" style={{ flex: 1, minWidth: 0 }}>
                <div
                  className="file-name"
                  style={{
                    fontSize: 'var(--font-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--text-primary)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {fileWithProgress.file.name}
                </div>
                
                <div
                  className="file-details"
                  style={{
                    fontSize: 'var(--font-xs)',
                    color: 'var(--text-tertiary)',
                    marginTop: 'var(--space-0_5)'
                  }}
                >
                  {formatFileSize(fileWithProgress.file.size)}
                  {fileWithProgress.status === 'uploading' && ` • ${Math.round(fileWithProgress.progress)}%`}
                  {fileWithProgress.status === 'completed' && ' • Completed'}
                  {fileWithProgress.status === 'error' && fileWithProgress.error && ` • ${fileWithProgress.error}`}
                </div>

                {fileWithProgress.status === 'uploading' && (
                  <div
                    className="progress-bar"
                    style={{
                      width: '100%',
                      height: '4px',
                      background: 'var(--color-gray-700)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      marginTop: 'var(--space-2)'
                    }}
                  >
                    <div
                      className="progress-fill"
                      style={{
                        width: `${fileWithProgress.progress}%`,
                        height: '100%',
                        background: 'var(--color-purple-500)',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                )}
              </div>

              <button
                className="remove-file-button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(fileWithProgress.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'var(--space-6)',
                  height: 'var(--space-6)',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-base)',
                  cursor: 'pointer',
                  color: 'var(--text-tertiary)',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-red-500)20';
                  e.currentTarget.style.color = 'var(--color-red-400)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-tertiary)';
                }}
              >
                <IconX size="var(--icon-sm)" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div
          className="file-upload-error"
          style={{
            color: 'var(--text-error)',
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-sm)',
            fontWeight: 'var(--font-weight-medium)',
            marginTop: 'var(--space-1_5)'
          }}
        >
          {error}
        </div>
      )}

      <style jsx>{`
        .file-upload-wrapper {
          width: 100%;
        }

        .file-upload-dropzone.drag-over {
          transform: scale(1.02);
        }

        .file-upload-dropzone.disabled {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};