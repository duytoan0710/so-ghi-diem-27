import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Header from './components/Header';
import { PRESENTATION_DATA } from './constants';
import GradebookView from './components/GradebookView';
import GradebookHomeroomView from './components/GradebookHomeroomView';
import GradebookReExaminationView from './components/GradebookReExaminationView';
import MidTermReviewView from './components/MidTermReviewView';
import ClassUpdateView from './components/ClassUpdateView';
import BulkGradeImportExportView from './components/BulkGradeImportExportView';

const App: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showGradebookView, setShowGradebookView] = useState(false);
  const [showGradebookHomeroomView, setShowGradebookHomeroomView] = useState(false);
  const [showGradebookReExaminationView, setShowGradebookReExaminationView] = useState(false);
  const [showMidTermReviewView, setShowMidTermReviewView] = useState(false);
  const [showClassUpdateView, setShowClassUpdateView] = useState(false);
  const [showBulkImportExportView, setShowBulkImportExportView] = useState(false);

  const menuItems = PRESENTATION_DATA.map(item => item.menuTitle);
  const activeContent = PRESENTATION_DATA[activeStep];

  useEffect(() => {
    const shouldLockScroll = showGradebookView || 
                             showGradebookHomeroomView || 
                             showGradebookReExaminationView ||
                             showMidTermReviewView ||
                             showClassUpdateView ||
                             showBulkImportExportView;
                             
    if (shouldLockScroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showGradebookView, showGradebookHomeroomView, showGradebookReExaminationView, showMidTermReviewView, showClassUpdateView, showBulkImportExportView]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <Header />
      <main className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-1/3 xl:w-1/4 mb-8 lg:mb-0">
            <Sidebar 
              items={menuItems}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </div>
          <div className="lg:w-2/3 xl:w-3/4">
            {activeContent && <MainContent 
                                key={activeStep} 
                                data={activeContent} 
                                onShowGradebookView={() => setShowGradebookView(true)}
                                onShowGradebookHomeroomView={() => setShowGradebookHomeroomView(true)}
                                onShowGradebookReExaminationView={() => setShowGradebookReExaminationView(true)}
                                onShowMidTermReviewView={() => setShowMidTermReviewView(true)}
                                onShowClassUpdateView={() => setShowClassUpdateView(true)}
                                onShowBulkImportExportView={() => setShowBulkImportExportView(true)}
                              />}
          </div>
        </div>
      </main>
      {showGradebookView && <GradebookView onClose={() => setShowGradebookView(false)} />}
      {showGradebookHomeroomView && <GradebookHomeroomView onClose={() => setShowGradebookHomeroomView(false)} />}
      {showGradebookReExaminationView && <GradebookReExaminationView onClose={() => setShowGradebookReExaminationView(false)} />}
      {showMidTermReviewView && <MidTermReviewView onClose={() => setShowMidTermReviewView(false)} />}
      {showClassUpdateView && <ClassUpdateView onClose={() => setShowClassUpdateView(false)} />}
      {showBulkImportExportView && <BulkGradeImportExportView onClose={() => setShowBulkImportExportView(false)} />}
    </div>
  );
};

export default App;