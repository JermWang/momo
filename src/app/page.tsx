'use client'

import { useRef, useEffect, useState } from 'react'
import ImageSelectorGrid from '../components/ImageSelectorGrid'
 

const CHARACTER_IMAGES = {
  // Base monkey that always stays the same - correct plain monkey
  base: '/images/characters/base/base-monkey.png',

  main: [
    '/images/characters/main/monkey-1.png',
    '/images/characters/main/monkey-2.png',
    '/images/characters/main/monkey-3.png',
    '/images/characters/main/monkey-4.png',
  ],
  heads: [
    '/images/characters/heads/head-01.png',
    '/images/characters/heads/head-02.png',
    '/images/characters/heads/head-03.png',
    '/images/characters/heads/head-04.png',
    '/images/characters/heads/head-05.png',
    '/images/characters/heads/head-06.png',
    '/images/characters/heads/head-08.png',
    '/images/characters/heads/head-10.png',
    '/images/characters/heads/head-11.png',
    '/images/characters/heads/head-12.png',
    '/images/characters/heads/head-13.png',
    '/images/characters/heads/head-14.png',
    '/images/characters/heads/head-15.png',
    '/images/characters/heads/head-16.png',
    '/images/characters/heads/head-17.png',
    '/images/characters/heads/head-18.png',
    '/images/characters/heads/head-19.png',
    '/images/characters/heads/head-20.png',
    '/images/characters/heads/head-21.png',
    '/images/characters/heads/head-22.png',
    '/images/characters/heads/head-23.png',
    '/images/characters/heads/head-24.png',
    '/images/characters/heads/head-07.png',
    '/images/characters/heads/head-09.png',
  ].sort(),
  things: [
    '/images/characters/things/thing-1.png',
    '/images/characters/things/thing-2.png',
    '/images/characters/things/thing-3.png',
    '/images/characters/things/thing-4.png',
    '/images/characters/things/thing-5.png',
    '/images/characters/things/thing-6.png',
    '/images/characters/things/thing-7.png',
    '/images/characters/things/thing-8.png',
    '/images/characters/things/thing-9.png',
    '/images/characters/things/thing-10.png',
    '/images/characters/things/thing-11.png',
    '/images/characters/things/thing-12.png',
    '/images/characters/things/thing-13.png',
  ].sort(),
  social_icons: {
    dexscreener: 'https://framerusercontent.com/images/WjSUwEBPHt3JBBQIe9WMOVX1j8.png',
    pumpfun: '/images/characters/main/monkey-2.png',
    twitter: 'https://framerusercontent.com/images/HuLosWAGfhwxorVG5iGkfvAeWg.png',
  }
}

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState('head'); // Default to heads tab
  const [selectedHead, setSelectedHead] = useState<string | null>(null);
  const [selectedThing, setSelectedThing] = useState<string | null>(null);
  const [customTexts, setCustomTexts] = useState<{ id: string; text: string; color: string; size: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const imagesToRender: { src: string, imgObject?: HTMLImageElement, order: number }[] = [];
    imagesToRender.push({ src: CHARACTER_IMAGES.base, order: 1 });
    if (selectedHead) imagesToRender.push({ src: selectedHead, order: 2 });
    if (selectedThing) imagesToRender.push({ src: selectedThing, order: 3 });

    let imagesLoaded = 0;
    const totalImages = imagesToRender.length;

    if (totalImages === 1 && imagesToRender[0].src === CHARACTER_IMAGES.base && customTexts.length === 0) {
        const baseImg = new Image();
        baseImg.src = CHARACTER_IMAGES.base;
    baseImg.onload = () => {
            const x = (canvas.width - baseImg.width) / 2;
            const y = (canvas.height - baseImg.height) / 2;
            ctx.drawImage(baseImg, x, y);
        };
        baseImg.onerror = () => console.error("Failed to load base image for initial draw.");
        return; 
    }

    imagesToRender.forEach(imageData => {
      const img = new Image();
      imageData.imgObject = img;
      img.crossOrigin = "Anonymous";
      img.src = imageData.src;
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
          imagesToRender.sort((a, b) => a.order - b.order);
          imagesToRender.forEach(item => {
            if (item.imgObject) {
              const x = (canvas.width - item.imgObject.width) / 2;
              const y = (canvas.height - item.imgObject.height) / 2;
              ctx.drawImage(item.imgObject, x, y);
            }
          });
          customTexts.forEach(textItem => {
            ctx.fillStyle = textItem.color;
            ctx.font = `${textItem.size}px "Fragment Mono", monospace`;
            ctx.textAlign = 'center';
            ctx.fillText(textItem.text, textItem.x, textItem.y, canvas.width - 20);
          });
        }
      };
      img.onerror = () => {
        imagesLoaded++;
        console.error(`Failed to load image: ${imageData.src}`);
        if (imagesLoaded === totalImages) {
          imagesToRender.sort((a, b) => a.order - b.order);
          imagesToRender.forEach(item => {
            if (item.imgObject && item.imgObject.complete && item.imgObject.naturalHeight !== 0) {
              const x = (canvas.width - item.imgObject.width) / 2;
              const y = (canvas.height - item.imgObject.height) / 2;
              ctx.drawImage(item.imgObject, x, y);
            }
          });
          customTexts.forEach(textItem => { /* ... same text drawing logic ... */ });
        }
      };
    });
    
    if (imagesToRender.length === 1 && imagesToRender[0].src === CHARACTER_IMAGES.base && customTexts.length > 0 && imagesLoaded === 0) {
        const baseImg = new Image();
        baseImg.src = CHARACTER_IMAGES.base;
        baseImg.crossOrigin = "Anonymous";
        baseImg.onload = () => {
            const x = (canvas.width - baseImg.width) / 2;
            const y = (canvas.height - baseImg.height) / 2;
            ctx.drawImage(baseImg, x, y);
            customTexts.forEach(textItem => {
              ctx.fillStyle = textItem.color;
              ctx.font = `${textItem.size}px "Fragment Mono", monospace`;
              ctx.textAlign = 'center';
              ctx.fillText(textItem.text, textItem.x, textItem.y, canvas.width - 20);
            });
        };
         baseImg.onerror = () => console.error("Failed to load base image for text-only scenario.");
    }
  }, [selectedHead, selectedThing, customTexts]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/png');
    
    // Create temporary download link
    const link = document.createElement('a');
    link.download = 'momo-meme.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob
            })
          ]);
          alert('Image copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy image:', err);
          alert('Failed to copy image to clipboard');
        }
      }, 'image/png');
    } catch (err) {
      console.error('Error creating blob:', err);
      alert('Error preparing image for copy');
    }
  };
  const handleReset = () => {
    setSelectedHead(null);
    setSelectedThing(null);
    setCustomTexts([]);
  };

  const addTextItem = () => {
    setCustomTexts(prevTexts => [
      ...prevTexts,
      { id: Date.now().toString(), text: 'Sample Text', color: '#000000', size: 40, x: 200, y: 50 }
    ]);
  };

  const updateTextItem = (id: string, field: keyof typeof customTexts[0], value: string | number) => {
    setCustomTexts(prevTexts =>
      prevTexts.map(item =>
        item.id === id ? { ...item, [field]: field === 'size' || field === 'x' || field === 'y' ? Number(value) : value } : item
      )
    );
  };

  const removeTextItem = (id: string) => {
    setCustomTexts(prevTexts => prevTexts.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#f0f2f5] font-inter text-brand-charcoal">
      {/* Full Width White Content Column, now also growing to fill height */}
      <div className="w-full flex-grow bg-white shadow-xl rounded-lg p-6 md:p-8 flex flex-col">
        {/* Top Bar within the white column */}
        <header className="w-full flex justify-between items-center mb-6 md:mb-10">
          <h1 className="font-mono text-3xl md:text-4xl text-brand-charcoal font-semibold">
            momo the <span className="text-brand-blue">monad</span> monkey
          </h1>
          {/* Color swatches can remain if desired */}
        <div className="flex gap-2">
            <div className="w-6 h-6 rounded bg-[#E8C19E]"></div>
            <div className="w-6 h-6 rounded bg-[#926651]"></div>
            <div className="w-6 h-6 rounded bg-[#2C232A]"></div>
        </div>
        </header>

        {/* Main Content Wrapper (Generator + Socials) */}
        {/* Constrain this wrapper to a max width and center it */}
        <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row items-stretch justify-center gap-8">
          
          {/* Meme Generator Section (Canvas and Controls) */}
          <main className="flex-grow w-full lg:w-auto flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-stretch justify-center">
            {/* Left: Canvas & Buttons */}
            <section className="flex flex-col items-center md:items-start flex-shrink-0">
          <canvas
            ref={canvasRef}
                width={400} 
                height={400}
                className="border border-gray-200 rounded-lg bg-white mb-4 shadow-md"
              />
              <div className="flex gap-3 w-full">
            <button
              onClick={handleDownload}
                  className="flex-1 px-5 py-2.5 bg-brand-blue text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
              Download
            </button>
            <button
              onClick={handleCopy}
                  className="flex-1 px-5 py-2.5 bg-[#303030] text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"> {/* Darker gray for copy */}
              Copy
            </button>
            <button
              onClick={handleReset}
                  className="flex-1 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors shadow-sm">
              Reset
            </button>
          </div>
            </section>

            {/* Right: Controls Panel */}
            <section className="w-full md:w-[350px] lg:w-[360px] flex-shrink-0 flex flex-col">
              <div className="flex border-b border-gray-200">
                {['head', 'thing', 'Text'].map((tabName) => (
              <button
                    key={tabName} 
                    onClick={() => setActiveTab(tabName)} 
                    className={`px-4 py-2.5 text-sm font-medium transition-all -mb-px 
                                ${activeTab === tabName 
                                  ? 'border-b-2 border-brand-blue text-brand-blue' 
                                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300'}`}
                  >
                    {tabName}
                  </button>
                ))}
              </div>
              <div className="flex-grow h-full min-h-0 bg-white p-3 md:p-4 rounded-b-lg border border-gray-200 border-t-0 shadow-md overflow-y-auto">
                {activeTab === 'Text' && (
                  <div className="space-y-4">
                    {customTexts.length > 0 ? (
                      customTexts.map((textItem, index) => (
                        <div key={textItem.id} className="p-3 border border-gray-300 rounded-lg space-y-3 bg-gray-50 shadow-sm">
                          <div className="flex justify-between items-center">
                            <label htmlFor={`text-${textItem.id}`} className="text-sm font-medium text-gray-700">Text {index + 1}</label>
                    <button
                              onClick={() => removeTextItem(textItem.id)}
                              className="text-xs text-red-500 hover:text-red-700 font-medium"
                              aria-label={`Remove text ${index + 1}`}
                            >
                              Remove
                  </button>
                </div>
                    <input
                      type="text"
                            id={`text-${textItem.id}`}
                            value={textItem.text}
                            onChange={(e) => updateTextItem(textItem.id, 'text', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue text-sm"
                            placeholder="Enter your text"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label htmlFor={`color-${textItem.id}`} className="block text-xs font-medium text-gray-600 mb-1">Color</label>
                    <input
                      type="color"
                                id={`color-${textItem.id}`}
                                value={textItem.color}
                                onChange={(e) => updateTextItem(textItem.id, 'color', e.target.value)}
                                className="w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
                              />
                            </div>
                            <div>
                              <label htmlFor={`size-${textItem.id}`} className="block text-xs font-medium text-gray-600 mb-1">Size (px)</label>
                              <input
                                type="number"
                                id={`size-${textItem.id}`}
                                value={textItem.size}
                                onChange={(e) => updateTextItem(textItem.id, 'size', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue text-sm"
                                min="1"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label htmlFor={`x-${textItem.id}`} className="block text-xs font-medium text-gray-600 mb-1">X Position</label>
                              <input
                                type="number"
                                id={`x-${textItem.id}`}
                                value={textItem.x}
                                onChange={(e) => updateTextItem(textItem.id, 'x', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue text-sm"
                              />
                            </div>
                            <div>
                              <label htmlFor={`y-${textItem.id}`} className="block text-xs font-medium text-gray-600 mb-1">Y Position</label>
                              <input
                                type="number"
                                id={`y-${textItem.id}`}
                                value={textItem.y}
                                onChange={(e) => updateTextItem(textItem.id, 'y', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                       <div className="text-sm text-gray-400 text-center py-4 border-2 border-dashed border-gray-300 rounded-md mt-2">
                         No text items. Click below to add.
                       </div>
                    )}
                    <button 
                      onClick={addTextItem}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 border-2 border-dashed border-gray-300 rounded-md hover:border-brand-blue hover:text-brand-blue text-gray-500 hover:bg-blue-50 transition-all text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                      Add Text
                </button>
              </div>
            )}
                {activeTab === 'head' && (
                  <ImageSelectorGrid 
                    folder="heads"
                    selectedImageUrl={selectedHead}
                    onImageSelect={(url) => setSelectedHead(url === selectedHead ? null : url)}
                  />
                )}
                {activeTab === 'thing' && (
                  <ImageSelectorGrid 
                    folder="things"
                    selectedImageUrl={selectedThing}
                    onImageSelect={(url) => setSelectedThing(url === selectedThing ? null : url)}
                  />
                )}
              </div>
            </section>
          </main>

          {/* Socials & Info Section */}
          <aside className="w-full lg:w-[360px] flex-shrink-0 flex flex-col items-center lg:items-center gap-4 mt-8 lg:mt-0">
            <div className="flex flex-row justify-center lg:justify-center gap-6 w-full">
              {/* DexScreener and gmgn.ai disabled for now, Twitter links out */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex flex-col items-center gap-2 text-sm text-gray-600 hover:text-brand-blue transition-colors text-center"
                aria-disabled="true"
              >
                <img
                  src={CHARACTER_IMAGES.social_icons.dexscreener}
                  alt="DexScreener"
                  className="w-55 h-55 object-contain transition-shadow hover:shadow-md"
                />
                DexScreener
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex flex-col items-center gap-2 text-sm text-gray-600 hover:text-brand-blue transition-colors text-center"
                aria-disabled="true"
              >
                <img
                  src="/images/little-hat-cabal-pfp.png"
                  alt="gmgn.ai"
                  className="w-55 h-55 object-contain transition-shadow hover:shadow-md"
                />
                gmgn.ai
              </a>
              <a
                href="https://x.com/MomoOnMonad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-sm text-gray-600 hover:text-brand-blue transition-colors text-center"
              >
                <img
                  src={CHARACTER_IMAGES.social_icons.twitter}
                  alt="Twitter/X"
                  className="w-55 h-55 object-contain transition-shadow hover:shadow-md"
                />
                Twitter/X
              </a>
            </div>

            {/* Contract Address Display */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="text-sm text-gray-600">Contract Address:</p>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">0x0c925ebdfdd2b93984bfae55c4efee6bc7b27777</code>
                <button 
                  onClick={() => navigator.clipboard.writeText('0x0c925ebdfdd2b93984bfae55c4efee6bc7b27777')}
                  className="text-sm bg-brand-blue text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>
      
    </div>
  );
}
