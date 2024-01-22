import { Plants } from '@/utils/types';
import { API_DEV_URL } from '.';

export const getIndoorPlants = async (): Promise<Plants[]> => {
  try {
    const response = await fetch(
      `${API_DEV_URL}/data`
    );
    if (!response.ok) {
      throw new Error('Error getting indoor plants');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('deu erro?', error);
    throw new Error('Error getting indoor plants');
  }
};
