
let BASE_URL;

if (process.env.NODE_ENV !== 'production') { 
	BASE_URL = 'http://localhost:3000/api/1.0'
} else {
	BASE_URL = 'https://om-services.herokuapp.com/api/1.0';
}

export const Endpoints = {

	/** objective endpoins */
	GET_DATE_OBJECTIVES 		: (year, month, day) => `${BASE_URL}/objectives/${year}/${month}/${day}/all`,
	GET_OBJECTIVES_SUMMARY 		: (year, month, day) => `${BASE_URL}/objectives/${year}/${month}/${day}/summary`,
	CREATE_OBJECTIVE 			: () => `${BASE_URL}/objectives/add`,
	UPDATE_OBJECTIVE 			: (objectiveId) => `${BASE_URL}/objectives/${objectiveId}`,
	DELETE_OBJECTIVE			: (objectiveId) => `${BASE_URL}/objectives/${objectiveId}`,
	GET_OBJECTIVE_WORK_ENTRIES 	: (objectiveId) => `${BASE_URL}/objectives/${objectiveId}/work-entries`,
	QUERY_OBJECTIVES			: (query) => `${BASE_URL}/objectives/query?${encode(query)}`,

	/** task endopoins */
	GET_TASKS_LIST_PAGE 		: (page, filters) => `${BASE_URL}/tasks/${page}?${toQueryString(filters)}`,
	ADD_TASK					: () => `${BASE_URL}/tasks/add`,
	UPDATE_TASK					: (taskId) => `${BASE_URL}/tasks/${taskId}`,
	DELETE_TASK					: (taskId) => `${BASE_URL}/tasks/${taskId}`,

	/** activity endpoints */
	GET_LATEST_ACTIVITY_PAGE 	: (page) => `${BASE_URL}/activity/${page}`,

	/** user endpoints */
	GET_USERS_LIST				: () => `${BASE_URL}/users`,
	AUTH_USER_LINK				: () => `${BASE_URL}/users/auth-link`,
	CREATE_USER					: () => `${BASE_URL}/users/add`,
	UPDATE_USER					: (userId) => `${BASE_URL}/users/${userId}`,
	DELETE_USER					: (userId) => `${BASE_URL}/users/${userId}`,

	/** project endpoints */
	GET_PROJECTS_LIST			: () => `${BASE_URL}/projects`,
	GET_PROJECTS_BILLING		: () => `${BASE_URL}/projects/billing`,
	ADD_PROJECT					: () => `${BASE_URL}/projects/add`,
	DELETE_PROJECT				: (projectId) => `${BASE_URL}/projects/${projectId}`,
	UPDATE_PROJECT				: (projectId) => `${BASE_URL}/projects/${projectId}`,
	ADD_INVOICE					: (projectId) => `${BASE_URL}/projects/${projectId}/invoices/add-invoice`,
	UPDATE_INVOICE				: (projectId, invoiceId) => `${BASE_URL}/projects/${projectId}/invoices/${invoiceId}`,
	DELETE_INVOICE				: (projectId, invoiceId) => `${BASE_URL}/projects/${projectId}/invoices/${invoiceId}`,
	RENDER_INVOICE				: (projectId, invoiceId) => `${BASE_URL}/projects/${projectId}/invoices/${invoiceId}/html`,

	/** admin endpoints */
	GET_INTEGRATIONS			: () => `${BASE_URL}/admin/integrations`,
	CREATE_INTEGRATION			: () => `${BASE_URL}/admin/integrations/add`,
	UPDATE_INTEGRATION			: (integrationId) => `${BASE_URL}/admin/integrations/${integrationId}`,
	DELETE_INTEGRATION			: (integrationId) => `${BASE_URL}/admin/integrations/${integrationId}`
}

export const EndpointAuth = () => { 
	return ['Authorization', 'Basic: ' + localStorage.getItem('om-auth-token')];
}

export const EndpointAuthQuerystring = () => {
	return '?authtoken=' + localStorage.getItem('om-auth-token');
}

export function testForErrorReturned(body) {
	if (!!body.error) {
		throw new Error(body.error);
	}
	return body;
}


function encode(obj, key) {
	// final step
	if (typeof obj !== 'object') {
		return `${key}=${obj}`;
	}
	// recursive step
	return Object.keys(obj)
		// encode each child prop
		.map(k => {
			const _key = !!key ? key + '[' + k + ']' : k;
			return encode(obj[k], _key)
		})
		.join('&')
}


function toQueryString(obj) {
	// skip empty or null fields
	const validKeys = Object.keys(obj).filter(k => !!obj[k]);
	return validKeys.map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
}
