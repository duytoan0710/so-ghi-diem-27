import React, { useEffect, useRef } from 'react';
import type { StepData } from '../types';
import InfoCard from './InfoCard';

interface MainContentProps {
  data: StepData;
  onShowGradebookView: () => void;
  onShowGradebookHomeroomView: () => void;
  onShowGradebookReExaminationView: () => void;
  onShowMidTermReviewView: () => void;
  onShowClassUpdateView: () => void;
  onShowBulkImportExportView: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ 
  data, 
  onShowGradebookView, 
  onShowGradebookHomeroomView, 
  onShowGradebookReExaminationView,
  onShowMidTermReviewView,
  onShowClassUpdateView,
  onShowBulkImportExportView, 
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContentClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const button = target.closest('button');
        if (!button) return;

        // Handle Gradebook view buttons
        const viewType = button.dataset.view;
        if (viewType) {
            if (viewType === 'gradebook-subject') onShowGradebookView();
            else if (viewType === 'class-update') onShowClassUpdateView();
            else if (viewType === 'gradebook-re-examination') onShowGradebookReExaminationView();
            else if (viewType === 'gradebook-mid-term') onShowMidTermReviewView();
            else if (viewType === 'bulk-import-export') onShowBulkImportExportView();
            return; // Exit after handling
        }

        // Handle Tab buttons for evaluation guide
        const tabId = button.dataset.tab;
        if (tabId) {
            const tabContainer = button.closest('#evaluation-tabs-container');
            if (!tabContainer) return;

            const tabButtons = tabContainer.querySelectorAll<HTMLButtonElement>('button[data-tab]');
            const tabContents = tabContainer.querySelectorAll<HTMLDivElement>('div[data-tab-content]');

            // Update button styles
            tabButtons.forEach(btn => {
                btn.classList.remove('bg-white', 'text-blue-600', 'shadow-md', 'font-semibold');
                btn.classList.add('text-slate-500', 'hover:bg-white/70', 'hover:text-slate-800', 'font-medium');
            });
            button.classList.add('bg-white', 'text-blue-600', 'shadow-md', 'font-semibold');
            button.classList.remove('text-slate-500', 'hover:bg-white/70', 'hover:text-slate-800', 'font-medium');

            // Update content visibility
            tabContents.forEach(content => {
                if (content.dataset.tabContent === tabId) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        }
    };

    const contentElement = contentRef.current;
    if (!contentElement) return;

    contentElement.addEventListener('click', handleContentClick);
    
    return () => {
        contentElement.removeEventListener('click', handleContentClick);
    };
  }, [data, onShowGradebookView, onShowGradebookHomeroomView, onShowGradebookReExaminationView, onShowMidTermReviewView, onShowClassUpdateView, onShowBulkImportExportView]);


  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg" ref={contentRef}>
      <div className="flex flex-col space-y-8">
        {data.subsections.map((subsection, index) => (
          <div key={index}>
            <div className="text-center p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-white tracking-wide">{subsection.title}</h3>
            </div>

            {subsection.description && (
              <div 
                className="mt-6 text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: subsection.description }}
              />
            )}

            {subsection.card && (
              <div className="mt-6">
                <InfoCard card={subsection.card} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;