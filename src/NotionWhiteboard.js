import React, { useRef, useState, useEffect } from 'react';

const NotionWhiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#37352F');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState('pen');
  
  // Palette de couleurs Notion
  const notionColors = [
    { name: 'Default', color: '#37352F' },
    { name: 'Gray', color: '#9B9A97' },
    { name: 'Brown', color: '#64473A' },
    { name: 'Orange', color: '#D9730D' },
    { name: 'Yellow', color: '#DFAB01' },
    { name: 'Green', color: '#0F7B6C' },
    { name: 'Blue', color: '#0B6E99' },
    { name: 'Purple', color: '#6940A5' },
    { name: 'Pink', color: '#AD1A72' },
    { name: 'Red', color: '#E03E3E' }
  ];
  
  // Position précédente pour le dessin
  const lastPositionRef = useRef({ x: 0, y: 0 });
  
  // Initialisation du canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Définir la taille du canvas
    function setCanvasDimensions() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 500;
      
      // Remplir le canvas avec un fond blanc
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    setCanvasDimensions();
    
    // Ajuster la taille lors du redimensionnement de la fenêtre
    window.addEventListener('resize', setCanvasDimensions);
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  // Dessiner une ligne entre deux points
  const drawLine = (startX, startY, endX, endY) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.stroke();
  };
  
  // Gestionnaires d'événements pour le dessin
  const handleMouseDown = (e) => {
    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    lastPositionRef.current = { x, y };
  };
  
  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    drawLine(
      lastPositionRef.current.x,
      lastPositionRef.current.y,
      x,
      y
    );
    
    lastPositionRef.current = { x, y };
  };
  
  const handleMouseUp = () => {
    setIsDrawing(false);
  };
  
  const handleMouseLeave = () => {
    setIsDrawing(false);
  };
  
  // Gestionnaires d'événements tactiles
  const handleTouchStart = (e) => {
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    
    lastPositionRef.current = { x, y };
    setIsDrawing(true);
  };
  
  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    
    drawLine(
      lastPositionRef.current.x,
      lastPositionRef.current.y,
      x,
      y
    );
    
    lastPositionRef.current = { x, y };
  };
  
  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsDrawing(false);
  };
  
  // Effacer tout le tableau
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  
  // Sauvegarder le dessin - version ultra simple
  const saveDrawing = () => {
    // Afficher le bouton de téléchargement directement sur le canvas
    document.getElementById('download-panel').style.display = 'flex';
  };
  
  // Fonction de téléchargement réel
  const downloadImage = () => {
    try {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL('image/png');
      
      // Ouvrir l'image dans un nouvel onglet
      window.open(dataURL);
      
      // Cacher le panneau après le téléchargement
      document.getElementById('download-panel').style.display = 'none';
    } catch (error) {
      console.error("Erreur:", error);
    }
  };
  
  return (
    <div className="w-full flex flex-col">
      <div className="bg-white p-4 border-b border-gray-200 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <button 
            className={`p-2 rounded ${tool === 'pen' ? 'bg-gray-200' : ''}`}
            onClick={() => setTool('pen')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
            </svg>
          </button>
          <button 
            className={`p-2 rounded ${tool === 'eraser' ? 'bg-gray-200' : ''}`}
            onClick={() => setTool('eraser')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path>
              <path d="M22 21H7"></path>
              <path d="m5 11 9 9"></path>
            </svg>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Taille:</span>
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-24"
          />
          <span className="text-sm">{brushSize}px</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Couleur:</span>
          <div className="flex items-center gap-1">
            {notionColors.map((item) => (
              <button
                key={item.name}
                className={`w-6 h-6 rounded-full border ${currentColor === item.color ? 'border-black border-2' : 'border-gray-300'}`}
                style={{ backgroundColor: item.color }}
                onClick={() => setCurrentColor(item.color)}
                title={item.name}
              />
            ))}
          </div>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <button 
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
            onClick={clearCanvas}
          >
            Effacer tout
          </button>
          <button 
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
            onClick={saveDrawing}
          >
            Enregistrer dans Notion
          </button>
        </div>
      </div>
      
      <div className="flex-grow bg-white border border-gray-200 relative" style={{ height: '500px' }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ touchAction: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
        
        {/* Panneau de téléchargement qui apparaît lorsqu'on clique sur Enregistrer */}
        <div 
          id="download-panel" 
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex-col items-center justify-center p-4"
          style={{ display: 'none' }}
        >
          <div className="bg-white p-4 rounded-lg max-w-md mx-auto text-center">
            <h3 className="text-lg font-bold mb-2">Enregistrer votre dessin</h3>
            <p className="mb-4">Cliquez sur le bouton ci-dessous pour ouvrir votre dessin dans un nouvel onglet. Ensuite, faites un clic droit sur l'image et sélectionnez "Enregistrer l'image sous..." pour la télécharger.</p>
            
            <div className="flex justify-center gap-2">
              <button 
                onClick={downloadImage} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Ouvrir l'image
              </button>
              <button 
                onClick={() => document.getElementById('download-panel').style.display = 'none'} 
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionWhiteboard;
