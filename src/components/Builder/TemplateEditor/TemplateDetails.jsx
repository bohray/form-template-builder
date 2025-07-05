"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTemplate, deleteTemplate } from "@/store/Template/templateSlice";

const TemplateDetails = () => {
  const templates = useSelector((state) => state.template.templates);
  const selectedTemplateId = useSelector(
    (state) => state.template.selectedTemplateId
  );
  const dispatch = useDispatch();

  const handleSelectTemplate = (templateId) => {
    dispatch(selectTemplate(templateId));
  };

  const handleDeleteTemplate = (e, templateId) => {
    e.stopPropagation();
    dispatch(deleteTemplate(templateId));
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {templates?.map((template) => (
        <div key={template.id} className="relative">
          <button
            onClick={() => handleSelectTemplate(template.id)}
            className={`
              w-fit text-left px-4 py-1.5 text-sm border rounded-md pr-6 relative
              ${
                template.id === selectedTemplateId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-blue-500 hover:text-white"
              }
            `}
          >
            {template.name}
          </button>

          <button
            onClick={(e) => handleDeleteTemplate(e, template.id)}
            className="absolute -top-1.5 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-sm flex items-center justify-center hover:bg-red-600"
            title="Delete Template"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default TemplateDetails;
