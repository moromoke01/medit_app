import React, { useState } from "react";
import axios from "axios";

const NoteTaker = ({ patientId }) => {
  const [inputText, setInputText] = useState("");
  const [aiNote, setAiNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateNote = async () => {
    if (!inputText.trim()) {
      alert("Please type your consultation notes first.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://healthconsultbackend.onrender.com/api/notes/generate", {
        patientId,
        rawText: inputText,
      });
      setAiNote(res.data.structuredNote);
    } catch (error) {
      alert("Error generating note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async () => {
    if (!aiNote.trim()) return alert("No note to save.");
    try {
      await axios.post("https://healthconsultbackend.onrender.com/api/notes/save", {
        patientId,
        note: aiNote,
      });
      alert("Note saved successfully!");
      setInputText("");
      setAiNote("");
    } catch {
      alert("Error saving note.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold text-center mb-4">AI Consultation Notetaker</h2>

      <textarea
        className="w-full border rounded-lg p-3 mb-4"
        rows="6"
        placeholder="Type the consultation summary here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        onClick={handleGenerateNote}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mb-4"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Note"}
      </button>

      {aiNote && (
        <>
          <h3 className="font-semibold mb-2">AI-Generated Note:</h3>
          <textarea
            className="w-full border rounded-lg p-3"
            rows="8"
            value={aiNote}
            onChange={(e) => setAiNote(e.target.value)}
          />
          <button
            onClick={handleSaveNote}
            className="mt-4 bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
          >
            Save Note
          </button>
        </>
      )}
    </div>
  );
};

export default NoteTaker;
