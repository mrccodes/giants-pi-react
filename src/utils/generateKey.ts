const generateKey = (len = 12) => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters.charAt(randomIndex);
    if ((i + 1) % 4 === 0 && i !== len - 1) {
      key += '-';
    }
  }

  return key;
};

export default generateKey;
