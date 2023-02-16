import React, { useState } from "react";

const InputSelector = ({ options, selected, setSelected }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleDropdownClick = () => {
		setIsOpen(!isOpen);
	};

	const handleClick = (option) => {
		setSelected(option);
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button
				type="button"
				className="flex items-center justify-center w-full py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 mt-[10px] "
				onClick={handleDropdownClick}
			>
				{selected}
				<svg
					className="w-4 h-4 ml-1"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 011.414 1.414l-4 4A1 1 0 0110 12z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
			{isOpen && (
				<div className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-md max-h-[200px] overflow-scroll">
					<ul className="py-1">
						{options.map((option) => (
							<li
								key={option}
								className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
									selected === option ? "bg-gray-100" : ""
								}`}
								onClick={() => handleClick(option)}
							>
								{option}
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

export default InputSelector;
