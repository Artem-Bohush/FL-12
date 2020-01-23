const structure = [
  {
    'folder': true,
    'title': 'Films',
    'children': [
      {
        'title': 'Iron Man.avi'
      },
      {
        'folder': true,
        'title': 'Fantasy',
        'children': [
          {
            'title': 'The Lord of the Rings.avi'
          },
          {
            'folder': true,
            'title': 'New folder 1',
            'children': false
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Documents',
    'children': [
      {
        'folder': true,
        'title': 'EPAM Homework answers',
        'children': null
      }
    ]
  }
];

const rootNode = document.getElementById('root');
const commonUl = document.createElement('ul');
rootNode.appendChild(commonUl);

function createNodes(obj, parent) {
  if (parent.classList.contains('folder')) {
    const title = document.createElement('span');
    title.classList.add('folder-title');
    const icon = document.createElement('i');
    icon.innerText = 'folder';
    icon.classList.add('material-icons');
    icon.classList.add('fol');
    title.appendChild(icon);
    const titleText = document.createElement('span');
    titleText.innerText = `${obj['title']}`;
    title.appendChild(titleText);
    parent.appendChild(title);
    parent.appendChild(document.createElement('ul'));
    const currentList = parent.getElementsByTagName('ul')[0];
    if (Array.isArray(obj['children'])) {
      for (let i = 0; i < obj['children'].length; i++) {
        if (obj['children'][i]['folder']) {
          const folder = document.createElement('li');
          folder.classList.add('folder');
          currentList.appendChild(folder);
        } else {
          const file = document.createElement('li');
          file.classList.add('file');
          currentList.appendChild(file);
        }
        const allLi = document.getElementsByTagName('li');
        const justAppendedLi = allLi[allLi.length - 1];
        createNodes(obj['children'][i], justAppendedLi);
      }
    } else {
      const emptyLi = document.createElement('li');
      emptyLi.classList.add('empty');
      emptyLi.innerText = 'Folder is empty';
      currentList.appendChild(emptyLi);
    }
  } else {
    const title = document.createElement('span');
    title.classList.add('file-title');
    const icon = document.createElement('i');
    icon.innerText = 'insert_drive_file';
    icon.classList.add('material-icons');
    icon.classList.add('fil');
    title.appendChild(icon);
    const titleText = document.createElement('span');
    titleText.innerText = `${obj['title']}`;
    title.appendChild(titleText);
    parent.appendChild(title);
  }
}

for (let i = 0; i < structure.length; i++) {
  if (structure[i]['folder']) {
    const folder = document.createElement('li');
    folder.classList.add('folder');
    document.getElementsByTagName('ul')[0].appendChild(folder);
  } else {
    const file = document.createElement('li');
    file.classList.add('file');
    document.getElementsByTagName('ul')[0].appendChild(file);
  }
  const allLi = document.getElementsByTagName('li');
  const justAppendedLi = allLi[allLi.length - 1];
  createNodes(structure[i], justAppendedLi);
}

const foldersLi = Array.from(document.getElementsByClassName('folder'));
foldersLi.forEach(li => {
  li.children[1].style.display = 'none';
});

const folders = Array.from(document.getElementsByClassName('folder-title'));
folders.forEach(folder => {
  folder.addEventListener('click', (e) => {
    e.stopPropagation();
    const thisFolder = [];
    if (e.target.classList.contains('folder-title')) {
      thisFolder.push(e.target.parentNode);
    } else {
      const temp = e.target.parentNode;
      thisFolder.push(temp.parentNode);
    }
    const thisFolderIcon = thisFolder[0].querySelector('.fol');
    const thisFolderItemsList = thisFolder[0].children[1];
    if (thisFolderItemsList.style.display === 'none') {
      thisFolderItemsList.style.display = 'block';
      thisFolderIcon.innerText = 'folder_open';
    } else {
      thisFolderItemsList.style.display = 'none';
      thisFolderIcon.innerText = 'folder';
    }
  })
})