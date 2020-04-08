let gridPixels = 450;

function initiate() {

	let gridSize = document.getElementById('gridSizeInput').value;
		if (gridSize > 140) {
			gridSize = 140;
		}
	
	const gridSizeInput = document.getElementById('gridSizeInput');
	gridSizeInput.addEventListener('keyup', function(e) {
		if (event.keyCode === 13) {
			document.getElementById("createButton").click();
		}
	});
	
	const createButton = document.querySelector('#createButton');
	createButton.addEventListener('click', function(e) {
		gridSize = document.getElementById('gridSizeInput').value;
		if (gridSize > 140) {
			gridSize = 140;
		}
		validateGridSize(gridSize);
	});
	

}

function validateGridSize(gridSize) {
	if (gridSize < 1) {
		alert('Grid size must be a positive number')
	}
	else {
		clearGrid();
		buildGrid(gridSize);
	};	
};

function buildGrid(gridSize) {
	let elementSize = gridPixels / gridSize;

	divideGridBox(gridSize);
	
	const gridBox = document.querySelector('#gridBox');

	for (let i=0; i < gridSize * gridSize; i++) {
		let row = Math.floor(i / gridSize) + 1;
		let column = i % gridSize
		if ((i % gridSize) === 0) {
			column = gridSize;
		}
		
		const gridElement = document.createElement('div')
		gridElement.classList.add('gridElement');
		gridElement.style.width = elementSize;
		gridElement.style.height = elementSize;
		gridElement.style.gridArea = row + ' / ' + column;
		gridElement.id = i+1;
		gridBox.appendChild(gridElement);
	}
	
	addListener();
}


function divideGridBox(gridSize) {
	let elementSize = gridPixels / gridSize;
	document.getElementById('gridBox').style.gridTemplateRows = function(){repeat(gridSize, elementSize)};
	document.getElementById('gridBox').style.gridTemplateColumns = function() {repeat(gridSize, elementSize)};
}

function assignTemplateAreas(gridSize) {
		let gridTemplateAreas = '"'
		for (let row=1; row <= gridSize; row++) {
			for (let column=1; column <= gridSize; column++) {
				gridTemplateAreas = gridTemplateAreas + row * column + ' '
			}
			gridTemplateAreas = gridTemplateAreas + '" \n'
		}
		console.log(gridTemplateAreas)
		return gridTemplateAreas
	}

function addListener() {

	let colorRed = Math.floor(Math.random() * 255);
	let colorGreen = Math.floor(Math.random() * 255);
	let colorBlue = Math.floor(Math.random() * 255);
	let originalColorString = 'rgb(' + colorRed + ',' + colorGreen + ',' +colorBlue + ')';

	const gridElements = document.querySelectorAll('.gridElement')
	gridElements.forEach((div) => {		
		div.addEventListener('mouseover', function(e) {
			if (e.target.style.backgroundColor !== "") {
				newColorString = updateColors(e.target.style.backgroundColor);
				div.style.backgroundColor = newColorString;
			}
			else {
				//Uncomment the lines below to make a rainbow trail (i.e. different color for each cell)
				//let colorRed = Math.floor(Math.random() * 255);
				//let colorGreen = Math.floor(Math.random() * 255);
				//let colorBlue = Math.floor(Math.random() * 255);
				//let originalColorString = 'rgb(' + colorRed + ',' + colorGreen + ',' +colorBlue + ')';
				div.style.backgroundColor = originalColorString;
			}
		});
	});
	
	
	gridElements.forEach((div) => {		
		div.addEventListener('touchmove', function(e) {
			if (e.target.style.backgroundColor !== "") {
				newColorString = updateColors(e.target.style.backgroundColor);
				div.style.backgroundColor = newColorString;
			}
			else {
				//Uncomment the lines below to make a rainbow trail (i.e. different color for each cell)
				//let colorRed = Math.floor(Math.random() * 255);
				//let colorGreen = Math.floor(Math.random() * 255);
				//let colorBlue = Math.floor(Math.random() * 255);
				//let originalColorString = 'rgb(' + colorRed + ',' + colorGreen + ',' +colorBlue + ')';
				div.style.backgroundColor = originalColorString;
			}
		});
	});
	
}

function clearGrid() {
	const gridBox = document.querySelector('#gridBox');
	const gridElements = document.querySelectorAll('.gridElement');
	gridElements.forEach((div) => {
		gridBox.removeChild(div);
});
};

function updateColors(colorString) {
	let rgbValues = colorString.slice(4,-1);
	let rgbArray = rgbValues.split(',')
	let colorRed = Math.floor(rgbArray[0] * 0.9);
	let colorGreen = Math.floor(rgbArray[1] * 0.9);
	let colorBlue = Math.floor(rgbArray[2] * 0.9);
	
	let rgbString = 'rgb(' + colorRed + ',' + colorGreen + ',' +colorBlue + ')'
	return rgbString;
}



buildGrid(40);
initiate();