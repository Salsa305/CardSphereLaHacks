'use client';

import React, { useState } from 'react';
import { testGiftCardNFT } from '../test-nft';

export default function NFTTest() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTest = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    // Create a custom console.log function to capture output
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    
    const logs: string[] = [];
    
    console.log = (...args) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      logs.push(message);
      setTestResults([...logs]);
      originalConsoleLog.apply(console, args);
    };
    
    console.error = (...args) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      logs.push(`ERROR: ${message}`);
      setTestResults([...logs]);
      originalConsoleError.apply(console, args);
    };
    
    try {
      await testGiftCardNFT();
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      // Restore original console functions
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">NFT Test</h2>
      <p className="mb-4">
        This test will mint a gift card and verify that it's being treated as an NFT.
        Make sure your wallet is connected to the Sepolia network before running the test.
      </p>
      
      <button
        onClick={runTest}
        disabled={isRunning}
        className={`px-4 py-2 rounded ${
          isRunning 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isRunning ? 'Running Test...' : 'Run NFT Test'}
      </button>
      
      {testResults.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded overflow-auto max-h-96">
          <h3 className="font-semibold mb-2">Test Results:</h3>
          <pre className="whitespace-pre-wrap text-sm">
            {testResults.join('\n')}
          </pre>
        </div>
      )}
    </div>
  );
} 