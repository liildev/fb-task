import React, { useState } from 'react';
import Toolbar from './toolbar';
import Dashboard from './dashboard';

const App: React.FC = () => {
	const [isSaved, setIsSaved] = useState(false);

	const handleSave = () => {
		// In a real scenario, we might want to persist data to server/local storage
		alert('Successfully Saved');
		setIsSaved(true);
	};

	return (
		<div className='min-h-screen flex flex-col'>
			{/* Header */}
			<header className='bg-blue-500 text-white p-4'>
				<div className='container mx-auto flex justify-between items-center'>
					<h1 className='text-xl font-bold'>Dashboard Builder</h1>
					<span>Hello, John Doe</span>
				</div>
			</header>

			<div className='flex flex-1'>
				{/* Left Toolbar Panel (Hide if isSaved) */}
				{!isSaved && (
					<div className='w-64 bg-gray-200 p-4'>
						<Toolbar />
					</div>
				)}

				{/* Dashboard Area */}
				<div className='flex-1 bg-gray-100'>
					<Dashboard isSaved={isSaved} />
				</div>
			</div>

			{/* Footer with Save button */}
			{!isSaved && (
				<footer className='bg-white border-t p-4 flex justify-end'>
					<button
						onClick={handleSave}
						className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
					>
						Save
					</button>
				</footer>
			)}
		</div>
	);
};

export default App;
