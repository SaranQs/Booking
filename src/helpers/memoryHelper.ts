import AsyncStorage from '@react-native-async-storage/async-storage';

const memoryHelper = {
  // Save data (key-value pair)
  set: async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Set Storage Error:', error);
    }
  },

  // Get data
  get: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error('Get Storage Error:', error);
      return null;
    }
  },

  // Remove data
  remove: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Remove Storage Error:', error);
    }
  },

  // Clear all storage (use carefully!)
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Clear Storage Error:', error);
    }
  },
};

export default memoryHelper;