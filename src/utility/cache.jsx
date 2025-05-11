const prefix = "cache";
const expiryInMinutes = 5;

const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    window.localStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item) => {
  const now = new Date();
  const storedTime = new Date(item.timestamp);
  return (now - storedTime) > expiryInMinutes * 60000;
};

const get = async (key) => {
  try {
    const value = window.localStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) return null;

    if (isExpired(item)) {
      window.localStorage.removeItem(prefix + key);
      return null;
    }
    return item.value;
  } catch (error) {
    console.log("Error retrieving item:", error);
    return null;
  }
};

export default {
  store,
  get,
};