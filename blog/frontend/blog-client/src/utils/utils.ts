export function formatDate(isoString: string): string {
    const date = new Date(isoString);

    const dd = String(date.getDate()).padStart(2, '0');
    const MM = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const yyyy = date.getFullYear();

    const HH = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${dd}/${MM}/${yyyy} ${HH}:${mm}:${ss}`;
}
export function estimateReadingTime(content: string, wordsPerMinute = 200): number {
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
}

export const generateTagColors = (tagText: any) => {
    // Color palettes (Bootstrap colors)
    const backgrounds = [
      '#e3f2fd', '#d1e7dd', '#fff3cd', '#f8d7da', '#cff4fc', '#e2e3e5',
      '#f2e7fe', '#fce7f3', '#ecfdf5', '#eff6ff', '#f7fee7', '#fef9c3'
    ];
    const textColors = [
      '#0d6efd', '#198754', '#ffc107', '#dc3545', '#0dcaf0', '#6c757d',
      '#7e22ce', '#db2777', '#059669', '#3b82f6', '#65a30d', '#ca8a04'
    ];
    
    // Generate a consistent index based on tag text
    let hashCode = 0;
    for (let i = 0; i < tagText.length; i++) {
      hashCode = tagText.charCodeAt(i) + ((hashCode << 5) - hashCode);
    }
    
    // Get positive index for our color arrays
    const index = Math.abs(hashCode) % backgrounds.length;
    
    return {
      backgroundColor: backgrounds[index],
      color: textColors[index]
    };
  };