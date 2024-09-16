// script.js
document.getElementById('convertButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const formatSelect = document.getElementById('formatSelect');
    const downloadList = document.getElementById('downloadList');
    const resultSection = document.getElementById('result');

    if (fileInput.files.length === 0) {
        alert('Veuillez sélectionner des fichiers vidéo.');
        return;
    }

    if (fileInput.files.length > 5) {
        alert('Veuillez sélectionner au maximum 5 fichiers.');
        return;
    }

    const files = fileInput.files;
    const format = formatSelect.value;

    downloadList.innerHTML = ''; // Réinitialiser la liste des téléchargements

    Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onload = function(e) {
            const fileContent = e.target.result;
            const blob = new Blob([fileContent], { type: format });
            const url = URL.createObjectURL(blob);

            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = url;
            link.download = `converted-${file.name.split('.')[0]}.${format.split('/')[1]}`;
            link.textContent = `Télécharger ${file.name.split('.')[0]}.${format.split('/')[1]}`;
            listItem.appendChild(link);
            downloadList.appendChild(listItem);
        }

        reader.readAsArrayBuffer(file);
    });

    resultSection.classList.remove('hidden');
});
