import { 
	REQUEST_USER_WORK_ENTRIES,
	RECEIVE_USER_WORK_ENTRIES,
	SET_PROFILE_WORK_ENTRIES_FILTERS,
	RECEIVE_ADD_INVOICE, // auto-invoicing for providers
	RECEIVE_DELETE_INVOICE, // auto-invoicing for providers
	RECEIVE_UPDATE_INVOICE, // auto-invoicing for providers
} from './../../actions/types';
import moment from 'moment';
import update from 'immutability-helper';

export function profileView(state, action) {
	if (state === undefined) return {
		workEntries: {
			didInvalidate: true,
			isFetching: false,
			entries: [],
			filters: {
				dateFrom: moment().startOf('month').format('YYYY-MM-DD'),
				dateTo: moment().endOf('month').format('YYYY-MM-DD'),
			}
		}
	}

	switch (action.type) {
		case REQUEST_USER_WORK_ENTRIES:
			return update(state, {
				workEntries: { isFetching: {$set: true} }
			})

		case RECEIVE_USER_WORK_ENTRIES:
			return update(state, {
				workEntries: {
					isFetching: {$set: false},
					didInvalidate: {$set: false},
					entries: {$set: action.payload},
				}
			})

		case SET_PROFILE_WORK_ENTRIES_FILTERS:
			return update(state, {
				workEntries: {
					didInvalidate: {$set: true},
					filters: {$set: action.payload}
				}
			})

		case RECEIVE_ADD_INVOICE:
		case RECEIVE_UPDATE_INVOICE:
		case RECEIVE_DELETE_INVOICE:
			return update(state, {
				workEntries: { didInvalidate: {$set: true} }
			})

		default: return state;
	}
}