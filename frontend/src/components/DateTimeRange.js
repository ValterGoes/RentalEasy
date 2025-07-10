// src/components/DateTimeRange.js
import { CalendarDays, Clock, Loader2, Search, X } from "lucide-react";

export default function DateTimeRange({
    pickupDate, setPickupDate,
    pickupTime, setPickupTime,
    returnDate, setReturnDate,
    returnTime, setReturnTime,
    loading, onSubmit, modal, setModal
}) {
    if (modal) {
        return (
            <div
                id="filter-modal-overlay"
                onClick={e => e.target.id === "filter-modal-overlay" && setModal(false)}
                className="fixed inset-0 bg-black bg-opacity-40 z-[9999] flex justify-center items-center"
            >
                <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative animate-fade-in-up">
                    <button
                        onClick={() => setModal(false)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                        type="button"
                        aria-label="Close"
                    >
                        <X size={28} />
                    </button>
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label className="text-xs font-semibold mb-1 block">Pick-up date</label>
                            <div className="flex items-center border rounded-xl bg-gray-50 h-12 px-2 mb-2">
                                <CalendarDays className="text-gray-400 mr-2" size={18} />
                                <input
                                    type="date"
                                    className="w-[120px] bg-transparent focus:outline-none text-black"
                                    value={pickupDate}
                                    onChange={e => setPickupDate(e.target.value)}
                                    disabled={loading}
                                />
                                <span className="mx-2 h-6 border-l border-gray-200" />
                                <input
                                    type="time"
                                    className="w-[80px] bg-transparent focus:outline-none text-black"
                                    value={pickupTime}
                                    onChange={e => setPickupTime(e.target.value)}
                                    disabled={loading}
                                />
                                <Clock className="text-gray-400 ml-2" size={18} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="text-xs font-semibold mb-1 block">Return date</label>
                            <div className="flex items-center border rounded-xl bg-gray-50 h-12 px-2">
                                <CalendarDays className="text-gray-400 mr-2" size={18} />
                                <input
                                    type="date"
                                    className="w-[120px] bg-transparent focus:outline-none text-black"
                                    value={returnDate}
                                    onChange={e => setReturnDate(e.target.value)}
                                    disabled={loading}
                                />
                                <span className="mx-2 h-6 border-l border-gray-200" />
                                <input
                                    type="time"
                                    className="w-[80px] bg-transparent focus:outline-none text-black"
                                    value={returnTime}
                                    onChange={e => setReturnTime(e.target.value)}
                                    disabled={loading}
                                />
                                <Clock className="text-gray-400 ml-2" size={18} />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-4 flex items-center justify-center bg-blue-600 text-white rounded-2xl font-bold text-lg py-3 hover:bg-blue-800 transition disabled:opacity-60"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={22} />
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search className="mr-2" size={22} />
                                    Search
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Desktop: bloco inline
    return (
        <div className="flex flex-row gap-4 w-full items-end mt-2">
            <div className="w-[230px]">
                <label className="text-xs font-semibold mb-1 text-left block">Pick-up date</label>
                <div className="flex items-center border rounded-xl bg-gray-50 h-12 px-2 focus-within:ring-2 focus-within:ring-blue-600">
                    <input
                        type="date"
                        className="w-[115px] bg-transparent focus:outline-none text-black"
                        value={pickupDate}
                        onChange={e => setPickupDate(e.target.value)}
                        disabled={loading}
                    />
                    <span className="mx-2 h-6 border-l border-gray-200" />
                    <input
                        type="time"
                        className="w-[70px] bg-transparent focus:outline-none text-black"
                        value={pickupTime}
                        onChange={e => setPickupTime(e.target.value)}
                        disabled={loading}
                    />
                </div>
            </div>
            <div className="w-[230px]">
                <label className="text-xs font-semibold mb-1 text-left block">Return date</label>
                <div className="flex items-center border rounded-xl bg-gray-50 h-12 px-2 focus-within:ring-2 focus-within:ring-blue-600">
                    <input
                        type="date"
                        className="w-[115px] bg-transparent focus:outline-none text-black"
                        value={returnDate}
                        onChange={e => setReturnDate(e.target.value)}
                        disabled={loading}
                    />
                    <span className="mx-2 h-6 border-l border-gray-200" />
                    <input
                        type="time"
                        className="w-[70px] bg-transparent focus:outline-none text-black"
                        value={returnTime}
                        onChange={e => setReturnTime(e.target.value)}
                        disabled={loading}
                    />
                </div>
            </div>
            <div className="flex items-end">
                <button
                    type="submit"
                    className="flex items-center justify-end h-12 px-7 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-800 transition disabled:opacity-60 w-auto"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin mr-2" size={22} />
                            Searching...
                        </>
                    ) : (
                        <>
                            <Search className="mr-2" size={22} />
                            Search
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
