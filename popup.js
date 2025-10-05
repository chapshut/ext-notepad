document.addEventListener('DOMContentLoaded', function() {
  const noteInput = document.getElementById('noteInput');
  const saveButton = document.getElementById('saveNote');
  const notesContainer = document.getElementById('notesContainer');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Tab switching functionality
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.style.display = 'none');
      
      // Add active class to clicked tab and show corresponding content
      tab.classList.add('active');
      const tabName = tab.getAttribute('data-tab');
      if (tabName === 'all') {
        document.getElementById('allNotesTab').style.display = 'block';
        loadNotes();
      } else {
        document.getElementById('newNoteTab').style.display = 'block';
        noteInput.focus();
      }
    });
  });

  // Save note functionality
  saveButton.addEventListener('click', saveNote);
  noteInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      saveNote();
    }
  });

  function saveNote() {
    const noteText = noteInput.value.trim();
    if (!noteText) return;

    // Get existing notes
    chrome.storage.sync.get(['notes'], function(result) {
      const notes = result.notes || [];
      const newNote = {
        id: Date.now(),
        text: noteText,
        timestamp: new Date().toLocaleString()
      };
      
      notes.unshift(newNote); // Add new note to the beginning
      
      // Save updated notes
      chrome.storage.sync.set({ notes: notes }, function() {
        noteInput.value = '';
        loadNotes();
        // Switch to All Notes tab
        document.querySelector('.tab[data-tab="all"]').click();
      });
    });
  }

  function loadNotes() {
    chrome.storage.sync.get(['notes'], function(result) {
      const notes = result.notes || [];
      notesContainer.innerHTML = '';
      
      if (notes.length === 0) {
        notesContainer.innerHTML = '<p>No notes saved yet. Add your first note!</p>';
        return;
      }
      
      notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
          <p>${note.text}</p>
          <small>${note.timestamp}</small>
          <button class="delete-btn" data-id="${note.id}">Delete</button>
        `;
        notesContainer.appendChild(noteElement);
      });
      
      // Add event listeners to delete buttons
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
          const noteId = parseInt(this.getAttribute('data-id'));
          deleteNote(noteId);
        });
      });
    });
  }

  function deleteNote(noteId) {
    chrome.storage.sync.get(['notes'], function(result) {
      const notes = result.notes || [];
      const updatedNotes = notes.filter(note => note.id !== noteId);
      
      chrome.storage.sync.set({ notes: updatedNotes }, function() {
        loadNotes();
      });
    });
  }

  // Show all notes by default
  document.getElementById('allNotesTab').style.display = 'block';
  loadNotes();
});
