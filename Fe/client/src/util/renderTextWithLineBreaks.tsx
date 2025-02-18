export const renderTextWithLineBreaks = (text: string | undefined): JSX.Element[] => {
	if (!text) {
		return [];
	}
	return text.split("\n").map((line, index) => (
		<span key={index}>
			{line}
			<br />
			</span>
	));
};
