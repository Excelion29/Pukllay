async function loadFooter(container) {
    try {
        const footerContainer = document.getElementById(container);

        // Seleccionar el contenedor principal donde se va a crear la estructura (puedes cambiar el selector según tu caso)
        const sectionContainer = document.createElement('section');
        sectionContainer.classList.add('d-flex', 'justify-content-center');

        // Crear el div del container
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container', 'text-center', 'text-md-start', 'pt-4', 'pb-4');

        // Crear la fila
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row', 'mt-3', 'justify-content-center');

        // Primera columna (Logo y copyright)
        const col1Div = document.createElement('div');
        col1Div.classList.add('col-12', 'col-sm-12', 'col-lg-4', 'mb-2');
        const logoLink = document.createElement('a');
        logoLink.href = "#";
        logoLink.target = "_blank";
        const logoImg = document.createElement('img');
        logoImg.src = "/app/public/img/Logo.png";
        logoImg.height = 35;
        logoLink.appendChild(logoImg);
        const logoText = document.createElement('p');
        logoText.classList.add('mt-2', 'text-dark');
        logoText.textContent = '© 2024 Copyright: PUKLLAY';
        col1Div.appendChild(logoLink);
        col1Div.appendChild(logoText);

        // Segunda columna (Información)
        const col2Div = document.createElement('div');
        col2Div.classList.add('col-12', 'col-sm-12', 'col-lg-4');
        const infoHeading = document.createElement('h6');
        infoHeading.classList.add('text-uppercase', 'text-dark', 'fw-bold', 'mb-2');
        infoHeading.textContent = 'INFORMACIÓN';
        const infoList = document.createElement('ul');
        infoList.classList.add('list-unstyled', 'mb-4');

        // Función para crear enlaces de la lista
        const createInfoLink = (href, text) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = href;
            a.classList.add('text-muted');
            a.textContent = text;
            li.appendChild(a);
            return li;
        };

        // Agregar enlaces a la lista
        infoList.appendChild(createInfoLink('/app/resource/views/nosotros.html', 'Nosotros'));
        infoList.appendChild(createInfoLink('#', 'Nuestras Tiendas'));
        infoList.appendChild(createInfoLink('/comocomprar.html', '¿Cómo comprar?'));
        infoList.appendChild(createInfoLink('/app/resource/views/contact.html', 'Contáctanos'));

        col2Div.appendChild(infoHeading);
        col2Div.appendChild(infoList);

        // Tercera columna (Suscripción)
        const col3Div = document.createElement('div');
        col3Div.classList.add('col-12', 'col-sm-12', 'col-lg-4');
        const subscribeHeading = document.createElement('h6');
        subscribeHeading.classList.add('text-uppercase', 'text-dark', 'fw-bold', 'mb-2');
        subscribeHeading.textContent = 'SUSCRÍBETE';
        const subscribeText = document.createElement('p');
        subscribeText.classList.add('text-muted');
        subscribeText.textContent = 'Suscríbete a nuestro PUKLLAY News.';
        const inputGroupDiv = document.createElement('div');
        inputGroupDiv.classList.add('input-group', 'mb-3');
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.classList.add('form-control', 'custom-input');
        emailInput.placeholder = 'Dirección de Email';
        emailInput.setAttribute('aria-label', 'Email');
        emailInput.setAttribute('aria-describedby', 'button-addon2');
        const subscribeButton = document.createElement('button');
        subscribeButton.classList.add('btn', 'custom-btn');
        subscribeButton.type = 'button';
        subscribeButton.id = 'button-addon2';
        subscribeButton.textContent = 'IR';

        inputGroupDiv.appendChild(emailInput);
        inputGroupDiv.appendChild(subscribeButton);

        col3Div.appendChild(subscribeHeading);
        col3Div.appendChild(subscribeText);
        col3Div.appendChild(inputGroupDiv);

        // Agregar las columnas a la fila
        rowDiv.appendChild(col1Div);
        rowDiv.appendChild(col2Div);
        rowDiv.appendChild(col3Div);

        // Agregar la fila al contenedor
        containerDiv.appendChild(rowDiv);

        // Agregar el contenedor principal a la sección
        sectionContainer.appendChild(containerDiv);

        // Finalmente, agregar la sección al cuerpo o a un contenedor específico en el HTML
        footerContainer.appendChild(sectionContainer); // Puedes cambiar 'body' por el id de un contenedor específico si es necesario
    } catch(error){
        console.error('Error loading footer:', error);
    }
}