const btn = document.querySelector('button');
const input = document.querySelector('input');

btn.addEventListener('click', (event) => addNewLine(event));

input.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		addNewLine(event);
	}
});

function remove(parentNode) {
	parentNode.remove();

	const lines = document.querySelectorAll('.line');
	let newIndex = 1;

	for (let indexOfLine = 0; indexOfLine < lines.length; indexOfLine++) {
		const number = lines[indexOfLine].querySelector('.number');
		number.innerText = newIndex++;
	}

	if (lines.length == 1) {
		const leftSide = lines[0].querySelector('.leftSide');
		const rightSide = lines[0].querySelector('.rightSide');

		leftSide.style.cssText = 'border-bottom-left-radius: 8px';
		rightSide.style.cssText = 'border-bottom-right-radius: 8px';
	} else {
		lines[lines.length - 1].querySelector('.leftSide').style.cssText =
			'border-bottom-left-radius: 8px; border-top-left-radius: 0px; border-top: 1px #111111 solid;';
		lines[lines.length - 1].querySelector('.rightSide').style.cssText =
			'border-bottom-right-radius: 8px; border-top-right-radius: 0px; border-top: 1px #111111 solid;';
	}
}

function addNewLine(event) {
	event.preventDefault();
	inputValue = input.value;
	let index = document.querySelectorAll('.line').length;

	const line = document.createElement('div');
	line.className = 'line';

	const leftSide = document.createElement('div');
	leftSide.className = 'leftSide';

	const number = document.createElement('div');
	number.className = 'number';
	const numberP = document.createElement('p');
	numberP.innerText = ++index;
	number.append(numberP);

	const russianWord = document.createElement('div');
	russianWord.className = 'russianWord';
	const russianWordP = document.createElement('p');
	if (inputValue.length > 7) {
		russianWordP.innerText = inputValue.slice(0, 7) + '...';
		const titleText = document.createElement('p');
		titleText.className = 'shortText';
		titleText.innerText = inputValue;
		
		leftSide.append(titleText);
	} else {
		russianWordP.innerText = inputValue;
	}

	russianWord.append(russianWordP);

	leftSide.append(number, russianWord);

	const rightSide = document.createElement('div');
	rightSide.className = 'rightSide';

	const englishWord = document.createElement('div');
	englishWord.className = 'englishWord';
	const englishWordP = document.createElement('p');
	englishWordP.id = 'engWord';
	if (inputValue.length > 7) {
		englishWordP.innerText = transliteration(inputValue).slice(0, 7) + '...';
		const titleText = document.createElement('p');
		titleText.className = 'shortText';
		titleText.innerText = transliteration(inputValue);
		
		rightSide.append(titleText);
	} else {
		englishWordP.innerText = transliteration(inputValue);
	}
	englishWord.append(englishWordP);

	const cancelButton = document.createElement('div');
	cancelButton.className = 'cancelButton';
	const cancelButtonBtn = document.createElement('button');
	const img = document.createElement('img');
	img.setAttribute('src', './icons/cancelIcon.svg');
	img.setAttribute('alt', '');
	cancelButtonBtn.append(img);
	cancelButton.append(cancelButtonBtn);

	rightSide.append(englishWord, cancelButton);

	line.append(leftSide, rightSide);
	const dictionary = document.querySelector('.dictionary');
	dictionary.append(line);

	// remove line
	cancelButtonBtn.addEventListener('click', (event) => {
		event.preventDefault();
		const parentNode = cancelButton.parentNode.parentNode;
		remove(parentNode);
	});

	//styles
	const firstLine = document.querySelector('#firstLine');

	const firstLineLeftSide = firstLine.querySelector('.leftSide');
	firstLineLeftSide.setAttribute('style', 'border-bottom-left-radius: 0px;');

	const firstLineRightSide = firstLine.querySelector('.rightSide');
	firstLineRightSide.setAttribute(
		'style',
		'border-bottom-right-radius: 0px;'
	);

	const lastLineLeftSide = line.querySelector('.leftSide');
	lastLineLeftSide.setAttribute(
		'style',
		'border-top-left-radius: 0px; border-top: 1px #111111 solid;'
	);

	const lastLineRightSide = line.querySelector('.rightSide');
	lastLineRightSide.setAttribute(
		'style',
		'border-top-right-radius: 0px; border-top: 1px #111111 solid;'
	);

	let lines = document.querySelectorAll('.line');
	if (lines.length >= 3) {
		for (let lineIndex = 1; lineIndex < lines.length - 1; lineIndex++) {
			const circleLeftSide = lines[lineIndex].querySelector('.leftSide');
			circleLeftSide.setAttribute(
				'style',
				'border-bottom-left-radius: 0px; border-top-left-radius: 0px; border-top: 1px #111111 solid;'
			);

			const circleRightSide =
				lines[lineIndex].querySelector('.rightSide');
			circleRightSide.setAttribute(
				'style',
				'border-bottom-right-radius: 0px; border-top-right-radius: 0px; border-top: 1px #111111 solid;'
			);
		}
	}
}

const removeAll = document.querySelector('.removeAll');
removeAll.addEventListener('click', (event) => {
	event.preventDefault();
	const lines = document.querySelectorAll('.line');

	for (
		let indexOfLineRemoveAll = 1;
		indexOfLineRemoveAll < lines.length;
		indexOfLineRemoveAll++
	) {
		remove(lines[indexOfLineRemoveAll]);
	}
});

function transliteration(ruWord) {
	let engWord = '';

	a = {};

	a["Ё"]="YO";a["Й"]="I";a["Ц"]="TS";a["У"]="U";a["К"]="K";a["Е"]="E";a["Н"]="N";a["Г"]="G";a["Ш"]="SH";a["Щ"]="SCH";a["З"]="Z";a["Х"]="H";a["Ъ"]="'";
	a["ё"]="yo";a["й"]="i";a["ц"]="ts";a["у"]="u";a["к"]="k";a["е"]="e";a["н"]="n";a["г"]="g";a["ш"]="sh";a["щ"]="sch";a["з"]="z";a["х"]="h";a["ъ"]="'";
   	a["Ф"]="F";a["Ы"]="I";a["В"]="V";a["А"]="A";a["П"]="P";a["Р"]="R";a["О"]="O";a["Л"]="L";a["Д"]="D";a["Ж"]="ZH";a["Э"]="E";
   	a["ф"]="f";a["ы"]="i";a["в"]="v";a["а"]="a";a["п"]="p";a["р"]="r";a["о"]="o";a["л"]="l";a["д"]="d";a["ж"]="zh";a["э"]="e";
   	a["Я"]="Ya";a["Ч"]="CH";a["С"]="S";a["М"]="M";a["И"]="I";a["Т"]="T";a["Ь"]="'";a["Б"]="B";a["Ю"]="YU";
   	a["я"]="ya";a["ч"]="ch";a["с"]="s";a["м"]="m";a["и"]="i";a["т"]="t";a["ь"]="'";a["б"]="b";a["ю"]="yu";

	for (let letter of ruWord) {
		if (a.hasOwnProperty(letter)) {
			engWord += a[letter]
		} else {
			engWord += letter
		}
	}

	return engWord
}