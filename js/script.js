// Your web app's Firebase configuration
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

// Reference to the database
const database = firebase.database();

// Function to save fantasy to Firebase
function saveFantasy() {
  // Get form data
  const title = document.getElementById('fantasy-title').value;
  const text = document.getElementById('fantasy-text').value;

  // Validate form data
  if (title === '' || text === '') {
    alert('Please fill out both fields.');
    return;
  }

  // Save data to Firebase
  const newFantasyRef = database.ref('fantasies').push();
  newFantasyRef.set({
      title: title,
      text: text,
      createdAt: firebase.database.ServerValue.TIMESTAMP
  }).then(() => {
      alert('Fantasy saved successfully!');
      // Clear the form
      document.getElementById('fantasy-title').value = '';
      document.getElementById('fantasy-text').value = '';
  }).catch((error) => {
      console.error('Error saving fantasy:', error);
      alert('Failed to save fantasy. Please try again.');
  });
}

// Add event listener to the save button
document.getElementById('btn-save').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form from submitting
  saveFantasy();
});
