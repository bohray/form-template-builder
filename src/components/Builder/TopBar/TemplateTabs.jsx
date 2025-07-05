"use client";

import { useSelector, useDispatch } from "react-redux";
import { addTemplate, selectTemplate } from "@/store/Template/templateSlice";
import { v4 as uuidv4 } from "uuid";
import { useState, useRef } from "react";

export default function TemplateTabs() {
  const templates = useSelector((state) => state.template.templates);

  const dispatch = useDispatch();

  const [showInput, setShowInput] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const inputRef = useRef(null);

  const handleCreateNew = () => {
    if (!templateName.trim()) return;

    const newTemplate = {
      id: uuidv4(),
      name: templateName.trim(),
      sections: [],
    };

    dispatch(addTemplate(newTemplate));
    dispatch(selectTemplate(newTemplate.id));
    setTemplateName("");
    setShowInput(false);
  };

  return (
    <div className="flex items-center relative">
      {/* Add New Template */}
      {templates.length < 5 && (
        <div className="relative">
          <button
            onClick={() => setShowInput(!showInput)}
            className="px-2.5 py-1 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600"
          >
            +
          </button>

          {/* Floating Input */}
          {showInput && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
              <div className="bg-white border rounded shadow p-4 w-1/5">
                <input
                  ref={inputRef}
                  type="text"
                  className="border p-2 w-full text-sm rounded mb-3"
                  placeholder="Template name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateNew()}
                  autoFocus
                />
                <div className="flex justify-between gap-4 text-sm">
                  <button
                    onClick={() => setShowInput(false)}
                    className="text-gray-500 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateNew}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
