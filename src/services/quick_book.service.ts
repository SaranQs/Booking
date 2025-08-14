import httpHelper from '../helpers/httpHelper';

export const getAllUserAddresses = async () => {
  try {
    const response = await httpHelper.post('/user_address/GetAlluser_address', {}, 'booking');
    if (response.responseStatus === 'OK' && Array.isArray(response.responseData)) {
        console.log('API response:', response);
      return response.responseData;
    } else {
      console.log('API response:', response);
      return [];
    }
  } catch (error) {
    console.error('Error fetching user addresses:', error);
    return [];
  }
};

export const saveUserAddress = async (addressData: {
  add_type_id: string;
  address_line1: string;
  address_line2: string;
  city_id: string;
  id: string;
  is_active: string;
  pincode: string;
  status: boolean;
  user_id: string;
}) => {
  try {
    const response = await httpHelper.post('/user_address/Insertuser_address', addressData, 'booking');
    if (response.responseStatus === 'OK') {
      return { success: true, message: 'Address saved successfully' };
    } else {
      console.log('API response:', response);
      return { success: false, message: response.message || 'Failed to save address' };
    }
  } catch (error) {
    console.error('Error saving user address:', error);
    return { success: false, message: 'An error occurred while saving the address' };
  }
};