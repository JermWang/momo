'use client';

import { useRef, useState, useEffect } from 'react';
import ImageSelectorGrid from '../components/ImageSelectorGrid';
import styles from './page.module.css';

// Define character images
const CHARACTER_IMAGES = {
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
    '/images/characters/heads/head-07.png',
    '/images/characters/heads/head-08.png',
    '/images/characters/heads/head-09.png',
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
  ].sort(),
  things: [
    '/images/characters/things/thing-1.png',
    '/images/characters/things/thing-2.png',
    '/images/characters/things/thing-3.png',
    '/images/characters/things/thing-4.png',
    '/images/characters/things/thing-5.png',
    '/images/characters/things/thing-6.png',
  ],
};

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState('head');
  const [selectedHead, setSelectedHead] = useState<string | null>(null);
  const [selectedThing, setSelectedThing] = useState<string | null>(null);
  const [customTexts, setCustomTexts] = useState<{
    id: string;
    text: string;
    color: string;
    size: number;
    x: number;
    y: number;
  }[]>([]);

  // Add a new text item
  const addTextItem = () => {
    const newText = {
      id: Date.now().toString(),
      text: 'New Text',
      color: '#000000',
      size: 16,
      x: 100,
      y: 100,
    };
    setCustomTexts([...customTexts, newText]);
  };

  // Update a text item
  const updateTextItem = (id: string, field: string, value: string | number) => {
    setCustomTexts(
      customTexts.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Remove a text item
  const removeTextItem = (id: string) => {
    setCustomTexts(customTexts.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <main className={styles.mainContent}>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            MoMo Character Creator
          </h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Canvas Preview */}
            <div className="flex-1">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={400}
                  className="w-full max-w-full h-auto border border-gray-200 rounded"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="w-full md:w-96">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b">
                  {['head', 'thing'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 font-medium ${
                        activeTab === tab
                          ? 'border-b-2 border-blue-500 text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-4 h-96 overflow-y-auto">
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
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Game Container removed for now */}
    </div>
  );
}
