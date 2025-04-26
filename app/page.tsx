"use client";
import { useState } from "react";

export default function Popup() {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<{ major: string[]; critical: string[]; minor: string[] }>({
    major: [],
    critical: [],
    minor: [],
  });

  const scanPage = () => {
    setScanning(true);
  
    chrome.runtime.sendMessage({ type: "SCAN_PAGE" }, (response) => {
      if (!response) {
        console.error('No response received from content script.');
        setScanning(false);
        return;
      }
  
      const pageText = response.text || "";
  
      const major = pageText.includes("google") ? ["google"] : [];
      const critical = pageText.includes("facebook") ? ["facebook"] : [];
      const minor = pageText.includes("cupcake") ? ["cupcake"] : [];
  
      setResults({ major, critical, minor });
      setScanning(false);
    });
  };
  
  

  return (
    <div className="w-[350px] p-4 bg-white rounded-lg shadow-md text-gray-800">
      <h1 className="text-2xl font-semibold mb-4 text-center">Site Scanner</h1>
      
      <button
        onClick={scanPage}
        disabled={scanning}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-gray-400"
      >
        {scanning ? "Scanning..." : "Scan Site"}
      </button>

      <div className="mt-6">
        {scanning ? (
          <div className="text-center animate-pulse text-gray-500">Scanning page content...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left mt-4">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b-2">Severity</th>
                  <th className="px-4 py-2 border-b-2">Words Found</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 font-semibold text-red-600">Major</td>
                  <td className="px-4 py-2">{results.major.join(", ") || "-"}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold text-yellow-600">Critical</td>
                  <td className="px-4 py-2">{results.critical.join(", ") || "-"}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold text-green-600">Minor</td>
                  <td className="px-4 py-2">{results.minor.join(", ") || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
