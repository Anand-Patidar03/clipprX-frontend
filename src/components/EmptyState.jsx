import React from 'react';

const EmptyState = ({
    title = "No content found",
    description,
    actionText,
    onAction
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-dashed border-gray-700 mx-auto max-w-lg w-full transition-all hover:border-gray-600">
            <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 flex items-center justify-center shadow-lg border border-white/5 group">
                <div className="w-10 h-10 text-gray-500 group-hover:text-purple-400 transition-colors duration-300">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>

            {description && (
                <p className="text-gray-400 mb-8 max-w-sm mx-auto text-sm md:text-base leading-relaxed">
                    {description}
                </p>
            )}

            {actionText && onAction && (
                <button
                    onClick={onAction}
                    className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    {actionText}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
