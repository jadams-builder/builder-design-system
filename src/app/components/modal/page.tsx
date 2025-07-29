'use client';

import { useState } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ConfirmationModal } from '../../../components/Modal';
import { Button } from '../../../components/Button';

export default function ModalPage() {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [currentSize, setCurrentSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [dangerConfirmModalOpen, setDangerConfirmModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [scrollModalOpen, setScrollModalOpen] = useState(false);

  const handleConfirm = () => {
    alert('Action confirmed!');
  };

  const handleDangerConfirm = () => {
    alert('Dangerous action confirmed!');
  };

  const openSizeModal = (size: 'sm' | 'md' | 'lg' | 'xl' | 'full') => {
    setCurrentSize(size);
    setSizeModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Modal
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Modals are overlay windows that focus user attention on a specific task or information.
          They include focus management, keyboard navigation, and accessibility features.
        </p>
      </div>

      {/* Basic Usage */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Basic Usage
        </h2>
        
        <div className="flex flex-wrap gap-4 p-6 rounded-lg mb-6" style={{ background: 'var(--bg-elevated)' }}>
          <Button onClick={() => setBasicModalOpen(true)}>
            Open Basic Modal
          </Button>
        </div>

        <Modal isOpen={basicModalOpen} onClose={() => setBasicModalOpen(false)}>
          <ModalHeader>
            <ModalTitle>Basic Modal</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              This is a basic modal with a header, body, and footer. It includes a close button
              and can be closed by clicking the backdrop or pressing the Escape key.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setBasicModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setBasicModalOpen(false)}>
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      {/* Modal Sizes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Modal Sizes
        </h2>
        
        <div className="flex flex-wrap gap-4 p-6 rounded-lg mb-6" style={{ background: 'var(--bg-elevated)' }}>
          <Button size="sm" onClick={() => openSizeModal('sm')}>Small</Button>
          <Button size="sm" onClick={() => openSizeModal('md')}>Medium</Button>
          <Button size="sm" onClick={() => openSizeModal('lg')}>Large</Button>
          <Button size="sm" onClick={() => openSizeModal('xl')}>Extra Large</Button>
          <Button size="sm" onClick={() => openSizeModal('full')}>Full</Button>
        </div>

        <Modal isOpen={sizeModalOpen} onClose={() => setSizeModalOpen(false)} size={currentSize}>
          <ModalHeader>
            <ModalTitle>{currentSize.toUpperCase()} Modal</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              This is a {currentSize} sized modal. Modal sizes help you choose the appropriate
              width for your content and use case.
            </p>
            <div className="mt-4 p-4 rounded" style={{ background: 'var(--bg-secondary)' }}>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Size Guidelines:
              </h4>
              <ul className="text-sm space-y-1" style={{ color: 'var(--text-tertiary)' }}>
                <li>• <strong>Small:</strong> Simple confirmations, alerts</li>
                <li>• <strong>Medium:</strong> Forms, content previews (default)</li>
                <li>• <strong>Large:</strong> Complex forms, detailed content</li>
                <li>• <strong>Extra Large:</strong> Rich content, dashboards</li>
                <li>• <strong>Full:</strong> Maximum content, immersive experiences</li>
              </ul>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setSizeModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      {/* Confirmation Modals */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Confirmation Modals
        </h2>
        
        <div className="flex flex-wrap gap-4 p-6 rounded-lg mb-6" style={{ background: 'var(--bg-elevated)' }}>
          <Button onClick={() => setConfirmModalOpen(true)}>
            Show Confirmation
          </Button>
          <Button variant="secondary" onClick={() => setDangerConfirmModalOpen(true)}>
            Show Danger Confirmation
          </Button>
        </div>

        <ConfirmationModal
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={handleConfirm}
          title="Confirm Action"
          message="Are you sure you want to proceed with this action? This will save your changes."
          confirmText="Yes, Continue"
          cancelText="Cancel"
        />

        <ConfirmationModal
          isOpen={dangerConfirmModalOpen}
          onClose={() => setDangerConfirmModalOpen(false)}
          onConfirm={handleDangerConfirm}
          title="Delete Account"
          message="This action cannot be undone. This will permanently delete your account and remove all data."
          confirmText="Delete Account"
          cancelText="Keep Account"
          variant="danger"
        />
      </section>

      {/* Form Modal */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Form Modal
        </h2>
        
        <div className="flex flex-wrap gap-4 p-6 rounded-lg mb-6" style={{ background: 'var(--bg-elevated)' }}>
          <Button onClick={() => setFormModalOpen(true)}>
            Open Form Modal
          </Button>
        </div>

        <Modal isOpen={formModalOpen} onClose={() => setFormModalOpen(false)} size="lg">
          <ModalHeader>
            <ModalTitle>Create New Project</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <form className="space-y-4">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="Enter project name"
                  className="w-full px-3 py-2 rounded border"
                  style={{
                    background: 'var(--input-bg)',
                    border: `var(--border-thin) solid var(--input-border)`,
                    borderRadius: 'var(--input-border-radius)',
                    color: 'var(--input-text)',
                    fontSize: 'var(--input-font-size)',
                  }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Description
                </label>
                <textarea
                  placeholder="Enter project description"
                  rows={4}
                  className="w-full px-3 py-2 rounded border resize-vertical"
                  style={{
                    background: 'var(--input-bg)',
                    border: `var(--border-thin) solid var(--input-border)`,
                    borderRadius: 'var(--input-border-radius)',
                    color: 'var(--input-text)',
                    fontSize: 'var(--input-font-size)',
                  }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Project Type
                </label>
                <select
                  className="w-full px-3 py-2 rounded border"
                  style={{
                    background: 'var(--input-bg)',
                    border: `var(--border-thin) solid var(--input-border)`,
                    borderRadius: 'var(--input-border-radius)',
                    color: 'var(--input-text)',
                    fontSize: 'var(--input-font-size)',
                  }}
                >
                  <option>Web Application</option>
                  <option>Mobile App</option>
                  <option>API Service</option>
                  <option>Library/Package</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="public-project" />
                <label 
                  htmlFor="public-project" 
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Make this project public
                </label>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setFormModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setFormModalOpen(false)}>
              Create Project
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      {/* Scrollable Content */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Scrollable Content
        </h2>
        
        <div className="flex flex-wrap gap-4 p-6 rounded-lg mb-6" style={{ background: 'var(--bg-elevated)' }}>
          <Button onClick={() => setScrollModalOpen(true)}>
            Open Scrollable Modal
          </Button>
        </div>

        <Modal isOpen={scrollModalOpen} onClose={() => setScrollModalOpen(false)}>
          <ModalHeader>
            <ModalTitle>Terms of Service</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
                architecto beatae vitae dicta sunt explicabo.
              </p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
              <p>
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci 
                velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam 
                aliquam quaerat voluptatem.
              </p>
              <p>
                Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit 
                laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure 
                reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
              </p>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium 
                voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint 
                occaecati cupiditate non provident.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setScrollModalOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setScrollModalOpen(false)}>
              Accept Terms
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      {/* Code Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Code Examples
        </h2>
        
        <div 
          className="p-6 rounded-lg font-mono text-sm overflow-x-auto"
          style={{
            background: 'var(--code-bg)',
            color: 'var(--code-text)',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <div style={{ color: 'var(--code-comment)' }}>{/* Basic Modal */}</div>
          <div>
            <span style={{ color: 'var(--code-punctuation)' }}>&lt;</span>
            <span style={{ color: 'var(--code-tag)' }}>Modal</span>
            <span style={{ color: 'var(--code-attribute)' }}> isOpen</span>
            <span style={{ color: 'var(--code-punctuation)' }}>={'{'}isOpen{'}'}</span>
            <span style={{ color: 'var(--code-attribute)' }}> onClose</span>
            <span style={{ color: 'var(--code-punctuation)' }}>={'{'}onClose{'}'}&gt;</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--code-punctuation)' }}>&lt;</span>
            <span style={{ color: 'var(--code-tag)' }}>ModalHeader</span>
            <span style={{ color: 'var(--code-punctuation)' }}>&gt;</span>
          </div>
          <div style={{ paddingLeft: '2rem' }}>
            <span style={{ color: 'var(--code-punctuation)' }}>&lt;</span>
            <span style={{ color: 'var(--code-tag)' }}>ModalTitle</span>
            <span style={{ color: 'var(--code-punctuation)' }}>&gt;</span>
            <span style={{ color: 'var(--code-text)' }}>Modal Title</span>
            <span style={{ color: 'var(--code-punctuation)' }}>&lt;/</span>
            <span style={{ color: 'var(--code-tag)' }}>ModalTitle</span>
            <span style={{ color: 'var(--code-punctuation)' }}>&gt;</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--code-punctuation)' }}>&lt;/</span>
            <span style={{ color: 'var(--code-tag)' }}>ModalHeader</span>
            <span style={{ color: 'var(--code-punctuation)' }}>&gt;</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--code-punctuation)' }}>&lt;</span>
            <span style={{ color: 'var(--code-tag)' }}>ModalBody</span>
            <span style={{ color: 'var(--code-punctuation)' }}>&gt;</span>
          </div>
          <div style={{ paddingLeft: '2rem' }}>
            <span style={{ color: 'var(--code-text)' }}>Modal content goes here</span>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <span style={{ color: 'var(--code-punctuation)' }}>&lt;/</span>
            <span style={{ color: 'var(--code-tag)' }}>ModalBody</span>
            <span style={{ color: 'var(--code-punctuation)' }}>&gt;</span>
          </div>
          <div>
            <span style={{ color: 'var(--code-punctuation)' }}>&lt;/</span>
            <span style={{ color: 'var(--code-tag)' }}>Modal</span>
            <span style={{ color: 'var(--code-punctuation)' }}>&gt;</span>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Accessibility Features
        </h2>
        
        <div 
          className="p-6 rounded-lg"
          style={{ background: 'var(--bg-elevated)' }}
        >
          <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li>• <strong>Focus Management:</strong> Focus is trapped within the modal and restored on close</li>
            <li>• <strong>Keyboard Navigation:</strong> Escape key closes the modal</li>
            <li>• <strong>ARIA Attributes:</strong> Proper role and aria-modal attributes for screen readers</li>
            <li>• <strong>Body Scroll Lock:</strong> Prevents background scrolling when modal is open</li>
            <li>• <strong>Backdrop Interaction:</strong> Clicking outside closes the modal (configurable)</li>
            <li>• <strong>Close Button:</strong> Always visible close button with proper labeling</li>
          </ul>
        </div>
      </section>
    </div>
  );
}