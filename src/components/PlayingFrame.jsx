import ImagePiece from "./ImagePiece";
const PlayingFrame = ({ onPieceClick, pieces, win }) => {
	return (
		<div
			style={{
				padding: "4px",
				background: "#999",
				display: "grid",
				gap: "2px",
				gridTemplateColumns: "repeat(3, 1fr)",
				float:"left"
			}}
		>
			{pieces.map((piece, array_idx) => (
				<ImagePiece
					key={piece.piece_id}
					onPieceClick={() => onPieceClick(array_idx)}
					image_path={(!piece.empty || win)?piece.image_path:""}
					weight="10vw"
					height="10vw"
				></ImagePiece>
			))}
		</div>
	);
};

export default PlayingFrame;
