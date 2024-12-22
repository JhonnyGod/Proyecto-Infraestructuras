const convertImageToWebp = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Crear un canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Ajustar el tamaño del canvas según el tamaño de la imagen
                canvas.width = img.width;
                canvas.height = img.height;
                
                // Dibujar la imagen en el canvas
                ctx.drawImage(img, 0, 0);

                // Convertir la imagen a formato WEBP
                canvas.toBlob((blob) => {
                    if (blob) {
                        // Crear un archivo en formato WEBP
                        const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
                            type: 'image/webp',
                        });
                        resolve(webpFile); // Retornar el archivo WEBP
                    } else {
                        reject('No se pudo convertir la imagen');
                    }
                }, 'image/webp');
            };
            img.src = e.target.result;
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
};

export default convertImageToWebp;