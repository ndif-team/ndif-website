import React from "react";

const ModelCard = ({ icon: Icon, title, parameters, type}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
      <Icon size={34} />
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100/50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-500/30 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wide mb-8 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-pink-500 dark:bg-pink-400"></span>
        {parameters}
      </div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100/50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-500/30 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wide mb-8 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400"></span>
        {type}
      </div>
    </div>
  );
};

export default ModelCard;
