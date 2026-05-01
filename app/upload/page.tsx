"use client";

import { useState } from "react";

export default function UploadRecords() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      alert("Upload successful");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">Upload Records</h1>

<input
  type="file"
  onChange={(e) => {
    console.log("Selected files:",e.target.files); // debug
    setFile(e.target.files?.[0] || null);
  }}
/>

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload
      </button>
    </div>
  );
}