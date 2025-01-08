// Define the paths
const path1 = [
  { top: '41.92%', left: '44.55%' },
  { top: '65.78%', left: '35.38%' },
  { top: '43.14%', left: '38.51%' },
  { top: '66.46%', left: '41.74%' }
];

const path2 = [];
const path3 = [
  { top: '6.79%', left: '51.00%' }, 
  { top: '1.93%', left: '61.21%' },
  { top: '7.92%', left: '59.83%' },
  { top: '11.77%', left: '60.11%' },
  { top: '21.92%', left: '37.00%' },
  { top: '29.53%', left: '43.70%' },
  { top: '87.09%', left: '85.20%' },
  { top: '63.83', left: '63.88%' }, 
  { top: '29.31%', left: '58.59%' },
  { top: '33.59%', left: '45.91%' },
  { top: '50.93%', left: '64.38%' },
  { top: '71.20%', left: '55.63%' },
  { top: '52.21%', left: '67.56%' },
  { top: '65.69%', left: '64.94%' },
  { top: '70.40%', left: '57.35%' },
  { top: '22.90%', left: '38.47%' }
];

// DOM Elements
const mapImage = document.getElementById('mapImage');
const mover = document.getElementById('mover');
const nextButton = document.getElementById('next-button');
const pathNameInput = document.getElementById('pathName');
const coordinates = Array.from(document.querySelectorAll('.coordinate'));

let currentStep = 0;
let currentPath = { path: null, pathName: null };

// Function to update path name in the hidden input field
function updatePathName(pathName) {
  pathNameInput.value = pathName;
  console.log(`Path name set to: ${pathName}`);
}

// Function to display error message
function displayErrorMessage() {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  document.getElementById('map-container').appendChild(errorMessage);
  setTimeout(() => errorMessage.remove(), 3000);
}

// Function to display completion message
function displayCompletionMessage() {
  nextButton.textContent = 'Journey Completed'; // Change button text
  nextButton.disabled = true; // Disable the button
}

// Function to highlight the next coordinate and move the mover
function highlightNext(path, pathName) {
  coordinates.forEach((coord) => coord.classList.remove('blink'));
  
  const filteredCoords = coordinates.filter(coord => coord.id.includes(pathName));
  
  filteredCoords.forEach((coord, index) => {
    if (index === currentStep) {
      moveToCoordinate(coord);
      coord.classList.add('blink');
      displayComment(coord);
    }
  });
}

// Function to move the mover to the target coordinate
function moveToCoordinate(coord) {
  mover.style.top = coord.style.top;
  mover.style.left = coord.style.left;
}

// Function to display a comment (info text) for a coordinate
function displayComment(coord) {
  const infoText = coord.getAttribute('data-info');
  const existingCommentBox = document.querySelector('.comment-box');
  
  if (existingCommentBox) existingCommentBox.remove();

  const commentBox = document.createElement('div');
  commentBox.classList.add('comment-box');
  commentBox.innerText = infoText;

  document.getElementById('map-container').appendChild(commentBox);
}

// Function to handle path selection and reset coordinates
function selectPath(path, pathName) {
  currentStep = 0;
  currentPath = { path, pathName };
  nextButton.textContent = 'Click to Follow the Journey';
  nextButton.disabled = false;

  //  Clear the comment box
   const existingCommentBox = document.querySelector('.comment-box');
   if (existingCommentBox) {
     existingCommentBox.remove(); // Remove the comment box
   }

  // Update map image for the selected path
  switch (path) {
    case path1: mapImage.src = "map.png"; break;
    case path2: mapImage.src = "Michmash.jpg"; break;
    case path3: mapImage.src = "davidflee.png"; break;
  }

  mapImage.style.display = 'block';

  // if (pathName != "path2") {
  mover.style.display = 'block';
  nextButton.style.display = 'block';

  coordinates.forEach(coord => coord.style.display = 'none');
  
  const filteredCoordinates = coordinates.filter(coord => coord.id.includes(pathName));
  filteredCoordinates.forEach(coordinate => coordinate.style.display = 'block');

 
  highlightNext(currentPath.path, currentPath.pathName);
// }
}

// Event listener for the "Next" button
nextButton.addEventListener('click', () => {
  if (currentStep < currentPath.path.length) {
    const filteredCoords = coordinates.filter(coord => coord.id.includes(currentPath.pathName));
    const nextCoord = filteredCoords[currentStep];
    if (nextCoord) {
      currentStep++;
      if (currentStep < currentPath.path.length) {
        highlightNext(currentPath.path, currentPath.pathName);
      } else {
        displayCompletionMessage();
      }
    }
  }
});

// Event listener for coordinate clicks to display comments
coordinates.forEach(coord => {
  coord.addEventListener('click', () => displayComment(coord));
});

// Function to handle path selection
function handlePathSelection(path, pathName) {
  document.getElementById(pathName).addEventListener('click', (event) => {
    event.preventDefault();
    updatePathName(pathName);
    selectPath(path, pathName);

    const filteredCoords = coordinates.filter(coord => coord.id.includes(currentPath.pathName));
    console.log(`Filtered Coordinates for ${pathName}: `, filteredCoords);
  });
}

// Handle path selection for each path
handlePathSelection(path1, "path1");
handlePathSelection(path2, "path2");
handlePathSelection(path3, "path3");
