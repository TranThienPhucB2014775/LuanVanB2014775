export const renderTextWithLineBreaks = (text: string): JSX.Element[] => {
	return text.split("\n").map((line, index) => (
		<span key={index}>
			{line}
			<br />
			</span>
	));
};
