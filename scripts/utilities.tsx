export function getLabelFontColor(labelColor) {
    let r = 0, g = 0, b = 0;
  
    // 3 digits
    if (labelColor.length == 3) {
      r = "0x" + labelColor[0] + labelColor[0];
      g = "0x" + labelColor[1] + labelColor[1];
      b = "0x" + labelColor[2] + labelColor[2];
  
    // 6 digits
    } else if (labelColor.length == 6) {
      r = "0x" + labelColor[0] + labelColor[1];
      g = "0x" + labelColor[2] + labelColor[3];
      b = "0x" + labelColor[4] + labelColor[5];
    }
    const hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
      );
    
    return hsp > 127.5 ? 'black' : 'white'
  }