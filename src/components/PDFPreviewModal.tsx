import React from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  author: string;
}

const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
  author
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div 
          className="bg-secondary-light rounded-xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
          style={{ width: '80vw', height: '90vh' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-secondary-light">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-primary text-lg">📖</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{title}</h2>
                <p className="text-sm text-white/60">by {author}</p>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-2">
              <button
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4 text-white" />
              </button>
              <button
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="w-4 h-4 text-white" />
              </button>
              <button
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Rotate"
              >
                <RotateCw className="w-4 h-4 text-white" />
              </button>
              <button
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4 text-white" />
              </button>
              <div className="w-px h-6 bg-white/20"></div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-hidden">
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              title={`${title} - PDF Preview`}
              style={{ border: 'none' }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-6xl text-white/20 mb-4">📄</div>
                  <h3 className="text-lg font-semibold text-white mb-2">PDF Preview Not Available</h3>
                  <p className="text-white/60 mb-4">Your browser doesn't support PDF preview.</p>
                  <a
                    href={pdfUrl}
                    download
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </iframe>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 bg-secondary-light">
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/60">
                Use the controls above to navigate and interact with the PDF
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white/50">Reading Mode</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFPreviewModal; 