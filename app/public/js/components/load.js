function loadCSS(url, type = 'stylesheet') {
  return new Promise((resolve, reject) => {
    if (type === 'stylesheet') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Error al cargar el CSS: ${url}`));
      
      document.head.appendChild(link);
    } else if (type === 'preconnect') {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;

      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Error al preconectar: ${url}`));

      document.head.appendChild(link);
    } else {
      reject(new Error(`Tipo de recurso desconocido: ${type}`));
    }
  });
}
function loadScript(src, type = "text/javascript") {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.type = type;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Error al cargar el script ${src}`));
    document.head.appendChild(script);
  });
}

function loadHTML(filename, elementId) {
  return new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(this.responseText);
        } else {
          reject(new Error("Error al cargar " + filename));
        }
      }
    };
    xhttp.open("GET", filename, true);
    xhttp.send();
  }).then((responseText) => {
    // Utiliza `elementId` para encontrar el elemento y actualizar su contenido
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = responseText;
    } else {
      console.error(`Elemento con ID ${elementId} no encontrado.`);
    }
  }).catch((error) => {
    console.error("Error al cargar el HTML:", error);
  });
}

