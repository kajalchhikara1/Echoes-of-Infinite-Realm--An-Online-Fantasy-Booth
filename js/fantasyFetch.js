// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK6SQ4r_gO3Ky6VetEc_FHik3iUxHFgjM",
  authDomain: "data-for-fantasy.firebaseapp.com",
  databaseURL: "https://data-for-fantasy-default-rtdb.firebaseio.com",
  projectId: "data-for-fantasy",
  storageBucket: "data-for-fantasy.appspot.com",
  messagingSenderId: "873944978436",
  appId: "1:873944978436:web:7ccb14fd5228d55bfe1151",
  measurementId: "G-PBTZC6J4YH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// CSS code
const cssCode = `
#fantasy-cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  height: auto; /* Adjusted height */
  overflow: hidden;
  color: #D3D3D3; /* Weathered tone */
}

.card h3 {
  color: white; /* Title in white */
}

.card:hover {
  background-color: #2E3D7C; /* Dark Cornflower Blue */
}

.post-content {
  margin-top: 10px;
  display: none; /* Initially hide the full text */
}

.read-more {
  cursor: pointer;
  color: #FFA73C; /* Yellow Orange */
}

.post-content.hidden {
  display: none;
}

.post-content.visible {
  display: block;
}
`;

// Create a <style> element and append the CSS code
const styleElement = document.createElement('style');
styleElement.innerHTML = cssCode;
document.head.appendChild(styleElement);

// Reference to the "fantasies" collection ordered by timestamp
const fantasiesRef = database.ref('fantasies').orderByChild('timestamp');

// Get the container element
const container = document.getElementById('fantasy-cards-container');

// Fetch data from the "fantasies" collection
fantasiesRef.on('value', (snapshot) => {
  container.innerHTML = ''; // Clear the container

  let index = 0;

  // Create a layer container
  const layerContainer = document.createElement('div');
  layerContainer.className = 'container';

  // Collect the child snapshots in an array and reverse the order
  const childSnapshots = [];
  snapshot.forEach((childSnapshot) => {
      childSnapshots.push(childSnapshot);
  });
  childSnapshots.reverse();

  childSnapshots.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      const title = data.title;
      const text = data.text;

      // Create a card element
      const card = document.createElement('div');
      card.className = 'card';
      card.style.backgroundColor = getColor(index); // Set color based on index
      card.innerHTML = `
          <h3>${title}</h3>
          <div class="post-snippet">${getSnippet(text)}</div>
          <div class="read-more">Read More</div>
          <div class="post-content hidden">${text}</div>
      `;

      // Toggle post content visibility on "Read More" click
      const postContent = card.querySelector('.post-content');
      const readMore = card.querySelector('.read-more');
      readMore.addEventListener('click', () => {
          postContent.classList.toggle('hidden');
          postContent.classList.toggle('visible');
          if (postContent.classList.contains('hidden')) {
              readMore.textContent = 'Read More';
          } else {
              readMore.textContent = 'Read Less';
          }
      });

      // Append the card to the layer container
      layerContainer.appendChild(card);

      // Increment index
      index++;
  });

  // Append the layer container to the main container
  container.appendChild(layerContainer);
}, (error) => {
  console.error('Error fetching data:', error);
});

// Function to get a snippet of the post text
function getSnippet(text) {
  const maxLength = 100; // Maximum length of the snippet
  if (text.length <= maxLength) {
      return text;
  }
  // Trim the text and add ellipsis
  return text.substring(0, maxLength) + '...';
}

// Function to get color based on index
function getColor(index) {
  const colors = ['#2E3D7C', '#282528', '#BA292E', '#E15D3A', '#FFA73C'];
  return colors[index % colors.length];
}
