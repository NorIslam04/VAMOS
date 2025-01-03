document.addEventListener('DOMContentLoaded', function () {
    const imagesInput = document.getElementById('images');
    const imagesPreview = document.getElementById('imagesPreview');
    const form = document.getElementById('travelForm');
    const MAX_IMAGES = 4;
    
    // Track uploaded images
    let uploadedImages = [];

    function updateUploadStatus() {
        const remainingSlots = MAX_IMAGES - uploadedImages.length;
        const statusText = uploadedImages.length > 0 
            ? `${uploadedImages.length} image(s) sélectionnée(s)` 
            : "Aucun fichier choisi";
            
        // Créer ou mettre à jour l'élément de statut
        let statusElement = document.getElementById('upload-status');
        if (!statusElement) {
            statusElement = document.createElement('div');
            statusElement.id = 'upload-status';
            imagesInput.parentNode.insertBefore(statusElement, imagesInput.nextSibling);
        }
        statusElement.textContent = statusText;
        
        // Désactiver l'input si le maximum est atteint
        imagesInput.disabled = uploadedImages.length >= MAX_IMAGES;
    }

    function createImagePreview(file) {
        const reader = new FileReader();
        const wrapper = document.createElement('div');
        wrapper.className = 'image-preview-wrapper';

        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Preview';
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-image';
            deleteButton.innerHTML = '&times;';
            deleteButton.type = 'button';

            wrapper.appendChild(img);
            wrapper.appendChild(deleteButton);
            imagesPreview.appendChild(wrapper);

            // Add to uploaded images array
            uploadedImages.push(file);
            updateUploadStatus();

            deleteButton.addEventListener('click', function () {
                const index = Array.from(imagesPreview.children).indexOf(wrapper);
                uploadedImages.splice(index, 1);
                wrapper.remove();
                updateUploadStatus();
            });
        };
        reader.readAsDataURL(file);
    }

    function handleFiles(files) {
        const remainingSlots = MAX_IMAGES - uploadedImages.length;
        if (remainingSlots <= 0) {
            alert('Maximum 4 images allowed');
            return;
        }
        
        Array.from(files).slice(0, remainingSlots).forEach(file => {
            if (file.type.startsWith('image/')) {
                createImagePreview(file);
            }
        });
    }

    // Style pour le statut d'upload
    const style = document.createElement('style');
    style.textContent = `
        #upload-status {
            margin-top: 5px;
            color: #666;
            font-size: 0.9em;
        }
        .image-preview-wrapper {
            position: relative;
            display: inline-block;
            margin: 10px;
        }
        .image-preview-wrapper img {
            max-width: 150px;
            max-height: 150px;
            object-fit: cover;
        }
        .delete-image {
            position: absolute;
            top: -10px;
            right: -10px;
            background: red;
            color: white;
            border: none;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Première confirmation avant soumission
        const confirmResult = await Swal.fire({
            title: 'Confirmez-vous l\'enregistrement ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, enregistrer',
            cancelButtonText: 'Annuler'
        });

        if (!confirmResult.isConfirmed) {
            return;
        }
        
        const formData = new FormData(form);
        
        // Remove any existing image fields
        uploadedImages.forEach((file, index) => {
            formData.append(`image${index + 1}`, file);
        });

        try {
            // Send the form data using fetch
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            });

            const data = await response.json();

            if (data.success) {
                // Afficher le message de succès
                await Swal.fire({
                    title: 'Votre voyage a été enregistré avec succès!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                
                // Réinitialiser le formulaire
                form.reset();
                imagesPreview.innerHTML = '';
                uploadedImages = [];
                updateUploadStatus();
                
                // Rediriger après la confirmation
                window.location.href = data.redirect_url;
            } else {
                throw new Error(data.error || 'Une erreur est survenue');
            }
        } catch (error) {
            console.error('Error:', error);
            await Swal.fire({
                title: 'Une erreur est survenue',
                text: error.message || 'Veuillez réessayer',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

    imagesInput.addEventListener('change', function () {
        handleFiles(this.files);
    });

    // Initialize upload status
    updateUploadStatus();
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

// Add event listener for the document ready event
document.addEventListener('DOMContentLoaded', function () {
    // Get the travel form
    const travelForm = document.getElementById('travelForm');
    
    // Check if the form exists
    if (travelForm) {
        // Add submit event listener to the form
        travelForm.addEventListener('submit', async function (event) {
            // Prevent default form submission
            event.preventDefault();
            
            // Show confirmation dialog
            const confirmResult = await Swal.fire({
                title: 'Confirmez-vous l\'enregistrement ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Oui, enregistrer',
                cancelButtonText: 'Annuler'
            });

            // If user confirms
            if (confirmResult.isConfirmed) {
                // Create FormData object
                const formData = new FormData(this);

                try {
                    // Send form data to server
                    const response = await fetch(this.action, {
                        method: this.method,
                        body: formData
                    });

                    // If response is OK
                    if (response.ok) {
                        // Show success message
                        await Swal.fire({
                            title: 'Votre voyage a été enregistré avec succès!',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            // Reload page after confirmation
                            window.location.reload();
                        });
                    } else {
                        throw new Error('Erreur serveur');
                    }
                } catch (error) {
                    console.error("Erreur lors de la soumission:", error);
                    // Show error message
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