
async function loadCategories(idcontent,idslide) {
    try {
        const response = await fetch('/app/models/categories.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const container = document.getElementById(idcontent);
        const slide = document.getElementById(idslide);

        data.forEach(product => {
            const card = createSwiperSlide(product);
            container.appendChild(card);
        });

        // Agregar los elementos de paginación y navegación
        const pagination = document.createElement('div');
        pagination.className = 'swiper-pagination';
        slide.appendChild(pagination);

        const buttonPrev = document.createElement('div');
        buttonPrev.className = 'swiper-button-prev';
        slide.appendChild(buttonPrev);

        const buttonNext = document.createElement('div');
        buttonNext.className = 'swiper-button-next';
        slide.appendChild(buttonNext);

        new Swiper(`#${idslide}`, {
            // Optional parameters
            direction: 'horizontal', // Cambia a 'vertical' si prefieres
            loop: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            
            // If we need pagination
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            
            // Navigation arrows
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            breakpoints: {
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
            },
        });
    } catch(error){
        console.error('Error loading product:', error);
    }
}

function createSwiperSlide(category) {
    // Crear el elemento <li> y asignar la clase
    const li = document.createElement('li');
    li.className = 'swiper-slide';

    // Crear el contenedor <div> y asignar las clases
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-12 d-flex category-block';

    // Crear el contenedor <div> interno con clases
    const innerDiv = document.createElement('div');
    innerDiv.className = 'w-100 my-2 shadow-2-strong position-relative text-center overflow-hidden';

    // Crear el elemento <picture>
    const picture = document.createElement('picture');

    // Crear y agregar el <source>
    const source = document.createElement('source');
    source.srcset = category.categoryImage;
    source.type = 'image/webp';
    picture.appendChild(source);

    // Crear y agregar el <img>
    const img = document.createElement('img');
    img.src = category.categoryImage;
    img.className = 'card-img-top position-absolute img-filter';
    img.style.cssText = 'aspect-ratio: 1 / 1; width: 100%; height: 100%; object-fit: cover;';
    picture.appendChild(img);

    // Agregar el <picture> al contenedor interno
    innerDiv.appendChild(picture);

    // Crear el contenedor para el texto
    const textDiv = document.createElement('div');
    textDiv.className = 'd-flex justify-content-center align-items-center h-100';

    // Crear el elemento <p> y asignar las clases y el texto
    const p = document.createElement('p');
    p.className = 'text-center h4 mb-3 mt-3 text-overlay text-white';
    p.textContent = category.categoryTitle;

    // Agregar el <p> al contenedor de texto
    textDiv.appendChild(p);

    // Agregar el contenedor de texto al contenedor interno
    innerDiv.appendChild(textDiv);

    // Agregar el contenedor interno al contenedor <div> principal
    colDiv.appendChild(innerDiv);

    // Agregar el contenedor principal al <li>
    li.appendChild(colDiv);

    return li;
}