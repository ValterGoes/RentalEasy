import { useState } from "react";
import { Bike, Car, Caravan, Wrench } from "lucide-react";
import AdvancedFilterDesktop from "./AdvancedFilterDesktop";
import AdvancedFilterMobile from "./AdvancedFilterMobile";

function getDateString(offsetDays = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().slice(0, 10);
}

const categoryOptions = [
    { label: "Bikes", icon: <Bike size={20} /> },
    { label: "Cars", icon: <Car size={20} /> },
    { label: "RVs", icon: <Caravan size={20} /> },
    { label: "Tools", icon: <Wrench size={20} /> },
];

const AdvancedFilter = ({ onSearch, availableLocations }) => {
    const [location, setLocation] = useState("");
    const [diffReturn, setDiffReturn] = useState(false);
    const [returnLocation, setReturnLocation] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [pickupDate, setPickupDate] = useState(getDateString(0));
    const [pickupTime, setPickupTime] = useState('');
    const [returnDate, setReturnDate] = useState(getDateString(1));
    const [returnTime, setReturnTime] = useState('');
    const [loading, setLoading] = useState(false);

    // Função única de submit para os dois
    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            onSearch({
                location,
                returnLocation: diffReturn ? returnLocation : location,
                categories: selectedCategories,
                pickupDate,
                pickupTime,
                returnDate,
                returnTime,
            });
            setLoading(false);
        }, 800);
    };

    const commonProps = {
        categoryOptions,
        selectedCategories,
        handleCategoryToggle: (category) =>
            setSelectedCategories((prev) =>
                prev.includes(category)
                    ? prev.filter((c) => c !== category)
                    : [...prev, category]
            ),
        loading,
        location,
        setLocation,
        availableLocations,
        diffReturn,
        setDiffReturn,
        returnLocation,
        setReturnLocation,
        pickupDate,
        setPickupDate,
        pickupTime,
        setPickupTime,
        returnDate,
        setReturnDate,
        returnTime,
        setReturnTime,
        handleSubmit,
    };

    return (
        <>
            <div className="hidden md:block">
                <AdvancedFilterDesktop {...commonProps} />
            </div>
            <div className="md:hidden">
                <AdvancedFilterMobile {...commonProps} />
            </div>
        </>
    );
};

export default AdvancedFilter;