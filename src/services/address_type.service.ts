import httpHelper from '../helpers/httpHelper';
import { GET_ALL_ADDRESS_TYPE } from '../constants/apiconstant';

export const fetchQuickBookAddresses = async () => {
  try {
    const response = await httpHelper.get(GET_ALL_ADDRESS_TYPE, {}, 'admin');
    // Check if responseData exists and is an array
    if (!response.responseData || !Array.isArray(response.responseData)) {
      console.error('Invalid response format:', response);
      return [];
    }
    // console.log('response', response);
    return response.responseData.map((item: any) => ({
      id: item.id, // Using the UUID from the backend
      address: '', // Placeholder; fetch actual addresses if available from another endpoint
      place: item.add_type_name, // Use add_type_name as the place
    }));
  } catch (error) {
    console.error('Error fetching quick book addresses:', error);
    return [];
  }
};