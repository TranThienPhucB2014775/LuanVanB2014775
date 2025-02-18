"use client"

import { motion } from "framer-motion";
import React from "react";

const AnimatedSection = ({ children }: {children: React.ReactNode}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }} // Khởi tạo với opacity 0 và dịch chuyển xuống
			whileInView={{ opacity: 1, y: 0 }} // Khi vào viewport, opacity 1 và vị trí ban đầu
			transition={{ duration: 0.5 }} // Thời gian hiệu ứng
			viewport={{ once: false }} // Hiệu ứng sẽ xảy ra mỗi khi vào viewport
		>
			{children}
		</motion.div>
	);
};

export default AnimatedSection;
