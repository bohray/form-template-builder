// components/Form/FormSkeleton.js
export default function FormSkeleton() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md animate-pulse">
      {/* Form title */}
      <div className="h-6 w-1/2 bg-gray-200 rounded mb-6" />

      {/* Simulated sections */}
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-100 p-6 border border-gray-300 rounded-xl mb-6"
        >
          {/* Section title */}
          <div className="h-4 w-1/3 bg-gray-300 rounded mb-4" />

          {/* Fields */}
          <div className="space-y-4">
            {[...Array(3)].map((_, j) => (
              <div key={j}>
                <div className="h-4 w-1/4 bg-gray-200 rounded mb-2" />
                <div className="h-10 w-full bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
