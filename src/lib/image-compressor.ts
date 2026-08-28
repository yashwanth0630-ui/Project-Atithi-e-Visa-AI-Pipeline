export function compressImageToBase64(file: File, isExtreme2GMode: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        // Extreme mode shrinks to 600px, standard to 1200px
        const MAX_WIDTH = isExtreme2GMode ? 600 : 1200;
        const scaleSize = Math.min(1, MAX_WIDTH / img.width);
        canvas.width = Math.round(img.width * scaleSize);
        canvas.height = Math.round(img.height * scaleSize);
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('No canvas context'));
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // 2G Mode: Apply Grayscale filter to drastically reduce payload size
        if (isExtreme2GMode) {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          for (let i = 0; i < data.length; i += 4) {
            const avg = Math.round((data[i] + data[i + 1] + data[i + 2]) / 3);
            data[i] = avg; 
            data[i + 1] = avg; 
            data[i + 2] = avg;
          }
          ctx.putImageData(imgData, 0, 0);
        }
        
        // Quality compression: 0.6 for 2G, 0.75 for standard
        const quality = isExtreme2GMode ? 0.6 : 0.75;
        const base64 = canvas.toDataURL('image/jpeg', quality);
        
        resolve(base64);
      };
      img.onerror = () => reject(new Error('Failed to load image on canvas'));
    };
    reader.onerror = () => reject(new Error('Failed to read file buffer'));
  });
}
