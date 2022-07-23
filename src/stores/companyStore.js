import { writable } from 'svelte/store';
import companyData from '../companies.json';

export const companies = writable([]);

const fetchData = async () => {
	const data = JSON.parse(JSON.stringify(companyData));
	companies.set(data);
};

console.log('getting data');
fetchData();
