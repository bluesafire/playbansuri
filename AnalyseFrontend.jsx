import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function BansuriNoteDetector() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/detect_notes", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Card className="w-full max-w-md p-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Bansuri Note Detector</h2>
          <Input type="file" accept="audio/*" onChange={handleFileChange} />
          <Button className="mt-4 w-full" onClick={handleUpload}>Analyze</Button>
          {result && (
            <div className="mt-4 p-2 border rounded">
              <p><strong>Detected Scale:</strong> {result.scale}</p>
              <ul>
                {result.notes.map((note, index) => (
                  <li key={index}>{note.frequency} Hz → {note.name}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
