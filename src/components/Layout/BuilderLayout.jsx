"use client";

import React, { useState } from "react";
import TopBar from "../Builder/TopBar/TopBar";
import Sidebar from "../Builder/SideBar";
import SelectedTemplateEditor from "../Builder/TemplateEditor/SelectedTemplateEditor";
import TemplateDetails from "../Builder/TemplateEditor/TemplateDetails";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { updateTemplate } from "@/store/Template/templateSlice";
import { v4 as uuidv4 } from "uuid";

const BuilderLayout = () => {
  const dispatch = useDispatch();
  const templates = useSelector((state) => state.template.templates);
  const selectedTemplateId = useSelector(
    (state) => state.template.selectedTemplateId
  );

  const [activeDragItem, setActiveDragItem] = useState(null);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    setActiveDragItem(null);
    if (!over || !active) return;

    const fieldData = active.data.current;
    const dropTarget = over.id;

    const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);
    if (!selectedTemplate) return;

    // Handle section drop
    if (fieldData.type === "section" && dropTarget === "canvas-drop") {
      const title = window.prompt("Enter section title:");
      if (!title?.trim()) return;

      const newSection = {
        id: uuidv4(),
        title: title.trim(),
        style: fieldData.style,
        fields: [],
      };

      dispatch(
        updateTemplate({
          ...selectedTemplate,
          sections: [...selectedTemplate.sections, newSection],
        })
      );
      return;
    }

    //  Handle field drop
    if (["text", "number", "enum", "boolean"].includes(fieldData.type)) {
      const userLabel = window.prompt("Enter field label:");
      if (!userLabel?.trim()) return;

      let options = undefined;

      // 📋 For dropdown or radio (enum), ask for options
      if (fieldData.type === "enum") {
        const optInput = window.prompt(
          "Enter options (comma-separated) for dropdown/radio:"
        );
        options = optInput
          ?.split(",")
          .map((opt) => opt.trim())
          .filter(Boolean);

        if (!options || options.length === 0) return;
      }

      const newField = {
        id: uuidv4(),
        label: userLabel.trim(),
        type: fieldData.type,
        options, // only defined if enum
        ...(fieldData.type === "enum" && { variant: fieldData.variant }),
      };

      const updatedSections = selectedTemplate.sections.map((s) =>
        s.id === dropTarget ? { ...s, fields: [...s.fields, newField] } : s
      );

      dispatch(
        updateTemplate({ ...selectedTemplate, sections: updatedSections })
      );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <DndContext
        onDragStart={(event) => {
          setActiveDragItem(event.active?.data?.current || null);
        }}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveDragItem(null)}
      >
        <div className="flex flex-1 overflow-hidden">
          <div className="w-2/3 bg-gray-50 p-4 overflow-y-auto">
            <TemplateDetails />
            <SelectedTemplateEditor />
          </div>
          <div className="w-1/3 border-l p-4 bg-white overflow-y-auto">
            <Sidebar />
          </div>
        </div>

        <DragOverlay>
          {activeDragItem ? (
            <div className="border px-3 py-2 rounded bg-gray-200 text-sm text-center shadow-md">
              {activeDragItem.label}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default BuilderLayout;
