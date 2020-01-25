window.addEventListener('DOMContentLoaded', function () {
  function retrieveSets() {
    const sets = localStorage.getItem('sets');
    return sets ? JSON.parse(sets) : null;
  }

  function writeSets(sets) {
    const serializedSets = JSON.stringify(sets);
    try {
      localStorage.setItem('sets', serializedSets);
    } catch (e) {
      alert(
        'An error occurred while trying to save data :( Local storage is not available or data storage limit exceeded.'
      );
    }
  }

  function changeHeader(pageTitle, btnClasses) {
    document.querySelector('.page-title').innerText = pageTitle;
    const header = document.querySelector('.header');
    const buttons = Array.from(header.getElementsByTagName('button'));
    buttons.forEach(btn => {
      btnClasses.includes(btn.className) ? btn.style.display = 'block' : btn.style.display = 'none';
    })
  }

  function generateSetHTMLCode(set) {
    return `
      <div class="set-card ${set.isStudied ? 'studied' : ''}" id="${set.id}">
        <p class="set-name">Name: ${set.name}</p>
        <p class="set-term">Term: ${set.term}</p>
        <p class="set-definition">Definition: ${set.definition}</p>
        <div class="options-btn">
          <button class="edit-set-btn">Edit</button>
          <button class="remove-set-btn">Remove</button>
        </div>
      </div>
    `;
  }

  function removeSet(e) {
    e.stopPropagation();
    const setId = +e.target.parentNode.parentNode.id;
    const existingSets = retrieveSets();
    writeSets(existingSets.filter(set => set.id !== setId));
    renderMainPageContent();
  }

  function editSet(e) {
    e.stopPropagation();
    const setId = +e.target.parentNode.parentNode.id;
    location.hash = `/modify/:${setId}`;
  }

  function markAsStudied(e) {
    const setId = +e.currentTarget.id;
    const existingSets = retrieveSets();
    const newOrderedList = existingSets.filter(set => set.id !== setId)
      .concat(existingSets.filter(set => {
        if (set.id === setId) {
          set.isStudied = true;
          return true;
        } else {
          return false;
        }
      }));
    writeSets(newOrderedList);
    renderMainPageContent();
  }

  function renderMainPageContent() {
    changeHeader('Main page', ['add-new-btn']);
    document.querySelector('.content').innerHTML = '<h3>Your sets:</h3><div class="existed-sets"></div>';
    const sets = retrieveSets();
    if (sets) {
      const listHTMLArr = sets.map(set => generateSetHTMLCode(set));
      const listHTML = listHTMLArr.join(' ');
      document.querySelector('.existed-sets').innerHTML = listHTML;
      const addedSets = Array.from(document.getElementsByClassName('set-card'));
      addedSets.forEach(setFromLayout => {
        const sameSetFromStorage = sets.find(setFromStorage => setFromStorage.id === +setFromLayout.id);
        if (!sameSetFromStorage.isStudied) {
          setFromLayout.addEventListener('click', markAsStudied);
          setFromLayout.querySelector('.edit-set-btn').addEventListener('click', editSet);
          setFromLayout.querySelector('.remove-set-btn').addEventListener('click', removeSet);
        }
      })
    }
  }
  renderMainPageContent();

  function renderAddPageContent() {
    changeHeader('Add new set', ['add-terms-btn', 'save-changes-btn', 'cancel-btn']);
    document.querySelector('.content').innerHTML = '<div class="new-set-fields"></div>';
    document.querySelector('.new-set-fields').innerHTML = `
      <label for="name">Enter a name of the new set:</label>
      <input type="text" id="name" placeholder="name...">`;
  }

  function renderModifyPage() {
    const setId = +location.hash[location.hash.length - 1];
    changeHeader('Modify set', ['save-changes-btn', 'cancel-btn']);
    document.querySelector('.content').innerHTML = '<div class="edit-set-fields"></div>';
    const existingSets = retrieveSets();
    const setToEditing = existingSets.find(set => set.id === setId);
    document.querySelector('.edit-set-fields').innerHTML = `
      <label for="name">Current name:</label>
      <input type="text" id="name" placeholder="name...">
      <label for="term">Current term:</label>
      <input type="text" id="term" placeholder="term...">
      <label for="definition">Current definition:</label>
      <input type="text" id="definition" placeholder="definition...">`;
    document.querySelector('#name').value = setToEditing.name;
    document.querySelector('#term').value = setToEditing.term;
    document.querySelector('#definition').value = setToEditing.definition;
  }

  window.addEventListener('hashchange', e => {
    if (location.hash === '#/main') {
      renderMainPageContent();
    } else if (location.hash === '#/add') {
      renderAddPageContent();
    } else if (/modify/.test(location.hash)) {
      renderModifyPage();
    }
  });

  document.querySelector('.add-new-btn').addEventListener('click', () => {
    location.hash = '/add';
  });

  document.querySelector('.cancel-btn').addEventListener('click', () => {
    location.hash = '/main';
  });

  document.querySelector('.save-changes-btn').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    if (name) {
      if (location.hash === '#/add') {
        const newSet = {
          name,
          isStudied: false
        }
        const termInput = document.querySelector('#term');
        const definitionInput = document.querySelector('#definition');
        if (termInput && definitionInput) {
          newSet.term = termInput.value;
          newSet.definition = definitionInput.value;
        } else {
          newSet.term = '';
          newSet.definition = '';
        }
        const existingSets = retrieveSets();
        if (existingSets) {
          newSet.id = existingSets.length + 1;
          const active = existingSets.filter(set => !set.isStudied);
          active.push(newSet);
          writeSets(active.concat(existingSets.filter(set => set.isStudied)));
        } else {
          newSet.id = 1;
          const firstSet = [];
          firstSet.push(newSet);
          writeSets(firstSet);
        }
      } else {
        const setId = +location.hash[location.hash.length - 1];
        const newName = document.querySelector('#name').value;
        const newTerm = document.querySelector('#term').value;
        const newDefinition = document.querySelector('#definition').value;
        const existingSets = retrieveSets();
        existingSets.forEach(set => {
          if (set.id === setId) {
            set.name = newName;
            set.term = newTerm;
            set.definition = newDefinition;
          }
        })
        writeSets(existingSets);
      }
      location.hash = '/main';
    }
  });

  document.querySelector('.add-terms-btn').addEventListener('click', () => {
    if (!document.querySelector('.terms-group')) {
      const termsBlock = document.createElement('div');
      termsBlock.classList.add('terms-group');
      document.querySelector('.new-set-fields').appendChild(termsBlock);
      document.querySelector('.terms-group').innerHTML = `
      <label for="term">Enter a term:</label>
      <input type="text" id="term" placeholder="term...">
      <label for="definition">Enter a definition:</label>
      <input type="text" id="definition" placeholder="definition...">
      <button class="remove-btn">remove</button>`;
      document.querySelector('.remove-btn').addEventListener('click', () => {
        document.querySelector('.terms-group').remove();
      });
    }
  });
});