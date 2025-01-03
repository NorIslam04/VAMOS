
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const imagesInput = document.getElementById('images');
    const imagesPreview = document.getElementById('imagesPreview');
    const form = document.getElementById('travelForm');
    const imageUploadContainer = document.querySelector('.image-upload-container');
    const MAX_IMAGES = 4;

    // Fonction pour créer la prévisualisation d'une image
    function createImagePreview(file) {
        const reader = new FileReader();
        const wrapper = document.createElement('div');
        wrapper.className = 'image-preview-wrapper';

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Preview';
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-image';
            deleteButton.innerHTML = '&times;';
            deleteButton.type = 'button';
            
            wrapper.appendChild(img);
            wrapper.appendChild(deleteButton);
            
            deleteButton.addEventListener('click', function() {
                wrapper.remove();
                updateImagesStatus();
            });
        };

        reader.readAsDataURL(file);
        return wrapper;
    }

    // Fonction pour vérifier le statut des images
    function updateImagesStatus() {
        const currentImages = imagesPreview.children.length;
        const remainingSlots = MAX_IMAGES - currentImages;
        
        if (currentImages >= MAX_IMAGES) {
            imagesInput.disabled = true;
            imageUploadContainer.style.opacity = '0.5';
        } else {
            imagesInput.disabled = false;
            imageUploadContainer.style.opacity = '1';
        }

        // Mettre à jour le message d'information
        const infoMessage = document.createElement('div');
        infoMessage.textContent = `${currentImages}/${MAX_IMAGES} images (${remainingSlots} restantes)`;
        
        // Remplacer ou ajouter le message d'information
        const existingInfo = imageUploadContainer.querySelector('.info-message');
        if (existingInfo) {
            existingInfo.replaceWith(infoMessage);
        } else {
            imageUploadContainer.appendChild(infoMessage);
        }
    }

    // Gestion des fichiers
    function handleFiles(files) {
        const currentImages = imagesPreview.children.length;
        const remainingSlots = MAX_IMAGES - currentImages;
        
        Array.from(files).slice(0, remainingSlots).forEach(file => {
            if (file.type.startsWith('image/')) {
                imagesPreview.appendChild(createImagePreview(file));
            }
        });
        
        updateImagesStatus();
    }

    // Événements Drag & Drop
    imageUploadContainer.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#3498db';
    });

    imageUploadContainer.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ddd';
    });

    imageUploadContainer.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ddd';
        handleFiles(e.dataTransfer.files);
    });

    // Événement de sélection d'images
    imagesInput.addEventListener('change', function() {
        handleFiles(this.files);
        this.value = ''; // Reset input
    });

    // Initialisation
    updateImagesStatus();
});
//............................................options de package...............................................
function selectOption(element) {
    var options = document.querySelectorAll('.package-option');
    options.forEach(function(option) {
        option.classList.remove('selected');
    });

    // Ajouter la classe 'selected' à l'option cliquée
    element.classList.add('selected');

    // Mettre la valeur du champ caché à la valeur de l'option sélectionnée
    var selectedValue = element.getAttribute('data-value');
    document.getElementById('selected-package').value = selectedValue;
}


document.addEventListener('DOMContentLoaded', function () {
    const travelForm = document.getElementById('travelForm');
    
    if (travelForm) {
        travelForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            
            // Première confirmation avant soumission
            const confirmResult = await Swal.fire({
                title: 'Confirmez-vous l\'enregistrement ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Oui, enregistrer',
                cancelButtonText: 'Annuler'
            });

            if (confirmResult.isConfirmed) {
                // Crée un formulaire AJAX pour éviter le rechargement de la page
                const formData = new FormData(this);

                try {
                    const response = await fetch(this.action, {
                        method: this.method,
                        body: formData
                    });

                    if (response.ok) {
                        await Swal.fire({
                            title: 'Votre voyage a été enregistré avec succès!',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            window.location.reload(); // Recharge la page après confirmation
                        });
                    } else {
                        throw new Error('Erreur serveur');
                    }
                } catch (error) {
                    console.error("Erreur lors de la soumission:", error);
                    await Swal.fire({
                        title: 'Une erreur est survenue',
                        text: 'Veuillez réessayer',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    } else {
        console.error("Formulaire non trouvé, vérifiez l'ID.");
    }
});



