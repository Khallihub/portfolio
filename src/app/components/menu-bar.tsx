"use client";

import React from "react";

type MenuBarProps = {
	checkHandler: () => void;
};

const MenuBar = ({ checkHandler }: MenuBarProps) => {
	return (
		<div className="fixed top-0 left-0 right-0 z-50 shadow-lg bg-[rgb(18,14,22)]/95">
			<div className="site-container flex justify-between items-center w-full px-8 text-white h-20" style={{ minHeight: '5rem' }}>
				<div>
					<img src="/logo.svg" alt="logo" className="w-20" />
				</div>
				<div onClick={checkHandler}>
					<label className="hamburger-menu">
						<input type="checkbox" />
					</label>
				</div>
			</div>
		</div>
	);
};

export default MenuBar;