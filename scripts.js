function loadedContent() {
    const textAreaContainer = document.getElementById("textAreaContainer");
    const textArea = document.getElementById("imageUrls");
    const submitButton = document.getElementById("submitButton");
    const toggleButton = document.getElementById("toggleButton");

    const imageGrid = document.getElementById("imageGrid");
    const navigation = document.getElementById("navigation");
    const firstPageButton = document.getElementById("firstPage");
    const prevPageButton = document.getElementById("prevPage");
    const nextPageButton = document.getElementById("nextPage");
    const lastPageButton = document.getElementById("lastPage");

    let imageUrls = [];
    let currentPage = 1;
    const imagesPerPage = 15;

    // Toggle visibility of the text area


    toggleButton.addEventListener("click", () => {
        const elements = document.querySelectorAll('.input-component');
        console.log("Elements", elements);
        elements.forEach(element => {
            if (element.classList.contains("hidden")) {
                element.classList.remove("hidden");
            } else {
                element.classList.add("hidden");
            }
        });
        
    });


    // Update image grid when Submit is clicked
    submitButton.addEventListener("click", () => {
        const urls = textArea.value.trim().split("\n").filter(url => url !== "");
        imageUrls = urls;
        currentPage = 1;
        renderImages();
    });


    // New code

    const currentPageInput = document.getElementById("currentPageInput");
    const totalPagesLabel = document.getElementById("totalPagesLabel");
    const goToPageButton = document.getElementById("goToPage");

    // Function to render images and update navigation elements
    function renderImages() {
        const totalPages = Math.ceil(imageUrls.length / imagesPerPage);
        const startIndex = (currentPage - 1) * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        const imagesToShow = imageUrls.slice(startIndex, endIndex);

        // Clear the grid
        imageGrid.innerHTML = "";

        // Add images to the grid
        imagesToShow.forEach(url => {
            const container = document.createElement("a");
            container.setAttribute("href", url);
            container.setAttribute("data-pswp-srcset", url+" 1500w");
            container.setAttribute("data-pswp-width", 1500);
            container.setAttribute("data-pswp-height", 1000);
            const img = document.createElement("img");              
            container.appendChild(img);
            img.src = url;
            img.alt = "Broken image link";
            img.onload = () => {
                let w = img.naturalWidth;
                container.setAttribute("data-pswp-width", img.naturalWidth);
                container.setAttribute("data-pswp-height", img.naturalHeight);
                container.setAttribute("data-pswp-srcset", url+" "+img.naturalWidth+"w");
            };
            imageGrid.appendChild(container);
        });

        // Update navigation
        if (imageUrls.length > imagesPerPage) {
            navigation.classList.remove("hidden");
        } else {
            navigation.classList.add("hidden");
        }

        // Update total pages label and current page input
        totalPagesLabel.textContent = `/ ${totalPages}`;
        currentPageInput.max = totalPages;
        currentPageInput.value = currentPage;
    };

    // Event handler for the Go button
    goToPageButton.addEventListener("click", () => {
        const targetPage = parseInt(currentPageInput.value, 10);

        if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= Math.ceil(imageUrls.length / imagesPerPage)) {
            currentPage = targetPage;
            renderImages();
        } else {
            alert("Please enter a valid page number.");
        }
    });

    // Other navigation buttons
    firstPageButton.addEventListener("click", () => {
        currentPage = 1;
        renderImages();
    });

    prevPageButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderImages();
        }
    });

    nextPageButton.addEventListener("click", () => {
        if (currentPage < Math.ceil(imageUrls.length / imagesPerPage)) {
            currentPage++;
            renderImages();
        }
    });

    lastPageButton.addEventListener("click", () => {
        currentPage = Math.ceil(imageUrls.length / imagesPerPage);
        renderImages();
    });

    const options = {
        gallery: '.grid',
        children: 'a',
        pswpModule: () => PhotoSwipe
    };
    const lightbox = new PhotoSwipeLightbox(options);
    lightbox.on('uiRegister', function() {
        lightbox.pswp.ui.registerElement({
            name: 'zoom-level-indicator', order: 9,
            onInit: (el, pswp) => {
                pswp.on('zoomPanUpdate', (e) => {
                    if (e.slide === pswp.currSlide) {
                        el.innerText = 'Zoom level is ' + Math.round(pswp.currSlide.currZoomLevel * 100) + '%';
                    }
                });
            }
        });
    });
    lightbox.init();
    console.log("Initialized page");
}

window.addEventListener('DOMContentLoaded', loadedContent);
