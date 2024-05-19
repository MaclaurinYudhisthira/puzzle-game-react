import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PlayingFrame from "./components/PlayingFrame";
import ImagePiece from "./components/ImagePiece";
import Button from "./components/Button";

function App() {
  const [previewImage, setPreviewImage] = useState("src/assets/images/easy/a/og.jpg")
	const [win, setWin] = useState(false);
	const [pieces, setPieces] = useState([
		{
			image_path: "src/assets/images/easy/a/9.jpg",
			piece_id: "9",
			empty: false,
		},
		{
			image_path: "src/assets/images/easy/a/8.jpg",
			piece_id: "8",
			empty: false,
		},
		{
			image_path: "src/assets/images/easy/a/7.jpg",
			piece_id: "7",
			empty: false,
		},
		{
			image_path: "src/assets/images/easy/a/6.jpg",
			piece_id: "6",
			empty: false,
		},
		{
			image_path: "src/assets/images/easy/a/5.jpg",
			piece_id: "5",
			empty: false,
		},
		{
			image_path: "src/assets/images/easy/a/4.jpg",
			piece_id: "4",
			empty: false,
		},
		{
			image_path: "src/assets/images/easy/a/3.jpg",
			piece_id: "3",
			empty: false,
		},
		{
			image_path: "src/assets/images/easy/a/1.jpg",
			piece_id: "1",
			empty: true,
		},
		{
			image_path: "src/assets/images/easy/a/2.jpg",
			piece_id: "2",
			empty: false,
		},
	]);

	const onPieceClick = (arrayIdx) => {
		const findAdjacentCoordinates = (x, y) => {
			const matrixSize = 3;

			const isValidCoordinate = (x, y) =>
				x >= 1 && x < matrixSize + 1 && y >= 1 && y < matrixSize + 1;

			const top = isValidCoordinate(x - 1, y) ? { x: x - 1, y } : null;
			const right = isValidCoordinate(x, y + 1) ? { x, y: y + 1 } : null;
			const bottom = isValidCoordinate(x + 1, y) ? { x: x + 1, y } : null;
			const left = isValidCoordinate(x, y - 1) ? { x, y: y - 1 } : null;

			return { top, right, bottom, left };
		};

		const findEmptyPieceIndex = (adjCoordinates) => {
			let empty_idx = -1;
			Object.values(adjCoordinates).forEach((value) => {
				if (value != null) {
					const { x, y } = value;
					const idx = (x - 1) * 3 + y - 1;
					if (pieces[idx].empty == true) empty_idx = idx;
				}
			});
			return empty_idx;
		};

		const MakeMove = (emptyPieceIndex, arrayIdx) => {
			if (emptyPieceIndex != -1) {
				let pieces_array = [...pieces];
				const temp = pieces_array[arrayIdx];
				pieces_array[arrayIdx] = pieces_array[emptyPieceIndex];
				pieces_array[emptyPieceIndex] = temp;
				setPieces([...pieces_array]);
			}
		};

		const x = Math.floor(arrayIdx / 3) + 1;
		const y = (arrayIdx % 3) + 1;
		const adjCoordinates = findAdjacentCoordinates(x, y);
		const emptyPieceIndex = findEmptyPieceIndex(adjCoordinates);
    
    if (!win)
		  MakeMove(emptyPieceIndex, arrayIdx);
	};

	const CheckWin = () => {
		let st = "";
		pieces.forEach((piece) => {
			st += piece.piece_id;
		});
		if (st == "987654321") {
			setWin(true);
		}
    else{
      setWin(false);
    }
	};
	
  useEffect(() => {
		CheckWin();
	}, [pieces]);

  const ShuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  const RestartGame = ()=>{
    const shuffled = ShuffleArray([...pieces])
    setPieces([...shuffled])
  }

	return (
		<>
			<Header></Header>
			<PlayingFrame onPieceClick={onPieceClick} pieces={pieces} win={win}></PlayingFrame>
      {win ? <ImagePiece image_path={"src/assets/win1.gif"} width="25vw"></ImagePiece>: <ImagePiece image_path={previewImage} width="25vw"></ImagePiece>}
      <Button text={"Restart"} onClick={RestartGame}></Button>
      <Footer></Footer>
		</>
	);
}

export default App;
