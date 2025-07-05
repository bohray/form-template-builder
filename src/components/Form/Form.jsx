"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import RenderField from "@/components/Form/RenderField";
import FormSkeleton from "./FormSkeleton";

const Form = () => {
  const router = useRouter();
  const selectedTemplateId = useSelector(
    (state) => state.template.selectedTemplateId
  );
  const templates = useSelector((state) => state.template.templates);
  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Single useEffect handles hydration wait + redirect logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!selectedTemplateId || !selectedTemplate) {
        router.replace("/");
      } else {
        setLoading(false); // ready to render
      }
    }, 400); // wait 400ms before redirect decision

    return () => clearTimeout(timeout);
  }, [selectedTemplateId, selectedTemplate, router]);

  const handleInputChange = (fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    localStorage.setItem(
      `form_submission_${selectedTemplateId}`,
      JSON.stringify(formData)
    );
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <FormSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 mb-6 inline-block text-sm"
        >
          {"<--"} Back to Builder
        </Link>

        <h1 className="text-3xl font-bold mb-6">{selectedTemplate.name}</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-8"
        >
          {selectedTemplate.sections.map((section) => (
            <div
              key={section.id}
              className="bg-gray-50 rounded-xl p-6 border border-gray-300"
            >
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <div className="space-y-6">
                {section.fields.map((field) => (
                  <div key={field.id} className="flex flex-col gap-1">
                    <RenderField
                      field={field}
                      formData={formData}
                      handleInputChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>

        {submitted && (
          <div className="mt-6 text-green-600 font-medium">
            ✅ Form submitted and saved to localStorage!
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
