import { writable } from 'svelte/store';
import companyData from '../companies.json';

export const companies = writable([]);
export const loggedIn = writable(false);
export const user = writable({});
export const smallScreen = writable(false);
export const userCompanyData = writable({ companies: {} });

const fetchData = async () => {
	const data = JSON.parse(JSON.stringify(companyData));
	companies.set(data);
};

console.log('getting data');
fetchData();
