const ImagePiece = ({ onPieceClick = () => {}, image_path, width="10vw",height="auto"}) => {
	return (
		<div
			style={{
				width: width,
				height: height,
				float:"right"
			}}
			onClick={onPieceClick}
		>
			<img
				src={image_path}
				alt=""
				style={{ width: width }}
				onClick={onPieceClick}
			/>
		</div>
	);
};

export default ImagePiece;
