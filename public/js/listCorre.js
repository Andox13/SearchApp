// Función para procesar el archivo CSV y extraer valores únicos de una columna
function extraerValoresUnicosDeColumna(csvData, nombreColumna) {
    const lineas = csvData.split('\n');
    const indiceColumna = lineas[0].split(',').indexOf(nombreColumna);
    const valores = new Set();

    for (let i = 1; i < lineas.length; i++) {
        const valor = lineas[i].split(',')[indiceColumna];
        if (valor) {
            valores.add(valor.trim());
        }
    }

    return [...valores];
}

// Función para manejar la carga del archivo CSV
function manejarArchivoCSV(event) {
    const archivo = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const contenido = e.target.result;
        const valoresUnicos = extraerValoresUnicosDeColumna(contenido, 'nombre_de_tu_columna');
        console.log(valoresUnicos);
    };

    reader.readAsText(archivo);
}

// Asociar el evento de cambio al input de tipo file
document.getElementById('inputCSV').addEventListener('change', manejarArchivoCSV);

