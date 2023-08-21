function isIPAddress(text) {
    // Розділяємо текст на частини по крапках
    const parts = text.split('.');
  
    // IP-адрес повинен містити 4 частини
    if (parts.length !== 4) {
      return false;
    }
  
    // Перевіряємо, чи кожна частина є числом в межах від 0 до 255
    for (const part of parts) {
      const num = parseInt(part, 10);
      if (isNaN(num) || num < 0 || num > 255) {
        return false;
      }
    }
  
    return true;
  }

  
  export default isIPAddress;