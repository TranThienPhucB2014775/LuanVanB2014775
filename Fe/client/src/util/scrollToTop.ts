export const scrollToTop = () => {
	const duration = 300; // Thời gian cuộn (ms)
	const start = window.scrollY; // Vị trí hiện tại
	const startTime = performance.now(); // Thời gian bắt đầu

	const animation = (currentTime: number) => {
		const timeElapsed = currentTime - startTime; // Thời gian đã trôi qua
		const progress = Math.min(timeElapsed / duration, 1); // Tính toán tiến độ

		// Tính toán vị trí cuộn mới
		const scrollTo = start * (1 - progress);
		window.scrollTo(0, scrollTo);

		if (progress < 1) {
			requestAnimationFrame(animation); // Tiếp tục hiệu ứng
		}
	};

	requestAnimationFrame(animation); // Bắt đầu hiệu ứng
};