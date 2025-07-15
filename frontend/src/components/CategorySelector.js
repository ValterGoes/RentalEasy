export default function CategorySelector({ options, selected, onToggle, disabled }) {
    return (
        <div className="flex flex-nowrap gap-3 justify-start w-full mb-6">
            {options.map(({ label, icon }) => (
                <button
                    key={label}
                    type="button"
                    className={`flex items-center justify-center px-2 py-2 rounded-3xl font-semibold
              ${selected.includes(label)
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
                        : "bg-white text-gray-800 border border-gray-800 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                        }` }
                    onClick={() => onToggle(label)}
                    disabled={disabled}
                >
                    {icon}
                    <span className="text-xs ml-2">{label}</span>
                </button>
            ))}
        </div>
    );
}