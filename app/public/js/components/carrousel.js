async function loadCarrousel(container) {
    try {
        // Crear el contenedor principal de la sección
        const carouselSection = document.getElementById(container);

        // Crear el div del carousel
        const carouselDiv = document.createElement('div');
        carouselDiv.id = 'carouselBasicExample';
        carouselDiv.classList.add('carousel', 'slide', 'carousel-fade');
        carouselDiv.setAttribute('data-mdb-ride', 'carousel');
        carouselDiv.setAttribute('data-mdb-carousel-init', '');

        // Crear los indicadores
        const indicatorsDiv = document.createElement('div');
        indicatorsDiv.classList.add('carousel-indicators');

        // Primer indicador
        const indicator1 = document.createElement('button');
        indicator1.type = 'button';
        indicator1.setAttribute('data-mdb-target', '#carouselBasicExample');
        indicator1.setAttribute('data-mdb-slide-to', '0');
        indicator1.classList.add('active');
        indicator1.setAttribute('aria-current', 'true');
        indicator1.setAttribute('aria-label', 'Slide 1');

        // Segundo indicador
        const indicator2 = document.createElement('button');
        indicator2.type = 'button';
        indicator2.setAttribute('data-mdb-target', '#carouselBasicExample');
        indicator2.setAttribute('data-mdb-slide-to', '1');
        indicator2.setAttribute('aria-label', 'Slide 2');

        // Agregar los indicadores al div de indicadores
        indicatorsDiv.appendChild(indicator1);
        indicatorsDiv.appendChild(indicator2);

        // Crear el contenedor del inner del carousel
        const carouselInnerDiv = document.createElement('div');
        carouselInnerDiv.classList.add('carousel-inner');

        // Primer item del carrusel
        const carouselItem1 = document.createElement('div');
        carouselItem1.classList.add('carousel-item', 'active');
        const img1 = document.createElement('img');
        img1.src = '/app/public/img/slider/first-slider.jpg';
        img1.classList.add('d-block', 'w-100');
        img1.alt = 'Sunset Over the City';
        const carouselCaption1 = document.createElement('div');
        carouselCaption1.classList.add('carousel-caption', 'd-none', 'd-md-block');
        const captionTitle1 = document.createElement('h5');
        captionTitle1.textContent = 'Mira nuestras';
        const captionText1 = document.createElement('p');
        captionText1.textContent = 'ofertas por inaguración';
        carouselCaption1.appendChild(captionTitle1);
        carouselCaption1.appendChild(captionText1);
        carouselItem1.appendChild(img1);
        carouselItem1.appendChild(carouselCaption1);

        // Segundo item del carrusel
        const carouselItem2 = document.createElement('div');
        carouselItem2.classList.add('carousel-item');
        const img2 = document.createElement('img');
        img2.src = '/app/public/img/slider/joysticks.jpg';
        img2.classList.add('d-block', 'w-100');
        img2.alt = 'Canyon at Night';
        const carouselCaption2 = document.createElement('div');
        carouselCaption2.classList.add('carousel-caption', 'd-none', 'd-md-block');
        const captionTitle2 = document.createElement('h5');
        captionTitle2.textContent = 'Todas las consolas';
        const captionText2 = document.createElement('p');
        captionText2.textContent = 'En un solo lugar';
        carouselCaption2.appendChild(captionTitle2);
        carouselCaption2.appendChild(captionText2);
        carouselItem2.appendChild(img2);
        carouselItem2.appendChild(carouselCaption2);

        // Agregar los items al inner del carousel
        carouselInnerDiv.appendChild(carouselItem1);
        carouselInnerDiv.appendChild(carouselItem2);

        // Crear los controles (botones de anterior y siguiente)
        const prevButton = document.createElement('button');
        prevButton.classList.add('carousel-control-prev');
        prevButton.type = 'button';
        prevButton.setAttribute('data-mdb-target', '#carouselBasicExample');
        prevButton.setAttribute('data-mdb-slide', 'prev');
        const prevIcon = document.createElement('span');
        prevIcon.classList.add('carousel-control-prev-icon');
        prevIcon.setAttribute('aria-hidden', 'true');
        const prevText = document.createElement('span');
        prevText.classList.add('visually-hidden');
        prevText.textContent = 'Previous';
        prevButton.appendChild(prevIcon);
        prevButton.appendChild(prevText);

        const nextButton = document.createElement('button');
        nextButton.classList.add('carousel-control-next');
        nextButton.type = 'button';
        nextButton.setAttribute('data-mdb-target', '#carouselBasicExample');
        nextButton.setAttribute('data-mdb-slide', 'next');
        const nextIcon = document.createElement('span');
        nextIcon.classList.add('carousel-control-next-icon');
        nextIcon.setAttribute('aria-hidden', 'true');
        const nextText = document.createElement('span');
        nextText.classList.add('visually-hidden');
        nextText.textContent = 'Next';
        nextButton.appendChild(nextIcon);
        nextButton.appendChild(nextText);

        // Agregar los controles, indicadores e items al carouselDiv
        carouselDiv.appendChild(indicatorsDiv);
        carouselDiv.appendChild(carouselInnerDiv);
        carouselDiv.appendChild(prevButton);
        carouselDiv.appendChild(nextButton);

        // Agregar el carouselDiv al contenedor principal
        carouselSection.appendChild(carouselDiv);
    } catch(error) {
        console.error('Error loading carousel:', error);
    }
}
