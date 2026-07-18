import React from "react";

interface BookmarkButtonProps {
    isBookmarked: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

export const BookmarkButton = ({ isBookmarked, onToggle, disabled = false }: BookmarkButton) => {
    return (
        <button
            onClick={onToggle}
            disabled={disabled}
            className="rounded-md border px-3 py-1 text-sm transition hover: bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {isBookmarked ? "🔖 Saved" : "🔖 Save"}

        </button>
    )
}