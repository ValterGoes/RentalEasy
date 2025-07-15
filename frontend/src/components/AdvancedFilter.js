import { useState } from "react";
import { LuCaravan, LuCar, LuBike } from "react-icons/lu";
import { FaTools } from "react-icons/fa";
import { LiaToolsSolid } from "react-icons/lia";
import AdvancedFilterDesktop from "./AdvancedFilterDesktop";
import AdvancedFilterMobile from "./AdvancedFilterMobile";

function getDateString(offsetDays = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().slice(0, 10);
}

const categoryOptions = [
    { label: "Bike", icon: <LuBike size={20} /> },
    { label: "Car", icon: <LuCar size={20} /> },
    { label: "RV", icon: <LuCaravan size={20} /> },
    { label: "Tools", icon: <LiaToolsSolid size={20} /> },
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