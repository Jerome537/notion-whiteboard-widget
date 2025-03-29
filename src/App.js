import React from 'react';
import NotionWhiteboard from './NotionWhiteboard';

function App() {
  return (
    <div className="App min-h-screen bg-gray-50 p-4">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Tableau Blanc pour Notion</h1>
        <p className="text-gray-600">Dessinez, annotez et enregistrez vos idées</p>
      </header>
      
      <main className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <NotionWhiteboard />
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Créez votre propre tableau blanc et intégrez-le dans Notion</p>
        </div>
      </main>
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} NotionWhiteboardWidget - <a href="https://github.com/Jerome537/notion-whiteboard-widget" className="text-blue-600 hover:underline">GitHub</a></p>
      </footer>
    </div>
  );
}

export default App;
